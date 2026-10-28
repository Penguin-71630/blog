import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import GithubSlugger from 'github-slugger';

const postsRoot = path.resolve(process.cwd(), 'src/content/posts');
const calloutAliases = {
	summary: 'abstract',
	tldr: 'abstract',
	hint: 'tip',
	important: 'tip',
	check: 'success',
	done: 'success',
	help: 'question',
	faq: 'question',
	caution: 'warning',
	attention: 'warning',
	fail: 'failure',
	missing: 'failure',
	error: 'danger',
	cite: 'quote',
};
const calloutIcons = {
	note: 'pencil',
	abstract: 'clipboard-list',
	info: 'info',
	todo: 'circle-check',
	tip: 'flame',
	success: 'check',
	question: 'circle-help',
	warning: 'triangle-alert',
	failure: 'x',
	danger: 'zap',
	bug: 'bug',
	example: 'list',
	quote: 'quote',
};

let publishedPosts;

function walkMarkdown(directory) {
	const entries = readdirSync(directory, { withFileTypes: true });
	const files = [];

	for (const entry of entries) {
		const absolutePath = path.join(directory, entry.name);
		if (entry.isDirectory() && entry.name !== '_attachments') {
			files.push(...walkMarkdown(absolutePath));
		} else if (entry.isFile() && entry.name.endsWith('.md')) {
			files.push(absolutePath);
		}
	}
	return files;
}

function getPublishedPosts() {
	if (publishedPosts) return publishedPosts;

	publishedPosts = new Map();
	for (const file of walkMarkdown(postsRoot)) {
		const name = path.basename(file, '.md');
		publishedPosts.set(name.toLocaleLowerCase(), new GithubSlugger().slug(name));
	}
	return publishedPosts;
}

function mapNodes(parent, transform) {
	if (!Array.isArray(parent.children)) return;

	const nextChildren = [];
	for (const child of parent.children) {
		if (child.type === 'text') {
			nextChildren.push(...transform(child));
		} else {
			mapNodes(child, transform);
			nextChildren.push(child);
		}
	}
	parent.children = nextChildren;
}

function stripComments(tree) {
	let insideComment = false;
	function visit(parent) {
		if (!Array.isArray(parent.children)) return;

		const children = [];
		for (const child of parent.children) {
			if (child.type === 'text' || child.type === 'html') {
				const pieces = child.value.split('%%');
				let value = '';
				for (let index = 0; index < pieces.length; index += 1) {
					if (!insideComment) value += pieces[index];
					if (index < pieces.length - 1) insideComment = !insideComment;
				}
				if (value) children.push({ ...child, value });
			} else {
				visit(child);
				children.push(child);
			}
		}
		parent.children = children;
	}

	visit(tree);
}

function normalizeCodeLanguages(tree) {
	if (tree.type === 'code' && tree.lang) {
		tree.lang = tree.lang === '%%' ? 'plaintext' : tree.lang.replace(/=$/, '');
	}
	for (const child of tree.children ?? []) normalizeCodeLanguages(child);
}

function removeFirstH1(tree) {
	if (!Array.isArray(tree.children)) return;
	const index = tree.children.findIndex((node) => node.type === 'heading' && node.depth === 1);
	if (index >= 0) tree.children.splice(index, 1);
}

function replaceInlineSyntax(tree) {
	const wiki = /(?<!!)\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g;
	const highlight = /==(.+?)==/g;

	mapNodes(tree, (node) => {
		const output = [];
		let cursor = 0;
		for (const match of node.value.matchAll(wiki)) {
			if (match.index > cursor) output.push({ type: 'text', value: node.value.slice(cursor, match.index) });
			const target = match[1].trim().replace(/\.md$/i, '');
			const alias = (match[2] ?? target).trim();
			const slug = getPublishedPosts().get(target.toLocaleLowerCase());
			output.push(
				slug
					? { type: 'link', url: `/posts/${slug}/`, children: [{ type: 'text', value: alias }] }
					: { type: 'text', value: alias },
			);
			cursor = match.index + match[0].length;
		}
		if (cursor < node.value.length) output.push({ type: 'text', value: node.value.slice(cursor) });

		return output.flatMap((part) => {
			if (part.type !== 'text') return [part];
			const marked = [];
			let last = 0;
			for (const match of part.value.matchAll(highlight)) {
				if (match.index > last) marked.push({ type: 'text', value: part.value.slice(last, match.index) });
				marked.push({
					type: 'emphasis',
					data: { hName: 'mark' },
					children: [{ type: 'text', value: match[1] }],
				});
				last = match.index + match[0].length;
			}
			if (last < part.value.length) marked.push({ type: 'text', value: part.value.slice(last) });
			return marked.length ? marked : [part];
		});
	});
}

