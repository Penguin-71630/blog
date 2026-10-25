# Gino's Blog — Design System

Personal technical blog, Traditional Chinese with plenty of English terms mixed in. Content: CS study notes (Operating System, Computer Organization, Algorithms, Discrete Mathematics…), competitive programming, and life logs. Notes are written in **Obsidian** and synced by script to an **Astro** static site. One product surface: the blog website (Articles / post / About Me / Categories (2 levels) / Archives — no Tags page).

Visual concept: **黑板與粉筆 (chalkboard & chalk)** — dark mode is the default, page bg fixed at `#11161d`. Light mode is **紙張與墨水 (paper & ink)**.

## Sources
- Codebase mount `Blog/` (read-only, local folder):
  - `Blog/obsidian-blog-reference/DESIGN-SPEC.md` — **§0 is the final word**, overrides everything else. `README.md`, `SYNTAX-EXAMPLES.md`, `obsidian/` (Things 2.2.4 theme + `my-own.css`, visual reference for prose only), `legacy-components/` (old Astro components — inventory reference only, not reused).
  - `Blog/palette/palette-mint-chalk.css` — finalized palette "1b Mint Chalk" (copied verbatim into `tokens/colors.css`).
  - `Blog/blogpost-example/` — two real posts (Computer Organization/Cache, Discrete Mathematics/Graph Theory) + images → `assets/posts/`.
  - `Blog/wiwiho-blog-reference/` — friend's blog (https://wiwiho.me), built HTML/CSS + screenshots. **Layout and density only**; not its colors or fonts.
  - `Blog/sketch.pptx` — 3 layout sketches (sidebar, article list, categories). Font-size ratios and the 0.8pt tracking come from here.
  - `Blog/fonts/` — all webfonts (copied to `fonts/`).
  - `Blog/placeholders/notes.png` — category-icon / chalk-art placeholder → `assets/placeholders/notes.png`.

## Index
- `styles.css` — entry point (imports only): icon fonts + KaTeX CSS (CDN), `tokens/*`, `styles/prose.css`, `styles/components.css`.
- `tokens/` — `fonts.css` (@font-face), `colors.css`, `typography.css`, `spacing.css`.
- `styles/prose.css` — base + rendered-Markdown styles (`.gb-prose`). `styles/components.css` — `.gb-*` component classes incl. hover/focus states.
- `components/` — React primitives (namespace `window.GinoSBlogDesignSystem_e90488`).
- `ui_kits/blog/` — click-through recreation of the site (`index.html`).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `assets/` — `placeholders/notes.png`, `posts/*.png`.
- `fonts/` — Noto Sans TC, Noto Serif TC, Rubik (+italic), Sometype Mono (+italic), TeX Gyre Pagella (4 styles).
- `SKILL.md` — Agent Skill entry.

