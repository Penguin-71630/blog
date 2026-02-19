---
title: 演算法圖鑑第 1 章 - Big-O Notation
date: 2019-12-02
categories:
  - 競程
---


這篇筆記是我參考【演算法圖鑑】和網路資源所製作。如果內容有誤，還請不吝賜教!

## 1. What is big-O notation? :notebook
When we talk about algorithms, it's hard to really calculate **time** and **space** they cost. Therefore, we use a more simple notation to **show algorithms' efficiencies**, and that is big-$O$.

## 2. How do we use big-O notation?
Take the following programs for example :
```python=
n = list(map(int, input().split()))
for i in n:
    print(i, end=' ')
```
Consider the two following questions:
- a. How much time did it spend?
- b. How much space did it use to save data?

For the first line of the program, the time needed is not relating to the input size(constant time).
Thus we mark the time complexity of this step as $O(1)$. Following is a for-loop, and we can see that the execution time depends on the size of list $n$,  and there's a linear relationship between them, so we mark the time complexity of this loop as $O(n)$. Eventually, when considering the time complexity of the whole program, **we only consider the most crucial part, and we ignore the constant coefficients**, since the most crucial become very significant when the data needed to be processed is super large.  Thus, since $O(n)$ is more influential than $O(1)$, we ignore $O(1)$ and mark the time complexity as $O(n)$.

However, it can be found that we use some memory space to store the list, and the resource we've used is relating to the size of list n, and, of course, there's a linear relationship between them, so we mark the space complexity of the whole program as $O(n)$.

## Definition of Big-O
According to the explanation above, we have the definition of big-O notation: ($f(n)$ is the source needed, $n$ is the size of given data)
$$
O(g(n)) = \text{{$f(n): c,\ n_0 \in \mathbb N\ \land \ \forall n \ge n_0,\ 0\le f(x)\le cg(x)$}}
$$

In other word, $c * g(n)$ is always larger than $f(n)$, and we use $O(g(n))$ instead of $O(c * g(n))$ indicates that we **ignore constant** since it won't be so influential if the given data is massive.

## More Example
- $O(1)$
get a value via index from an array

- $O(log\ n)$
binary search
  > D&C (Divide and Conquer)

- $O(n)$
insert/delete a value from an array

- $O(n\ log\ n)$
  > merge sort
  > quick sort

- $O(n^2)$
  > insertion sort
  > bubble sort
  > dijkstra's algorithm (unoptimized)

- $O(n^3)$
  > Floyd Warshall's algorithm

- $O(2^n)$
most of recurrences

- $O(n!)$
enumerate all the possibilities of a matter

:::info
**常用時間複雜度記號（2026/02/18 補充）**

- $O$ (Big O) 代表的是上界，一個演算法的複雜度如果是 $O(n^2)$， 代表這個演算法的執行時間不會超過 $n^2$ 的量級。
  - 就算它真正的執行時間是 $n \log n$ 我們也可以說它的複雜度是 $O(n^2)$。
- $\Omega$ (Big Omega) 代表的是下界，與 Big O 正好相反。一個演算法的複雜度如果是 $\Omega(n^2)$， 代表這個演算法的執行時間至少會是 $n^2$ 的量級。
  - 就算它真正的執行時間是 $n^3$ 我們也可以說它的複雜度是 $\Omega(n^2)$。
- $\Theta$ (Big Theta) 代表「剛剛好」，是 $O$ 和 $\Omega$ 的結合。一個演算法的複雜度如果是 $\Theta(n^2)$，代表這個演算法執行時間剛剛好就是 $n^2$ 的量級。
:::

