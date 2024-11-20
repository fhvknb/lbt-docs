---
sidebar_position: 4
title: Algorithm Code
tag: [frontend]
---

# 数组反转k位

```javascript
// 时间复杂度　O(1)
function rotateArray(arr, k) {
    var len = arr.length;
    var k = Math.abs(k % len);
    if (k === 0 || !len) {
        return arr;
    }
    var arr1 = arr.slice(-k);
    var arr2 = arr.slice(0, len - k);

    return arr1.concat(arr2);
}

// const arr = [1, 2, 3, 4, 5, 6];
// rotateArray(arr, 3)
// output: [4, 5, 6, 1, 2, 3,]

```
:::note

`array数组`为有序数据结构，内存空间连续，在执行操作`unshift`, `shift`, `splice`很慢，时间复杂度为O(n);
:::

# 括号匹配
```javascript
function isMatch(left, right){
    if(left === '(' && right === ')') return true;
    if(left === '{' && right === '}') return true;
    if(left === '[' && right === ']') return true;
    return false;
}
function matchBracket(str) {
    if (!str || !str.length) {
        return true;
    }
    var stack = [];
    var leftBracket = ['(', '{', '['];
    var rightBracket = [')', '}', ']'];
    for (let i = 0; i < str.length; i++) {
        if (leftBracket.includes(str[i])) {
            stack.push(str[i]);
        }
        if (rightBracket.includes(str[i])) {
            const top = stack[stack.length - 1];
            if (isMatch(top, str[i])) {
                stack.pop();
            }else {
                return false
            }
        }
    }
    return !stack.length;

}

// var s = '(abc)d{ssf}123'
// console.log(matchBracket(s));
// output: true
```
:::note
`栈` 是一种先进后出的逻辑结构，是一种抽象模型，可以用不同语言和不同方式实现一个栈。
:::

# 用双栈实现一个队列

```javascript
class MyQueue {
    stack1 = [];
    stack2 = [];

    add(item){
        this.stack1.push(item)
    }

    delete(){
      while(this.stack1.length){
        const item = this.stack1.pop();
        if(item) {
            this.stack2.push(item);
        }
      }
      this.stack2.pop();
      while(this.stack2.length){
        const item = this.stack2.pop();
        if(item) {
            this.stack1.push(item);
        }
      }

      return this.stack1;

    }

    get length(){
        return this.stack1.length;
    }
}

const myqueue = new MyQueue();

myqueue.add(100);
myqueue.add(200);
myqueue.add(300);

console.log(myqueue.length);
const d = myqueue.delete();
console.log(d);
console.log(myqueue.length);

```
:::note
`队列` 是一种先进先出的逻辑结构，是一种抽象模型，可以用不同语言和不同方式实现一个栈。
:::


# 用一个JS方法反转一个单向链表

```javascript

function createLinkNode(arr) {
    let len = arr.length;
    if(!len){
        throw('arr is empty!')
    }
    let curNode = {
        value: arr[len - 1],
    }
    if(len === 1){
        return curNode;
    }
    for(let i =  len - 2; i >= 0; i--){
        let val = arr[i];
        curNode = {
            value: val,
            next: curNode
        }
    }
    return curNode
}

function reverseLinkList(head) {
    let preNode, curNode, nextNode = head;
    while (nextNode) {
        if (curNode && !preNode) {
            delete curNode.next;
        }
        if (preNode && curNode) {
            curNode.next = preNode;
        }
        preNode = curNode;
        curNode = nextNode;
        nextNode = nextNode?.next;
    }
    curNode.next = preNode;
    return curNode;
}

function printLinkList(head) {
    let node = head;
    while (node) {
        console.log(node.value)
        node = node.next;
    }
}

// const arr = [100, 200, 300, 400, 500];
// const linklist = createLinkNode(arr);
// const linklist2 = reverseLinkList(linklist);
// printLinkList(linklist2);
// output: 500, 400, 300, 200, 100
```

:::note
`链表` 是一种物理结构，类似数组。数据在内存中是零散的。

数据删除和添加速度快，数据查找慢。

使用链表实现队列比使用数组实现效率更高，在实现时需要同时记录链表的head和tail，单独存储节点length，节点从tail进，从head出。
:::

# 用链表实现队列
```js

class Node {
    value =  null
    next = null;
}

class Queue {
    private len = 0;
    private head = null;
    private tail = null;

    constructor(){}

    add(num) {

        const newNode = {
            value: num;
            next: null;
        }
        if(this.head === null){
            this.head = newNode;
        }

        if(this.tail) {
            this.tail.next = newNode;
        }

        this.tail = newNode;

        this.len += 1;

    }

    delete() {
        const head = this.head;
        const next = head.next;
        if(head === null) { 
            return null;
        }

        this.head = next;

        this.len -= 1;

        return head.value;
    }

    get length(){
        return this.len;
    }

}

```

