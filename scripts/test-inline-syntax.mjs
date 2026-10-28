import assert from 'node:assert/strict';
import { markdownConfigDefaults, unified } from '@astrojs/markdown-remark';
import {
	markdownRemarkPlugins,
	markdownRehypePlugins,
	markdownShikiConfig,
	markdownSyntaxHighlight,
} from '../src/lib/markdown/plugins.mjs';
import { extractLinkUrls } from '../src/lib/markdown/link-preview-urls.mjs';

const processor = unified({
	remarkPlugins: markdownRemarkPlugins,
	rehypePlugins: markdownRehypePlugins,
});
const renderer = await processor.createRenderer({
	...markdownConfigDefaults,
	syntaxHighlight: markdownSyntaxHighlight,
	shikiConfig: markdownShikiConfig,
});
const fileURL = new URL('../src/content/posts/inline-syntax-test.md', import.meta.url);

async function render(source, sourceFileURL = fileURL) {
	return renderer.render(source, { fileURL: sourceFileURL });
}

assert.ok(markdownSyntaxHighlight.excludeLangs.includes('abc'));
assert.ok(markdownSyntaxHighlight.excludeLangs.includes('mermaid'));

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

const markers = await render('- [i] Info\n- [k] Key\n- [p] Yes\n- [c] No\n- [ ] Todo\n- [x] Done');
assert.match(markers.code, /class="gb-markers"/);
assert.match(markers.code, /ri-information-line/);
assert.match(markers.code, /type="checkbox"/);

const markerAfterInline = await render('- **Not a marker** [i] text');
assert.doesNotMatch(markerAfterInline.code, /class="gb-markers"|ri-information-line/);

const calloutMarkers = await render('> [!note]\n> - [i] Info inside a callout');
assert.match(calloutMarkers.code, /ri-information-line/);

const widths = await render('<!-- table: widths=8em,20em -->\n\n| A | B |\n| --- | --- |\n| 1 | 2 |');
assert.match(widths.code, /<colgroup><col style="width:8em"><col style="width:20em"><\/colgroup>/);
const intervening = await render('<!-- table: widths=8em,20em -->\n\nText\n\n| A | B |\n| --- | --- |');
assert.doesNotMatch(intervening.code, /<colgroup>/);
const invalidWidths = await render('<!-- table: widths=8em,nope -->\n\n| A | B |\n| --- | --- |');
assert.doesNotMatch(invalidWidths.code, /<colgroup>/);
const emptyTabs = await render('> [!tabs]\n> plain body');
assert.match(emptyTabs.code, /class="gb-callout"/);
assert.doesNotMatch(emptyTabs.code, /class="gb-tabs"/);

const cppTabs = [
	'> [!tabs]',
	'> > [!panel] basic.c',
	'> >',
	'> > ```c',
	'> > int main() {',
	'> >     int a = 0x11111111;',
	'> >     int b = 0x22222222;',
	'> >     int c = a + b;',
	'> >     return 0;',
	'> > }',
	'> > ```',
	'> > [!panel] basic.o',
	'> >',
	'> > ```asm',
	'> > 0000000000000000 <ltmp0>:',
	'> >     mov w0, #0x0',
	'> > ```',
	'> > [!panel] basic.o 解說',
	'> >',
	'> > `w0` 是整數 return register。',
].join('\n');
const cpp = await render(cppTabs);
assert.equal((cpp.code.match(/role="tab"/g) ?? []).length, 3);
assert.equal((cpp.code.match(/class="gb-tabpanel"/g) ?? []).length, 3);
assert.doesNotMatch(cpp.code, /data-fade/);