## Components
- **navigation/** — Sidebar, NavItem, ThemeToggle, MobileTopBar, TableOfContents, Pagination
- `SeriesTree` — Obsidian-style file tree of the current level-1 category, under the sidebar nav (category page + its posts only).
- **listing/** — PageTitle, ArticleCard, CategoryPath, CategoryIcon, CategoryTile, GroupDivider, ArchiveList
- **content/** (Markdown/Obsidian output) — Callout (all Obsidian types + aliases, foldable, `[!center]`), Aside (`[!aside]`), Reference (`[!reference]`), MarkerList (`- [i] [k] [p] [c]`), CodeBlock, Figure (`![[img|center|60%|caption]]` + lightbox), Table, Ruby (`{漢字|かんじ}`), Tex
- **interactive/** — Tabs (`[!tabs]`), Slider (`[!slider]`, `|fade`), Carousel (`[!carousel]`, `|fade`), LinkCard (`[!link]`), Staff (```` ```abc ````)
- **about/** — ItemCard, ItemCards, Person, People

### Intentional additions
- **Tex** — thin KaTeX wrapper so components/kits can render math; spec mandates KaTeX default fonts.
- **Pagination** — not in the spec; present in the layout reference (wiwiho) under the article list.
- **CategoryIcon, CategoryPath, NavItem, ThemeToggle** — split out of ArticleCard/Sidebar because they recur (tiles, post header, mobile bar).
- UI-kit-only **DotGraph** (renders ```` ```dot ```` with viz.js). Not a DS component: DESIGN-SPEC §4 says diagram restyling is pipeline work, so graphs render with their own colors.

## CONTENT FUNDAMENTALS
- **Language**: Traditional Chinese body text with English technical terms inline, unglossed or glossed once: 「Cache（快取）：一種高速的暫存資料儲存層…」. Titles are often English or numbered course-style: `01 Cache Fundamentals`, `3-6 1-factor (aka. Perfect Matching)`.
- **Voice**: first person, study-notes candour — 「West 原文書的證明我看不太懂，所以從縮花演算法的角度來理解」. Addresses the reader implicitly ("我們改證 contrapositive"); no marketing tone, no "you".
- **Structure**: definitions in `note` callouts, theorems in `success`, exercises in `question`, remarks in `example`. Proofs use `(⇒)` / `(⇐)` and end with ∎. Key points as `- [k]`, examples as `- [i]`, true/false as `- [p]`/`- [c]`.
- **Punctuation**: full-width CJK punctuation（，。：「」（））around Chinese; half-width inside English/code. Spaces between CJK and Latin words ("L3 Cache 是同一個 CPU…").
- **UI copy** is English and Title Case for chrome: `Articles`, `About Me`, `Categories`, `Archives`, `Miscellaneous`, `520 Words | Read Time: 6min`. Chinese for counts/hints: `共 2 篇文章`, `目錄`, `12 篇`.
- **Tagline**: 「心之所向，身之所往。」
- **No emoji.** No "Read More" links. Callout labels are never uppercase or bilingual ("NOTE · 筆記" is banned); untitled callouts show the capitalized type ("Question").
- Dates: `2026-07-01 01:53:46` (first-draft time, local, no TZ shown). Category trail: `# Computer Organization ▷ Cache`, or `# Life Log` with no 2nd level.

## VISUAL FOUNDATIONS

> **Dark-only for now.** The theme toggle is hidden (Sidebar/MobileTopBar `showThemeToggle` defaults to false). Light-mode tokens are kept for later.
- **Color**: Mint Chalk palette (accent changed to yellow chalk). Dark: bg `#11161d` → surface `#1d2630` → hover `#26303a` → border `#37414b`; text `#dae3e8`, muted `#94a8b4`, accent yellow-orange chalk `#d1c09f` (hsl 40 56% 72%; replaced the original mint). Light (paper & ink): `#f4f8fa` paper, `#13202f` ink, accent ochre ink `#534428`. All text pairs ≥ 4.5:1 (body Light 300 needs it). One accent only — links, active nav, category path, stats.
- **Never colored**: bold, italic, H1–H5 (H6 = muted). Quotes are a desaturated cyan (`--quote`) italic with a 3px left rule.
- **Chalk hues** (callouts, syntax, list markers): blue 250, cyan 200, green 150, yellow 88, red 25, purple 305, gray (chroma .012). Dark L .80 C .09; light L .48 C .11.
- **Type**: body Noto Sans TC **Light 300**, 17px/1.75; bold = Medium 500. H2–H6 TeX Gyre Pagella Bold + Noto Serif TC Bold, **real OpenType small caps** (`smcp`, `font-synthesis:none`); math inside headings keeps its glyphs. Mono Sometype Mono (code, dates, word counts). Rubik for nav and category labels with widened tracking (0.8pt ÷ pt size → 0.057em nav, 0.04em page title). Page titles: Pagella Bold 40px now, hand-drawn chalk images later (`<h1>` keeps real text).
- **List scale** (sketch.pptx, desc = 16px): page title 40, card title 24, description 16, date/category 14, stats 12.
- **Layout** (after wiwiho): centered 1024px container, 240px sticky sidebar, 32px gap; post page widens to 1240 with a sticky 200px TOC on the right (≥1180px), collapsed `<details>` TOC above the post below that. <768px: sidebar → 64px sticky glass top bar with menu.
- **Backgrounds**: flat. No gradients, textures, or full-bleed imagery on pages. The only gradient is the bottom scrim on Category tiles to keep names legible over (future) chalk-style background art.
- **Cards**: article cards have no border/shadow at rest; hover fills the whole card with `--surface` (8px radius), bleeding 20px past the text column. Category tiles: 16:9, 1px border, 8px radius, border turns accent-line on hover, bg image scales 1.04.
- **Callouts**: Obsidian default shape — tinted bg at 9% (7% light), **no border**, 4px radius, Lucide icon + Medium title in the type color, fold chevron right of the title. Aside/Reference: small 14px muted text, hairline left rule, Rubik label.
- **Images**: Things "image card" — 4px radius + soft two-layer shadow (`--shadow-image`); click → full-screen lightbox on `--overlay`.
- **Code**: `--surface` bg, 6px radius, 14.5px Sometype Mono, horizontal scroll; inline code 4px radius on surface.
- **Radii**: 2 / 4 / 6 / 8 / 12px. Round only for avatars and timeline dots.
- **Shadows**: used only for images and popovers (mobile menu, lightbox). Never on cards.
- **Borders**: 1px `--border` hairlines — H2 underline, tables, dividers, archive timeline, mobile bar.
- **Transparency/blur**: only the mobile top bar + dropdown (glass bg + 12–16px blur). Accent-soft (10%) for active nav.
- **Motion**: colour transitions 150–250ms `cubic-bezier(.2,.6,.2,1)`; nav icon scales 1.1 on hover; theme toggle presses to .94. Slider/Carousel: hard cut by default, optional 400ms cross-dissolve. No bounces, no autoplay, no entrance animations.
- **Hover**: fill with `--surface` (cards, nav, pager) or text → accent (archive titles, TOC). **Press**: slight scale on icon buttons only. **Focus**: 2px accent outline, 2px offset.
- **Imagery vibe**: post images are author-made diagrams (Excalidraw-style, light backgrounds, pastel fills) shown as-is. Brand art = hand-drawn white chalk line art on transparent; inverted to dark ink in light mode via `--chalk-filter`.

## ICONOGRAPHY
- **Remix Icon** (CDN `remixicon@4.5.0`, line style) for all UI: nav (`ri-article-line`, `ri-user-3-line`, `ri-folder-open-line`, `ri-archive-line`), theme (`ri-moon-line` / `ri-sun-line`), menu, chevrons, links, and custom list markers (`ri-information-line` blue, `ri-key-2-line` yellow, `ri-thumb-up-line` green, `ri-thumb-down-line` red).
- **Lucide** (CDN `lucide-static@0.460.0` icon font) **only inside callouts**, matching Obsidian's built-ins: note `pencil`, abstract `clipboard-list`, info `info`, todo `circle-check`, tip `flame`, success `check`, question `circle-help`, warning `triangle-alert`, failure `x`, danger `zap`, bug `bug`, example `list`, quote `quote`, fold `chevron-down`.
- **Category icons** are the author's own hand-drawn white line art (SVG/PNG, transparent) — never Remix. One SVG per category in `assets/category-icons/<slug>.svg` (stroke=currentColor, rendered via CSS mask). Sizes: 42px on list cards (desktop), 32px on mobile, 22px next to tile names, 44px on the single-category header.
- **Unicode**: `▷` between category levels (rendered in Noto Sans TC at .86em because Rubik lacks it). `⇒ ⇐ ∎` come from KaTeX. No emoji anywhere.
- **Logo**: none exists. "Gino's Blog" is set in Pagella Bold until the chalk lettering is delivered — do not invent a mark.