# 二分查找
```javascript
function binarySearch1(arr, target) {
    const len = arr.length;
    if (!len) {
        return -1;
    }
    let startIdx = 0;
    let endIdx = len - 1;
    while (startIdx <= endIdx) {
        const midIdx = Math.floor((startIdx + endIdx) / 2);
        const midVal = arr[midIdx];
        if (target > midVal) {
            startIdx = midIdx + 1;
        } else if (target < midVal) {
            endIdx = midIdx - 1;
        } else {
            return midIdx;
        }
    }

    return -1;
}

// const arr = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(binarySearch2(arr, 5));
// output: 4
```

:::note
查找对象为有序列表，非递归性能更好，时间复杂度为O(logn)。

凡有序，必二分

凡二分，时间复杂度必包含O(logn)
:::

# 查找两数之和
```javascript
function findTwoNum(arr, target) {
    const len = arr.length;
    if (!len) return [];
    let start = 0;
    let end = len - 1;
    while (start < end) {
        const sum = arr[start] + arr[end];
        if (sum === target) {
            return [arr[start], arr[end]]
        }
        if (sum > target) {
            end--;
        }
        if (sum < target) {
            start++
        }
    }
    return []
}

// const arr = [1, 2, 4, 7, 11, 15];
// console.log(findTwoNum(arr, 15));
// output: [4, 11]
```

# 二叉树遍历

```javascript

class TreeNode {
    value = null;
    left = null;
    right = null;
}
// 前序遍历
function preOrderTraverse(root) {  
    console.log(root.value);

    preOrderTraverse(root.left);
    preOrderTraverse(root.right);
 }

 // 中序遍历
 function inOrderTraverse(root) {
    inOrderTraverse(root.left);
    console.log(root.value);
    inOrderTraverse(root.right);
 }

 // 后序遍历
 function postOrderTraverse(root) { 
    postOrderTraverse(root.left);
    postOrderTraverse(root.right);
    console.log(root.value);
 }

```
:::note
`二叉树`是一颗树型结构，最多有两个节点。

二叉树有三种遍历方式：前序遍历、中序遍历和后序遍历。

- 前序遍历：先访问根节点，再递归遍历左子树，最后右子树。
- 中序遍历：先递归遍历左子树，再访问根节点，最后右子树。
- 后序遍历：先递归遍历左子树，再右子树，最后访问根节点。

:::


# 二叉搜索树

特点：　
- `left < root < right`

价值:
- 可使用二分查找法快速查找某个值　

# 平衡二叉树
特点：
- 左右子树高度差不超过1

# 红黑树
特点：
- 一种自平衡二叉树
- 节点颜色为红或黑，通过颜色转换来维持树的平衡
- 维持平衡效率较高
  
# B树

物理上为多叉树，逻辑上为二叉树

一般用于高效I/O，关系型数据库常用B树来组织数据

# 堆

堆是一种完全二叉树，分为最大堆和最小堆
- 最大堆：父节点大于子节点
- 最小堆：父节点小于子节点
- 逻辑结构为二叉树，物理结构为数组

VS BST

- 查询比BST慢
- 删除比BST快
- 维持平衡比BST快


# 斐波那契数列

```javascript

function fibonacci(n) {
    if (n <= 1) return n;
    let a = 0, b = 1, c = 0;
    for(let i = 2; i < n + 1; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return c; 
}
```

:::note
`动态规划`是一种用使用递归思想，把大问题拆解为小问题，再利用循环来实现的一种算法思维。
:::

#　把数组中的0移动到数组末尾

```javascript

const arr = [0, 1, 2, 0, 0 ,3, 4, 5];
function moveZero(arr) {   

    let j = -1; // 记录第一个0的下标

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === 0) {
            if(j < 0) {
                j = i;
            }

        }
        if(arr[i ] !== 0 && j >= 0) {
            const n = arr[i];
            arr[i] = arr[j];
            arr[j] = n;
            j++;
        }
        
    }
    
}
moveZero(arr)
console.log(arr);
```

# 字符串中连续最多的字符

