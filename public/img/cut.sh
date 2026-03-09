#!/bin/bash

# 1. 取得輸入的資料夾路徑，若未提供則預設為當前目錄
TARGET_DIR="${1:-.}"

# 檢查該資料夾是否存在
if [ ! -d "$TARGET_DIR" ]; then
    echo "錯誤：找不到資料夾 '$TARGET_DIR'"
    exit 1
fi

# 啟用 nullglob 與 nocaseglob，避免空資料夾報錯，並支援大小寫副檔名 (如 .JPG)
shopt -s nullglob nocaseglob

echo "開始處理資料夾: $TARGET_DIR"

# 2. 透過迴圈處理資料夾內所有的 jpg, jpeg, png, webp 檔案
for file in "$TARGET_DIR"/*.{jpg,jpeg,png,webp}; do
    [ -f "$file" ] || continue

    # 擷取不含副檔名的完整路徑 (例如: OOO/XXX/image.png -> OOO/XXX/image)
    filepath_no_ext="${file%.*}"
    output_file="${filepath_no_ext}.webp"

    echo "裁切與轉換: $file -> $output_file"

    # 執行裁切與轉換
    magick "$file" \
        -gravity center \
        -set option:dim "%[fx:min(w,h)]x%[fx:min(w,h)]" \
        -crop "%[dim]+0+0" \
        +repage \
        "$output_file"

    # 如果原檔案不是 .webp，則在轉換後刪除原檔，實現原地替換
    if [ "$file" != "$output_file" ]; then
        rm "$file"
    fi
done

echo "轉換與裁切完成！"
