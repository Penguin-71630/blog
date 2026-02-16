---
title: 2021 建中校內初選 Virtual 賽後檢討
date: 2021-10-23
categories: 
  - 競程
---

## 比賽資訊

- [**題目**](https://tioj.ck.tp.edu.tw/contests/79)
- [**計分板**](https://tioj.ck.tp.edu.tw/contests/79/dashboard)
- [**題解**](https://hackmd.io/@Dn7ABYK4QAyS02iuO5ydBw/Bk2_g_ozY#/)


## 比賽結果

### Submissions

```markdown
Problem Difficulty:
pA < pC < pB < pD < pE
----------------------
00:11 pA 100
01:03 pB 0
01:07 pB 49
01:22 pB 100
01:43 pC 0
01:49 pC 0
01:50 pC 0
01:54 pC 0
01:56 pC 16
02:04 pC 0
02:07 pC 100
02:26 pD 5
02:45 pD 26
02:46 pD 26
02:52 pD 43
02:55 pD 51
```



### Subtasks Gained

**pA** **<span class="green">70</span>**/**<span class="green">30</span>**

**pB** **<span class="green">15</span>**/**<span class="green">49</span>**/**<span class="green">36</span>**

**pC** **<span class="green">16</span>**/**<span class="green">17</span>**/**<span class="green">18</span>**/**<span class="green">49</span>**

**pD** **<span class="green">5</span>**/**<span class="green">8</span>**/**<span class="green">17</span>**/**<span class="green">21</span>**/23/26

**pE** 10/16/29/45

### Final Score/Rank

```markdown
pA 100
pB 100
pC 100
pD 51
pE 0

Total Score: 351
Final Rank:  4th
```


## 比賽過程

開場剛讀完 pA 馬上就開寫了，這次寫模板的速度有加快了。

**<span class="green">00\:11 pA 100</span>**

接下來是燒雞的開始，繼續讀完剩下的題目。

pB 感覺有點 dp 但對狀態沒頭緒。

pC 以為每一次的移動不一定要是直線，可以任意轉彎，想說完了這題也太難，重看一次後才發現移動時要固定一個方向，總之就是 BFS 裸題，但每次移動有 8 種方向向量可以選。

pD 數論 + 賽局，一樣完全沒滿分想法，但看到子題切滿多的，感覺可以撈不少。

pE 不會，甚至連子題一的想法完全沒有 QwQ。

**<span class="grey">00\:25 Finished Reading</span>**

不想先寫 pC 所以跑去想 pB，先往 dp 的方向想，但... 好像沒有重複子結構可以轉移，想了 15 分鐘就放棄了 dp 的想法。

然後注意到 $k \leq 3$ 感覺可以分 case 做事，於是一個一個解決。首先 $k = 1$ 很 trivial，直接填相反 bit 就好。

做 $k = 2$ 時對問題做了一下轉換，假設朋友的序列為 $f_i$ ，構造出的序列為 $b$，若 $b_j = 1$ 則將所有 $f_{i, j}$ 反轉，反之若 $b_j = 0$ 則不用。問題等價於構造出 $b$ 使得 $min_{i=1}^{k}(\sum_{j=1}^{n} f_{i, j})$ 最大。

這時候分開處理每個位置朋友的 bit 情況（有 $00, 01, 10, 11$ 共 4 種 mask），並處理該填 1 或 0。

$00, 11$ 是顯然的，而一對 $01, 10$ 可以互相抵銷，抵銷後看誰還有剩，令剩下的 mask 為 $m$，剩餘數量為 $c$，這時候就把 $\lfloor \frac{c}{2} \rfloor$ 個 $m$ 反轉，這樣會是最好的，滿直觀的 greedy 但我不會證。

想順著這個思路繼續推 $k = 3$ 的 case（有 8 種 mask，轉成十進位分別對應 $0 \sim 7$），本來想要把 $1, 2, 4$ 先全部反轉成 $6, 5, 3$，但不確定這樣 greedy 是不是對的，於是決定先寫掉 $k \leq 2$ 的子題。

**<span class="red">01\:03 pB 0</span>**

變數不小心打反。

**<span class="yellow">01\:07 pB 49</span>**

不放棄繼續推 $k = 3$，這時候發現剛剛的想法是好的，反正反轉不需要代價，需要的話再反反轉就好。一樣把 $3, 5, 6$ 互相抵銷後會剩至多兩個 mask，這時候問題回歸到 $k \leq 2$。

確定沒問題後就把剛剛的想法打成 code，想到什麼步驟就打什麼，所以 code 滿醜的，幸運的是沒有 bug 或假解。

**<span class="green">01\:22 pB 100</span>**

上廁所回來 pD、pE 依舊沒想法，於是開始寫 pC。

注意到 $dis(s, t) = dis(s, m) + dis(m, t)$，所以兩次 BFS 就行了。寫了 15 分鐘後丟上去。

**<span class="red">01\:43 pC 0</span>**

三小，Segmentation Fault ? \_?

盯著 code 盯了很久，回去翻 verdict 才發現原來不是 RE 而是 MLE，但有些測資有過，所以不會是陣列開太大，但我還是很感性的把 int 改成 short。後續又改了一些小地方，想當然的全沒過。

**<span class="red">01\:49 pC 0</span>**

**<span class="red">01\:50 pC 0</span>**

**<span class="red">01\:54 pC 0</span>**

這時候開始有點不耐煩，想說這種水題怎麼連一分都沒有，然後又隨便改了個東西，丟上去：

**<span class="orange">01\:56 pC 16</span>**

蛤，為什麼突然多了 16 分，而且有些測資變成了 TLE？

已經知道是 queue 塞太多東西炸掉了，但我明明有用 vis 陣列啊？？？

又重新檢查了 code，接著在推東西進 queue 的那一段 code 加上輸出 `vis[r][c]`，又在每回合輸出 queue。結果發現 vis 竟然沒被改到，這時候真的很困惑，開始越來越煩躁，我前一秒不是才剛寫 `vis[r][c] = true` 嗎，為什麼完全沒改變？？？？

直到我注意到我把 `=` 打成 `==`。

啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我是智障啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊

**<span class="red">02\:04 pC 0</span>**

三小又 TLE？？？

噢 debug 輸出忘記拔掉。

**<span class="green">02\:07 pC 100</span>**

上了廁所，忘掉剛才的事。

pE 依舊沒任何想法，果斷放棄。

pD 嘗試推滿分解，中間一度以為可以轉換成兩堆 Nim 但顯然假解，而且沒注意到題目限制只能對較大數字操作。反正假解後大概又想了 5 分鐘，實在沒想法於是開始撈分。

5、8、17 分感覺就稍微寫些 if 就好，21 分可以 $O(xy)$ DP。

**<span class="orange">02\:26 pD 5</span>**

剛撈完 5 分就被抓去吃飯 wwww。

為了阻止自己思考接下來的作法，我決定戳 pE 的官解邊吃飯邊讀。結果洗碗的時候還是不小心偷偷想了一下 QQ。

回來 vir 的時候，決定先寫有完整想法的 21 分。

**<span class="orange">02\:45 pD 26</span>**

陸續把 8 分、17 分撈掉。

**<span class="yellow">02\:52 pD 43</span>**

**<span class="yellow">02\:55 pD 51</span>**

剩 5 分鐘沒做事，比賽結束。

:::default
**Score: 351/500, Rk: 4**
:::


## 賽後檢討

1. 難度排錯，應該先寫 pC 再寫 pB。
2. 沒注意到花了這麼多時間在 pB，竟然寫了一個小時，但我真的對這種題型很不熟悉，所以應該無解 QwQ。
3. **<span class="red">智障 bug：== 打成 =</span>**
4. debug 的時候不要做一些無謂的事，不只找不到 bug 還會產生「debug 那麼久還是找不到問題」的錯覺，**事實上那不叫 debug，只是浪費時間**。
5. debug 時忘記先 check **常犯智障錯誤的 list**，有 check 的話就不會浪費了 25 分鐘。
6. 還以為 pE 要用什麼難度破表的大科技，結果想出關鍵步驟後竟然只需要二分搜，這題的思維「**枚舉一個固定的東西**」以前就見過但很不熟悉，結果這題沒看出來 QQ。
7. pD 只差在觀察出**因數個數不會太多**（大概 $n^{1/3}$ 個，但我真的不知道有那麼少 QQ），所以可以值域壓縮後做 DP，可惜。
