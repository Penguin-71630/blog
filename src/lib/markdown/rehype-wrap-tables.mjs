export default function rehypeWrapTables() {
	return (tree) => {
		function wrapTables(parent) {
			if (!Array.isArray(parent.children)) return;

			const children = [];
			for (const child of parent.children) {
				wrapTables(child);
				if (child.type === 'element' && child.tagName === 'table') {
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
