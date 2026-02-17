---
title: Koharu 學習筆記：Markdown 如何變成 DOM Tree
date: 2026-02-17
description: 學習一下 Koharu 這個模板的架構。
draft: true
categories:
  - 工具
---

:::default
## STEP 1：Schema 驗證
:::

`.md` 檔最上面用 `---` 包起來的叫做 frontmatter，用來定義這篇文章的標題、日期、分類等所有 metadata。

Astro 會先把 `.md` 餵去 `src/content/config.ts` 驗證並轉換 frontmatter 資料，使其格式符合 `src/content/config.ts` 定義的 schema。

背後使用的是 Zod，Zod 是一個拿來驗證執行時期資料型別的 module，彌補了 TypeScript 只能處理編譯時靜態型別的不足。


```ts
// src/content/config.ts
import { defineCollection, z } from 'astro:content';
import { parseDateInSiteTimezone, reinterpretUtcAsTimezone } from '@lib/date';
import type { BlogSchema, BlogSchemaInput } from 'types/blog';

...

const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    link: z.string().optional(),
    date: dateInSiteTimezone,
    updated: dateInSiteTimezone.optional(),
    cover: z.string().optional(),
    tags: z.array(z.string()).optional(),
    // ...
    // 還有其他 schema
  }) satisfies z.ZodType<BlogSchema, z.ZodTypeDef, BlogSchemaInput>,
});
```



:::default
## STEP 2：解析 Markdown 轉成 HTML AST
:::

AST = Abstract Syntax Tree，跟編譯器設計教的 AST 是同個概念。

這步驟是交給 remark 跟 rehype 處理，這兩個 modules 都屬於 [unified](https://unifiedjs.com/learn/guide/introduction-to-unified/) 這個生態系。
- remark 是一個用於處理 Markdown 的 JS module，他用於定義 Markdown 的 AST（MDAST）。
- rehype 是一個用於處理 HTML 的 JS module，他用於定義 HTML 的 AST（HAST）。

:::info
在 unified 生態系統中，處理 Markdown 到 HTML 的過程通常是這樣的：

1. 解析 Markdown: 使用 remark 解析 Markdown 文本，將其轉換為 MDAST。
2. 處理 MDAST: 使用各種 remark 插件來處理 MDAST，例如添加前置資料、支援 GFM、數學公式等功能。
3. 轉成 HAST: 透過轉換器將 MDAST 轉換為 HAST。
4. 處理 HAST: 使用各種 rehype 插件來處理 AST。
5. 輸出 HTML: 將生成的 HTML 輸出到文件或網頁上，我們可以選擇輸出成 HTML String，或是 React JSX。

Reference: [解鎖 Markdown 的超能力：remark/rehype 插件系統](http://bntw.dev/zh/blog/markdown-plugin)
:::



### <i class="ri-dice-1-fill"></i> 2-1：字串攔截與預處理

參與檔案：`remark-shoka-preprocess.ts`, `shoka-preprocessor.ts`, `shoka-renderers.ts`

Koharu 有些功能繼承了另外一個模板 [Shoka](https://github.com/amehime/hexo-theme-shoka)，這個模板有一些自己定義的語法會跟原生的 markdown 有衝突（就是 ambiguity）。

為了解決這個問題，作者寫了一個 `remarkShokaPreprocess` 的外掛，放在整個 pipeline 最前面。這個外掛會直接讀取 markdown 原始純文字，把程式碼區塊、數學公式等保護區剔除之後，將 Shoka 自己定義的語法（比如 `:::note`、`+++collapse`、`;;;tab`）交給 `shoka-preprocessor.ts` 轉換成 HTML 字串。

中途如果遇到 Hexo 標籤（如 `{% links %}`、`{% media video %}`），會呼叫 `shoka-renderers.ts`，將裡面的 YAML 資料解析並直接渲染成帶有該資料屬性的 HTML 字串（如 `<div data-video-player...>`）。


```ts
// src/lib/markdown/remark-shoka-preprocess.ts
export function remarkShokaPreprocess(options?: RemarkShokaPreprocessOptions) {
  // call preprocessShokaSyntax()
  ...
  // Re-parse the preprocessed text into a new MDAST
  const newTree = pipeline.parse(processed);
}
```

```ts
// src/lib/markdown/shoka-preprocessor.ts
/**
 * Shoka syntax preprocessor
 *
 * Transforms Shoka-specific syntax in raw Markdown BEFORE the remark parser
 * processes it. This is necessary because some Shoka syntax conflicts with
 * standard Markdown/GFM parsing:
 *
 * - `+++style Title` would be parsed as thematicBreak
 * - `~sub~` would be parsed as GFM strikethrough (~~ is delete)
 * - `{% links %}...{% endlinks %}` YAML content would be parsed as lists
 * - `:::style` is fine (remark sees it as paragraph text) but nested content
 *   with lists would be problematic
 *
 * This preprocessor converts block-level Shoka syntax into HTML before
 * remark parsing. Inline syntax (++ins++, ==mark==, !!spoiler!!, {^ruby})
 * is handled by remark plugins since those don't conflict with Markdown.
 */

export function preprocessShokaSyntax() {
  /**
   * Main preprocessor function.
   * Transforms raw Markdown source text before remark parsing.
   */
  // step 1: call processContainers();
  // step 2: call process InlineSuperSub();
}

function processContainers() {
  /**
   * Process container syntax (:::, +++, ;;;) and Hexo tags in raw markdown text.
   * Returns the text with containers/tags replaced by HTML blocks.
   */
}

function processInlineSuperSub() {
  /**
   * Process inline ~sub~ and ^sup^ syntax, skipping protected regions.
   * Must be done before GFM parsing to avoid ~text~ being treated as strikethrough.
   */
}
```

替換完成後，呼叫 `pipeline.parse(processed)`，將這串「混雜著 HTML 與 Markdown 的字串」正式轉換為 Markdown 抽象語法樹 (MDAST)。


### <i class="ri-dice-2-fill"></i> 2-2：Remark 階段 (操作 Markdown AST)

現在我們有了一棵 MDAST。這棵樹上有很多節，例如「段落」、「清單」、「純文字」。接下來的幾個外掛會專門尋找樹上的「純文字 (text)」節點進行改造。

- 文字特效 (`remark-shoka-effects.ts`)：
    - 尋找 `++文字++`，將該節點替換為 HTML 節點 `<ins>文字</ins>`。
    - 尋找 `==文字==`，替換為 `<mark>文字</mark>`。
- 注音 / 旁注 (`remark-shoka-ruby.ts`)：
    - 尋找 `{漢字^注音}`，將其拆解並包裝成標準的 `<ruby>` 與 `<rt>` HTML 標籤。
    - 如果是 `{文字^*}`，則轉換為帶有 CSS 重點標記 `text-emphasis: filled circle` 的 `<span>`。
- 防雷劇透 (`remark-shoka-spoiler.ts`)：
    - 尋找 `劇透內容`。如果是標準寫法，會轉換為自訂的 Web Component `<spoiler-span>`
    - 如果後面帶有 `{.blur}` 屬性，則會轉換為 `<span class="spoiler blur">`。

此時的狀態：這棵樹準備從 MDAST 轉換成 HAST。