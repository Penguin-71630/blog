# Cover 重構指南

## 已完成的修改

### 1. **創建新組件**

#### PostHeader.astro

用於文章頁面，顯示完整的文章信息：

- 標題
- 發表日期
- 更新日期（如果有）
- 字數
- 閱讀時間
- 草稿標記（開發環境）

位置：`src/components/post/PostHeader.astro`

#### PageTitle.astro

用於列表頁面，顯示簡單的頁面標題：

- 頁面標題

位置：`src/components/ui/PageTitle.astro`

### 2. **已更新的文件**

✅ `src/layouts/TwoColumnLayout.astro` - 移除 cover slot，添加 mt-4
✅ `src/pages/post/[...slug].astro` - 使用 PostHeader，添加 floating-content
✅ `src/pages/index.astro` - 移除 Cover，添加 floating-content
✅ `src/pages/posts/[...page].astro` - 移除 Cover，添加 floating-content
✅ `src/pages/archives.astro` - 使用 PageTitle，添加 floating-content

### 3. **修改模式**

所有頁面的修改遵循相同模式：

**修改前：**

```astro
import Cover from '@components/ui/cover/Cover.astro';

<TwoColumnLayout>
  <Cover slot="cover" title="頁面標題" />
  <HomeSider slot="sider" />
  <div class="shadow-box bg-gradient-start ...">
    內容
  </div>
</TwoColumnLayout>
```

**修改後：**

```astro
import PageTitle from '@components/ui/PageTitle.astro';

<TwoColumnLayout>
  <HomeSider slot="sider" />
  <div class="floating-content shadow-box rounded-lg ...">
    <PageTitle title="頁面標題" />
    內容
  </div>
</TwoColumnLayout>
```

## 需要手動更新的頁面

以下頁面仍然使用舊的 Cover 組件，需要手動更新：

### 1. **分類頁面**

#### `src/pages/categories/index.astro`

```diff
- import Cover from '@components/ui/cover/Cover.astro';
+ import PageTitle from '@components/ui/PageTitle.astro';

- <Cover slot="cover" title="全部分類" />
- <div class={`shadow-box bg-gradient-start ...`}>
+ <div class={`floating-content shadow-box rounded-lg ...`}>
+   <PageTitle title="全部分類" />
```

#### `src/pages/categories/[...slug].astro`

```diff
- import Cover from '@components/ui/cover/Cover.astro';
+ import PageTitle from '@components/ui/PageTitle.astro';

- <Cover slot="cover" title={`分類於"${category?.name}"的文章`} />
- <div class={`shadow-box bg-gradient-start ...`}>
+ <div class={`floating-content shadow-box rounded-lg ...`}>
+   <PageTitle title={`分類於"${category?.name}"的文章`} />
```

### 2. **標籤頁面**

#### `src/pages/tags/index.astro`

```diff
- import Cover from '@components/ui/cover/Cover.astro';
+ import PageTitle from '@components/ui/PageTitle.astro';

- <Cover slot="cover" title="全部標籤" />
- <div class={`shadow-box bg-gradient-start ...`}>
+ <div class={`floating-content shadow-box rounded-lg ...`}>
+   <PageTitle title="全部標籤" />
```

#### `src/pages/tags/[tag].astro`

```diff
- import Cover from '@components/ui/cover/Cover.astro';
+ import PageTitle from '@components/ui/PageTitle.astro';

- <Cover slot="cover" title={`包含標籤"${tag}"的文章`} />
- <div class={`shadow-box bg-gradient-start ...`}>
+ <div class={`floating-content shadow-box rounded-lg ...`}>
+   <PageTitle title={`包含標籤"${tag}"的文章`} />
```

### 3. **友站頁面**

#### `src/pages/friends.astro`

```diff
- import Cover from '@components/ui/cover/Cover.astro';
+ import PageTitle from '@components/ui/PageTitle.astro';

- <Cover slot="cover" title="友站網址" />
- <div class={`bg-gradient-start shadow-box ...`}>
+ <div class={`floating-content shadow-box rounded-lg ...`}>
+   <PageTitle title="友站網址" />
```

### 4. **404 頁面**

#### `src/pages/404.astro`

```diff
- import Cover from '@components/ui/cover/Cover.astro';
+ import PageTitle from '@components/ui/PageTitle.astro';

- <Cover slot="cover" title="404" />
+ <div class={`floating-content shadow-box rounded-lg ...`}>
+   <PageTitle title="404" />
```

### 5. **系列頁面**

#### `src/pages/[seriesSlug].astro`

這個頁面使用 `SeriesCover`，需要特殊處理。如果 SeriesCover 也需要重構，請參考 PostHeader 的模式創建一個內嵌版本。

## 批量更新腳本

可以使用以下命令批量查找所有使用 Cover 的文件：

```bash
grep -r "Cover slot=\"cover\"" src/pages/
```

## 注意事項

1. **浮動透明效果**：所有內容區塊都應該使用 `floating-content` class
2. **圓角**：添加 `rounded-lg` class
3. **移除舊樣式**：將 `bg-gradient-start` 替換為 `floating-content`
4. **Import 清理**：記得移除 `Cover` 的 import 並添加 `PageTitle` 的 import

## 驗證

更新後，確保：

- [ ] 頁面標題正確顯示
- [ ] 背景是半透明的
- [ ] 內容區塊有圓角
- [ ] 沒有 TypeScript 或 import 錯誤
- [ ] 在 light 和 dark theme 下都正常顯示

## 完成後

所有頁面更新完成後，可以考慮刪除或重構 `src/components/ui/cover/Cover.astro`，因為它不再被使用。
