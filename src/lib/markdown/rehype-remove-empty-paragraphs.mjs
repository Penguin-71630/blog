function isEmptyNode(node) {
	if (node.type === 'text') return !node.value.trim();
	if (node.type === 'comment') return true;
	if (node.type === 'element') {
		if (node.tagName === 'br') return true;
		if (['img', 'input', 'video', 'audio', 'iframe', 'canvas', 'svg', 'object', 'embed'].includes(node.tagName)) {
			return false;
		}
		return (node.children ?? []).every(isEmptyNode);
	}
	return false;
}

export default function rehypeRemoveEmptyParagraphs() {
	return (tree) => {
		function visit(parent) {
			if (!Array.isArray(parent.children)) return;

			parent.children = parent.children.filter(
				(child) =>
					!(child.type === 'element' && child.tagName === 'p' && child.children.every(isEmptyNode)),
			);
			for (const child of parent.children) visit(child);
		}

		visit(tree);
	};
}
