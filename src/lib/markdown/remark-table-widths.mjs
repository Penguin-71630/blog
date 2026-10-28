const comment = /^\s*<!--\s*table:\s*widths\s*=\s*([^>]+?)\s*-->\s*$/i;
const width = /^(?:auto|(?:[1-9]\d*(?:\.\d+)?|\d*\.\d+)(?:em|rem|px))$/;

export default function remarkTableWidths() {
	return (tree, file) => {
		const walk = (parent) => {
			if (!Array.isArray(parent.children)) return;
			const next = [];
			for (let index = 0; index < parent.children.length; index += 1) {
				const node = parent.children[index];
				if (node.type !== 'html') {
					next.push(node);
					continue;
				}
				const match = comment.exec(node.value);
				if (!match) {
					next.push(node);
					continue;
				}
				let tableIndex = index + 1;
				while (tableIndex < parent.children.length && parent.children[tableIndex].type === 'paragraph' && !parent.children[tableIndex].children?.some((child) => child.value?.trim())) tableIndex += 1;
				const table = parent.children[tableIndex];
				if (table?.type !== 'table') {
					next.push(node);
					continue;
				}
				const values = match[1].split(',').map((value) => value.trim());
				const columns = table.children?.[0]?.children?.length ?? 0;
				const valid = values.length === columns && values.every((value) => width.test(value));
				if (!valid) {
					console.warn(`${file.path ?? 'Markdown'}:${node.position?.start?.line ?? '?'} invalid table widths comment; using auto layout`);
				} else {
					table.data = { ...table.data, hProperties: { ...table.data?.hProperties, dataTableWidths: values.join(',') } };
				}
				index = tableIndex - 1;
			}
			parent.children = next;
			parent.children.forEach(walk);
		};
		walk(tree);
	};
}
