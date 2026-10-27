# 內文樣式與元件規格

## 0. 最終決定（優先於下文）

本節是後續與使用者確認的決定。第 1 節以後取自 Obsidian 主題的數值是**視覺參考**；與本節衝突時，以本節為準。

### 字型

| 用途 | 字型 | 備註 |
| --- | --- | --- |
| 內文 | Noto Sans TC Light（300）；強調用 Medium（500） | 中英文皆用 Noto Sans TC。細字需確保文字與背景對比足夠，字級不小於 17px，行高 1.7–1.8 |
| H2–H6 | TeX Gyre Pagella Bold（拉丁）＋ Noto Serif TC Bold（中文） | 字型堆疊中 Pagella 在前，中文回退 Noto Serif TC |
| 程式碼 | Sometype Mono（Regular、SemiBold，含斜體） | 無中文字形；註解中的中文回退 Noto Sans TC，不保證與英文對齊 |
| 日期、字數、閱讀時間 | Sometype Mono | 文章列表卡片上的資訊列 |
| 側欄導覽、分類標籤 | Rubik Regular | 導覽項目字距加寬（見「版面」） |
| 網站標語 | Noto Sans TC Regular | 側欄網站名稱下方 |
| H1（頁面標題） | 黑板粉筆手寫圖片 | 見下方「H1 與分類圖示」 |
| 數學公式 | KaTeX 預設字型 | 與 Pagella 的風格差異可接受 |

第 1 節表格中的 Hiragino Mincho ProN 與 CodeNewRoman Nerd Font Mono 是 Obsidian 內的設定，**網站不採用**。

### 標題

- 筆記檔案只在最上方有一個 `# 標題`，即文章標題，也是頁面唯一的 H1。渲染時取它當文章標題，不在內文重複顯示。其餘段落標題從 H2 開始。
- H2–H6 的拉丁字母使用小型大寫（`font-variant-caps: small-caps`）：大寫維持大寫，小寫顯示為小型大寫，例如「I. Compiling a Custom Linux Kernel」。TeX Gyre Pagella 的 OpenType 有 `smcp` 功能，須使用字型內建的 small caps 字形，避免瀏覽器合成的假 small caps。製作 webfont 子集時須保留 `smcp` 功能與對應字形。
- 中文不受影響。標題內的數學公式（KaTeX）不可套用 small caps 或 text-transform，`\alpha`、`\beta`、`n` 等須維持原字形。
- H2 下方有一條分隔線（沿用 Obsidian 的 H2 underline 外觀）。

### H1、分類名稱與分類圖示

- 固定的頁面標題（網站名稱、Articles、About Me、Categories、Archives）使用黑板粉筆手寫字圖片；手寫圖完成前，暫用 TeX Gyre Pagella Bold。`<h1>` 內須保留真實文字，供 SEO、分頁標題與螢幕閱讀器使用，圖片僅為視覺呈現。
- 文章標題使用 Pagella ＋ Noto Serif TC 的大字級。frontmatter 可選填 `titleImage`，有指定時改用手寫圖。
- 網站名稱的手寫圖已完成：`ginos-blog.webp`（白色粉筆字、透明背景）。
- **分類名稱**在 Categories 頁的卡片上使用黑板手寫字圖片，檔案為 `categories/<網址代稱>.webp`，`categories/dims.json` 記錄各圖寬高。所有圖片已依小寫字母高度（x-height）統一縮放，網站上以同一個比例顯示，字看起來才會一樣大。目前完成 12 張；Miscellaneous 尚未寫，部分字之後會重寫（見第 6 節）。沒有手寫圖的分類暫用 TeX Gyre Pagella Bold。分類名稱的 `<h2>` 內同樣保留真實文字。
- 手寫圖在網站上以 CSS `mask-image` 載入，`background-color: currentColor`，因此 light 與 dark mode 都跟著文字顏色變色，不需另做深色版本。
- **分類圖示**已完成，共 13 個，檔案為 `category-icons/<網址代稱>.svg`：24×24 網格、1.6 線寬、圓角線頭，`stroke="currentColor"`，直接 inline 進 HTML 即跟著文字顏色變色。圖示出現在文章列表卡片的標題左側、Categories 頁的分類卡片名稱旁，以及單一分類頁的頁首。之後會另外加上粉筆質感的 SVG 濾鏡版本。