function getImageUrl(file, basename) {
	const filePath = file.path ?? file.history?.[0];
	if (!filePath) throw new Error('Unable to resolve the source path for an Obsidian image embed.');
	const absolutePath =
		filePath instanceof URL
			? fileURLToPath(filePath)
			: String(filePath).startsWith('file:')
				? fileURLToPath(filePath)
				: path.resolve(String(filePath));
	const relativeNotePath = path.relative(postsRoot, absolutePath).split(path.sep).join('/');
	const relativeDirectory = path.posix.dirname(relativeNotePath);
	return path.posix.relative(relativeDirectory, `_attachments/${basename}`);
}

function makeFigure(file, reference) {
	const [filename, ...options] = reference.split('|').map((part) => part.trim());
	const basename = path.posix.basename(filename.replaceAll('\\', '/'));
	const url = getImageUrl(file, basename);
	const centered = options.includes('center');
	const percent = options.find((option) => /^\d+(?:\.\d+)?%$/.test(option));
	const pixels = options.find((option) => /^\d+(?:\.\d+)?$/.test(option));
	const caption = options.filter((option) => option && option !== 'center' && option !== percent && option !== pixels).join(' | ');
	const style = percent
		? `width:${percent};max-width:100%;height:auto`
		: pixels
			? `width:${pixels}px;max-width:100%;height:auto`
			: 'max-width:100%;height:auto';
	const image = {
		type: 'image',
		url,
		alt: caption,
		data: {
			hProperties: {
				alt: caption,
				format: 'webp',
				style,
				...(pixels ? { width: Number(pixels) } : {}),
			},
		},
	};
	const children = [image];
	if (caption) {
		children.push({
			type: 'paragraph',
			data: { hName: 'figcaption' },
			children: [{ type: 'text', value: caption }],
		});
	}

	return {
		type: 'paragraph',
		data: {
			hName: 'figure',
			hProperties: { className: ['gb-figure', ...(centered ? ['is-center'] : [])] },
		},
		children,
	};
}

function transformEmbeds(parent, file) {
	if (!Array.isArray(parent.children)) return;

	const expanded = [];
	for (const child of parent.children) {
		if (child.type !== 'paragraph') {
			transformEmbeds(child, file);
			expanded.push(child);
			continue;
		}

		const chunks = [];
		for (const inline of child.children ?? []) {
			if (inline.type !== 'text') {
				chunks.push(inline);
				continue;
			}

			let cursor = 0;
			for (const match of inline.value.matchAll(/!\[\[([^\]]+)\]\]/g)) {
				if (match.index > cursor) chunks.push({ type: 'text', value: inline.value.slice(cursor, match.index) });
				chunks.push({ type: 'embed', reference: match[1] });
				cursor = match.index + match[0].length;
			}
			if (cursor < inline.value.length) chunks.push({ type: 'text', value: inline.value.slice(cursor) });
		}

		if (!chunks.some((chunk) => chunk.type === 'embed')) {
			expanded.push(child);
			continue;
		}

		let paragraphChildren = [];
		const flushParagraph = () => {
			if (paragraphChildren.some((chunk) => chunk.type !== 'text' || chunk.value.trim())) {
				expanded.push({ ...child, children: paragraphChildren });
			}
			paragraphChildren = [];
		};
		for (const chunk of chunks) {
			if (chunk.type === 'embed') {
				flushParagraph();
				expanded.push(makeFigure(file, chunk.reference));
			} else {
				paragraphChildren.push(chunk);
			}
		}
		flushParagraph();
	}
	parent.children = expanded;
}

