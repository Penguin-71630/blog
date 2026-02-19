---
title: Koharu 學習筆記：Markdown 如何變成 DOM Tree
date: 2026-02-17
description: 學習一下 Koharu 這個模板的架構。
draft: true
categories:
  - 工具
---

:::default
## STEP 1：Zod 進行 Schema 驗證
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
## STEP 2：Remark 解析 Markdown 轉成 MDAST
:::

AST = Abstract Syntax Tree，跟編譯器課程教的 AST 是同個概念。

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

參與檔案：`remark-shoka-effects.ts`, `remark-shoka-ruby.ts`, `remark-shoka-spoiler.ts`

現在我們有了一棵 MDAST。這棵樹上有很多節點，例如「段落」、「清單」、「純文字」。接下來的幾個外掛會專門尋找樹上的「純文字 (text)」節點進行改造。

<!-- TODO: ++文字++ is currently broken -->

- 文字特效 (`remark-shoka-effects.ts`)：
    - 尋找 `++文字++`（++文字++），將該節點替換為 HTML 節點 `<ins>文字</ins>`。
    - 尋找 `==文字==`（==文字==），替換為 `<mark>文字</mark>`。
- 注音 / 旁注 (`remark-shoka-ruby.ts`)：
    - 尋找 `{文字^拼音}`（{平仮名^ひらがな}），將其拆解並包裝成標準的 `<ruby>` 與 `<rt>` HTML 標籤。
    - 如果是 `{文字^*}`（{文字^*}），則轉換為帶有 CSS 重點標記 `text-emphasis: filled circle` 的 `<span>`。
- 防雷劇透 (`remark-shoka-spoiler.ts`)：
    - 尋找 `!!劇透內容!!`（!!劇透內容!!）。如果是標準寫法，會轉換為自訂的 Web Component `<spoiler-span>`
    - 如果後面帶有 `{.blur}`（!!劇透內容!!{.blur}）屬性，則會轉換為 `<span class="spoiler blur">`。

此時的狀態：這棵樹準備從 MDAST 轉換成 HAST。



:::default
## STEP 3：Rehype 將 MDAST 處理成 HAST
:::

參與檔案：`rehype-shoka-attrs.ts`, `rehype-image-placeholder.ts`, `shiki-meta-transformer.ts`


`rehype-shoka-attrs.ts` 負責把 Shoka 的屬性語法（就是 `{.class #id}` 這種大括號）轉換成真實的 HTML 屬性，分成多次掃描（Pass 1、Pass 2、Pass 2.5、Pass 3）。

<!-- `rehype-shoka-attrs.ts` 在我寫這篇筆記的時候其實有 bug，作者沒寫 math 和 code block 的跳脫邏輯（碰到這兩個東西要忽略、交給其他 plugins 處理），所以我請 Gemini 幫忙修了一下（code block 跳脫邏輯的補上見 commit `* ab1089c (HEAD -> koharu, origin/koharu) Fixed Bug: Enhanced protections for code blocks in rehype-shoka-attrs.ts`，math block 我忘了是哪筆 commit）。 -->

`rehype-image-placeholder.ts` 優化圖片的載入效能，並防止網頁在圖片載入時發生排版跳動（CLS, Cumulative Layout Shift）。

:::info
`rehype-image-placeholder.ts` 流程如下：
- 遍歷 HAST 尋找所有 `<img>`。但在處理之前，它會先排除兩種情況：
    - 已經被 `<figure>` 包覆的圖片：跳過不處理
    - 被超連結 `<a>` 包覆的圖片（例如：`[![替代文字](圖片網址)](連結)`）：只幫圖片加上效能屬性，但不會用 `<figure>` 包裝以免破壞超連結的點擊範圍或預設排版。
- 加上 `loading="lazy"`，告訴瀏覽器「只有當使用者快要捲動到這張圖片時，才開始下載它」。
- 加上 `decoding="async"`，告訴瀏覽器在背景解析這張圖片，不要因為解析圖片而卡住 Main thread。
- 加上 `class="markdown-image"`
- 用 `<figure class="markdown-image-wrapper">` 包起來，以在圖片未載入時放置 placeholder，從而避免排版跳動（CLS）。
:::