### 分類

分類固定為兩層：第一層分類 → 第二層分類 → 文章。不會有第三層。第二層可省略，文章可以直接放在第一層分類底下。

第一層分類（每篇文章只屬於一個）：

| 第一層分類 | 網址代稱 |
| --- | --- |
| Operating System | `operating-system` |
| Computer Organization | `computer-organization` |
| DS, Algorithms | `ds-algo` |
| Linear Algebra | `linear-algebra` |
| Discrete Mathematics | `discrete-mathematics` |
| Parallel Programming | `parallel-programming` |
| Compiler (Frontend) | `compiler-frontend` |
| Formal Language | `formal-language` |
| Language Learning | `language-learning` |
| Other Course Notes | `other-course-notes` |
| Life Logs | `life-logs` |
| Rhythm Game | `rhythm-game` |
| Miscellaneous | `miscellaneous` |

第二層分類由使用者自訂，例如 Operating System 底下的 Linux Kernel、Virtual File System、I/O and Interrupt、Synchronization、Deadlock。

Obsidian vault 會整理成相同的資料夾結構：`<第一層分類>/<第二層分類>/<筆記>.md`。分類由資料夾路徑決定，不另外寫在 frontmatter。網站不使用 tags。

### Frontmatter

```yaml
---
date: "2026-07-01T01:53:46+08:00"
description: 文章簡介，顯示在文章列表卡片，也作為 meta description。
publish: true
---
```

| 欄位 | 說明 |
| --- | --- |
| `date` | 第一次完稿的時間，帶時區，以字串保存。顯示為 `2026-07-01 01:53:46`。之後的小幅修改不更新。 |
| `description` | 文章簡介。未填時，取內文第一段的開頭。 |
| `publish` | `true` 才會同步到網站。 |
| `updated` | 選填。只在重大修改時手動填寫；有值時，文章頁顯示「更新於」。 |
| `titleImage` | 選填，手寫標題圖。 |

文章標題取自內文最上方的 `# 標題`，不寫在 frontmatter。字數與閱讀時間由網站 build 時計算，不寫在 frontmatter。

### 色彩

- 概念為「黑板與粉筆」。dark mode 為預設，主背景色 `#0a1624`；light mode 為「紙張與墨水」。
- 由 `#0a1624` 延伸出：表面層（側欄、卡片、callout、程式碼區塊、行內程式碼）、邊框、正文色、次要文字色。
- 強調色、連結，以及 callout 語意色，採粉筆色系；`[!aside]`、`[!reference]` 維持低彩度。callout 須涵蓋 Obsidian 全部內建類型（筆記中實際使用到 note、abstract、info、todo、tip、success、question、faq、warning、failure、danger、bug、example、quote），以色彩分組即可，建議至少分為：
  - 藍：note、info、todo
  - 青：abstract（summary、tldr）、tip（hint、important）
  - 綠：success（check、done）
  - 黃：question（help、faq）、warning（caution、attention）
  - 紅：failure（fail、missing）、danger（error）、bug
  - 紫：example
  - 灰：quote（cite）
  - 未知類型（例如 `[!notes]`）比照 note。
- callout 的**外觀完全比照使用者 Obsidian 中的樣子**。Things 主題沒有自訂 callout，因此即 Obsidian 內建的預設 callout 樣式，只把顏色換成本色票：
  - 標題列：左側為該類型的 Lucide 圖示，接著是標題文字，兩者皆為該類型的顏色，標題加粗；未寫標題時顯示類型名稱（例如 Note）。
  - 底色為該類型顏色的低透明度（約 10%），不加外框。
  - 小圓角、內距適中；可摺疊的 callout 在標題列右側顯示展開箭頭。
  - 不使用「NOTE · 筆記」這類全大寫標籤或雙語標籤。
- 圖片比照 Things 的「Image card」：4px 圓角，加一層淡陰影。
- 粗體、斜體與 H2–H5 不另外上色，與正文同色；H6 用次要文字色。引用維持第 1 節的青色系，明度與彩度依新背景調整。
- 第 1 節的 `#303540`、`#282c34` 是配合 Obsidian 主題背景的數值，不直接沿用，改由主背景色延伸。
- 所有文字與背景的組合需符合可讀對比，內文使用 Light 字重時尤其要注意。

