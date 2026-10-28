// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import {
	markdownRemarkPlugins,
	markdownRehypePlugins,
	markdownShikiConfig,
	markdownSyntaxHighlight,
} from './src/lib/markdown/plugins.mjs';

// Noto Sans TC / Noto Serif TC are self-hosted slices from scripts/build-cjk-fonts.mjs (src/styles/cjk.css).
// https://astro.build/config
export default defineConfig({
	markdown: {
		processor: unified({ remarkPlugins: markdownRemarkPlugins, rehypePlugins: markdownRehypePlugins }),
		syntaxHighlight: markdownSyntaxHighlight,
		shikiConfig: markdownShikiConfig,
	},
});
