const palette = new Set([
	'blue',
	'cyan',
	'green',
	'yellow',
	'red',
	'purple',
	'gray',
	'orange',
	'maimai-expert',
	'maimai-master',
	'maimai-remaster',
	'maimai-utage',
]);
const skippedTypes = new Set(['code', 'inlineCode', 'inlineMath', 'math', 'html']);

function isAsciiPunctuation(character) {
	if (!character) return false;
	const code = character.charCodeAt(0);
	return (code >= 33 && code <= 47) || (code >= 58 && code <= 64) || (code >= 91 && code <= 96) || (code >= 123 && code <= 126);
}

function skipBlockquotePrefix(source, index) {
	let cursor = index;
	while (cursor < source.length) {
		let marker = cursor;
		while (source[marker] === ' ' || source[marker] === '\t') marker += 1;
		if (source[marker] !== '>') break;
		cursor = marker;
		while (source[cursor] === '>') {
			cursor += 1;
			if (source[cursor] === ' ' || source[cursor] === '\t') cursor += 1;
		}
	}
	return cursor;
}

function getEscapeMask(node, file, inTableCell) {
	const value = node.value;
	const start = node.position?.start?.offset;
	const end = node.position?.end?.offset;
	const mask = new Uint8Array(value.length);
	if (!Number.isInteger(start) || !Number.isInteger(end)) return mask;

	const source = String(file.value).slice(start, end);
	let sourceIndex = 0;
	let valueIndex = 0;
	while (sourceIndex < source.length && valueIndex < value.length) {
		const sourceChar = source[sourceIndex];
		if (sourceChar === '\r' && source[sourceIndex + 1] === '\n' && value[valueIndex] === '\n') {
			sourceIndex += 2;
			valueIndex += 1;
			sourceIndex = skipBlockquotePrefix(source, sourceIndex);
		} else if (
			sourceChar === '\\' &&
			isAsciiPunctuation(source[sourceIndex + 1]) &&
			source[sourceIndex + 1] === value[valueIndex]
		) {
			mask[valueIndex] = !(inTableCell && value[valueIndex] === '|');
			sourceIndex += 2;
			valueIndex += 1;
		} else if (sourceChar === value[valueIndex]) {
			sourceIndex += 1;
			valueIndex += 1;
			if (sourceChar === '\n') sourceIndex = skipBlockquotePrefix(source, sourceIndex);
		} else {
			return new Uint8Array(value.length);
		}
	}
	if (sourceIndex !== source.length || valueIndex !== value.length) return new Uint8Array(value.length);
	return mask;
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

function getSourceMap(node, file, lineStarts) {
	const start = node.position?.start?.offset;
	const end = node.position?.end?.offset;
	if (!Number.isInteger(start) || !Number.isInteger(end)) return null;

	const source = String(file.value).slice(start, end);
	const value = node.value;
	const starts = [];
	const ends = [];
	let sourceIndex = 0;
	let valueIndex = 0;
	while (sourceIndex < source.length && valueIndex < value.length) {
		if (source[sourceIndex] === '\r' && source[sourceIndex + 1] === '\n' && value[valueIndex] === '\n') {
			starts[valueIndex] = start + sourceIndex;
			ends[valueIndex] = start + sourceIndex + 2;
			sourceIndex += 2;
			valueIndex += 1;
			sourceIndex = skipBlockquotePrefix(source, sourceIndex);
		} else if (
			source[sourceIndex] === '\\' &&
			isAsciiPunctuation(source[sourceIndex + 1]) &&
			source[sourceIndex + 1] === value[valueIndex]
		) {
			starts[valueIndex] = start + sourceIndex;
			ends[valueIndex] = start + sourceIndex + 2;
			sourceIndex += 2;
			valueIndex += 1;
		} else if (source[sourceIndex] === value[valueIndex]) {
			starts[valueIndex] = start + sourceIndex;
			ends[valueIndex] = start + sourceIndex + 1;
			sourceIndex += 1;
			valueIndex += 1;
			if (value[valueIndex - 1] === '\n') sourceIndex = skipBlockquotePrefix(source, sourceIndex);
		} else {
			return null;
		}
	}
	return sourceIndex === source.length && valueIndex === value.length ? { starts, ends } : null;
}

function sliceText(node, startIndex, endIndex, file, lineStarts) {
	if (startIndex >= endIndex) return null;
	const value = node.value.slice(startIndex, endIndex);
	const sourceMap = getSourceMap(node, file, lineStarts);
	if (!sourceMap) return { ...node, value, position: undefined };

	return {
		...node,
		value,
		position: {
			start: pointAt(String(file.value), sourceMap.starts[startIndex], lineStarts),
			end: pointAt(String(file.value), sourceMap.ends[endIndex - 1], lineStarts),
		},
	};
}

function findClosing(children, startIndex, startOffset, masks) {
	let depth = 1;
	for (let index = startIndex; index < children.length; index += 1) {
		const child = children[index];
		if (child.type !== 'text') continue;
		const from = index === startIndex ? startOffset + 1 : 0;
		for (let offset = from; offset < child.value.length; offset += 1) {
			if (masks[index][offset]) continue;
			if (child.value[offset] === '{') depth += 1;
			if (child.value[offset] === '}' && --depth === 0) return { index, offset };
		}
	}
	return null;
}

function colorNameAfter(textNode, offset) {
	const match = /^\(([^)]+)\)/.exec(textNode.value.slice(offset + 1));
	return match && palette.has(match[1]) ? { name: match[1], end: offset + 1 + match[0].length } : null;
}

