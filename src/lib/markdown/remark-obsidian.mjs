import { existsSync, readFileSync, readdirSync } from 'node:fs';
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
const markerIcons = {
	i: ['ri-information-line', 'gb-marker-i'],
	k: ['ri-key-2-line', 'gb-marker-k'],
	p: ['ri-thumb-up-line', 'gb-marker-p'],
	c: ['ri-thumb-down-line', 'gb-marker-c'],
};
const linkPreviewFile = path.resolve(process.cwd(), 'src/data/link-previews.json');
const linkPreviews = existsSync(linkPreviewFile) ? JSON.parse(readFileSync(linkPreviewFile, 'utf8')) : {};

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
		const wikiMatches = [...node.value.matchAll(wiki)];
		if (!wikiMatches.length) return [node];

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
		return output;
	});
}

function visibleText(node) {
	if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'inlineMath') return node.value ?? '';
	if (Array.isArray(node.children)) return node.children.map(visibleText).join('');
	return '';
}

function visibleCharacter(children, index, offset, direction) {
	if (direction === 'after') {
		const current = children[index]?.value?.slice(offset);
		if (current) return current[0];
		for (let next = index + 1; next < children.length; next += 1) {
			const text = visibleText(children[next]);
			if (text) return text[0];
		}
		return '';
	}

	const current = children[index]?.value?.slice(0, offset);
	if (current) return current.at(-1);
	for (let previous = index - 1; previous >= 0; previous -= 1) {
		const text = visibleText(children[previous]);
		if (text) return text.at(-1);
	}
	return '';
}

function findHighlightMarker(children, fromIndex, fromOffset, direction, open) {
	for (let index = fromIndex; index < children.length; index += 1) {
		const node = children[index];
		if (node.type !== 'text') continue;
		let offset = index === fromIndex ? fromOffset : 0;
		let position = node.value.indexOf('==', offset);
		while (position >= 0) {
			if (open) {
				const next = visibleCharacter(children, index, position + 2, 'after');
				if (next && !/\s/.test(next)) return { index, position };
			} else {
				const previous = visibleCharacter(children, index, position, 'before');
				if (previous && !/\s/.test(previous)) return { index, position };
			}
			offset = position + 2;
			position = node.value.indexOf('==', offset);
		}
	}
	return null;
}

