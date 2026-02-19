---
title: 演算法圖鑑第 3 章 - Sorting Algorithms
date: 2019-12-11
categories:
  - 競程
---


這篇筆記是我參考【演算法圖鑑】和網路資源所製作。如果內容有誤，還請不吝賜教!


## **Selection Sort - 選擇排序**
### Operation
1. Find the minimum value in the sequence.
2. Switch it with the leftmost item.
3. Repeating 1 - 2 until the sequence is sorted.



:::default
**Time Complexity**: $O(n^2)$
:::



### Implementation
```python=
import random as rd
from math import inf
from time import time as t


def slsort(n: list, reverse=False):
    sort = n
    for i in range(len(n) - 1):
        mi = [0, inf]
        for j in range(i, len(n)):
            if sort[j] < mi[1]:
                mi = [j, sort[j]]
        sort[i], sort[mi[0]] = sort[mi[0]], sort[i]
    if reverse:
        return sort[::-1]
    else:
        return sort


print(slsort(list(rd.randint(1, 50) for i in range(10))))

# execution time
n = [i for i in range(1000, 0, -1)]
start = t()

for cases in range(50):
    slsort(n)

print((t() - start) / 50)
# time : 0.0551131010055542 second
```
## **Insertion Sort - 插入排序**
### Operations
1. Start from the left item, and keep moving onto the right term. Let's say the index for this step is $i$.
2. Insert $S_i$ ($S$ is the sequence) in the subsequence $S' = \{S_0, ..., S_{i-1}\}$ so that $S'$ is still in ascending/decreasing order.
3. Repeat 1 - 2 until the sequence is sorted.
:::default
**Time Complexity**: $O(n^2)$
:::
### Implementation
```python=
import random as rd
from time import time as t


def insort(n: list, reverse=False):
    sort = n
    for i in range(len(sort)):
        for j in range(i):
            if sort[j] > sort[i]:
                sort.insert(j, sort.pop(i))
    if reverse:
        return sort[::-1]
    else:
        return sort


print(insort(list(rd.randint(1, 50) for i in range(10))))

# execution time
n = [i for i in range(1000, 0, -1)]
start = t()

for cases in range(50):
    insort(n)

print((t() - start) / 50)
# time : 0.05066179275512695 second
```
## **Bubble Sort - 氣泡排序**
### Operations
(P.S. following shows how to sort the sequence in ascending order)
1. Start from the left item, and keep moving onto the right term. Let's say the index for this step is $i$.
2. Compare $S_i$ and $S_{i+1}$. If $S_i > S_{i+1}$, then swap these two items. Otherwise do nothing.
3. Repeat 1 - 2 until $S_i$ is the last item. Then $i$ = 0 again.
4. Repeat 1 - 3 until $S$ is sorted.
:::default
**Time Complexity**: $O(n^2)$
:::
### Implementation
```python=
import random as rd
from time import time as t


def bbsort(n: list, reverse=False):
    sort = n
    for i in range(len(n) - 1, 0, -1):
        for j in range(i):
            if sort[j] > sort[j + 1]:
                sort[j], sort[j + 1] = sort[j + 1], sort[j]
    if reverse:
        return sort[::-1]
    else:
        return sort


print(bbsort(list(rd.randint(1, 10) for i in range(10))))

# execution time
n = [i for i in range(1000, 0, -1)]
start = t()

for cases in range(50):
    bbsort(n)

print((t() - start) / 50)
# time : 0.061395759582519534 second
```
## **Quick Sort - 快速排序**
### Operations
:::info
Quick sort requires a very important algorithm - D&C (**Divide and Conquer**). D&C means for questions that are divisible, we can divide them into plenty of subproblems, and **solutions for subproblems can help us infer, and resolve the original problem**.
:::
1. Randomly choose an item $N$ in the sequence $S$.
2. Set up 2 empty lists $L$ and $R$.
3. Let $i$ be the iterator, traverse throught the whole $S$, For every $i$ smaller than $N$, push it into $L$. Otherwise push it into $R$.
4. Recursion : call this function again for $L$ and $R$ so that : 
    - sort($S$) = sort($L$) + [$N$] + sort($R$)