function createRuby(base, reading) {
	const escapeHtml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
	return {
		type: 'emphasis',
		data: { hName: 'ruby' },
		children: [
			{ type: 'text', value: base },
			{ type: 'html', value: '<rp>(</rp>' },
			{ type: 'html', value: `<rt>${escapeHtml(reading)}</rt>` },
			{ type: 'html', value: '<rp>)</rp>' },
		],
	};
}

function getRubyParts(text, mask, start, end) {
	let separator = -1;
	for (let index = start + 1; index < end; index += 1) {
		if (text[index] === '|' && !mask[index]) {
			separator = index;
			break;
		}
	}
	if (separator <= start + 1 || separator >= end - 1) return null;
	return [text.slice(start + 1, separator), text.slice(separator + 1, end)];
}

function extractInside(children, startIndex, startOffset, endIndex, endOffset, file, lineStarts) {
	const inside = [];
	if (startIndex === endIndex) {
		const node = sliceText(children[startIndex], startOffset + 1, endOffset, file, lineStarts);
		if (node) inside.push(node);
		return inside;
	}

	const first = sliceText(children[startIndex], startOffset + 1, children[startIndex].value.length, file, lineStarts);
	if (first) inside.push(first);
	inside.push(...children.slice(startIndex + 1, endIndex));
	const last = sliceText(children[endIndex], 0, endOffset, file, lineStarts);
	if (last) inside.push(last);
	return inside;
}

function scanChildren(parent, file, lineStarts, inheritedTableCell = false) {
	if (skippedTypes.has(parent.type) || !Array.isArray(parent.children)) return;
	const inTableCell = inheritedTableCell || parent.type === 'tableCell';
	for (const child of parent.children) {
		if (child.type !== 'text') scanChildren(child, file, lineStarts, inTableCell);
	}

	let changed = true;
	while (changed) {
		changed = false;
		for (let index = 0; index < parent.children.length && !changed; index += 1) {
			const node = parent.children[index];
			if (node.type !== 'text') continue;
			const masks = parent.children.map((child) =>
				child.type === 'text' ? getEscapeMask(child, file, inTableCell) : new Uint8Array(),
			);

			for (let offset = 0; offset < node.value.length; offset += 1) {
				if (node.value[offset] !== '{' || masks[index][offset]) continue;
				const closing = findClosing(parent.children, index, offset, masks);
				if (!closing) continue;

				const color = colorNameAfter(parent.children[closing.index], closing.offset);
				if (color) {
					const inside = extractInside(parent.children, index, offset, closing.index, closing.offset, file, lineStarts);
					const wrapper = {
						type: 'emphasis',
						data: {
							hName: 'span',
							hProperties: { className: ['text-color', `text-color-${color.name}`] },
						},
						children: inside,
					};
					const before = sliceText(node, 0, offset, file, lineStarts);
					const endOffset = color.end;
					const after = sliceText(parent.children[closing.index], endOffset, parent.children[closing.index].value.length, file, lineStarts);
					parent.children.splice(
						index,
						closing.index - index + 1,
						...(before ? [before] : []),
						wrapper,
						...(after ? [after] : []),
					);
					scanChildren(wrapper, file, lineStarts, inTableCell);
					changed = true;
					break;
				}

				if (closing.index !== index) continue;
				const ruby = getRubyParts(node.value, masks[index], offset, closing.offset);
				if (!ruby) continue;
				const before = sliceText(node, 0, offset, file, lineStarts);
				const after = sliceText(node, closing.offset + 1, node.value.length, file, lineStarts);
				parent.children.splice(index, 1, ...(before ? [before] : []), createRuby(...ruby), ...(after ? [after] : []));
				changed = true;
				break;
			}
		}
	}
}

export default function remarkRubyColor() {
	return (tree, file) => {
		const source = String(file.value);
		const lineStarts = [0];
		for (let index = 0; index < source.length; index += 1) {
			if (source[index] === '\n') lineStarts.push(index + 1);
		}
		scanChildren(tree, file, lineStarts);
	};
}
