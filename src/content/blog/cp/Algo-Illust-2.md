---
title: 演算法圖鑑第 2 章 - Data Structures
date: 2019-12-08
categories:
  - 競程
---


這篇筆記是我參考【演算法圖鑑】和網路資源所製作。如果內容有誤，還請不吝賜教!


## **Introduction**
In general, data structures are different ways we combine and arrange the data. However, there are various data structures (e.g. stack, queue, heap, tree, ...), different arrangements of data give all sorts of structures.

In this chapter, we will see some kinds of **sequential structures**, which means data is put in linear order.

> array, list, stack, queue, hash table


## **Array**
In the majority of programming languages, **declaration** is needed for variables as well as array, which means computer has to assign specific memory spaces before use of an array. However, in **python** declarations of any variables involving array are never a prerequisite of using them since python is a **dynamically typed** language (i.e. types of all objects are not defined until runtime).

After declaration(ask computer for memory space), data is put in a clear order. And if we want to refer or retrieve data, we use **index** to find its location. However if we want to insert or remove data from the array, it cost much more time to be done due to **searching for our goal** and **shifting the remainders**.

:::default
**Time Complexity**
- Add/Delete data from an array : $O(n)$
- Get data by index : $O(1)$
:::

### Implementation
Below is the implementation of array.
(In python, an array is called a "list")

#### **Make a List**

```plain
list = [var1, var2, ... , varN]
var = any ( even another array )
```

```python=
x = [10, 20, 'string']  # [10, 20, 'string']
y = [1, 2, 3]  # [1, 2, 3]
z = ['p', 'y', 't', 'h', 'o', 'n']  # ['p', 'y', 't', 'h', 'o', 'n']
print(x, y, z)
```
:::info
Unlike tuple, values in a list are still mutable.
Hence, it's illegal to use a list as a key in hash tables.
:::


#### **Using multiple variables to get values from a list**
```python=
x1, x2, x3 = x
# 10 20 'string'
y1, y2, y3 = y
# 1  2  3
```
Using \*var expression to assign multiple values to a variable(This variable becomes a list).
```python=
*xa, xb = x
# xa = [10, 20] | xb = 'string'
z1, z2, *z3, z4 = z
# z1 z2 -> front, z4 -> rear, z3 -> remainders
print(z1, z2, z3, z4)  # p y ['t', 'h', 'o'] n
```
#### **Get a value from a list via index**
```python=
print(z[1])  # 'y'
```
:::info
Index of the first item is 0!
:::

#### **Other methods in class 'list'**
Count / Index
```python=
list.count(any)
# return how many times a value appears in a list
list.index(any)
# find the index of a value in a list
# return the smallest index if the value appears many times
# return -1 if it doesn't exist in the list
a = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
print(a.count(3))  # 3
print(a.index(4))  # 6
```
Check if a value is in the list
```python=
# if any in list:
#     do ...

if 3 in a:
    print('3 is in a.')
```
Revise an item in a list
```python=
x = [1, 2, 3, 4, 5, 6, 7, 8]
x[0] = 1111111
x[1] = 2222222
print(x)  # [1111111, 2222222, 3, 4, 5, 6, 7, 8]
```

Add data
```python=
list.append(any)
# Add a value at the end

list.extend([array])
list += [array]
# Add a bunch of values at the end

list.insert(index, any)
# Insert a value at given position
```
Delete data
```python=
list.remove(any)
# Remove a value in a list
# If it appears many times, remove the frontmost one

list.pop(index)
# Remove the value in given position
# If the argument is not assigned, remove the last value

list.clear()
# Clear all the values in the list

del list
# delete the list itself
```
Get length of a list
```python=
len(list)
```


#### **Concepts clarification**
*1. Wrong way to copy a list*
```python=
x = [1, 2, 3]
y = x
```
In 'y = x', python consider this statement as 'making a pointer y pointing to the list[1, 2, 3] just like x.' Which means:
:::danger
When changing values in x, **items in y will also be revised**!
:::
Correct ways to copy a list:
(1) list comprehention
```python=
list_copy = [i for i in list]
```
(2) 'copy()' method
```python=
list_copy = list.copy()
```
(3) 'slice' in python
```python=
list_copy = list[:]
```
Examples:
```python=
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
b = [i for i in a]
b = a.copy()
b = a[:]
```
*2. list 'multiplying'*
a. list *= n, n > 0
```python=
c = ['p', 'y']
c *= 3  # c = ['p', 'y', 'p', 'y', 'p', 'y']
```
b. list *= n, n <= 0
= list.clear()
```python=
c = ['O', 'w', 'O']
c *= -1 # c = []
```

