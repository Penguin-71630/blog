---
title: "String Algorithms"
description: "字串匹配演算法簡報"
date: 2026-02-16 20:00:00
categories:
  - 競程
---

<div class="slide-grid">

  <div style="grid-column: 2 / 10; grid-row: 2;">
    <h4>Z Value / 定義</h4>
  </div>

  <div style="grid-column: 2 / 12; grid-row: 4;">
    對於長度為 $n$ 的字串 $P = p_0\ p_1\ \dots\ p_{n-1}$<br><br>
    定義 $P$ 的 $Z$ 函數如下：
  </div>

  <div style="grid-column: 3 / 11; grid-row: 6 / 8; font-size: 0.85em;">
    $$
    Z(i) = \begin{cases}
    \max\{k : P[0, k - 1] = P[i, i + k - 1]\} & \text{if } k \text{ exists.} \\
    0 & \text{otherwise.}
    \end{cases}
    $$
  </div>

  <div style="grid-column: 2 / 12; grid-row: 9;">
    $Z(i)$ 其實就是從 $i$ 開始的後綴跟 $P$ 的<span style="color:#F8D24E; font-weight:bold;">最長共同前綴長度</span>。
  </div>

</div>