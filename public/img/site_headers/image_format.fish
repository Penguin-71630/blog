#!/opt/homebrew/bin/fish

for file in *.webp
    # 1. 防呆機制：跳過檔名結尾已經是 _1920.webp 或 _800.webp 的檔案
    # 避免重複執行時，把已經縮圖過的檔案又拿來縮一次
    if string match -q -r '_(1920|800)\.webp$' $file
        continue
    end

    # 2. 取得主檔名 (移除 .webp)
    set base_name (string replace -r '\.webp$' '' $file)

    # 3. 處理 _1920 版本
    magick $file -resize 1920x {$base_name}_1920.webp

    # 4. 處理 _800 版本
    magick $file -resize 800x {$base_name}_800.webp

    # 5. 刪除原本的檔案
    rm $file

    echo "[SUCCESS] 已處理: $base_name -> 產生 _1920 與 _800 版本"
end