### 版面與頁面範圍

版面結構與密度參考 `wiwiho-blog-reference`；使用者另提供 PowerPoint 草圖。頁面範圍：Articles（首頁）、文章頁、About Me、Categories（兩層）、Archives。沒有 Tags 頁。

#### 側欄（桌機在左側）

由上而下：
1. 網站名稱「Gino's Blog」靠左（之後換成手寫圖）；同一行右側是深淺色切換按鈕，位置比照 `wiwiho-blog-reference` 的月亮圖示。
2. 標語「心之所向，身之所往。」，靠左，Noto Sans TC Regular。
3. 導覽：Articles、About Me、Categories、Archives，各有一個 Remix Icon。Rubik，字距加寬。目前頁面的高亮方式比照 `wiwiho-blog-reference`：左側一條強調色直條、淡色背景、文字與圖示改為強調色。

側欄不放社群圖示。手機版比照 `wiwiho-blog-reference`：側欄收合為頂部固定列，以選單按鈕展開導覽。

#### 文章列表卡片（Articles 頁與分類頁共用同一個元件）

- 第一行：完稿時間（`2026-07-01 01:53:46`，Sometype Mono，次要文字色）＋分類路徑（`# Computer Organization ▷ Cache`，Rubik Regular，強調色）。分類路徑為「第一層 ▷ 第二層」；沒有第二層分類的文章只顯示第一層，例如 `# Life Logs`。Rubik 沒有 `▷` 字元，會回退到其他字型；若大小或基線與兩側不一致，改用 Remix Icon `ri-arrow-right-s-line` 或 `›`。
- 第二行：左側分類圖示，右側文章標題（TeX Gyre Pagella Bold ＋ Noto Serif TC Bold）。
- 第三行：文章簡介（frontmatter `description`，次要文字色，約兩行），與標題左緣對齊。
- 右下：字數與閱讀時間（`520 Words | Read Time: 6min`，Sometype Mono，強調色）。由網站 build 時自動計算：中文按字數、英文按單字數。
- 整張卡片可點擊；滑鼠移上去時，整張卡片顯示淡色背景高亮。
- 不使用 Read More 連結。

字級比例取自 PowerPoint 草圖（pt），以文章簡介為基準換算；簡介建議 16px：

| 元素 | 草圖字級 | 相對簡介 | 簡介為 16px 時 |
| --- | --- | --- | --- |
| 頁面標題「Articles」 | 20 | 2.5 | 40px |
| 文章標題 | 12 | 1.5 | 24px |
| 文章簡介 | 8 | 1 | 16px |
| 完稿時間、分類標籤 | 7 | 0.875 | 14px |
| 字數與閱讀時間 | 6 | 0.75 | 12px |

#### Categories 頁（第一層）

- 第一層分類以圖片卡片網格呈現（版面參考 `sketch.pptx` 第 3 張的舊站「精選分類」）：每張卡片有背景圖、分類名稱與分類圖示，可顯示文章數。分類圖示放在名稱旁，高度與名稱文字相同。
- 背景圖的風格由設計稿提出，需搭配黑板與粉筆的整體視覺；舊站那種可愛的二次元插畫不沿用。
- 手機版改為單欄。

#### 單一分類頁（點進第一層分類後）

- 頁首：分類圖示、分類名稱、文章總數，以及返回 Categories 的連結。
- 內容依第二層分類分組，**不使用巢狀或摺疊**，全部平鋪在同一頁：每組以一條細分隔線開頭，分組名稱置中嵌在線上，例如 `———— Linux Kernel ————`，下方直接列出該組文章。
- 文章使用與 Articles 頁相同的卡片元件。
- 沒有第二層分類的文章放在最後，歸入名為 Others 的分組，同樣以分隔線標示（不叫 Miscellaneous，以免與同名的第一層分類混淆）。
- 分組數量多時，可在頁首提供一排第二層分類的跳轉連結。
- 第二層分類之間、同一組內的文章，都依名稱自然排序（`2` 排在 `10` 前面）；Others 固定在最後。

