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

function isAsciiPunctuation(character) {
	if (!character) return false;
	const code = character.charCodeAt(0);
	return (code >= 33 && code <= 47) || (code >= 58 && code <= 64) || (code >= 91 && code <= 96) || (code >= 123 && code <= 126);
}

function pointAt(source, offset, lineStarts) {
	let low = 0;
	let high = lineStarts.length;
	while (low + 1 < high) {
		const middle = (low + high) >> 1;
		if (lineStarts[middle] <= offset) low = middle;
		else high = middle;
	}
	return { offset, line: low + 1, column: offset - lineStarts[low] + 1 };
}

function sourceMap(node, file) {
	const start = node.position?.start?.offset;
	const end = node.position?.end?.offset;
	if (!Number.isInteger(start) || !Number.isInteger(end)) return null;
	const raw = String(file.value).slice(start, end);
	const starts = [];
	const ends = [];
	let rawIndex = 0;
	let valueIndex = 0;

	const skipBlockquotePrefix = () => {
		let cursor = rawIndex;
		while (cursor < raw.length) {
			let marker = cursor;
			while (raw[marker] === ' ' || raw[marker] === '\t') marker += 1;
			if (raw[marker] !== '>') break;
			cursor = marker;
			while (raw[cursor] === '>') {
				cursor += 1;
				if (raw[cursor] === ' ' || raw[cursor] === '\t') cursor += 1;
			}
		}
		rawIndex = cursor;
	};

	while (rawIndex < raw.length && valueIndex < node.value.length) {
		if (raw[rawIndex] === '\r' && raw[rawIndex + 1] === '\n' && node.value[valueIndex] === '\n') {
			starts[valueIndex] = start + rawIndex;
			ends[valueIndex] = start + rawIndex + 2;
			rawIndex += 2;
			valueIndex += 1;
			skipBlockquotePrefix();
		} else if (
			raw[rawIndex] === '\\' &&
			isAsciiPunctuation(raw[rawIndex + 1]) &&
			raw[rawIndex + 1] === node.value[valueIndex]
		) {
			starts[valueIndex] = start + rawIndex;
			ends[valueIndex] = start + rawIndex + 2;
			rawIndex += 2;
			valueIndex += 1;
		} else if (raw[rawIndex] === node.value[valueIndex]) {
			starts[valueIndex] = start + rawIndex;
			ends[valueIndex] = start + rawIndex + 1;
			rawIndex += 1;
			valueIndex += 1;
			if (node.value[valueIndex - 1] === '\n') skipBlockquotePrefix();
		} else {
			return null;
		}
	}
	return rawIndex === raw.length && valueIndex === node.value.length ? { starts, ends } : null;
}

function sliceText(node, start, end, file, lineStarts) {
	if (start >= end) return null;
	const sliced = { ...node, value: node.value.slice(start, end) };
	const offsets = sourceMap(node, file);
	if (!offsets) {
		sliced.position = undefined;
		return sliced;
	}
	sliced.position = {
		start: pointAt(String(file.value), offsets.starts[start], lineStarts),
		end: pointAt(String(file.value), offsets.ends[end - 1], lineStarts),
	};
	return sliced;
}