## **Tuple**
Most features of a tuple are similar to an array(They both support item retrieving via indexes). However, the most significant difference between array and tuple is that **tuple is immutable**. Thus tuples can be used as keys of hash tables. Futhermore tuples are more efficient than lists in python.

:::default
**Time Complexity**
- Get data by index : $O(1)$
:::

### **Implementation**
#### Make a tuple
```python=
tuple = var1, var2, ... , varN
varI = any (even another array)

x = 10, 20, 'string'
# (10, 20, 'string')
y = 1, 2, 3
# (1, 2, 3)
z = 'p', 'y', 't', 'h', 'o', 'n'
# ('p', 'y', 't', 'h', 'o', 'n')
print(x, y)
```
#### **Using multiple variables to get values from a tuple**
```python=
x1, x2, x3 = x
# 10 20 'string'
y1, y2, y3 = y
# 1  2  3
```

#### **Get a value from a tuple via index**
```python=
print(z[1])  # 'y'
```
:::info
Index of the first item is 0!
:::

#### **Other methods in class 'tuple'**
Count / Index
```python=
tuple.count(any)
# return how many times a value appears in a tuple
list.index(any)
# find the index of a value in a tuple
# return the smallest index if the value appears many times
# return -1 if it doesn't exist in the tuple

a = 1, 2, 2, 3, 3, 3, 4, 4, 4, 4
print(a.count(3))  # 3
print(a.index(4))  # 6
```

Check if a value exists in a tuple
```python=
# if any in tuple:
#     do ...

if 3 in a:
    print('3 is in a.')
```
Get length of a tuple
```python=
len(tuple)
```
Copy a tuple
1. tuple comprehension
```python=
x = tuple(i for i in iterator/generator)
```
2. slice in python
```python=
y = x[:]
```





## **Linked List**
**Head -> Node -> ... -> Last Node -> Null**
(**->** stands for **pointer**)

There's no indexing system in list. Instead, lists use **pointer** to store the position of the next data. Hence, it takes time to find the specific data since we have to search linearly. On the other hand, adding as well as deleting can be done with ease because we only have to revise the direction of pointers.

*Adding node will look like this:*
- **Head -> A => C -> D -> Null**
- **Head -> A => B -> C -> D -> Null**
    - (**=>** points toward ~~**C**~~ -> **B**)

*Deleting node will look like this:*
- **Head -> A => O -> B -> C -> D -> Null**
- **Head -> A => B -> C -> D -> Null**
    - (**=>** points toward ~~**O**~~ -> **B**)

:::default
**Time Complexity**
- Add/Delete a node : $O(1)$
- Find a specific data : $O(n)$
:::

