---
title: 題解：CSES Movie Festival Queries（Sparse Table）
date: 2022-02-27
categories: 
  - 競程
---

今天下午出去玩結果沒寫到什麼題 QQ。

晚上回來的時候稍微戳了一下計算幾何題目還有 CSES，然後總算把 Trie 補起來了，現在發現 Trie 不過就只是一般的樹，真的有夠簡單，早知道早點學的話就可以進全國賽了 QwQ。

來分享一下 CSES 的題目 OwO。

## 題目

題目連結：https://cses.fi/problemset/task/1664

:::default
有 $N$ 條線段，每條線段有各自的起始點 $l_i$ 和結束點 $r_i$，$Q$ 筆詢問 $ql_i, qr_i$，請問從 $N$ 條線段中選出一些不重疊的，且滿足線段完整落在 $ql_i, qr_i$ 之間，最多能選多少條？

- $1 \leq N, Q \leq 2 \times 10^5$
- $1 \leq l_i \leq r_i \leq 10^6$
- $1 \leq ql_i \leq qr_i \leq 10^6$

附註：兩條線段例如 $[1, 3], [3, 4]$ 是不重疊的。
:::


## 解法

這題想了好久，最後跑去戳 abcorz 簡報的提示才想到可以用 Sparse Table，我覺得好酷。

這題的 Sparse Table 是存每個時間點往後看 $2^i$ 場電影最快什麼時候可以看完。稀疏表的兩個維度是不同的，反正第一次碰到這樣的應用然後我就被暴打 =w=。

總之設 $s[k][t] \equiv$ 從 $t$ 開始看 $2^i$ 場電影最快看完的時間。

先把所有線段讀進來，開個陣列 $mir$，$mir[i]$ 存 $i$ 開頭的線段中最小的右界。

因此稀疏表的初始狀態 $s[0][t]$ 就可以用後綴 min 的方式從右掃到左計算。

接著轉移：$s[k][t] = s[k - 1][s[k - 1][t]]$

蓋完之後詢問就直接用位元枚舉二分搜答案就做完了。時間複雜度 $O(C \log N + Q \log N)$，$C$ 是線段的值域。

附上 code：

```cpp
int n, q;
int spt[18][maxt];
int mir[maxt];
 
void init() {
    cin >> n >> q;
    fill(mir, mir+maxt, INF);
    REP(i, n) {
        int l, r;
        cin >> l >> r;
        mir[l] = min(mir[l], r);
    }
    int ptr = INF;
    for (int i = maxt-1; i > 0; i--) {
        ptr = min(ptr, mir[i]);
        spt[0][i] = ptr;
    }
    FOR(k, 1, 18, 1) {
        for (int i = 1; i+(1<<k)-1 < maxt; i++) {
            if (spt[k-1][i] >= maxt) spt[k][i] = INF;
            else spt[k][i] = spt[k-1][spt[k-1][i]];
        }
    }
}
 
void solve() {
    while (q--) {
        int l, r;
        cin >> l >> r;
 
        int p = l, ans = 0;
        for (int k = 17; k >= 0; k--) {
            if (spt[k][p] <= r) {
                ans += 1<<k;
                p = spt[k][p];
            }
        }
 
        cout << ans << endl;
    }
}
```

總之也是好題 \:D，把我揍爛的題目都是好題 \:D