const cppCode = await render('```cpp\nint main() {\n  return 0;\n}\n```');
assert.match(cppCode.code, /<div class="gb-code"><span class="gb-code-lang">cpp<\/span><button type="button" class="gb-code-copy" aria-label="Copy code" title="Copy">/);
assert.match(cppCode.code, /<svg class="ri-file-copy-line"[\s\S]*<svg class="ri-check-line"/);
assert.match(cppCode.code, /<\/button><pre class="astro-code/);

const plaintext = await render('```plaintext\nPlain text.\n```');
assert.match(plaintext.code, /<div class="gb-code"><button type="button" class="gb-code-copy"/);
assert.match(plaintext.code, /<\/button><pre class="astro-code[^>]*data-language="plaintext"/);
assert.doesNotMatch(plaintext.code, /gb-code-lang/);

const noLanguage = await render('```\nUnlabelled text.\n```');
assert.match(noLanguage.code, /<div class="gb-code"><button type="button" class="gb-code-copy"/);
assert.doesNotMatch(noLanguage.code, /gb-code-lang/);

const chapter3Nested = [
	'> [!tabs]',
	'> > [!panel] 正常範例',
	'> >',
	'> > 範例：$0.5 + (-0.4375)$',
	'> > > [!slider]',
	'> > > > [!panel] Step 1',
	'> > > >',
	'> > > > ```',
	'> > > > A:  1.000 x 2^{-1}',
	'> > > > B: -1.110 x 2^{-2}',
	'> > > > ```',
	'> > > > [!panel] Step 2',
	'> > > >',
	'> > > > ```',
	'> > > > A:  1.000 x 2^{-1}',
	'> > > > B: -0.111 x 2^{-1}',
	'> > > > ```',
	'> > > > [!panel] Step 3',
	'> > > >',
	'> > > > ```',
	'> > > > A:  0.100 x 2^{0}',
	'> > > > B: -0.111 x 2^{-1}',
	'> > > > ```',
	'> > [!panel] 會 Overflow 的範例',
	'> > Overflow example content.',
].join('\n');
const nestedComponents = await render(chapter3Nested);
assert.equal((nestedComponents.code.match(/role="tab"/g) ?? []).length, 1);
assert.equal((nestedComponents.code.match(/class="gb-tabpanel"/g) ?? []).length, 1);
assert.equal((nestedComponents.code.match(/class="gb-stepper-pane"/g) ?? []).length, 3);
assert.match(nestedComponents.code, /data-step-counter[^>]*>1 \/ 3<\/span>/);
assert.match(nestedComponents.code, /class="gb-tabpanel"[\s\S]*class="gb-stepper"/);
const sliderTag = nestedComponents.code.match(/<div class="gb-stepper"[^>]*>/)?.[0] ?? '';
assert.match(sliderTag, /role="group"/);
assert.match(sliderTag, /tabindex="0"/);
assert.match(nestedComponents.code, /aria-label="Step 1 \(1 \/ 3\)"/);

const abc = await render([
	'```abc',
	'X: 1',
	'M: none',
	'L: 1/1',
	'K: C',
	'C D E F G A B c',
	'w: C D E F G A B C',
	'```',
].join('\n'));
assert.match(abc.code, /<pre><code class="language-abc">/);
assert.doesNotMatch(abc.code, /class="astro-code|class="line"/);
assert.doesNotMatch(abc.code, /class="gb-code"/);

const mermaid = await render([
	'```mermaid',
	'sequenceDiagram',
	'    Note left of Alice: Info',
	'    Alice->>Bob: Send Data/Information',
	'    Note left of Bob: Eve: Hack and Revise Data',
	'    Note left of Bob: Data loss',
	'    Note right of Bob: ????',
	'```',
].join('\n'));
assert.match(mermaid.code, /<pre><code class="language-mermaid">/);
assert.doesNotMatch(mermaid.code, /class="astro-code|class="line"/);
assert.doesNotMatch(mermaid.code, /class="gb-code"/);

const standaloneImage = await render('![Remote image](https://example.com/remote.png)');
assert.match(standaloneImage.code, /<figure class="gb-figure"><img\b[^>]*alt="Remote image"[^>]*style="max-width:100%;height:auto"[^>]*><\/figure>/);
assert.doesNotMatch(standaloneImage.code, /<figcaption>/);

const draftEmbed = await render(
	'![[draft-image.png]]',
	new URL('../src/content/drafts/Discrete%20Mathematics/lecture.md', import.meta.url),
);
assert.match(draftEmbed.code, /\.\.\/_attachments\/draft-image\.png/);

const draftStandardImage = await render(
	'![Local image](Pasted%20image.png)',
	new URL('../src/content/drafts/Discrete%20Mathematics/lecture.md', import.meta.url),
);
assert.match(draftStandardImage.code, /\.\.\/_attachments\/Pasted image\.png/);

const inlineImage = await render('Text before ![Inline image](https://example.com/inline.png) and after.');
assert.match(inlineImage.code, /<p>Text before <img\b[^>]*alt="Inline image"[^>]*> and after\.<\/p>/);
assert.doesNotMatch(inlineImage.code, /<figure class="gb-figure"/);

const multipleImages = await render('![First](https://example.com/first.png)\n![Second](https://example.com/second.png)');
assert.equal((multipleImages.code.match(/<figure class="gb-figure">/g) ?? []).length, 2);
assert.equal((multipleImages.code.match(/<img\b/g) ?? []).length, 2);

const titledImage = await render('![Accessible alt](https://example.com/titled.png "Visible caption")');
assert.match(titledImage.code, /<figure class="gb-figure"><img\b[^>]*alt="Accessible alt"[^>]*><figcaption>Visible caption<\/figcaption><\/figure>/);

const obsidianImage = await render('![[Maimai-april-shower-15.png]]');
assert.equal((obsidianImage.code.match(/<figure class="gb-figure">/g) ?? []).length, 1);
assert.doesNotMatch(obsidianImage.code, /<figure class="gb-figure"><figure class="gb-figure">/);

const carousel = await render([
	'> [!carousel|fade]',
	'> ![[Maimai-april-shower-15.png]]',
	'> ![[Maimai-swing-1.png]]',
	'> ![[Maimai-umiuri-fig1.png]]',
].join('\n'));
assert.match(carousel.code, /class="gb-carousel has-fade"[^>]*data-carousel/);
assert.equal((carousel.code.match(/data-carousel-slide/g) ?? []).length, 3);
assert.match(carousel.code, /data-carousel-counter[^>]*>1 \/ 3<\/span>/);

const sliderFade = await render([
	'> [!slider|fade]',
	'> > [!panel] One',
	'> > First.',
	'> > [!panel] Two',
	'> > Second.',
].join('\n'));
assert.match(sliderFade.code, /class="gb-stepper has-fade"[^>]*data-slider/);

const links = [
	'> [!link]',
	'> https://example.com/depth-one',
	'',
	'> [!note]',
	'> Nested link follows.',
	'>',
	'> > [!link]',
	'> > https://example.com/depth-two',
].join('\n');
const linkCards = await render(links);
assert.equal((linkCards.code.match(/class="gb-linkcard"/g) ?? []).length, 2);
assert.match(linkCards.code, /href="https:\/\/example\.com\/depth-one"/);
assert.match(linkCards.code, /href="https:\/\/example\.com\/depth-two"/);
assert.deepEqual(extractLinkUrls(links), [
	'https://example.com/depth-one',
	'https://example.com/depth-two',
]);

const center = await render('> [!center]\n> Centered **content**.\n>\n> > [!center]\n> > Nested.');
assert.equal((center.code.match(/class="gb-center"/g) ?? []).length, 2);

console.log('Inline Markdown syntax tests passed.');