```javascript

function maxChar(str) {
    const res = {
        char: '',
        count: 0
    }
    const len = str.length;;

    if(len === 0) {
        return res;
    }

    let tmpCount = 0;
    for(let i = 0; i < len; i++) {

        tmpCount = 0;

        for(let j = i; j < len; j++) {
            if(str[i] === str[j]) {
                tmpCount++;
            }

            if(str[i] !== str[j] || j === len -1) {
                if(tmpCount > res.count) {
                    res.char = str[i];
                    res.count = tmpCount;
                }

                if(i < len -1) {
                    i = j - 1;
                }
                break;
            }
        }
    }

    return res;
}

// 双指针法
function maxChar2(str) {
    const res = {
        char: '',
        count: 0
    }
    const len = str.length;;

    if(len === 0) {
        return res;
    }

    let tmpCount = 0;
    let  j = 0;
    for(let i = 0; i < len; i++) {
        if(str[i] === str[j]) {
            tmpCount++;
        } 
        if(str[i] !== str[j] || i === len -1) {
            if(tmpCount > res.count) {
                res.char = str[j];
                res.count = tmpCount;
            }

            tmpCount = 0;

            if(i < len -1) {
                j = i;
                i--;
            }
            
        }
    }

    return res;
}
const ss = 'aaabndddd';
console.log(maxChar2(ss));
```

:::note
要注意实际复杂度，不要被代码迷惑

双指针可以用来解决嵌套循环的问题　

算法题慎用正则表达式，正则表达式性能差　　
:::

#　快速排序

```javascript

function quickSort(arr) {
    const len = arr.length;
    if(len === 0) {
        return arr;
    }

    const midIdx = Math.floor(len / 2);
    const mid = arr.slice(midIdx, midIdx + 1)[0];

    let left = [];
    let right = [];

    for(let i = 0; i < len; i++) { 
        if(i === midIdx) {
            continue;
        }
        if(arr[i] <= mid) {
            left.push(arr[i]);
        } else if (arr[i] > mid){
            right.push(arr[i])
        } 
    }

    return quickSort(left).concat([mid], quickSort(right));
 }
const arr1 = [1,4,5,7,13,5,9];
quickSort(arr1)
```

# 回文数

```javascript
function findPalindrome(num) {
    const res  = [];
    if(num <= 0) {
        return []
    };
    for(let i = 1; i <= num; i++) {
        const str = i.toString();

        if(str === str.split('').reverse().join('')) {
            res.push(i);
        };

    }
    return res;

}

function findPalindrome2(num) {
    const res  = [];
    if(num <= 0) {
        return []
    };
    for(let i = 1; i <= num; i++) {
        const str = i.toString();

        let start = 0;
        let end = str.length - 1;
        let flag = true;
        while(start < end) {
            if(str[start] !== str[end]) {
                flag = false;
                break;
            }
            start++;
            end--;
        };

        if(flag) {
            res.push(i);
        }

    }
    return res;

}


function findPalindrome3(num) {
    const res  = [];
    if(num <= 0) {
        return []
    };
    for(let i = 1; i <= num; i++) {
        
        let n = i;
        let reverseNum = 0;

        while(n > 0) {
            reverseNum = reverseNum * 10 + n % 10;
            n = Math.floor(n / 10);
        };
        if(i === reverseNum) {
            res.push(i);
        }
    }

    return res;

}
```

# 高效字符串前缀匹配

优化思路：

在明确范围情况下可以考虑把数组数据拆分成对象数据


# 实现千位分隔符
```javascript

function formatNum(num) {
    const n = Math.floor(num);

    const str = n.toString();
    const arr = str.split('').reverse();

    // console.log(arr);

    return arr.reduce((prev, curr, idx) => {
        if(idx % 3 === 0) {
            if(prev) {
                return curr + ',' + prev;
            }else {
                return curr
            }
        } else {
            return curr + prev;
        }
    }, '')
}


function formatNum2(num) {
    const n = Math.floor(num);

    const str = n.toString();


    let res = '';
    const len = str.length;
    for(let i = len - 1; i >= 0; i--) {
        const j = len - i;

        if(j % 3 === 0 && j !== len) {
           res =  "," + str[i] + res;
        }else {
            res = str[i] + res;
        }
    }

    return res;
}

formatNum2(12313212311)
```


# 切换字符串中字母的大小写

```javascript
function switchCase(str) {
    let res = '';
    for(let i = 0; i < str.length; i++) {
        const char = str[i];
        if(char >= 'a' && char <= 'z') {
            res += char.toUpperCase();
        }else if (char >= 'A' && char <= 'Z') {
            res += char.toLowerCase();
        }else {
            res += char;    
        }
    }

    return res;
}

switchCase('hello World')

```