function resolveCalloutType(type) {
	const name = String(type || 'note').toLowerCase();
	const resolved = calloutAliases[name] ?? name;
	return calloutIcons[resolved] ? resolved : 'note';
}

function escapeHtml(value) {
	return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
}

function iconMarkup(name) {
	const svg = readFileSync(path.resolve(process.cwd(), 'node_modules/lucide-static/icons', `${name}.svg`), 'utf8')
		.replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"')
		.trim();
	return `<i class="gb-icon icon-${name}" aria-hidden="true">${svg}</i>`;
}

function transformCallouts(parent) {
	if (!Array.isArray(parent.children)) return;

	for (const child of parent.children) {
		transformCallouts(child);
		if (child.type !== 'blockquote' || child.children?.[0]?.type !== 'paragraph') continue;

		const firstParagraph = child.children[0];
		const directive = firstParagraph.children?.map((node) => node.value ?? '').join('').trim() ?? '';
		const [directiveLine, ...bodyLines] = directive.split(/\r?\n/);
		const match = /^\[!([^\]]+)\]([+-]?)(?:\s*(.*))?$/.exec(directiveLine);
		if (!match) continue;

		const [, rawType, fold, explicitTitle = ''] = match;
		const type = resolveCalloutType(rawType);
		const title = explicitTitle.trim() || rawType[0].toLocaleUpperCase() + rawType.slice(1);
		const isFoldable = Boolean(fold);
		const summary = isFoldable ? 'summary' : 'div';
		const foldIcon = isFoldable
			? '<i class="gb-icon icon-chevron-down gb-fold" aria-hidden="true">' +
				readFileSync(path.resolve(process.cwd(), 'node_modules/lucide-static/icons/chevron-down.svg'), 'utf8') +
				'</i>'
			: '';
		const titleMarkup = `<${summary} class="gb-callout-title">${iconMarkup(calloutIcons[type])}<span>${escapeHtml(title)}</span>${foldIcon}</${summary}>`;
		const bodyChildren = child.children.slice(1);
		const firstParagraphBody = bodyLines.join('\n').trim();
		if (firstParagraphBody) {
			bodyChildren.unshift({
				type: 'paragraph',
				children: [{ type: 'text', value: firstParagraphBody }],
			});
		}
		child.type = 'blockquote';
		child.data = {
			...child.data,
			hName: isFoldable ? 'details' : 'div',
			hProperties: {
				className: ['gb-callout', ...(isFoldable ? ['is-foldable'] : [])],
				dataType: type,
				dataCallout: rawType.toLowerCase(),
				...(fold === '+' ? { open: true } : {}),
			},
		};
		child.children = [{ type: 'html', value: titleMarkup }];
		if (bodyChildren.length) {
			child.children.push({
				type: 'paragraph',
				data: { hName: 'div', hProperties: { className: ['gb-callout-body'] } },
				children: bodyChildren,
			});
		}
	}
}

function isEmptyNode(node) {
	if (node.type === 'image') return false;
	if (node.type === 'break') return true;
	if (typeof node.value === 'string') {
		if (node.type !== 'html') return !node.value.trim();
		const html = node.value.replace(/<!--[\s\S]*?-->/g, '').replace(/<br\s*\/?>/gi, '').trim();
		return !html || /^<([a-z][\w:-]*)\b[^>]*>\s*<\/\1\s*>$/i.test(html);
	}
	if (Array.isArray(node.children)) return node.children.every(isEmptyNode);
	return false;
}

function removeEmptyParagraphs(parent) {
	if (!Array.isArray(parent.children)) return;
	parent.children = parent.children.filter(
		(child) => !(child.type === 'paragraph' && (child.children ?? []).every(isEmptyNode)),
	);
	for (const child of parent.children) removeEmptyParagraphs(child);
}

export default function remarkObsidian() {
	return (tree, file) => {
		stripComments(tree);
		removeFirstH1(tree);
		normalizeCodeLanguages(tree);
		replaceInlineSyntax(tree);
		transformEmbeds(tree, file);
		transformCallouts(tree);
		removeEmptyParagraphs(tree);
	};
}
