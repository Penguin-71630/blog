import { instance } from '@viz-js/viz';

let vizPromise;

function collectGraphvizNodes(parent, nodes = []) {
	if (!Array.isArray(parent.children)) return nodes;

	parent.children.forEach((child, index) => {
		if (child.type === 'code' && ['dot', 'graphviz'].includes(child.lang?.toLowerCase())) {
			nodes.push({ parent, index, node: child });
		} else {
			collectGraphvizNodes(child, nodes);
		}
	});

	return nodes;
}

function cleanSvg(svg) {
	return svg
		.replace(/^\s*<\?xml[\s\S]*?\?>\s*/i, '')
		.replace(/<!DOCTYPE[\s\S]*?>\s*/i, '')
		.replace(/<!--[\s\S]*?-->\s*/g, '');
}

export default function remarkGraphviz() {
	return async (tree, file) => {
		const nodes = collectGraphvizNodes(tree);
		if (nodes.length === 0) return;

		vizPromise ??= instance();
		const viz = await vizPromise;

		for (const { parent, index, node } of nodes) {
			try {
				const svg = viz.renderString(node.value, { format: 'svg', engine: 'dot' });
				parent.children[index] = {
					type: 'html',
					value: `<figure class="gb-graphviz">${cleanSvg(svg)}</figure>`,
				};
			} catch (error) {
				const filePath = file?.path ? ` in ${file.path}` : '';
				const message = String(error?.message ?? error).split(/\r?\n/, 1)[0];
				console.warn(`[remark-graphviz] Failed to render ${node.lang}${filePath}: ${message}`);
			}
		}
	};
}