### **Implementation**
```python=
class ListNode:
    def __init__(self, value):
        self.val = value
        self.next = None


class LinkedList:
    def __init__(self, head: ListNode):
        self.head = head
        self.tail = self.head
        self.cur = self.head
        self.last = None
    
    # add/insert a node in the linked list
    def append(self, node: ListNode, behind: ListNode =None):
        self.cur = self.head
        if not behind:
            # if 'behind' is not given,
            # then add the node at rear end
            self.tail.next = node
            self.tail = self.tail.next
        elif behind.val == self.tail.val:
            # if 'behind' is simply the tail,
            # then do the same thing as the above :D
            self.tail.next = node
            self.tail = self.tail.next
        else:
            while self.cur.next:
                if self.cur.val == behind.val:
                    # found it!
                    temp = self.cur.next
                    self.cur.next = node
                    self.cur = self.cur.next
                    self.cur.next = temp
                    break
                self.cur = self.cur.next
            # if 'behind' doesn't exist in the list,
            # then just don't do anything

    def pop(self, node: ListNode =None):
        # if there's only 1 node in the whole linked list,
        # then don't pop anything
        if not self.head.next:
            return None

        self.cur = self.head
        self.last = None

        while self.cur:
            try:
                if self.cur.val == node.val:
                    self.last.next = self.cur.next
                    break
            except AttributeError:
                # This means 'node' is not given
                # then we'll delete the last node
                
                # find the new tail
                self.tail = self.head
                while self.tail.next.next:
                    self.tail = self.tail.next
                self.tail.next = None
                break

            self.last = self.cur
            self.cur = self.cur.next

    def traverse(self) -> list:
        # returns a list of values of nodes in order
        self.cur = self.head
        values = []

        while self.cur:
            values.append(self.cur.val)
            self.cur = self.cur.next
        return values

    def generate(self):
        # returns a generator
        self.cur = self.head

        while self.cur:
            yield self.cur.val
            self.cur = self.cur.next


linked = LinkedList(ListNode(0))
for i in range(1, 10):
    linked.append(ListNode(i))
print(linked.traverse())
# [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

linked.append(ListNode(5.5), behind=ListNode(5))
for i in linked.generate():
    print(i, end=' ')
# 0 1 2 3 4 5 5.5 6 7 8 9

linked.pop()
print(linked.traverse())
# [0, 1, 2, 3, 4, 5, 5.5, 6, 7, 8]

linked.pop(ListNode(5.5))
for i in linked.generate():
    print(i, end=' ')
# 0 1 2 3 4 5 6 7 8
```
### **More Extensions**
#### ***1. Circular Linked List***  
:::info
Last node points toward **the head node**.
:::
**Head -> Node -> ... -> Last Node -> Head -> ...**
(**->** stands for **pointer**)

#### ***2. Doubly Linked List***  
:::info
Every node has 2 pointers : one points toward **the next one**, the other points toward **the previous node**.
:::
**Head <-> Node <-> ... <-> Last Node <-> Null**
(**->** stands for **pointer**)

