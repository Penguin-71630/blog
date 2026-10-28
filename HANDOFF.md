# Handoff — Gino's Blog（Astro 新版）

更新：2026-10-25｜branch：`claude-design`｜已 push（`6bbcb20` 之後）

**下一步**：做「之後的移植順序」第 3 步：Categories、Archives、About Me。

> 給接手的 session：使用者正在忙學校作業，回覆請**簡短、一次只問一件事**，用繁體中文。

## 已完成

- **專案**：repo 根目錄是 Astro 7.4.2 minimal 範本，用 pnpm。`pnpm build` 成功。
- **設計稿**：`design/` 是 Claude Design 匯出的原型，只當參考，不會打包。
  - 開原型：`python3 -m http.server 8765 -d design`，再開 `/ui_kits/blog/`
  - `design/readme.md` 有完整的設計規範
  - `design/DESIGN-SPEC.md` 是使用者的原始規格（§0 優先於其他段落），分類代稱、frontmatter 都以這份為準
- **樣式**（`src/styles/`）：
  - `colors`、`typography`、`spacing`、`prose`、`components` 從 `design/` 照抄
  - 唯一改動：中文字型名稱改用 `var(--font-noto-sans-tc)`、`var(--font-noto-serif-tc)`
  - 入口是 `global.css`，由 `src/layouts/BaseLayout.astro` 引入
- **非中文字型**：Pagella、Rubik、Sometype Mono 放在 `public/fonts/`，`@font-face` 在 `src/styles/fonts.css`
  - Rubik 彎引號那段（`GB Latin Quotes`，`U+2018-201F`）保持原樣，排在 `--font-body` 第一位
- **KaTeX**：從 npm 引入（`katex`）
- **圖示**：`src/components/Icon.astro` 內嵌 SVG
  - 只收錄設計用到的 21 個 Remix 和 14 個 Lucide，清單在 `src/icons/index.ts`
  - 用法：`<Icon name="ri-article-line" />`、`<Icon name="icon-pencil" />`
- **中文字型（已定案）**：cn-font-split 依字頻切 Noto `.ttf`，自架在 `public/fonts/cjk/`
  - `scripts/build-cjk-fonts.mjs`：`pnpm build` 每次都會先跑；`pnpm dev` 只在 `cjk.css` 不存在時跑；也可以單獨跑 `pnpm fonts:cjk`
  - 字頻來源：只看 `src/content/`，因為 build 環境沒有 Obsidian vault。目前還沒有這個資料夾，所以先用 cn-font-split 的預設排序
  - 原始字型：從 google/fonts 下載固定 commit 的版本，並驗證 sha256（版本寫在腳本的 `FONTS` 裡）
  - 用 fontTools（`requirements.txt`）把可變字重裁成 Sans `300:500`、Serif `400:700`，快取在 `node_modules/.cache/cjk-fonts/`
  - 產出 `src/styles/cjk.css` 和 hash 檔名的 woff2，**兩者都在 `.gitignore`，不 commit**
  - `font-display: swap` ＋ fallback（PingFang TC／Songti TC 等）套 Noto 的 ascent/descent，實測換字型前後行高一致
  - Astro Fonts API 和 `<Font />` 已移除
  - cn-font-split 的 postinstall 會去查最新版本，但這一步不穩定，常常查不到。所以腳本會檢查原生程式庫在不在，不在就自動裝固定版本 7.6.8
- **測試頁**：`src/pages/dev/fonts.astro` 是暫時的字型檢查頁，正式頁面做好後刪除
- **Layout（第 1 步已完成）**：新增 `src/components/layout/`、`src/layouts/SiteLayout.astro` 和 `src/styles/layout.css`；桌面側欄、手機頂列／抽屜與 footer 由 CSS 在 768px 切換。
- **Articles 與文章頁（第 2 步已完成）**：使用 `src/content/posts/` 作為 Astro content collection，`src/lib/markdown/` 處理 Obsidian 語法、數學、圖片、callout、表格與程式碼；首頁列出發布文章，文章頁包含 SeriesTree 和 TOC。
  - Vault 是唯讀來源；更新筆記後執行 `pnpm sync:vault <vaultDir>`，再重新 build。
  - 修改 remark／rehype plugin 後，先清除 Astro content cache：`rm -rf node_modules/.astro`，再 build。
  - 目前同步 `/home/ubuntu/vault/v` 後有 44 篇發布文章和 170 個附件。

## 字型量測結果

- 5 篇筆記（Markdown 原文估算）平均：Google 34 個／2.3 MB → cn 字頻 58 個／1.5 MB；cn 預設排序 90 個／2.8 MB（排除）
- 測試頁實測（瀏覽器）：Google 19 個／1.3 MB → cn 字頻 37 個／938 KB
- 全站 CSS：376 KB（gzip 後 112 KB），只下載一次，跨頁快取；原本每頁內嵌約 76 KB（gzip 後）
- 字重正確（300/500、400/700 都在可變範圍內），彎引號是 Rubik，dist 沒有 Google 網域

## 部署（Cloudflare Pages）

- 設定：Build command `pnpm build`、Output directory `dist`
  - 版本由 `.node-version`（22.23.4）和 `package.json` 的 `packageManager`（pnpm 10.28.0）固定
  - `requirements.txt` 放在根目錄，Pages 會自動 `pip install`
- 已在 Ubuntu 22.04 x86_64 容器模擬過，和 Pages build 映像同版本：
  - `pip install -r requirements.txt` → `pnpm install --frozen-lockfile` → `pnpm build` 全部成功，約 70 秒
  - 原生程式庫需要 glibc ≥ 2.30，映像是 2.35
  - 產出 505 個分包，遠低於 Pages 單站 20,000 個檔案的上限
- 還沒在真正的 Pages 上跑過。第一次部署如果失敗，改用 GitHub Actions：build 完再用 `wrangler pages deploy dist` 上傳
- 部署暫時跳過，先完成網站移植。

## 待決定

- 可以把前段分包切大一點，減少分包數，還沒測

## 之後的移植順序

1. [x] layout：側欄、手機頂部列、footer、stub pages
2. [x] Articles 列表和文章頁，用 content collections ＋ Markdown
3. Categories、Archives、About Me
4. 內文元件：Callout、Figure、KaTeX 等

## 注意

- `.claude/launch.json` 有三組設定：`astro`（4321）、`astro-preview`（4322）、`design`（8765）。但 preview 工具曾經誤用舊設定，必要時直接在 Bash 跑 `pnpm preview --port 4322`。
- 中文字型的原始規格見 Claude chat 給的 prompt：字重、不 preload、`_headers`、不動其他字型、驗收項目。
