import { readFileSync } from 'node:fs';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import rehypeWrapTables from './rehype-wrap-tables.mjs';
import rehypeRemoveEmptyParagraphs from './rehype-remove-empty-paragraphs.mjs';
import rehypeCodeBlock from './rehype-code-block.mjs';
import remarkObsidian from './remark-obsidian.mjs';
import remarkGraphviz from './remark-graphviz.mjs';
import remarkRubyColor from './remark-ruby-color.mjs';
import remarkBreaks from 'remark-breaks';
import remarkTableWidths from './remark-table-widths.mjs';

export const markdownRemarkPlugins = [
	remarkMath,
	remarkObsidian,
	remarkGraphviz,
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

const loadGrammar = (name) =>
	JSON.parse(readFileSync(new URL(`./grammars/${name}.json`, import.meta.url), 'utf8'));

export const markdownShikiConfig = {
	theme: 'css-variables',
	langAlias: {
		S: 'asm',
		s: 'asm',
		gas: 'asm',
		x86: 'asm',
		x86asm: 'asm',
		x86_64: 'asm',
		nasm: 'asm',
		rv: 'riscv',
		rv32: 'riscv',
		rv64: 'riscv',
		riscv64: 'riscv',
		mk: 'make',
		Makefile: 'make',
		MAKEFILE: 'make',
		conf: 'ini',
		cfg: 'ini',
		config: 'ini',
		sh: 'bash',
		shell: 'bash',
		zsh: 'bash',
		arm64: 'arm',
		aarch64: 'arm',
		armasm: 'arm',
		thumb: 'arm',
		Kconfig: 'kconfig',
		dts: 'devicetree',
		dtsi: 'devicetree',
		ld: 'linkerscript',
		lds: 'linkerscript',
	},
	langs: [
		loadGrammar('arm'),
		loadGrammar('kconfig'),
		loadGrammar('devicetree'),
		loadGrammar('linkerscript'),
	],
};
