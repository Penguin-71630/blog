// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeWrapTables from './src/lib/markdown/rehype-wrap-tables.mjs';
import rehypeRemoveEmptyParagraphs from './src/lib/markdown/rehype-remove-empty-paragraphs.mjs';
import remarkObsidian from './src/lib/markdown/remark-obsidian.mjs';

// Noto Sans TC / Noto Serif TC are self-hosted slices from scripts/build-cjk-fonts.mjs (src/styles/cjk.css).
// https://astro.build/config
export default defineConfig({
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMath, remarkObsidian],
			rehypePlugins: [rehypeKatex, rehypeWrapTables, rehypeRemoveEmptyParagraphs],
		}),
		syntaxHighlight: { type: 'shiki', excludeLangs: ['math', 'mermaid'] },
		shikiConfig: { theme: 'css-variables' },
	},
});
