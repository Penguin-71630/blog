import assert from 'node:assert/strict';
import { markdownConfigDefaults, unified } from '@astrojs/markdown-remark';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';
import remarkBreaks from 'remark-breaks';
import remarkObsidian from '../src/lib/markdown/remark-obsidian.mjs';
import remarkRubyColor from '../src/lib/markdown/remark-ruby-color.mjs';
import rehypeWrapTables from '../src/lib/markdown/rehype-wrap-tables.mjs';
import rehypeRemoveEmptyParagraphs from '../src/lib/markdown/rehype-remove-empty-paragraphs.mjs';

const processor = unified({
	remarkPlugins: [remarkMath, remarkObsidian, remarkRubyColor, remarkBreaks],
	rehypePlugins: [rehypeKatex, rehypeWrapTables, rehypeRemoveEmptyParagraphs],
});
const renderer = await processor.createRenderer(markdownConfigDefaults);
const fileURL = new URL('../src/content/posts/inline-syntax-test.md', import.meta.url);

async function render(source) {
	return renderer.render(source, { fileURL });
}

const ruby = await render('{漢字|かんじ}');
assert.match(ruby.code, /<ruby>漢字<rp>\(<\/rp><rt>かんじ<\/rt><rp>\)<\/rp><\/ruby>/);

const green = await render('{Tried and Accepted}(green)');
assert.match(green.code, /<span class="text-color text-color-green">Tried and Accepted<\/span>/);

const strongColor = await render('{**弱虫モンブラン**}(maimai-master)');
assert.match(strongColor.code, /<span class="text-color text-color-maimai-master"><strong>弱虫モンブラン<\/strong><\/span>/);

const nested = await render('{{漢字|かんじ}}(red)');
assert.match(nested.code, /<span class="text-color text-color-red"><ruby>漢字<rp>\(<\/rp><rt>かんじ<\/rt><rp>\)<\/rp><\/ruby><\/span>/);

const pipeColor = await render('{a|b}(red)');
assert.match(pipeColor.code, /<span class="text-color text-color-red">a\|b<\/span>/);
assert.doesNotMatch(pipeColor.code, /<ruby>/);

const literal = await render('{a}(e) {x}(foo) {沒有分隔線} (Red)');
for (const text of ['{a}(e)', '{x}(foo)', '{沒有分隔線}', '(Red)']) {
	assert.ok(literal.code.includes(text), `expected literal ${text}`);
}

const escaped = await render(String.raw`\{x|y\}`);
assert.match(escaped.code, />\{x\|y\}<\/p>/);
assert.doesNotMatch(escaped.code, /<ruby>|text-color-/);

const escapedColon = await render('**{00\\:11 pA 100}(green)**');
assert.match(escapedColon.code, /<strong><span class="text-color text-color-green">00:11 pA 100<\/span><\/strong>/);

const mathColor = await render('{$x$ 的值}(red)');
assert.match(mathColor.code, /<span class="text-color text-color-red">[\s\S]*class="katex"/);

const opaque = await render('`{a|b}` and $\\{(0,1)\\}$ and $[x^i](1+x+x^2)$');
assert.match(opaque.code, /<code>\{a\|b\}<\/code>/);
assert.doesNotMatch(opaque.code, /<ruby>|text-color-/);
assert.equal((opaque.code.match(/class="katex"/g) ?? []).length, 2);

const table = await render('| {漢字\\|かんじ} | x |\n| --- | --- |\n| a | b |');
assert.equal((table.code.match(/<t[hd]>/g) ?? []).length, 4);
assert.match(table.code, /<th><ruby>漢字<rp>\(<\/rp><rt>かんじ<\/rt><rp>\)<\/rp><\/ruby><\/th>/);

const heading = await render('# Title\n\n## {漢字|かんじ}と{色}(red)');
assert.match(heading.code, /<h2 id="漢字と色">/);
assert.deepEqual(
	heading.metadata.headings.map(({ text, slug }) => ({ text, slug })),
	[{ text: '漢字と色', slug: '漢字と色' }],
);

const callout = await render('> [!note] {標題|ひょうだい}\n> {內容|ないよう} and {green}(green) $x$\n> \\{x|y\\}');
assert.match(callout.code, /<ruby>標題<rp>\(<\/rp><rt>ひょうだい<\/rt><rp>\)<\/rp><\/ruby>/);
assert.match(callout.code, /<ruby>內容<rp>\(<\/rp><rt>ないよう<\/rt><rp>\)<\/rp><\/ruby>/);
assert.match(callout.code, /<span class="text-color text-color-green">green<\/span>/);
assert.match(callout.code, /class="katex"/);
assert.match(callout.code, /\n\{x\|y\}<\/p>/);

console.log('Inline Markdown syntax tests passed.');
