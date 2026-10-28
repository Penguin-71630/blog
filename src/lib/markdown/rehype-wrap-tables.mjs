export default function rehypeWrapTables() {
	return (tree) => {
		function wrapTables(parent) {
			if (!Array.isArray(parent.children)) return;

			const children = [];
			for (const child of parent.children) {
				wrapTables(child);
				if (child.type === 'element' && child.tagName === 'table') {
					const rawWidths = child.properties?.dataTableWidths;
					if (rawWidths) {
						const widths = String(rawWidths).split(',');
						child.children.unshift({
							type: 'element',
							tagName: 'colgroup',
							properties: {},
							children: widths.map((value) => ({
								type: 'element',
								tagName: 'col',
								properties: { style: `width:${value}` },
								children: [],
							})),
						});
						delete child.properties.dataTableWidths;
					}
					children.push({
						type: 'element',
						tagName: 'div',
						properties: { className: ['gb-table-wrap'] },
						children: [child],
					});
				} else {
					children.push(child);
				}
			}
			parent.children = children;
		}

		wrapTables(tree);
	};
}
