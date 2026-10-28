import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const plainLanguages = new Set(['plaintext', 'text', 'txt', 'plain']);
const excludedLanguages = new Set(['abc', 'mermaid']);

function readIcon(path) {
	const source = readFileSync(require.resolve(`remixicon/icons/${path}.svg`), 'utf8');
	const attribute = (name) => source.match(new RegExp(`\\b${name}="([^"]+)"`))?.[1];
	const paths = [...source.matchAll(/<path\b[^>]*\bd="([^"]+)"/g)].map((match) => match[1]);
	const viewBox = attribute('viewBox');
	const fill = attribute('fill');
	const xmlns = attribute('xmlns');

	if (!viewBox || !fill || !xmlns || !paths.length) {
		throw new Error(`Unable to read Remix Icon SVG: ${path}`);
	}

	return { viewBox, fill, xmlns, paths };
}

const copyIcon = readIcon('Document/file-copy-line');
const checkIcon = readIcon('System/check-line');

function iconNode(icon, className) {
	return {
		type: 'element',
		tagName: 'svg',
		properties: {
			className: [className],
			viewBox: icon.viewBox,
			fill: icon.fill,
			xmlns: icon.xmlns,
			ariaHidden: 'true',
			focusable: 'false',
		},
		children: icon.paths.map((d) => ({
			type: 'element',
			tagName: 'path',
			properties: { d },
			children: [],
		})),
	};
}

function hasClass(node, className) {
	const classes = node.properties?.className ?? node.properties?.class;
	return Array.isArray(classes)
		? classes.includes(className)
		: typeof classes === 'string' && classes.split(/\s+/).includes(className);
}

function languageOf(pre, code) {
	const classNames = Array.isArray(code.properties?.className)
		? code.properties.className
		: typeof code.properties?.className === 'string'
			? [code.properties.className]
			: [];
	const languageClass = classNames.find((className) => className.startsWith('language-'));
	const language = languageClass?.slice('language-'.length)
		|| pre.properties?.dataLanguage
		|| pre.properties?.['data-language'];

	return typeof language === 'string' ? language : '';
}

function makeCopyButton() {
	return {
		type: 'element',
		tagName: 'button',
		properties: {
			type: 'button',
			className: ['gb-code-copy'],
			ariaLabel: 'Copy code',
			title: 'Copy',
		},
		children: [
			iconNode(copyIcon, 'ri-file-copy-line'),
			iconNode(checkIcon, 'ri-check-line'),
		],
	};
}

export default function rehypeCodeBlock() {
	return (tree) => {
		function visit(parent) {
			if (!Array.isArray(parent.children)) return;

			for (let index = 0; index < parent.children.length; index += 1) {
				const node = parent.children[index];
				if (node.type === 'element' && node.tagName === 'pre' && hasClass(node, 'astro-code')) {
					const code = node.children?.find((child) => child.type === 'element' && child.tagName === 'code');
					if (!code) continue;

					const language = languageOf(node, code);
					if (excludedLanguages.has(language.toLowerCase())) continue;

					const children = [];
					if (language && !plainLanguages.has(language.toLowerCase())) {
						children.push({
							type: 'element',
							tagName: 'span',
							properties: { className: ['gb-code-lang'] },
							children: [{ type: 'text', value: language }],
						});
					}
					children.push(makeCopyButton(), node);
					parent.children[index] = {
						type: 'element',
						tagName: 'div',
						properties: { className: ['gb-code'] },
						children,
					};
					continue;
				}

				visit(node);
			}
		}

		visit(tree);
	};
}
