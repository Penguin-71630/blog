# 浮動透明布局使用指南

## 概述

已為你的部落格實現了背景圖常駐、內容浮動且半透明的效果，類似於你提供的參考圖片。

## 已完成的修改

### 1. **背景系統** (`src/styles/global/tailwind.css`)
- 修改 `body` 和 `html` 元素支援固定背景圖片
- 使用 CSS 變數 `--site-bg-image` 來控制背景圖片
- 保留漸層背景作為 fallback

### 2. **浮動透明效果** (`src/styles/theme/floating-layout.css`)
創建了新的 CSS 文件，定義了以下 utility classes：

- `.floating-content` - 主內容區塊（85% 透明度 + 12px 模糊）
- `.floating-sider` - 側邊欄（90% 透明度 + 16px 模糊）
- `.floating-card` - 文章卡片（80% 透明度 + 8px 模糊）
- `.floating-header` - Header（75% 透明度 + 20px 模糊）

### 3. **組件修改**
- `src/components/layout/HomeSider.astro` - 添加 `floating-sider` class
- `src/pages/index.astro` - 主內容區塊添加 `floating-content` class
- `src/components/post/PostItemCard.astro` - 文章卡片添加 `floating-card` class

## 如何啟用背景圖片

### 方法 1：修改 CSS 變數（推薦）

編輯 `src/styles/theme/floating-layout.css`：

```css
:root {
  /* 取消註解並設定你的背景圖片路徑 */
  --site-bg-image: url('/img/background.jpg');
}

.dark {
  /* Dark theme 可以使用不同的背景圖片 */
  --site-bg-image: url('/img/background-dark.jpg');
}
```

### 方法 2：在 Layout.astro 中動態設定

如果需要根據頁面動態設定背景，可以在 `src/layouts/Layout.astro` 的 `<head>` 中添加：

```html
<style>
  :root {
    --site-bg-image: url('/img/your-background.jpg');
  }
</style>
```

## 背景圖片建議

1. **圖片尺寸**：建議使用 1920x1080 或更高解析度
2. **檔案格式**：推薦使用 WebP 格式以獲得更好的壓縮率
3. **圖片位置**：放在 `public/img/` 目錄下
4. **亮度**：選擇中等亮度的圖片，避免過亮或過暗影響文字可讀性

## 調整透明度

如果你覺得透明度不夠或太透明，可以修改 `src/styles/theme/floating-layout.css`：

```css
/* 調整主內容區塊透明度 */
.floating-content {
  background: hsl(var(--background) / 0.85); /* 改變 0.85 這個值 */
  backdrop-filter: blur(12px); /* 調整模糊程度 */
}
```

透明度值說明：
- `0.0` = 完全透明
- `0.5` = 半透明
- `1.0` = 完全不透明

## 其他需要應用浮動效果的頁面

目前只修改了首頁，如果你想在其他頁面也應用浮動效果，需要修改對應的頁面文件：

- **文章列表頁**：`src/pages/posts/[...page].astro`
- **文章詳情頁**：`src/pages/post/[...slug].astro`
- **分類頁**：`src/pages/categories/[...slug].astro`
- **標籤頁**：`src/pages/tags/[...slug].astro`
- **歸檔頁**：`src/pages/archives.astro`

將這些頁面中的主內容 `<div>` 添加 `floating-content` class 即可。

## 範例

```astro
<!-- 修改前 -->
<div class="bg-gradient-start shadow-box ...">
  內容
</div>

<!-- 修改後 -->
<div class="floating-content shadow-box rounded-lg ...">
  內容
</div>
```

## 注意事項

1. **性能**：`backdrop-filter` 可能在某些舊瀏覽器上影響性能
2. **可讀性**：確保背景圖片不會影響文字可讀性
3. **對比度**：深色主題和淺色主題可能需要不同的背景圖片
4. **移動端**：在小螢幕上可能需要調整透明度以提高可讀性

## Lint 警告說明

你可能會看到關於 `@config` 和 `@apply` 的 CSS lint 警告，這些是正常的，因為 CSS linter 不認識 Tailwind CSS v4 的語法。這些警告可以安全忽略，不會影響功能。