**P.S.** Boundary conditions of sort() : 
```plaintext
define sort(S):
  if length of S <= 1:
      return S
```

:::default
**Time Complexity**: $O(n\log n)$ ~ $O(n^2)$
:::
Average complexity of quick sort is $O(n\log n)$.
However, worst case $O(n^2)$ happens if we keep selevting the smallest or the biggest item as $N$.
### Implementation
```python=
import sys
import random as rd
from time import time as t

sys.setrecursionlimit(10000)

def qksort(n: list, reverse=False):
    sort = n

    if len(sort) <= 1:
        return sort

    left, right = [], []
    for i in sort[1:]:
        if i < sort[0]:
            left.append(i)
        else:
            right.append(i)

    sort = qksort(left) + [sort[0]] + qksort(right)
    if reverse:
        return sort[::-1]
    else:
        return sort


print(qksort(list(rd.randint(1, 50) for i in range(10))))

# execution time
# 1. average case
n = list(rd.randint(1, 10000) for i in range(1000))
start = t()

for cases in range(50):
    qksort(n)

print((t() - start) / 50)
# time : 0.0017751836776733398 second
# Way more faster than bubble sort!!!

# 2. worst case
n = [i for i in range(1000, 0, -1)]
start = t()

for cases in range(50):
    qksort(n)

print((t() - start) / 50)
# time : 0.06175748348236084 second
# As slow as selection sort :(
```
## **Merge Sort - 合併排序**
### Operations
:::info
Similar to quick sort, merge-sort uses **D&C** and **recursion** likewisely.
:::
1. Divide sequence $S$ into two same-length subsequence $L$ and $R$.
2. Recursion : call sort() again to sort the two parts.
3. Combine $L$ and $R$ together. -> Finish!
    - sort($S$) = merge(sort($L$) + sort($R$))

:::info
**P.S.** Pseudocode of sort() : 
```plain
define sort(S):
    if length of S <= 1:
        return S
    Divide S into L and R
    Sort(L) and Sort(R)
    sorted_S = Merge(L, R)
    return sorted_S
```
:::


:::default
**Time Complexity**: $O(n\ log\ n)$
:::


### Implementation
```python=
import sys
import random as rd
from time import time as t

sys.setrecursionlimit(10000)


def mgsort(n: list, reverse=False) -> list:
    sort = n

    if len(sort) <= 1:
        return sort

    mid = int(len(sort) / 2 + 0.5)
    l, r = mgsort(sort[:mid]), mgsort(sort[mid:])
    sort = []

    while l and r:
        if l[0] < r[0]:
            sort.append(l.pop(0))
        else:
            sort.append(r.pop(0))

    sort.extend(l + r)
    if reverse:
        return sort[::-1]
    else:
        return sort


print(mgsort(list(rd.randint(1, 50) for i in range(10))))

# execution time
n = [i for i in range(1000, 0, -1)]
start = t()

for cases in range(50):
    mgsort(n)

print((t() - start) / 50)
# time : 0.0025319910049438478 second
# Way more faster than bubble sort!!!
```
## **Heap Sort - 堆積排序**
### Features of heap
1. Heap is a binary tree.
2. $\forall$ parent node $N_p$ , it is always smaller than every node on its child tree.
3. From 2, it's very clear that the root node is the smallest node in a heap.
### Operations
1. Create an empty list $S$.
2. Use given data to make a heap.
3. Take out root node, push it into $S$
4. Refresh the whole heap.
5. Repeat 3 - 4 until all nodes are popped out i.e. the list $S$ forms a sorted sequence.
:::default
**Time Complexity**: $O(n\ log\ n)$
:::