`shiki-meta-transformer.ts` 處理 coding block：
```markdown
```js title="app.js" mark:1,3-5
```
後面的那坨屬性。[Shiki](https://github.com/shikijs/shiki) 是處理 code block 渲染的 module。

除了 Koharu 自訂的外掛，Astro 的 `astro.config.mjs` 中還配置了：
- `rehype-slug`：自動為 h1 ~ h6 生成 ID
- `rehype-autolink-headings`：自動在標題旁插入錨點連結 `<a>`（就是那個 # 號）。


總而言之，Remark 和 Rehype 會協力把 markdown 轉換成 HTML AST。接下來就是渲染 HTML 了



:::default
## STEP 4：靜態 HTML 字串輸出（Astro Build）
:::


當 Remark 和 Rehype 把內文變成 HAST 之後，Astro 編譯器會接手最後的任務（主要的邏輯寫在 `src/pages/post/[...slug].astro`）。

Astro 並不會直接把 HAST 吐成純 HTML string，因為現在的 Markdown 常常會混寫 React/Astro 元件（也就是 MDX）。因此，Astro 會把這棵 HAST 編譯成一個可執行的 Astro component `<Content />`。

在 `src/pages/post/[...slug].astro` 中，你可以看到這個過程：

```ts
// src/pages/post/[...slug].astro
// Line 33 左右，呼叫 render() 啟動整條 Remark -> Rehype 渲染管線
const { Content } = await post.render();
```

接著，這個 `<Content />` 會被塞進一個帶有 Tailwind 排版設定的容器中，並交給 `CustomContent.astro` 進行包裝：
```astro
{/* src/pages/post/[...slug].astro */}
<Layout
  ...
>
  ...
  <TwoColumnLayout post={post}>
    <Cover slot="cover" data={post} />
    <HomeSider slot="sider" type={HomeSiderType.POST} post={post} />
    <div class=...>
      ...
      <article class="prose md:prose-sm dark:prose-invert">
        <CustomContent Content={Content} />
      </article>
      ...
    </div>
  </TwoColumnLayout>
</Layout>
```

在執行 `pnpm run build`（打包網站）時，Astro 會把這個 `<Content />` 徹底執行，並結合外層的 Layout（`Layout.astro`）、Tailwind 的 CSS 變數（如 `.prose` 賦予的行高、字體大小），最終壓平輸出成一份純靜態的 HTML 檔案。

到這裡，伺服器（或編譯器）的工作就完全結束了。


:::default
## STEP 5：瀏覽器 client 端 Hydration
:::


當讀者的瀏覽器收到這份 HTML 文件後，由上而下讀取，在記憶體中建立 DOM Tree。因為所有內容（包含程式碼 highlight、數學公式的 `<span>`）都已經是純 HTML 了，瀏覽器完全不需要等待任何 JavaScript 載入，畫面瞬間就會顯示出排版精美的文章。

DOM Tree 建立完成之後，瀏覽器會開始下載 JavaScript 檔案，當 JS 載入完成並執行時，React（或 Vanilla JS）會去尋找畫面上對應的 DOM 節點，然後把 `onClick` 等 Event Listeners 綁定到該節點上，並把狀態（State）同步進去，這個步驟叫 Hydration。


:::info
**Astro 的優勢之一是 Partial Hydration**

傳統的框架（如 Next.js、Nuxt）是 Full-page Hydration，React 要從頭到腳掃描網頁的整個 DOM Tree，非常耗能。

Astro 採用了 Islands Architecture。它只會對「有需要互動的區塊」進行 Hydration。具體機制如下：
1. 伺服器端會留下定位標記。當 Astro 在伺服器端渲染一個帶有 `client:load` 的 React component 時，它會在輸出的 HTML 中包上一層特殊的自訂標籤 `<astro-island>`：
    ```html
    <div>
      <h1>這是一般的靜態文字，不需要 Hydration</h1>

      <astro-island uid="12345" component-url="/_astro/SearchDialog.js" props='{"isOpen": false}'>
        <button class="search-btn">搜尋</button> </astro-island>
    </div>
    ```
2. 當 client 端瀏覽器建立好 DOM Tree 後，Astro 內建的一小段輕量級 JS 腳本會開始尋找畫面上所有的 `<astro-island>` 標籤。Astro 管家會讀取你設定的 `client:*` 指令，決定「什麼時候」才要 hydrate 這個 island：
    - `client:load`：DOM 剛建好，立刻下載該 component 的 JS 並綁定 event。
        - 例：深色模式切換按鈕 `ThemeToggle`
    - `client:idle`：等瀏覽器把其他重要的東西都畫完，處於閒置狀態時，才偷偷下載 JS 並綁定。
        - 例：側邊欄的 `MenuIcon`
    - `client:visible`：一開始完全不理它。直到使用者往下捲動，這個 DOM 節點即將出現在畫面上時，才緊急下載 JS 進行 Hydration。
        - 例如：網頁最底部的評論區 `<Comments client:visible />`

:::





:::default
## 舉例
:::

以這份 markdown 為例：

```markdown
---
title: Markdown 數學公式測試
link: test-latex
catalog: true
date: 1970-01-01
categories:
  - 雜項
