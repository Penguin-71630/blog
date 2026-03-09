# 主題客製化指南

本文件說明如何修改部落格的顏色、透明度和視覺效果。

---

## 1. 更換背景圖片與主題色

### 背景圖片（唯一入口）

`config/site.yaml`：

```yaml
site:
  siteImageFileBaseName:
    light: Gino-blue-sky   # Light theme 使用的圖片（不含副檔名）
    dark: dim-street       # Dark theme 使用的圖片（不含副檔名）
```

圖片放在 `public/img/site_headers/`，格式為 `.webp`。

### 為圖片生成色票

每張背景圖片對應一個 `.css` 色票檔（用 `wal` 工具生成），放在同目錄下：
- `public/img/site_headers/Gino-blue-sky.css`
- `public/img/site_headers/dim-street.css`

---

## 2. 修改主題主色（Primary Color）

### 方法一：直接修改 CSS 變數（推薦）

`src/styles/theme/shadcn.css`：

```css
:root {
  --primary: 203 99% 70%; /* Light theme 主色（HSL 格式）*/
}

.dark {
  --primary: 195 95% 39%; /* Dark theme 主色（HSL 格式）*/
}
```

> 從 `.css` 色票中取顏色，然後用工具（如 [hslpicker.com](https://hslpicker.com/)）將 HEX 轉換為 HSL。

### 方法二：修改設計 token

`src/constants/design-tokens.ts`：

```typescript
export const primaryColor = '#67B5FE';     // Light theme
export const primaryColorDark = '#0685BE'; // Dark theme（目前由 shadcn.css 的 CSS 變數控制）
```

> 注意：`design-tokens.ts` 的值主要用於 Tailwind 靜態設定，真正的主題切換由 `shadcn.css` 的 CSS 變數控制。

---

## 3. 修改半透明背景不透明度

`src/styles/theme/floating-layout.css`：

```css
/* 主頁面內容區塊（文章列表、分類頁等） */
.floating-content {
  background: hsl(var(--background) / 0.92); /* 0 = 完全透明, 1 = 不透明 */
}

/* 側邊欄（HomeSider） */
.floating-sider {
  background: hsl(var(--background) / 0.9);
  backdrop-filter: blur(16px);
}

/* 卡片 */
.floating-card {
  background: hsl(var(--card) / 0.8);
}

/* Header（Navbar） */
.floating-header {
  background: hsl(var(--background) / 0.8);
}
```

---

## 4. 修改其他顏色變數

`src/styles/theme/index.css`：

```css
:root {
  /* 漸層按鈕色 */
  --gradient-shoka-button-start: #77C3FD;
  --gradient-shoka-button-end: #67B5FE;

  /* Shoka 容器顏色 */
  --shoka-info: 203 99% 70%;    /* 資訊容器（藍色） */
  --shoka-success: 142 40% 45%; /* 成功容器（綠色） */
  --shoka-warning: 45 85% 50%;  /* 警告容器（黃色） */
  --shoka-danger: 0 70% 55%;    /* 危險容器（紅色） */
}

.dark {
  /* Dark theme 覆蓋 */
  --gradient-shoka-button-start: #0685BE;
  --gradient-shoka-button-end: #055E96;
}
```

---

## 5. 修改 Cover 首頁橫幅

`src/components/ui/cover/Cover.astro`：

```astro
<!-- 調整 Cover 高度 -->
<div class="relative flex h-[60dvh] z-0 ...">
  <!--           ↑ 修改這個值，例如 40dvh 或 50dvh -->

  <!-- 漸層遮罩（0~50%：不透明，50~100%：透明） -->
  <div style="background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0) 100%)">
    <!--                                                          ↑ 調整不透明度 (0.4)       ↑ 調整漸層起始點 (50%) -->
  </div>
```

---

## 6. 顏色格式說明

本專案使用 HSL 格式（shadcn 慣例）：

```css
/* HSL 格式：色相 飽和度 亮度 */
--primary: 203 99% 70%;
/* 使用時 */
color: hsl(var(--primary));
/* 帶透明度 */
background: hsl(var(--primary) / 0.5);
```

### HEX 轉 HSL 工具

- [hslpicker.com](https://hslpicker.com/)
- [convertacolor.com](https://convertacolor.com/)

---

## 快速參考：常用修改點

| 想改的東西 | 檔案 | 屬性 |
|---|---|---|
| 背景圖片 | `config/site.yaml` | `siteImageFileBaseName` |
| 主題主色 | `src/styles/theme/shadcn.css` | `--primary` |
| 頁面半透明度 | `src/styles/theme/floating-layout.css` | `.floating-content` |
| 側邊欄半透明度 | `src/styles/theme/floating-layout.css` | `.floating-sider` |
| 按鈕漸層色 | `src/styles/theme/index.css` | `--gradient-shoka-button-*` |
| Cover 橫幅 | `src/components/ui/cover/Cover.astro` | `h-[60dvh]`、gradient |