#### 文章頁

- 內文＋目錄；桌機目錄在右側並固定（sticky），手機收合至文章頂部。

#### About Me

- 使用 ItemCard、ItemCards、Person、People（見第 3 節），屬於網站頁面，不經 Obsidian 同步。

#### Archives

- 依年份分組列出所有文章，版面參考 `wiwiho-blog-reference/html/archives.html`。

#### 字距換算

PowerPoint 草圖中的「字元間距加寬 0.8 pt」是絕對值。CSS 改用相對單位：`letter-spacing = 0.8 ÷ PowerPoint 的字級（pt）`，單位為 `em`。

- 頁面標題「Articles」（草圖 20 pt）：`letter-spacing: 0.04em`。
- 側欄導覽（Rubik）：同樣加寬 0.8 pt，依草圖字級換算。

## 1. 設計方向（已確認）

使用者喜歡目前 Obsidian 的內文樣式，表格需要重新設計。讓筆記使用 Markdown 與 Obsidian 友善語法，之後能由同步腳本轉成部落格內容。一般文章不應要求手寫 MDX 元件。

深色參考以 Things 2.2.4 加 `my-own.css` 為準。以下數值取自主題檔，為設計起點，並非整個執行中畫面的 computed styles。字型、背景與程式碼底色以第 0 節為準：

| 項目 | 原始設定 |
| --- | --- |
| 粗體、斜體 | `#ff82b2`（網站不採用，與正文同色） |
| 引用文字 | `#3eb4bf`，文字為斜體 |
| H3 | `#2e80f2`（網站不採用，與正文同色） |
| H4 | `#e5b567`（網站不採用，與正文同色） |
| H5 | `#e83e3e`（網站不採用，與正文同色） |
| H1、H2 / H6 | 正文色 / 次要文字色 |
| H1–H6 字級 | 1.7、1.5、1.2、1.1、1、0.9 rem |
| 主題內文寬度 / 行高變數 | 40rem / 1.5（網站內文行高改為 1.7–1.8，見第 0 節） |
| 深色行內程式碼 / 程式碼區塊背景 | `#303540` / `#282c34`（網站不沿用，見第 0 節） |
| 正文、介面字型 | Hiragino Mincho ProN（僅 Obsidian，網站不採用） |
| 等寬字型 | CodeNewRoman Nerd Font Mono（僅 Obsidian，網站不採用） |

Style Settings 中 fancy-code、fancy-highlight 啟用；H1–H6 small-caps 啟用；H1 underline 啟用，H2 no-underline 關閉。標題拉丁文字可保留這個外觀，但數學公式不可繼承 small-caps 或 text-transform。網站的標題規則見第 0 節「標題」：小型大寫只用於 H2–H6。

### 公式與文字顏色（已確認）

- 網站上粗體、斜體不另外上色（見第 0 節），因此 `**Claim. $T$ 中每個點都被 $M$ 蓋到。**`、`*文字與 $x$*` 內的公式維持正文色。
- `> 引用與 $x$` 的公式繼承引用配色。
- 引用內的粗斜體同樣維持引用配色。
- 一般公式保持一般文字色；LaTeX 明確寫出的 `\color` 保留。
- 標題中的 `\alpha`、`\beta`、`n` 不可變成大寫或小型大寫字形。
- 現有 Live Preview CSS 用相鄰文字判斷粗斜體，因此只有 `**$x$**` 的情況仍有限制。新 blog 應從語法樹保留強調關係，完整支援純公式強調。

## 2. 表格（已確認核心）

- 使用標準 Markdown 表格，不保留舊 Table 元件。
- 表格整體水平置中；預設依內容決定寬度。
- `:---`、`:---:`、`---:` 分別控制每欄文字靠左、置中、靠右；未指定時靠左。
- 不做滿寬模式或滿寬切換。
- 可用緊鄰表格前的註解指定每欄寬度，例如 `<!-- table: widths=8em,20em,6em -->`。
- 不以 `-` 的數量控制欄寬，避免編輯器格式化改變版面。
- 保留表格內的連結、粗斜體、行內程式碼與行內公式。

### 實作建議（本次整理補充，非既有 parser）