---

[这段文字会有彩虹渐变效果]{.rainbow}

## 行內公式 (Inline Math)

這是一個行內公式 $a^2 + b^2 = c^2$。
```


> STEP 1：Zod 進行 Schema 驗證

經過 Zod 驗證 schema 後的 metadata：
```json
{
  "title": "Markdown 數學公式測試",
  "link": "test-latex",
  "catalog": true,
  "date": 1970-01-01T00:00:00.000Z, // 字串已被轉為標準 Date 物件
  "categories": [
    "雜項"
  ]
}
```
這個物件隨後會被包裝成 `post.data` 供頁面使用。markdown 內文則是交給 Remark 轉成 MDAST。






> STEP 2：Remark 解析 Markdown 轉成 MDAST

Remark 轉換後的 MDAST：
```json
{
  "type": "root",
  "children": [
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "value": "[这段文字会有彩虹渐变效果]{.rainbow}" }
      ]
    },
    {
      "type": "heading",
      "depth": 2,
      "children": [{ "type": "text", "value": "行內公式 (Inline Math)" }]
    },
    {
      "type": "paragraph",
      "children": [
        { "type": "text", "value": "這是一個行內公式 " },
        // remark-math 成功識別出這是一個行內公式節點
        { "type": "inlineMath", "value": "a^2 + b^2 = c^2" },
        { "type": "text", "value": "。" }
      ]
    }
  ]
}
```





> STEP 3：Rehype 將 MDAST 處理成 HAST

Rehype 處理後的 HAST：
```json
{
  "type": "root",
  "children": [
    {
      "type": "text",
      "value": "\n"
    },
    {
      "type": "element",
      "tagName": "p",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "\n  "
        },
        {
          "type": "element",
          "tagName": "span",
          "properties": {
            "className": [
              "rainbow"
            ]
          },
          "children": [
            {
              "type": "text",
              "value": "这段文字会有彩虹渐变效果"
            }
          ]
        },
        {
          "type": "text",
          "value": "\n"
        }
      ]
    },
    {
      "type": "text",
      "value": "\n\n"
    },
    {
      "type": "element",
      "tagName": "h2",
      "properties": {
        "id": "1-行內公式-inline-math"
      },
      "children": [
        {
          "type": "text",
          "value": "\n  1. 行內公式 (Inline Math)\n  "
        },
        {
          "type": "element",
          "tagName": "a",
          "properties": {
            "className": [
              "anchor-link"
            ],
            "href": "#1-行內公式-inline-math"
          },
          "children": []
        },
        {
          "type": "text",
          "value": "\n"
        }
      ]
    },
    {
      "type": "text",
      "value": "\n\n"
    },
    {
      "type": "element",
      "tagName": "p",
      "properties": {},
      "children": [
        {
          "type": "text",
          "value": "\n  這是一個行內公式 "
        },
        {
          "type": "element",
          "tagName": "span",
          "properties": {
            "className": [
              "katex"
            ]
          },
          "children": [
            {
              "type": "text",
              "value": "...渲染後的公式..."
            }
          ]
        },
        {
          "type": "text",
          "value": "。\n"
        }
      ]
    },
    {
      "type": "text",
      "value": "\n"
    }
  ]
}
```


> STEP 4：靜態 HTML 字串輸出（Astro Build）


```html
<p>
  <span class="rainbow">这段文字会有彩虹渐变效果</span>