function replaceInlineSyntax(tree, file) {
	const wiki = /(?<!!)\[\[([^\]|]+?)(?:\|([^\]]+))?\]\]/g;
	const highlight = /==(.+?)==/g;
	const source = String(file.value);
	const lineStarts = [0];
	for (let index = 0; index < source.length; index += 1) {
		if (source[index] === '\n') lineStarts.push(index + 1);
	}

	mapNodes(tree, (node) => {
		wiki.lastIndex = 0;
		highlight.lastIndex = 0;
		const wikiMatches = [...node.value.matchAll(wiki)];
		if (!wikiMatches.length && !/==(.+?)==/.test(node.value)) return [node];

		const output = [];
		let cursor = 0;
		for (const match of wikiMatches) {
			if (match.index > cursor) output.push(sliceText(node, cursor, match.index, file, lineStarts));
			const target = match[1].trim().replace(/\.md$/i, '');
			const aliasSource = match[2] ?? match[1];
			const alias = aliasSource.trim().replace(/\.md$/i, '');
			const slug = getPublishedPosts().get(target.toLocaleLowerCase());
			const aliasStart =
				match.index +
				(match[2] == null ? match[0].indexOf(aliasSource) : match[0].lastIndexOf(aliasSource)) +
				aliasSource.length -
				aliasSource.trimStart().length;
			const aliasNode = sliceText(node, aliasStart, aliasStart + alias.length, file, lineStarts);
			const aliasText = aliasNode?.value === alias ? aliasNode : { type: 'text', value: alias };
			output.push(
				slug
					? { type: 'link', url: `/posts/${slug}/`, children: [aliasText] }
					: aliasText,
			);
			cursor = match.index + match[0].length;
		}
		if (cursor < node.value.length) output.push(sliceText(node, cursor, node.value.length, file, lineStarts));

		return output.flatMap((part) => {
			if (part.type !== 'text') return [part];
			highlight.lastIndex = 0;
			const matches = [...part.value.matchAll(highlight)];
			if (!matches.length) return [part];

			const marked = [];
			let last = 0;
			for (const match of matches) {
				if (match.index > last) marked.push(sliceText(part, last, match.index, file, lineStarts));
				const valueStart = match.index + 2;
				marked.push({
					type: 'emphasis',
					data: { hName: 'mark' },
					children: [sliceText(part, valueStart, valueStart + match[1].length, file, lineStarts)],
				});
				last = match.index + match[0].length;
			}
			if (last < part.value.length) marked.push(sliceText(part, last, part.value.length, file, lineStarts));
			return marked;
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
	const alignment = options.find((option) => option === 'left' || option === 'right');
	const percent = options.find((option) => /^\d+(?:\.\d+)?%$/.test(option));
	const pixels = options.find((option) => /^\d+(?:\.\d+)?$/.test(option));
	const caption = options
		.filter((option) => option && !['left', 'right', 'center', percent, pixels].includes(option))
		.join(' | ');
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
			hProperties: { className: ['gb-figure', ...(alignment ? [`is-${alignment}`] : [])] },
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

function iconMarkup(name) {
	const svg = readFileSync(path.resolve(process.cwd(), 'node_modules/lucide-static/icons', `${name}.svg`), 'utf8')
		.replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"')
		.trim();
	return `<i class="gb-icon icon-${name}" aria-hidden="true">${svg}</i>`;
}

function splitCalloutDirective(firstParagraph, file, lineStarts) {
	const directiveParts = [];
	const directivePositions = [];
	const bodyChildren = [];
	const children = firstParagraph.children ?? [];
	const source = String(file.value);

	const appendDirective = (node, start, end) => {
		directiveParts.push(node.value.slice(start, end));
		const offsets = sourceMap(node, file);
		for (let offset = start; offset < end; offset += 1) {
			directivePositions.push(
				offsets
					? { start: offsets.starts[offset], end: offsets.ends[offset] }
					: null,
			);
		}
	};

	for (const [index, node] of children.entries()) {
		if (node.type === 'break') {
			bodyChildren.push(...children.slice(index + 1));
			return { directiveLine: directiveParts.join('').trim(), directivePositions, bodyChildren };
		}
		if (node.type !== 'text') return null;

		const lineBreak = /\r?\n/.exec(node.value);
		if (!lineBreak) {
			appendDirective(node, 0, node.value.length);
			continue;
		}

		appendDirective(node, 0, lineBreak.index);
		const remainderStart = lineBreak.index + lineBreak[0].length;
		const remainder = node.value.slice(remainderStart);
		if (remainder) {
			const offsets = sourceMap(node, file);
			const sourceStart = offsets?.starts[remainderStart];
			const position =
				Number.isInteger(sourceStart) && node.position?.end
					? { start: pointAt(source, sourceStart, lineStarts), end: node.position.end }
					: undefined;
			bodyChildren.push({ ...node, value: remainder, position });
		}
		bodyChildren.push(...children.slice(index + 1));
		return { directiveLine: directiveParts.join('').trim(), directivePositions, bodyChildren };
	}

	return { directiveLine: directiveParts.join('').trim(), directivePositions, bodyChildren };
}

function transformCallouts(parent, file, lineStarts) {
	if (!Array.isArray(parent.children)) return;

	for (const child of parent.children) {
		transformCallouts(child, file, lineStarts);
		if (child.type !== 'blockquote' || child.children?.[0]?.type !== 'paragraph') continue;

		const firstParagraph = child.children[0];
		const split = splitCalloutDirective(firstParagraph, file, lineStarts);
		if (!split) continue;
		const { directiveLine, bodyChildren: firstParagraphBody } = split;
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
		const titleStart =
			explicitTitle.trim() && directiveLine.includes(']')
				? directiveLine.indexOf(']') + 1 + directiveLine.slice(directiveLine.indexOf(']') + 1).search(/\S/)
				: -1;
		const titleFirst = titleStart >= 0 ? split.directivePositions[titleStart] : null;
		const titleLast =
			titleStart >= 0
				? split.directivePositions[titleStart + title.length - 1]
				: null;
		const titlePosition =
			titleFirst && titleLast
				? {
						start: pointAt(String(file.value), titleFirst.start, lineStarts),
						end: pointAt(String(file.value), titleLast.end, lineStarts),
					}
				: undefined;
		const titleChildren = [
			{ type: 'html', value: iconMarkup(calloutIcons[type]) },
			{ type: 'text', value: title, position: titlePosition },
		];
		if (foldIcon) titleChildren.push({ type: 'html', value: foldIcon });
		const bodyChildren = child.children.slice(1);
		if (firstParagraphBody.some((node) => !isEmptyNode(node))) {
			bodyChildren.unshift({ ...firstParagraph, children: firstParagraphBody });
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
		child.children = [
			{
				type: 'paragraph',
				data: { hName: summary, hProperties: { className: ['gb-callout-title'] } },
				children: titleChildren,
			},
		];
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
		const source = String(file.value);
		const lineStarts = [0];
		for (let index = 0; index < source.length; index += 1) {
			if (source[index] === '\n') lineStarts.push(index + 1);
		}
		stripComments(tree);
		removeFirstH1(tree);
		normalizeCodeLanguages(tree);
		replaceInlineSyntax(tree, file);
		transformEmbeds(tree, file);
		transformCallouts(tree, file, lineStarts);
		removeEmptyParagraphs(tree);
	};
}
