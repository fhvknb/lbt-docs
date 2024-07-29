---
sidebar_position: 4
title: algorithm & codesource
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
:::


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
}

// const arr = [1, 2, 4, 7, 11, 15];
// console.log(findTwoNum(arr, 15));
// output: [4, 11]
```