function transformHighlights(parent, file, lineStarts) {
	if (!Array.isArray(parent.children)) return;
	for (const child of parent.children) transformHighlights(child, file, lineStarts);

	let cursorIndex = 0;
	let cursorOffset = 0;
	while (cursorIndex < parent.children.length) {
		const open = findHighlightMarker(parent.children, cursorIndex, cursorOffset, 'after', true);
		if (!open) break;
		const close = findHighlightMarker(parent.children, open.index, open.position + 2, 'before', false);
		if (!close) {
			cursorIndex = open.index;
			cursorOffset = open.position + 2;
			continue;
		}
		if (close.index === open.index && close.position < open.position + 3) {
			cursorIndex = open.index;
			cursorOffset = close.position + 2;
			continue;
		}

		const children = parent.children;
		const startNode = children[open.index];
		const endNode = children[close.index];
		const before = sliceText(startNode, 0, open.position, file, lineStarts);
		const after = sliceText(endNode, close.position + 2, endNode.value.length, file, lineStarts);
		const markedChildren =
			open.index === close.index
				? [sliceText(startNode, open.position + 2, close.position, file, lineStarts)]
				: [
						sliceText(startNode, open.position + 2, startNode.value.length, file, lineStarts),
						...children.slice(open.index + 1, close.index),
						sliceText(endNode, 0, close.position, file, lineStarts),
					];
		if (!markedChildren.some((node) => node && visibleText(node).trim())) {
			cursorIndex = close.index;
			cursorOffset = close.position + 2;
			continue;
		}
		const replacement = [
			...(before ? [before] : []),
			{
				type: 'emphasis',
				data: { hName: 'mark' },
				children: markedChildren.filter(Boolean),
			},
			...(after ? [after] : []),
		];
		children.splice(open.index, close.index - open.index + 1, ...replacement);
		cursorIndex = open.index + replacement.length - (after ? 1 : 0);
		cursorOffset = 0;
	}
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
	const relativeNotePath = path.relative(postsRoot, absolutePath);
	if (
		relativeNotePath === '' ||
		relativeNotePath === '..' ||
		relativeNotePath.startsWith(`..${path.sep}`) ||
		path.isAbsolute(relativeNotePath)
	) {
		throw new Error(`Unable to resolve the content root for ${absolutePath}.`);
	}
	const normalizedNotePath = relativeNotePath.split(path.sep).join('/');
	const relativeDirectory = path.posix.dirname(normalizedNotePath);
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

function makeMarkdownFigure(image) {
	const properties = image.data?.hProperties ?? {};
	image.data = {
		...image.data,
		hProperties: {
			...properties,
			style: [properties.style, 'max-width:100%;height:auto'].filter(Boolean).join(';'),
		},
	};
	const children = [image];
	if (image.title) {
		children.push({
			type: 'paragraph',
			data: { hName: 'figcaption' },
			children: [{ type: 'text', value: image.title }],
		});
	}
	return {
		type: 'paragraph',
		data: { hName: 'figure', hProperties: { className: ['gb-figure'] } },
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

function transformStandaloneImages(parent) {
	if (!Array.isArray(parent.children)) return;

	const expanded = [];
	for (const child of parent.children) {
		if (child.type === 'paragraph' && child.data?.hName !== 'figure') {
			const meaningful = (child.children ?? []).filter(
				(node) => !(node.type === 'break' || (node.type === 'text' && !node.value.trim())),
			);
			if (meaningful.length && meaningful.every((node) => node.type === 'image')) {
				expanded.push(...meaningful.map(makeMarkdownFigure));
				continue;
			}
		}
		transformStandaloneImages(child);
		expanded.push(child);
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

function remixIconMarkup(name, className = '') {
	const fileName = name.replace(/^ri-/, '');
	const iconPath = path.resolve(process.cwd(), 'node_modules/remixicon/icons');
	const directories = ['Business', 'Design', 'Development', 'Device', 'Document', 'Editor', 'Map', 'Media', 'Others', 'System', 'User & Faces', 'Weather'];
	for (const directory of directories) {
		const candidate = path.join(iconPath, directory, `${fileName}.svg`);
		if (existsSync(candidate)) {
			const svg = readFileSync(candidate, 'utf8').replace(/<svg\b/, '<svg aria-hidden="true" focusable="false"').trim();
			return `<i class="gb-icon ${name} ${className}" aria-hidden="true">${svg}</i>`;
		}
	}
	return `<i class="gb-icon ${name} ${className}" aria-hidden="true"></i>`;
}

function htmlEscape(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

function textContent(node) {
	if (node.type === 'text') return node.value;
	if (Array.isArray(node.children)) return node.children.map(textContent).join('');
	return '';
}

function bodyChildren(node) {
	return node.children?.find(
		(child) => child.data?.hProperties?.className?.includes?.('gb-callout-body'),
	)?.children ?? node.children?.slice(1) ?? [];
}

function panelData(node) {
	if (node.data?.hProperties?.dataCallout !== 'panel') return null;
	const title = textContent(node.children?.[0] ?? '').trim();
	return { title, children: bodyChildren(node) };
}

function panelDirective(node) {
	if (node.type !== 'paragraph' || node.children?.[0]?.type !== 'text') return null;
	const match = /^\s*\[!panel\]\s*(.*)$/i.exec(node.children[0].value);
	return match ? { title: match[1].trim() } : null;
}

function splitPanelBody(panel) {
	const panels = [{ title: panel.title, children: [] }];
	for (const child of panel.children) {
		const directive = panelDirective(child);
		if (directive) panels.push({ ...directive, children: [] });
		else panels.at(-1).children.push(child);
	}
	return panels;
}

function collectPanels(children) {
	const panels = [];
	let current = null;
	const finish = () => {
		if (current) panels.push(current);
		current = null;
	};

	for (const child of children) {
		const panel = panelData(child);
		const directive = panelDirective(child);
		if (panel) {
			finish();
			panels.push(...splitPanelBody(panel));
		} else if (directive) {
			finish();
			current = { ...directive, children: [] };
		} else if (current) {
			current.children.push(child);
		}
	}
	finish();
	return panels;
}

function makePanelNode(panel, className, index) {
	return {
		type: 'paragraph',
		data: {
			hName: 'div',
			hProperties: {
				className: [className],
				'data-panel-index': String(index),
				'data-panel-title': panel.title,
				'aria-hidden': index === 0 ? 'false' : 'true',
			},
		},
		children: panel.children,
	};
}

function transformSpecialCallouts(parent) {
	if (!Array.isArray(parent.children)) return;

	for (const child of parent.children) {
		transformSpecialCallouts(child);
		const rawCallout = child.data?.hProperties?.dataCallout;
		if (!rawCallout) continue;
		const [name, modifier] = rawCallout.toLowerCase().split('|');
		if (name === 'center') {
			child.data = {
				...child.data,
				hName: 'div',
				hProperties: { className: ['gb-center'] },
			};
			child.children = bodyChildren(child);
			continue;
		}

		if (name === 'link') {
			const url = textContent({ children: bodyChildren(child) }).trim().match(/https?:\/\/\S+/)?.[0];
			if (!url) continue;
			const domain = (() => {
				try {
					return new URL(url).hostname.replace(/^www\./, '');
				} catch {
					return url;
				}
			})();
			const preview = linkPreviews[url] ?? {};
			const image = preview.image ? `<img class="gb-linkcard-img" src="${htmlEscape(preview.image)}" alt="" loading="lazy">` : '';
			const title = preview.title || domain;
			const description = preview.description || url;
			child.type = 'paragraph';
			child.data = {
				hName: 'a',
				hProperties: {
					className: ['gb-linkcard'],
					href: url,
					target: '_blank',
					rel: 'noopener noreferrer',
				},
			};
			child.children = [{
				type: 'html',
				value: `${image}<span class="gb-linkcard-body"><span class="gb-linkcard-title">${htmlEscape(title)}</span><span class="gb-linkcard-desc">${htmlEscape(description)}</span><span class="gb-linkcard-domain">${htmlEscape(domain)}</span></span>`,
			}];
			continue;
		}

		if (!['tabs', 'slider'].includes(name)) continue;
		const panels = collectPanels(bodyChildren(child));
		if (!panels.length) continue;

		if (name === 'tabs') {
			const buttons = panels
				.map((panel, index) => `<button class="gb-tab" type="button" role="tab" data-tab-index="${index}" aria-selected="${index === 0 ? 'true' : 'false'}">${htmlEscape(panel.title)}</button>`)
				.join('');
			child.data = {
				hName: 'div',
				hProperties: { className: ['gb-tabs'], 'data-tabs': '' },
			};
			child.children = [
				{ type: 'html', value: `<div class="gb-tablist" role="tablist">${buttons}</div>` },
				{
					type: 'paragraph',
					data: { hName: 'div', hProperties: { className: ['gb-tabpanels'] } },
					children: panels.map((panel, index) => makePanelNode(panel, 'gb-tabpanel', index)),
				},
			];
		} else {
			const [first] = panels;
			child.data = {
				hName: 'div',
				hProperties: {
					className: ['gb-stepper', ...(modifier === 'fade' ? ['has-fade'] : [])],
					'data-slider': '',
					tabIndex: 0,
					role: 'group',
					'aria-label': `${first.title || 'Step'} (1 / ${panels.length})`,
				},
			};
			child.children = [
				{
					type: 'html',
					value: `<div class="gb-stepper-bar"><span class="gb-stepper-title">${htmlEscape(first.title)}</span><span class="gb-stepper-ctrl"><button class="gb-step-btn" type="button" data-step-prev aria-label="上一步">‹</button><span data-step-counter>1 / ${panels.length}</span><button class="gb-step-btn" type="button" data-step-next aria-label="下一步">›</button></span></div>`,
				},
				{
					type: 'paragraph',
					data: { hName: 'div', hProperties: { className: ['gb-stepper-stage'] } },
					children: panels.map((panel, index) => makePanelNode(panel, 'gb-stepper-pane', index)),
				},
			];
		}
	}
}

function transformCarousels(parent) {
	if (!Array.isArray(parent.children)) return;
	for (const child of parent.children) {
		transformCarousels(child);
		const rawCallout = child.data?.hProperties?.dataCallout;
		if (!rawCallout || !rawCallout.toLowerCase().startsWith('carousel')) continue;
		const images = [];
		for (const node of bodyChildren(child)) {
			const visit = (candidate) => {
				if (candidate.type === 'image') images.push(candidate);
				for (const nested of candidate.children ?? []) visit(nested);
			};
			visit(node);
		}
		if (!images.length) continue;
		images.forEach((image, index) => {
			image.data = {
				...image.data,
				hProperties: {
					...image.data?.hProperties,
					className: ['gb-carousel-image'],
					'data-carousel-slide': '',
					'aria-hidden': index === 0 ? 'false' : 'true',
				},
			};
		});
		child.data = {
			hName: 'div',
			hProperties: {
				className: ['gb-carousel', ...(rawCallout.toLowerCase().endsWith('|fade') ? ['has-fade'] : [])],
				'data-carousel': '',
				role: 'group',
				tabIndex: 0,
				'aria-label': '圖片輪播',
				style: '--carousel-ratio:0.75',
			},
		};
		child.children = [
			{
				type: 'paragraph',
				data: { hName: 'div', hProperties: { className: ['gb-carousel-frame'] } },
				children: [
					...images,
					{ type: 'html', value: '<button class="gb-carousel-nav is-prev" type="button" data-carousel-prev aria-label="上一張">‹</button>' },
					{ type: 'html', value: '<button class="gb-carousel-nav is-next" type="button" data-carousel-next aria-label="下一張">›</button>' },
				],
			},
			{ type: 'html', value: `<span class="gb-carousel-counter" data-carousel-counter aria-live="polite">1 / ${images.length}</span>` },
		];
	}
}

function transformMarkerLists(parent) {
	if (!Array.isArray(parent.children)) return;
	for (const child of parent.children) {
		transformMarkerLists(child);
		if (child.type !== 'list') continue;
		let hasMarker = false;
		for (const item of child.children ?? []) {
			const first = item.children?.find((node) => node.type === 'paragraph');
			const text = first?.children?.[0];
			if (text?.type !== 'text') continue;
			const match = text?.value.match(/^\[([ikpc])\]\s*/);
			if (!match) continue;
			hasMarker = true;
			text.value = text.value.slice(match[0].length);
			first.data = { ...first.data, hName: 'div' };
			first.children.unshift({ type: 'html', value: remixIconMarkup(markerIcons[match[1]][0], markerIcons[match[1]][1]) });
		}
		if (hasMarker) {
			child.data = {
				...child.data,
				hProperties: { ...child.data?.hProperties, className: ['gb-markers'] },
			};
		}
	}
}

function splitCalloutDirective(firstParagraph, file, lineStarts) {
	const children = firstParagraph.children ?? [];
	const firstText = children[0];
	if (firstText?.type !== 'text') return null;
	const directive = /^\s*\[!([^\]]+)\]([+-]?)/.exec(firstText.value);
	if (!directive) return null;

	const titleChildren = [];
	const bodyChildren = [];
	for (const [index, node] of children.entries()) {
		if (node.type === 'break') {
			bodyChildren.push(...children.slice(index + 1));
			break;
		}

		const start = index === 0 ? directive[0].length : 0;
		if (node.type === 'text') {
			const remainder = node.value.slice(start);
			const lineBreak = /\r?\n/.exec(remainder);
			if (lineBreak) {
				const titleEnd = start + lineBreak.index;
				if (titleEnd > start) titleChildren.push(sliceText(node, start, titleEnd, file, lineStarts));
				const bodyStart = titleEnd + lineBreak[0].length;
				if (bodyStart < node.value.length) {
					bodyChildren.push(sliceText(node, bodyStart, node.value.length, file, lineStarts));
				}
				bodyChildren.push(...children.slice(index + 1));
				break;
			}
			if (start < node.value.length) titleChildren.push(sliceText(node, start, node.value.length, file, lineStarts));
			continue;
		}

		titleChildren.push(node);
	}

	while (titleChildren[0]?.type === 'text') {
		const leading = titleChildren[0].value.length - titleChildren[0].value.trimStart().length;
		if (leading === titleChildren[0].value.length) {
			titleChildren.shift();
			continue;
		}
		if (leading) titleChildren[0] = sliceText(titleChildren[0], leading, titleChildren[0].value.length, file, lineStarts);
		break;
	}
	while (titleChildren.at(-1)?.type === 'text') {
		const last = titleChildren.at(-1);
		const end = last.value.trimEnd().length;
		if (!end) {
			titleChildren.pop();
			continue;
		}
		if (end < last.value.length) titleChildren[titleChildren.length - 1] = sliceText(last, 0, end, file, lineStarts);
		break;
	}

	return {
		rawType: directive[1].trim(),
		fold: directive[2],
		titleChildren,
		bodyChildren,
	};
}

function transformCallouts(parent, file, lineStarts) {
	if (!Array.isArray(parent.children)) return;

	for (const child of parent.children) {
		transformCallouts(child, file, lineStarts);
		if (child.type !== 'blockquote' || child.children?.[0]?.type !== 'paragraph') continue;

		const firstParagraph = child.children[0];
		const split = splitCalloutDirective(firstParagraph, file, lineStarts);
		if (!split) continue;
		const { rawType, fold, titleChildren: explicitTitleChildren, bodyChildren: firstParagraphBody } = split;
		const asideType = rawType.toLowerCase();
		if (asideType === 'aside' || asideType === 'reference') {
			const bodyChildren = child.children.slice(1);
			const asideBody = [];
			asideBody.push(...explicitTitleChildren);
			if (explicitTitleChildren.length && firstParagraphBody.some((node) => !isEmptyNode(node))) {
				asideBody.push({ type: 'break' });
			}
			asideBody.push(...firstParagraphBody);
			if (asideBody.some((node) => !isEmptyNode(node))) {
				bodyChildren.unshift({ ...firstParagraph, children: asideBody });
			}
			const label = asideType === 'aside' ? 'Note' : 'Reference';
			const icon = asideType === 'aside' ? 'ri-edit-2-fill' : 'ri-article-fill';
			child.type = 'blockquote';
			child.data = {
				...child.data,
				hName: 'div',
				hProperties: { className: ['gb-aside', `gb-aside-${asideType}`] },
			};
			child.children = [
				{
					type: 'paragraph',
					data: { hName: 'div', hProperties: { className: ['gb-aside-label'] } },
					children: [
						{ type: 'html', value: remixIconMarkup(icon) },
						{ type: 'text', value: `${label} ⟩` },
					],
				},
				{
					type: 'paragraph',
					data: { hName: 'div', hProperties: { className: ['gb-aside-body'] } },
					children: bodyChildren,
				},
			];
			continue;
		}
		const type = resolveCalloutType(rawType);
		const isFoldable = Boolean(fold);
		const summary = isFoldable ? 'summary' : 'div';
		const foldIcon = isFoldable
			? '<i class="gb-icon icon-chevron-down gb-fold" aria-hidden="true">' +
				readFileSync(path.resolve(process.cwd(), 'node_modules/lucide-static/icons/chevron-down.svg'), 'utf8') +
				'</i>'
			: '';
		const titleChildren = [
			{ type: 'html', value: iconMarkup(calloutIcons[type]) },
			...(explicitTitleChildren.length
				? explicitTitleChildren
				: [{ type: 'text', value: rawType[0].toLocaleUpperCase() + rawType.slice(1) }]),
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
		transformHighlights(tree, file, lineStarts);
		transformEmbeds(tree, file);
		transformStandaloneImages(tree);
		transformCallouts(tree, file, lineStarts);
		transformSpecialCallouts(tree);
		transformCarousels(tree);
		transformMarkerLists(tree);
		removeEmptyParagraphs(tree);
	};
}
