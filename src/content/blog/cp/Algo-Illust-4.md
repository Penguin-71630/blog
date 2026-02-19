---
title: 演算法圖鑑第 4 章 - Searching Algotithms
date: 2019-12-18
categories:
  - 競程
---


這篇筆記是我參考【演算法圖鑑】和網路資源所製作。如果內容有誤，還請不吝賜教!


## **Search in an Array**
### **Linear Search**
- **Operations**
1. Traverse through the array until our goal is found.
- **Time Complexity** - $O(n)$
- **Implementation**
```python=
def find(arr: list or tuple, n) -> int:
    for i in range(len(arr)):
        if arr[i] == n:
            return i
    else:
        return -1


l = [2, 5, 9, 4, 2, 3, 7, 6]
print(find(l, 3))  # 5
print(find(l, 1))  # -1
```
### **Binary Search**
:::warning
This algorithm only works for sorted array.
:::
- **Operations**
1. Let $M$ be the middle data of the array $S$.
2. If $M$ equals to our goal $N$, our searching is finished.
3. Else if $M > N$, which indicates $N$ could appears in the subarray of $S$ to the right of $M$ ($S : \text{{--N--M-----}}$), our searching range is now confined to the left subarray.
4. Otherwise, i.e. $N$ may appears in the subarray of $S$ to the right of $M$ ($S : \text{{-----M--N--}}$), our searching range is confined to the right subarray.
5. Repeat 1-4 until we find our goal, however if $S$ becomes an empty array, we return "$N$ is not in the array".
- **Time Complexity** - $O(log n)$
- **Implementation**
```python=
# !! only for sorted array
def binarySearch(arr: list or tuple, n) -> int:
    l, r = 0, len(arr)
    while l <= r:
        idx = (l + r) // 2
        if arr[idx] == n:
            return idx
        elif arr[idx] > n:
            r = idx - 1
        else:
            l = idx + 1
    else:
        return -1


l = sorted(rint(1, 10) for i in range(10))
print(l)
print(binarySearch(l, 6))

wa = 0
for i in range(1, 11):
    l = [j for j in range(1, 11)]
    if binarySearch(l, i) != find(l, i):
        wa += 1
        print('###', binarySearch(l, i), end=' ')
        print(i)
print(wa)  # I'm very sure it's 0.
```