註解只作用於下一個表格，中間允許空白行，不能跨過其他內容。第一版可支援正值 `em`、`rem`、`px` 與 `auto`。欄寬數量應與欄數一致；無效設定回退自動排版並給作者提示。較長文字允許換行，不可換行內容可撐大指定寬度，因此欄寬視為排版目標；超過手機版心時，由表格容器水平捲動，避免整頁溢出。請呈現短表、長文字、指定欄寬與窄螢幕狀態。

Markdown 本身不解讀此註解。blog 需 parser/AST 擴充，Obsidian 若要依此改欄寬也需要外掛或其他解析步驟，純 CSS 無法讀取 Markdown 註解後套用任意欄寬。

## 3. 元件取捨（已確認）

| 舊元件 | 新方向 |
| --- | --- |
| InfoBox | 捨棄原設計，使用 Obsidian callout |
| Note | 保留，`[!aside]`；小字、低彩度，簡潔 Note 標籤與補充內容 |
| Reference | 保留，`[!reference]`；小字、低彩度，Reference 標籤與來源內容 |
| Mark | 捨棄，用 `==文字==` |
| Ruby | 保留，`{漢字|かんじ}`；字上方顯示讀音 |
| Table | 捨棄舊元件，採第 2 節表格規則 |
| Image | 支援置中與百分比寬度，見下節 |
| Columns | 捨棄 |
| Tabs | 保留；Obsidian 可依序展開內容，blog 呈現頁籤 |
| Slider | 保留；Obsidian 可依序展開內容，blog 呈現步驟切換 |
| ImageCarousel | 保留；Obsidian 可依序排列圖片，blog 呈現輪播 |
| Splitter、SplitterCenter | 捨棄 |
| Staff | 保留，以 abc 程式碼區塊記譜 |
| Link | 保留連結預覽卡 |
| ItemCard、ItemCards、Person、People | 僅 blog，主要用於 About Me |
| CollapseBlock | 捨棄，使用可摺疊 callout（`> [!note]-` 預設收合、`> [!note]+` 預設展開） |

`legacy-components/` 內的舊原始碼只用來說明有哪些元件與其用途，新設計不沿用舊程式碼與樣式。

### 圖片

已確認用 `![[image.png|center|60%]]` 表示置中且寬度占所在內文容器 60%，預設靠左。百分比相對於內容容器，不是視窗。保留原圖長寬比例。

目前 my-own.css 支援帶 center 的置中，不代表 Obsidian 已有百分比寬度解析。新 blog 和 Obsidian 都需要額外解析此寫法，不能直接當成原生功能。使用者提及的「比例」指百分比縮放；不提供 16:9 等裁切。

純數字參數是 Obsidian 原生的像素寬度，例如 `![[image.png|center|400]]` 表示寬 400px（仍不超過容器寬度），既有筆記大量使用，須支援。

圖說寫在參數最後，例如 `![[cache.png|center|60%|cache line 的結構]]`。不是 `center`、百分比或純數字的參數視為圖說，顯示在圖片下方，同時作為替代文字；沒寫則不顯示圖說。全站圖片皆可點擊放大檢視。

設計建議：最大寬度不超過所在容器、提供有意義的替代文字與可選圖說；手機保留清楚可讀的展示。舊 Image 的手機自動加 30 個百分點、深淺色圖片切換功能尚未被確認要延續。

### 自訂清單符號

筆記沿用 Minimal／Things 主題的核取方塊慣例，把清單項目當成帶圖示的標記，不是待辦事項：

| 寫法 | 意義 | 呈現 |
| --- | --- | --- |
| `- [i]` | 資訊、舉例 | 資訊圖示 |
| `- [k]` | 重點 | 鑰匙圖示 |
| `- [p]` | 正面、贊成；是非題的 True | 讚圖示 |
| `- [c]` | 負面、反對；是非題的 False | 倒讚圖示 |
| `- [ ]`、`- [x]` | 一般待辦 | 一般核取方塊 |

網站上以圖示取代核取方塊，不可點擊勾選；圖示用 Remix Icon，各自帶語意色。Things 主題還定義了其他字母（`!`、`?`、`*`、`<`、`>`、`b`、`d`、`f`、`l`、`u`、`w`、`I` 等），目前筆記未使用，可先不設計。