## **Stack**
Stack is also a sequential structure. However, similar to piling up plates, the last data we put in will be the first to be taken out, and this feature is called **"LIFO"** (last in first out).
### Implementation
```python=
class Stack:
    def __init__(self, init_stk: list):
        self._stk = init_stk

    # add data - push
    def push(self, dt):
        self._stk.append(dt)

    # delete data - pop
    def pop(self):
        self._stk.pop()

    # get top - top
    def top(self):
        return self._stk[-1]

    # get length - size
    def size(self):
        return len(self._stk)


stack = Stack([1, 2, 3])
stack.push(4)  # 1 2 3 4
stack.push(5)  # 1 2 3 4 5
print(stack.size())  # 5
print(stack.top())  # 5
stack.pop()  # 1 2 3 4
print(stack.top())  # 4
```
## **Queue**
Queue is completely different from stack. Just like waiting in line, the first data we push in will also be the first to be poped out, and this feature is called **"FIFO"** (first in first out).
### Implementation
```python=
class Queue:
    def __init__(self, init_qu: list):
        self._qu = init_qu

    # 加入資料 - push
    def push(self, dt):
        self._qu.append(dt)

    # 取出資料 - pop
    def pop(self):
        self._qu.pop(0)

    # 取得前面的資料
    def get_front(self):
        return self._qu[0]

    # 取得長度
    def size(self):
        return len(self._qu)


queue = Queue([1, 2, 3])
queue.push(4)  # 1 2 3 4
queue.push(5)  # 1 2 3 4 5
print(queue.size())  # 5
print(queue.get_front())  # 1
queue.pop()  # 2 3 4 5
print(queue.get_front())  # 2
```
### **More Extensions**
#### ***1. Deque (Double Ends Queue)*** 
A normal queue only offers one side for pushing in data and the other for popping out. However, the design of dequeue allows more convenient operations - we can push in and pop out data **at both ends**.
> ***Implementation***
```python=
class Deque:
    def __init__(self, init_deq: list):
        self._deq = init_deq

    # 插入資料 - push (front and back)
    def push(self, deq, command):
        # command : 'f' -> front ; 'b' -> back
        self._deq.insert((len(self._deq) + 1) * int(command == 'b'), deq)

    # 取出資料 - pop (front and back)
    def pop(self, command):
        # command : 'f' -> front ; 'b' -> back
        self._deq.pop(-1 * int(command == 'b'))

    # 取得頭尾兩端的資料
    def get(self, command):
        # command : 'f' -> front ; 'b' -> back
        return self._deq[-1 * int(command == 'b')]

    # 取得長度
    def size(self):
        return len(self._deq)


deque = Deque([1, 2, 3])
deque.push(0, 'f')  # 0 1 2 3
deque.push(4, 'b')  # 0 1 2 3 4
print(deque.size())  # 5
print(deque.get('f'))  # 0
print(deque.get('b'))  # 4
deque.pop('f')  # 1 2 3 4
deque.pop('b')  # 1 2 3
print(deque.get('f'))  # 1
print(deque.get('b'))  # 3
```
#### ***2. Priority Queue*** 
In comparison with queue, we pop out the data with **the biggest weight** from a priority queue instead of taking out the data we first put in.
> ***Implementation***
```python=
class PriorityQueue:
    def __init__(self, init_pq: list):
        init_pq.sort()
        self._pq = init_pq
        self._prior = 'big'

    # 設定優先條件
    def set_prior(self, command):
        # command : big or small
        self._prior = command

    # 加入資料
    def insert(self, pq):
        # 先確定是否要插入在邊界，再確認要放在中間的哪個位置
        if pq <= self._pq[0]:
            self._pq.insert(0, pq)
        elif pq >= self._pq[-1]:
            self._pq.insert(-1, pq)
        else:
            for i in range(len(self._pq) - 1):
                if self._pq[i] <= pq <= self._pq[i + 1]:
                    self._pq.insert(i + 1, pq)
                    break

    # 取出資料
    def pop(self):
        self._pq.pop(-1 * int(self._prior == 'big'))

    # 取出最優先的資料
    def get(self):
        return self._pq[-1 * int(self._prior == 'big')]

    # 取得資料長度
    def size(self):
        return len(self._pq)


# 'big'
pr_qu = PriorityQueue([0, 5, 2, 3, 5, 7])  # 0 2 3 5 5 7
pr_qu.insert(4)  # 0 2 3 4 5 5 7
pr_qu.insert(6)  # 0 2 3 4 5 5 6 7
print(pr_qu.size())  # 8
print(pr_qu.get())  # 7
pr_qu.pop()  # 0 2 3 4 5 5 6
print(pr_qu.get())  # 6

# 'small'
pr_qu.set_prior('small')  # 0 2 3 4 5 5 6
print(pr_qu.get())  # 0
pr_qu.pop()  # 2 3 4 5 5 6
pr_qu.pop()  # 3 4 5 5 6
print(pr_qu.size())  # 5
print(pr_qu.get())  # 3
```
## **Hash Table**
### **Hash Function**
Hash function is a function that turns given data into a fixed-length value, called "hash code".

Hash function has the following features:
1. **Fixed Length of Hash Code** - No matter how massive the given data is, the length of hash code is always fixed.
2. **Same Data, Same Hash Code**
3. **Similar Data, Different Hash Code**
4. **Unidirectional** - It's impossible to infer the original data from its hash code.
5. **Hash Collision** - Different data might have the same hash code, when this occurs, we call it "hash collision". However, chances of collision are extremely slim.
### Implementation
```python=
def hash(x):
    value = 0
    for i in str(x):
        value += _pow(ord(i) * 987654321, 123456789, 10 ** 20)
    code = int(str(value)[:15:])
    if code < 10 ** 14:
        return code + 123456789876543
    else:
        return code


def _pow(a, b, n):
    if b == 0:
        return 1
    if b == 1:
        return a
    if b % 2 == 0:
        return _pow(a, int(b / 2), n) ** 2 % n
    else:
        return _pow(a, int((b - 1) / 2), n) ** 2 * a % n


print(hash('python'))  # 189770782082354
print(hash('pythona') == hash('pythonad'))  # True - hash collision occured
```
### **Hash Table**
Hash table is like a dictionary. Each item is composed of a key and a value, at which the key points. The most significant advantage of hash table is that searching can be done in a really short time, rather than doing linear search. This makes hash table a superior data structure.

Following shows how to build a hash table :
1. We now have a key and its value.
2. Index = hash(key) mod (length of table) *(complexity : $O(1)$)*
3. Put the value at table[index]. If hash collision occurs (i.e. table[index] is not empty), we use other methods to put in the value. The implementation below uses a linked list to connect these data. *(complexity : $O(1)\ \sim \ O(n)$)*

