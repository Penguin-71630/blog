// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeWrapTables from './src/lib/markdown/rehype-wrap-tables.mjs';
import rehypeRemoveEmptyParagraphs from './src/lib/markdown/rehype-remove-empty-paragraphs.mjs';
import remarkObsidian from './src/lib/markdown/remark-obsidian.mjs';
import remarkRubyColor from './src/lib/markdown/remark-ruby-color.mjs';
import remarkBreaks from 'remark-breaks';

// Noto Sans TC / Noto Serif TC are self-hosted slices from scripts/build-cjk-fonts.mjs (src/styles/cjk.css).
// https://astro.build/config
export default defineConfig({
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath, remarkObsidian, remarkRubyColor, remarkBreaks],
			rehypePlugins: [rehypeKatex, rehypeWrapTables, rehypeRemoveEmptyParagraphs],
		}),
		syntaxHighlight: { type: 'shiki', excludeLangs: ['math', 'mermaid'] },
		shikiConfig: { theme: 'css-variables' },
	},
});