</p>

<h2 id="行內公式-inline-math">
  行內公式 (Inline Math)
  <a class="anchor-link" href="#行內公式-inline-math"></a>
</h2>

<p>
  這是一個行內公式 <span class="katex">...渲染後的公式...</span>。
</p>
```



:::default
## 附錄：`CustomContent.astro` 做了哪些事情
:::

這份模板裡面的 `src/components/common/CustomContent.astro` 主要負責兩大塊任務：
- 在伺服器端（Astro Build 時）的 components 注入與包裹
- 以及在客戶端（瀏覽器執行時）的 Hydration。


:::info
**`CustomContent.astro` 在 server 端的處理**

- 幫 MDX 檔案注入 components：Astro 允許在 MDX 檔案中使用自訂 components（例如我自己寫的 Mark, Note, Reference）。可以把這些 components 統一塞在一個物件（例如 `globalComponents`，然後在渲染 `<Content />` 時傳進去。也就是說 MDX 在被編譯成 HTML 時，遇到對應的標籤就會自動使用這些寫好的 Astro components 來渲染。
    ```astro
    const globalComponents = {
      Mark,
      mark: Mark,
      Note,
      note: Note,
      Reference,
      reference: Reference,
    };
    ...
    ---
    <div ...>
      {Content ? <Content components={globalComponents} /> : <slot />}
    </div>
    ```
- 載入外部資源：比如 Remixicon 的字體檔。
- 增強 React-based 的 content。
    - `ContentEnhancer`：為程式碼區塊加上「複製按鈕」與「全螢幕按鈕」、啟動測驗題、處理加密區塊等等複雜互動。
        ```astro
        {/* React-based content enhancement (code blocks, mermaid, infographic toolbars) */}
        {finalConfig.enhanceCodeBlock && (
          <ContentEnhancer
            client:idle
            enableCopy={finalConfig.enableCodeCopy}
            enableFullscreen={finalConfig.enableCodeFullscreen}
            enableQuiz={finalConfig.enableQuiz ?? true}
            enableEncryptedBlock={finalConfig.enableEncryptedBlock ?? false}
          />
        )}
        ```
    - `EmbedHydrator`：負責處理 Twitter (X) 等需要外部腳本支援的嵌入卡片：
        ```astro
        {finalConfig.enableTweetEmbed && <EmbedHydrator client:load />}
        ```
:::


:::info
**`CustomContent.astro` 在 client 端的處理**

- 動態載入防雷特效 (`spoilerjs`)：Lazy load `spoilerjs`，有 `<spoiler-span>` 標籤才會下載。
- 外部連結處理 (`addBlankTarget`)：找出所有以 http 或 // 開頭的超連結，強制加上 `target="_blank"`，讓使用者點擊外部連結時會自動開新分頁。
- 平滑捲動 (`smoothScroll`)：攔截所有指向頁面內部錨點的連結（例如 `<a href="#標題">`），將預設的瞬間跳轉改為 `scrollIntoView({ behavior: 'smooth' })` 的平滑滑動，並同時更新網址列的 hash。
- 注入標題層級標籤 (`addHeadingLevel`)：抓出所有的 h1 ~ h6，幫它們加上 `data-level="H1"` 這種屬性。這通常是為了配合 CSS 樣式，在標題旁邊顯示一個小小的 "H1" 或 "H2" 標記（這個我現在拔掉了）。
- 圖片與連結預覽增強 (`enhanceImages`, `enhanceLinkPreviews`)：呼叫外部匯入的函式來處理圖片的載入狀態（例如加上 loading 動畫或處理載入失敗的破圖）。
- 分頁標籤切換邏輯 (`Tab Group`)：處理 Shoka 的 `;;;tab` 語法。
- 模糊防雷點擊解鎖 (Blur Spoiler)：針對 `!!劇透!!{.blur}` 這種語法生成的 `<span class="spoiler blur">`，綁定 click event。點擊後會加上 `.revealed class`，用 CSS 將模糊效果移除。
:::

