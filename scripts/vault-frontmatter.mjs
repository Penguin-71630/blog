const frontmatterKeys = ['date', 'description', 'publish'];

function formatLocalDate(date) {
	return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function findFrontmatter(source) {
	const emptyMatch = /^---(\r?\n)---(?=\r?\n|$)/.exec(source);
	if (emptyMatch) {
		return {
			content: '',
			closingStart: 3 + emptyMatch[1].length,
		};
	}

	const match = /^---\r?\n([\s\S]*?)\r?\n---(?=\r?\n|$)/.exec(source);
	if (!match) return null;

	return {
		content: match[1],
		closingStart: match[0].lastIndexOf('---'),
	};
}

export function fillFrontmatter(source, birthtime) {
	const bomLength = source.startsWith('\uFEFF') ? 1 : 0;
	const content = source.slice(bomLength);
	const lineEnding = source.includes('\r\n') ? '\r\n' : '\n';
	const frontmatter = findFrontmatter(content);

	if (!frontmatter) {
		const added = [...frontmatterKeys];
		const lines = [`date: ${formatLocalDate(birthtime)}`, 'description:', 'publish:'];
		const updated =
			source.slice(0, bomLength) +
			`---${lineEnding}${lines.join(lineEnding)}${lineEnding}---${lineEnding}` +
			source.slice(bomLength);
		return { updated, added };
	}

	const existingKeys = new Set(
		frontmatter.content
			.split(/\r?\n/)
			.flatMap((line) => {
				const match = /^(date|description|publish)\s*:/.exec(line);
				return match ? [match[1]] : [];
			}),
	);
	const added = frontmatterKeys.filter((key) => !existingKeys.has(key));
	if (added.length === 0) return { updated: source, added };

	const date = added.includes('date') ? formatLocalDate(birthtime) : '';
	const lines = added.map((key) => (key === 'date' ? `date: ${date}` : `${key}:`));
	const updatedContent =
		content.slice(0, frontmatter.closingStart) +
		`${lines.map((line) => `${line}${lineEnding}`).join('')}` +
		content.slice(frontmatter.closingStart);

	return { updated: source.slice(0, bomLength) + updatedContent, added };
}
