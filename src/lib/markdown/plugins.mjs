import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeWrapTables from './rehype-wrap-tables.mjs';
import rehypeRemoveEmptyParagraphs from './rehype-remove-empty-paragraphs.mjs';
import rehypeCodeBlock from './rehype-code-block.mjs';
import remarkObsidian from './remark-obsidian.mjs';
import remarkRubyColor from './remark-ruby-color.mjs';
import remarkBreaks from 'remark-breaks';
import remarkTableWidths from './remark-table-widths.mjs';

export const markdownRemarkPlugins = [
	remarkMath,
	remarkObsidian,
	remarkRubyColor,
	remarkBreaks,
	remarkTableWidths,
];

export const markdownRehypePlugins = [
	rehypeKatex,
	rehypeWrapTables,
	rehypeRemoveEmptyParagraphs,
	rehypeCodeBlock,
];

export const markdownSyntaxHighlight = {
	type: 'shiki',
	excludeLangs: ['math', 'mermaid', 'abc'],
};

export const markdownShikiConfig = { theme: 'css-variables' };