### Ruby

採 `{漢字|かんじ}`，輸出語意化 `<ruby>` / `<rt>`。讀音較小且置於正上方，連續注音文字要保持可讀行距。表格內需避免 `|` 被當成欄分隔，示例採 `{漢字\|かんじ}`。解析器應跳過 code 和 math，並處理跳脫。此語法仍需 Obsidian 外掛與 blog parser 實作／整合。使用者確認保留此寫法，Obsidian 外掛由使用者自行實作。

### Tabs、Slider、ImageCarousel

以 callout 表達內容：`[!tabs]`、`[!slider]` 搭配巢狀 `[!panel]`；輪播使用 `[!carousel]` 包圖片。

- Obsidian 允許顯示成依序排列的 callout/圖片，所有內容都可閱讀。
- blog Tabs 顯示標題列與選中面板。
- blog Slider 顯示前後切換與步驟數，可承載文字、程式碼、公式及圖片。
- blog Carousel 顯示圖片切換及目前位置。
- Slider 不循環；Carousel 循環（最後一張的下一張回到第一張）。
- Slider 與 Carousel 的切換效果可逐組設定：直接切換（預設），或短暫的淡入淡出（cross dissolve）。以 callout metadata 指定，例如 `> [!carousel|fade]`、`> [!slider|fade]`。演算法演示適合直接切換，生活照片適合淡入淡出。
- Carousel 高度固定為該組最高的圖片，圖片保持原比例置中，不裁切，避免切換時頁面跳動。
- Slider 與 Carousel 內的圖片同樣可點擊放大檢視。
- 鍵盤可操作、焦點可見、窄螢幕可用；同頁多組互不干擾；不自動播放。

### Staff、Link、置中內容

- `abc` fenced code block 表達樂譜；blog 渲染樂譜，Obsidian 需對應外掛才能呈現，不是現有 CSS 功能。
- `[!link]` 包含 URL，blog 可顯示標題、網域、摘要與預覽圖。資料取得失敗時仍能開啟原連結。
- `[!center]` 讓內容置中並保留 Markdown/公式，隱藏標題、圖示、邊框與背景。這部分已存在 my-own.css。
- callout 的 `+` / `-` 折疊行為應有對應呈現。

## 4. DOT 圖表參考

目前 Graphviz View 以圖片形式嵌入 SVG，外部 CSS 無法直接改 SVG 內的節點與邊。my-own.css 只將 dot 圖整體置中。

先前討論的共同 DOT preamble 尚未實作。若 blog 要統一圖表樣式，建議渲染前在圖內注入預設屬性，再保留每張圖的 highlight 覆寫。單純重設全部節點顏色會破壞綠／藍節點、粉紅匹配邊等語意。這屬圖表管線工作，不能在設計稿中假裝改 CSS 已經完成。

## 5. 希望設計稿涵蓋的狀態（整理建議）

文章展示頁包含 H1–H6、一般文字、連結、所有強調格式、引用、callout（含折疊與巢狀）、清單、程式碼、公式、表格、圖片、Note、Reference、Ruby、Tabs、Slider、Carousel、樂譜與連結卡。另展示 About Me 卡片，以及帶分類圖示的文章列表卡片。自訂清單符號與各類 callout 也要呈現。內容可直接使用 `blogpost-example/` 的兩篇真實文章，其中涵蓋 callout、自訂清單符號、標題內公式、圖片與 ASCII 圖。

請用同一份長文內容展示桌面與手機排版，尤其處理長公式、長程式碼、寬表格與樂譜。dark mode（主背景 `#0a1624`）為預設；light mode 依第 0 節「紙張與墨水」方向提出搭配方案。

## 6. 待決事項

- 分類名稱手寫字：部分要重寫，Miscellaneous 尚未寫。
- 每個第一層分類卡片的背景大圖（使用者會先挑圖片當 placeholder）。
- Categories 頁網格欄數：三欄時，Computer Organization 等長名稱的手寫圖須縮得比其他小，無法維持一致的字級；兩欄可用同一比例放下全部名稱。
- 分類圖示的粉筆質感版本（SVG 濾鏡）。