This is how hash table works while doing searching :
1. The user gives a key.
2. Index = hash(key) mod (length of table)  *(complexity : $O(1)$)*
3. Use the index to find the value and return it if the value exists. *(complexity : $O(1)\ \sim \ O(n)$)*

:::default
Time Complexity
- Insert/Delete an element : $O(1)$(average) to $O(n)$(worst case  - too many collisions)
- Searching : $O(1)$(average) to $O(n)$(worst case - too many collisions)
:::

### Implementation
***1. Make a class 'Hash Table'***
```python=
class HashTable:
    def __init__(self, data: dict):
        self._data = []
        self._index = 0

        for self._i in data.keys():
            self._data.append([self._i, data[self._i]])

        self._table = [[] for self._i in range(int(len(self._data) ** 0.5) + 1)]
        HashTable.make_table(self, self._data)

    @staticmethod
    def __pow(a, b, n) -> int:
        if b == 0:
            return 1
        if b == 1:
            return a
        if b % 2 == 0:
            return HashTable.__pow(a, int(b / 2), n) ** 2 % n
        else:
            return HashTable.__pow(a, int((b - 1) / 2), n) ** 2 * a % n

    # 雜湊函數 - 除留餘數法 + 字元碼運算
    @staticmethod
    def __hash(x) -> int:
        value = 0
        for i in str(x):
            value += HashTable.__pow(ord(i) * 987654321, 123456789, 10 ** 20)
        code = int(str(value)[:15:])
        if code < 10 ** 14:
            return code + 123456789876543
        else:
            return code

    def make_table(self, data: list):
        for i in data:
            # 這裡先不模擬碰撞時指標的存取
            # 碰撞時，直接存入二維陣列，稱為 "鏈結法"
            self._table[HashTable.__hash(i[0]) % len(self._table)].append(i)

    def search(self, goal):
        for i in self._table[HashTable.__hash(goal) % len(self._table)]:
            if i[0] == goal:
                return i[1]
        else:
            return '{} is not in the table'.format(goal)

    def show(self):
        print('-' * 40)

        for i in range(len(self._table)):
            print('NO.{} :'.format(i))

            for j in self._table[i]:
                print('{} = {}'.format(j[0], j[1]))

        print('-' * 40)


hash_table = HashTable({'Joe': 0, 'Sue': 1, 'Dan': 0, 'Nell': 1, 'Ally': 1, 'Bob': 0})
print(hash_table.search('Sue'))  # 1
print(hash_table.search('Ally'))  # 1
print(hash_table.search('John'))  # John is not in the table
hash_table.show()

hash_table.make_table([['John', 0], ['Mary', 1]])
print(hash_table.search('Mary'))  # 1
hash_table.show()
```
***2. Using Python's Dictionary***
P.S. Python's dictionary is actually a implementation of hash table.

**Make a dictionary**
```python=
dict1 = {key: value, key: value, ..., key: value}
dict2 = dict(key=value, key=value, ..., key=value)
```

**Get values**
```python=
from_dict_get_value = dict[key]
```

**More ways to use a dictionary (dict)**
1. using for loop to make a dictionary in some situation
```python=
d = {chr(i): i for i in range(65, 91)}  # 建立大寫字母的ASCII字元碼對照表
```
2. Add/Revise value
`dict[key] = value`
:::info
**if** key already **exists**:
- revise value
**else**:
- add value
:::
3. Delete an item (key + value)
```python=
del dict[key]
dict.pop(key)
```
4. Deletion and assignment
`var = dict.pop(key)`
5. Get all the keys and values
```python=
dict.keys()  # return keys
dict.values()  # return values
dict.items() # return items (keys + values)
```
:::info
Returnings of *keys()*, *values()*, and *items()* are neither tuples nor lists. Instead, they all have **their own types** respectively.
```python=
d = {0: 1, 1: 2}
print(type(d.keys()))    # <class 'dict_keys'>
print(type(d.values()))  # <class 'dict_values'>
print(type(d.items()))   # <class 'dict_items'>
```
:::
6. Check if a key/value exists
`if ... in d.keys()/d.values()/d.items()`
:::warning
item in `dict` == item in `dict.keys()` != item in `dict.items()`
:::
7. Two dictionaries are equal if and only if there **keys** as well as their **values** are all **in correspondence with one another**.

