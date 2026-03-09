#!/bin/bash

# 2. 透過迴圈處理資料夾內所有的 jpg, jpeg, png, webp 檔案
for file in *.{jpg,jpeg,png,webp}; do
    # 確保檔案存在（避免副檔名沒對應到檔案時報錯）
    [ -f "$file" ] || continue

    # 擷取不含副檔名的主檔名
    filename="${file%.*}"

    # 執行裁切與轉換
    magick "$file" \
        -gravity center \
        -set option:dim "%[fx:min(w,h)]x%[fx:min(w,h)]" \
        -crop "%[dim]+0+0" \
        +repage \
        "../songs/${filename}.webp"
done

echo "轉換與裁切完成！"
