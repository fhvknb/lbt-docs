"use strict";(self.webpackChunklbt_docs=self.webpackChunklbt_docs||[]).push([[7577],{2073:(n,e,r)=>{r.r(e),r.d(e,{assets:()=>c,contentTitle:()=>l,default:()=>h,frontMatter:()=>s,metadata:()=>o,toc:()=>a});var t=r(4848),i=r(8453);const s={sidebar_position:4,title:"Algorithm Code",tag:["frontend"]},l="\u6570\u7ec4\u53cd\u8f6ck\u4f4d",o={id:"front-end/interviews/Algorithm Code",title:"Algorithm Code",description:"array\u6570\u7ec4\u4e3a\u6709\u5e8f\u6570\u636e\u7ed3\u6784\uff0c\u5185\u5b58\u7a7a\u95f4\u8fde\u7eed\uff0c\u5728\u6267\u884c\u64cd\u4f5cunshift, shift, splice\u5f88\u6162\uff0c\u65f6\u95f4\u590d\u6742\u5ea6\u4e3aO(n);",source:"@site/docs/front-end/interviews/Algorithm Code.md",sourceDirName:"front-end/interviews",slug:"/front-end/interviews/Algorithm Code",permalink:"/docs/front-end/interviews/Algorithm Code",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"Algorithm Code",tag:["frontend"]},sidebar:"tutorialSidebar",previous:{title:"Interview Notes",permalink:"/docs/category/interview-notes"},next:{title:"Notes Of CSS",permalink:"/docs/front-end/interviews/Notes Of CSS"}},c={},a=[];function d(n){const e={admonition:"admonition",code:"code",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.h1,{id:"\u6570\u7ec4\u53cd\u8f6ck\u4f4d",children:"\u6570\u7ec4\u53cd\u8f6ck\u4f4d"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"// \u65f6\u95f4\u590d\u6742\u5ea6\u3000O(1)\nfunction rotateArray(arr, k) {\n    var len = arr.length;\n    var k = Math.abs(k % len);\n    if (k === 0 || !len) {\n        return arr;\n    }\n    var arr1 = arr.slice(-k);\n    var arr2 = arr.slice(0, len - k);\n\n    return arr1.concat(arr2);\n}\n\n// const arr = [1, 2, 3, 4, 5, 6];\n// rotateArray(arr, 3)\n// output: [4, 5, 6, 1, 2, 3,]\n\n"})}),"\n",(0,t.jsx)(e.admonition,{type:"note",children:(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"array\u6570\u7ec4"}),"\u4e3a\u6709\u5e8f\u6570\u636e\u7ed3\u6784\uff0c\u5185\u5b58\u7a7a\u95f4\u8fde\u7eed\uff0c\u5728\u6267\u884c\u64cd\u4f5c",(0,t.jsx)(e.code,{children:"unshift"}),", ",(0,t.jsx)(e.code,{children:"shift"}),", ",(0,t.jsx)(e.code,{children:"splice"}),"\u5f88\u6162\uff0c\u65f6\u95f4\u590d\u6742\u5ea6\u4e3aO(n);"]})}),"\n",(0,t.jsx)(e.h1,{id:"\u62ec\u53f7\u5339\u914d",children:"\u62ec\u53f7\u5339\u914d"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"function isMatch(left, right){\n    if(left === '(' && right === ')') return true;\n    if(left === '{' && right === '}') return true;\n    if(left === '[' && right === ']') return true;\n    return false;\n}\nfunction matchBracket(str) {\n    if (!str || !str.length) {\n        return true;\n    }\n    var stack = [];\n    var leftBracket = ['(', '{', '['];\n    var rightBracket = [')', '}', ']'];\n    for (let i = 0; i < str.length; i++) {\n        if (leftBracket.includes(str[i])) {\n            stack.push(str[i]);\n        }\n        if (rightBracket.includes(str[i])) {\n            const top = stack[stack.length - 1];\n            if (isMatch(top, str[i])) {\n                stack.pop();\n            }else {\n                return false\n            }\n        }\n    }\n    return !stack.length;\n\n}\n\n// var s = '(abc)d{ssf}123'\n// console.log(matchBracket(s));\n// output: true\n"})}),"\n",(0,t.jsx)(e.admonition,{type:"note",children:(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"\u6808"})," \u662f\u4e00\u79cd\u5148\u8fdb\u540e\u51fa\u7684\u903b\u8f91\u7ed3\u6784\uff0c\u662f\u4e00\u79cd\u62bd\u8c61\u6a21\u578b\uff0c\u53ef\u4ee5\u7528\u4e0d\u540c\u8bed\u8a00\u548c\u4e0d\u540c\u65b9\u5f0f\u5b9e\u73b0\u4e00\u4e2a\u6808\u3002"]})}),"\n",(0,t.jsx)(e.h1,{id:"\u7528\u53cc\u6808\u5b9e\u73b0\u4e00\u4e2a\u961f\u5217",children:"\u7528\u53cc\u6808\u5b9e\u73b0\u4e00\u4e2a\u961f\u5217"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"class MyQueue {\n    stack1 = [];\n    stack2 = [];\n\n    add(item){\n        this.stack1.push(item)\n    }\n\n    delete(){\n      while(this.stack1.length){\n        const item = this.stack1.pop();\n        if(item) {\n            this.stack2.push(item);\n        }\n      }\n      this.stack2.pop();\n      while(this.stack2.length){\n        const item = this.stack2.pop();\n        if(item) {\n            this.stack1.push(item);\n        }\n      }\n\n      return this.stack1;\n\n    }\n\n    get length(){\n        return this.stack1.length;\n    }\n}\n\nconst myqueue = new MyQueue();\n\nmyqueue.add(100);\nmyqueue.add(200);\nmyqueue.add(300);\n\nconsole.log(myqueue.length);\nconst d = myqueue.delete();\nconsole.log(d);\nconsole.log(myqueue.length);\n\n"})}),"\n",(0,t.jsx)(e.admonition,{type:"note",children:(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"\u961f\u5217"})," \u662f\u4e00\u79cd\u5148\u8fdb\u5148\u51fa\u7684\u903b\u8f91\u7ed3\u6784\uff0c\u662f\u4e00\u79cd\u62bd\u8c61\u6a21\u578b\uff0c\u53ef\u4ee5\u7528\u4e0d\u540c\u8bed\u8a00\u548c\u4e0d\u540c\u65b9\u5f0f\u5b9e\u73b0\u4e00\u4e2a\u6808\u3002"]})}),"\n",(0,t.jsx)(e.h1,{id:"\u7528\u4e00\u4e2ajs\u65b9\u6cd5\u53cd\u8f6c\u4e00\u4e2a\u5355\u5411\u94fe\u8868",children:"\u7528\u4e00\u4e2aJS\u65b9\u6cd5\u53cd\u8f6c\u4e00\u4e2a\u5355\u5411\u94fe\u8868"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nfunction createLinkNode(arr) {\n    let len = arr.length;\n    if(!len){\n        throw('arr is empty!')\n    }\n    let curNode = {\n        value: arr[len - 1],\n    }\n    if(len === 1){\n        return curNode;\n    }\n    for(let i =  len - 2; i >= 0; i--){\n        let val = arr[i];\n        curNode = {\n            value: val,\n            next: curNode\n        }\n    }\n    return curNode\n}\n\nfunction reverseLinkList(head) {\n    let preNode, curNode, nextNode = head;\n    while (nextNode) {\n        if (curNode && !preNode) {\n            delete curNode.next;\n        }\n        if (preNode && curNode) {\n            curNode.next = preNode;\n        }\n        preNode = curNode;\n        curNode = nextNode;\n        nextNode = nextNode?.next;\n    }\n    curNode.next = preNode;\n    return curNode;\n}\n\nfunction printLinkList(head) {\n    let node = head;\n    while (node) {\n        console.log(node.value)\n        node = node.next;\n    }\n}\n\n// const arr = [100, 200, 300, 400, 500];\n// const linklist = createLinkNode(arr);\n// const linklist2 = reverseLinkList(linklist);\n// printLinkList(linklist2);\n// output: 500, 400, 300, 200, 100\n"})}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"\u94fe\u8868"})," \u662f\u4e00\u79cd\u7269\u7406\u7ed3\u6784\uff0c\u7c7b\u4f3c\u6570\u7ec4\u3002\u6570\u636e\u5728\u5185\u5b58\u4e2d\u662f\u96f6\u6563\u7684\u3002"]}),(0,t.jsx)(e.p,{children:"\u6570\u636e\u5220\u9664\u548c\u6dfb\u52a0\u901f\u5ea6\u5feb\uff0c\u6570\u636e\u67e5\u627e\u6162\u3002"}),(0,t.jsx)(e.p,{children:"\u4f7f\u7528\u94fe\u8868\u5b9e\u73b0\u961f\u5217\u6bd4\u4f7f\u7528\u6570\u7ec4\u5b9e\u73b0\u6548\u7387\u66f4\u9ad8\uff0c\u5728\u5b9e\u73b0\u65f6\u9700\u8981\u540c\u65f6\u8bb0\u5f55\u94fe\u8868\u7684head\u548ctail\uff0c\u5355\u72ec\u5b58\u50a8\u8282\u70b9length\uff0c\u8282\u70b9\u4ecetail\u8fdb\uff0c\u4ecehead\u51fa\u3002"})]}),"\n",(0,t.jsx)(e.h1,{id:"\u7528\u94fe\u8868\u5b9e\u73b0\u961f\u5217",children:"\u7528\u94fe\u8868\u5b9e\u73b0\u961f\u5217"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-js",children:"\nclass Node {\n    value =  null\n    next = null;\n}\n\nclass Queue {\n    private len = 0;\n    private head = null;\n    private tail = null;\n\n    constructor(){}\n\n    add(num) {\n\n        const newNode = {\n            value: num;\n            next: null;\n        }\n        if(this.head === null){\n            this.head = newNode;\n        }\n\n        if(this.tail) {\n            this.tail.next = newNode;\n        }\n\n        this.tail = newNode;\n\n        this.len += 1;\n\n    }\n\n    delete() {\n        const head = this.head;\n        const next = head.next;\n        if(head === null) { \n            return null;\n        }\n\n        this.head = next;\n\n        this.len -= 1;\n\n        return head.value;\n    }\n\n    get length(){\n        return this.len;\n    }\n\n}\n\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u4e8c\u5206\u67e5\u627e",children:"\u4e8c\u5206\u67e5\u627e"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"function binarySearch1(arr, target) {\n    const len = arr.length;\n    if (!len) {\n        return -1;\n    }\n    let startIdx = 0;\n    let endIdx = len - 1;\n    while (startIdx <= endIdx) {\n        const midIdx = Math.floor((startIdx + endIdx) / 2);\n        const midVal = arr[midIdx];\n        if (target > midVal) {\n            startIdx = midIdx + 1;\n        } else if (target < midVal) {\n            endIdx = midIdx - 1;\n        } else {\n            return midIdx;\n        }\n    }\n\n    return -1;\n}\n\n// const arr = [1, 2, 3, 4, 5, 6, 7, 8];\n// console.log(binarySearch2(arr, 5));\n// output: 4\n"})}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsx)(e.p,{children:"\u67e5\u627e\u5bf9\u8c61\u4e3a\u6709\u5e8f\u5217\u8868\uff0c\u975e\u9012\u5f52\u6027\u80fd\u66f4\u597d\uff0c\u65f6\u95f4\u590d\u6742\u5ea6\u4e3aO(logn)\u3002"}),(0,t.jsx)(e.p,{children:"\u51e1\u6709\u5e8f\uff0c\u5fc5\u4e8c\u5206"}),(0,t.jsx)(e.p,{children:"\u51e1\u4e8c\u5206\uff0c\u65f6\u95f4\u590d\u6742\u5ea6\u5fc5\u5305\u542bO(logn)"})]}),"\n",(0,t.jsx)(e.h1,{id:"\u67e5\u627e\u4e24\u6570\u4e4b\u548c",children:"\u67e5\u627e\u4e24\u6570\u4e4b\u548c"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"function findTwoNum(arr, target) {\n    const len = arr.length;\n    if (!len) return [];\n    let start = 0;\n    let end = len - 1;\n    while (start < end) {\n        const sum = arr[start] + arr[end];\n        if (sum === target) {\n            return [arr[start], arr[end]]\n        }\n        if (sum > target) {\n            end--;\n        }\n        if (sum < target) {\n            start++\n        }\n    }\n    return []\n}\n\n// const arr = [1, 2, 4, 7, 11, 15];\n// console.log(findTwoNum(arr, 15));\n// output: [4, 11]\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u4e8c\u53c9\u6811\u904d\u5386",children:"\u4e8c\u53c9\u6811\u904d\u5386"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nclass TreeNode {\n    value = null;\n    left = null;\n    right = null;\n}\n// \u524d\u5e8f\u904d\u5386\nfunction preOrderTraverse(root) {  \n    console.log(root.value);\n\n    preOrderTraverse(root.left);\n    preOrderTraverse(root.right);\n }\n\n // \u4e2d\u5e8f\u904d\u5386\n function inOrderTraverse(root) {\n    inOrderTraverse(root.left);\n    console.log(root.value);\n    inOrderTraverse(root.right);\n }\n\n // \u540e\u5e8f\u904d\u5386\n function postOrderTraverse(root) { \n    postOrderTraverse(root.left);\n    postOrderTraverse(root.right);\n    console.log(root.value);\n }\n\n"})}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"\u4e8c\u53c9\u6811"}),"\u662f\u4e00\u9897\u6811\u578b\u7ed3\u6784\uff0c\u6700\u591a\u6709\u4e24\u4e2a\u8282\u70b9\u3002"]}),(0,t.jsx)(e.p,{children:"\u4e8c\u53c9\u6811\u6709\u4e09\u79cd\u904d\u5386\u65b9\u5f0f\uff1a\u524d\u5e8f\u904d\u5386\u3001\u4e2d\u5e8f\u904d\u5386\u548c\u540e\u5e8f\u904d\u5386\u3002"}),(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u524d\u5e8f\u904d\u5386\uff1a\u5148\u8bbf\u95ee\u6839\u8282\u70b9\uff0c\u518d\u9012\u5f52\u904d\u5386\u5de6\u5b50\u6811\uff0c\u6700\u540e\u53f3\u5b50\u6811\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u4e2d\u5e8f\u904d\u5386\uff1a\u5148\u9012\u5f52\u904d\u5386\u5de6\u5b50\u6811\uff0c\u518d\u8bbf\u95ee\u6839\u8282\u70b9\uff0c\u6700\u540e\u53f3\u5b50\u6811\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u540e\u5e8f\u904d\u5386\uff1a\u5148\u9012\u5f52\u904d\u5386\u5de6\u5b50\u6811\uff0c\u518d\u53f3\u5b50\u6811\uff0c\u6700\u540e\u8bbf\u95ee\u6839\u8282\u70b9\u3002"}),"\n"]})]}),"\n",(0,t.jsx)(e.h1,{id:"\u4e8c\u53c9\u641c\u7d22\u6811",children:"\u4e8c\u53c9\u641c\u7d22\u6811"}),"\n",(0,t.jsx)(e.p,{children:"\u7279\u70b9\uff1a\u3000"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.code,{children:"left < root < right"})}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\u4ef7\u503c:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u53ef\u4f7f\u7528\u4e8c\u5206\u67e5\u627e\u6cd5\u5feb\u901f\u67e5\u627e\u67d0\u4e2a\u503c\u3000"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"\u5e73\u8861\u4e8c\u53c9\u6811",children:"\u5e73\u8861\u4e8c\u53c9\u6811"}),"\n",(0,t.jsx)(e.p,{children:"\u7279\u70b9\uff1a"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5de6\u53f3\u5b50\u6811\u9ad8\u5ea6\u5dee\u4e0d\u8d85\u8fc71"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"\u7ea2\u9ed1\u6811",children:"\u7ea2\u9ed1\u6811"}),"\n",(0,t.jsx)(e.p,{children:"\u7279\u70b9\uff1a"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u4e00\u79cd\u81ea\u5e73\u8861\u4e8c\u53c9\u6811"}),"\n",(0,t.jsx)(e.li,{children:"\u8282\u70b9\u989c\u8272\u4e3a\u7ea2\u6216\u9ed1\uff0c\u901a\u8fc7\u989c\u8272\u8f6c\u6362\u6765\u7ef4\u6301\u6811\u7684\u5e73\u8861"}),"\n",(0,t.jsx)(e.li,{children:"\u7ef4\u6301\u5e73\u8861\u6548\u7387\u8f83\u9ad8"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"b\u6811",children:"B\u6811"}),"\n",(0,t.jsx)(e.p,{children:"\u7269\u7406\u4e0a\u4e3a\u591a\u53c9\u6811\uff0c\u903b\u8f91\u4e0a\u4e3a\u4e8c\u53c9\u6811"}),"\n",(0,t.jsx)(e.p,{children:"\u4e00\u822c\u7528\u4e8e\u9ad8\u6548I/O\uff0c\u5173\u7cfb\u578b\u6570\u636e\u5e93\u5e38\u7528B\u6811\u6765\u7ec4\u7ec7\u6570\u636e"}),"\n",(0,t.jsx)(e.h1,{id:"\u5806",children:"\u5806"}),"\n",(0,t.jsx)(e.p,{children:"\u5806\u662f\u4e00\u79cd\u5b8c\u5168\u4e8c\u53c9\u6811\uff0c\u5206\u4e3a\u6700\u5927\u5806\u548c\u6700\u5c0f\u5806"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u6700\u5927\u5806\uff1a\u7236\u8282\u70b9\u5927\u4e8e\u5b50\u8282\u70b9"}),"\n",(0,t.jsx)(e.li,{children:"\u6700\u5c0f\u5806\uff1a\u7236\u8282\u70b9\u5c0f\u4e8e\u5b50\u8282\u70b9"}),"\n",(0,t.jsx)(e.li,{children:"\u903b\u8f91\u7ed3\u6784\u4e3a\u4e8c\u53c9\u6811\uff0c\u7269\u7406\u7ed3\u6784\u4e3a\u6570\u7ec4"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"VS BST"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u67e5\u8be2\u6bd4BST\u6162"}),"\n",(0,t.jsx)(e.li,{children:"\u5220\u9664\u6bd4BST\u5feb"}),"\n",(0,t.jsx)(e.li,{children:"\u7ef4\u6301\u5e73\u8861\u6bd4BST\u5feb"}),"\n"]}),"\n",(0,t.jsx)(e.h1,{id:"\u6590\u6ce2\u90a3\u5951\u6570\u5217",children:"\u6590\u6ce2\u90a3\u5951\u6570\u5217"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nfunction fibonacci(n) {\n    if (n <= 1) return n;\n    let a = 0, b = 1, c = 0;\n    for(let i = 2; i < n + 1; i++) {\n        c = a + b;\n        a = b;\n        b = c;\n    }\n    return c; \n}\n"})}),"\n",(0,t.jsx)(e.admonition,{type:"note",children:(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.code,{children:"\u52a8\u6001\u89c4\u5212"}),"\u662f\u4e00\u79cd\u7528\u4f7f\u7528\u9012\u5f52\u601d\u60f3\uff0c\u628a\u5927\u95ee\u9898\u62c6\u89e3\u4e3a\u5c0f\u95ee\u9898\uff0c\u518d\u5229\u7528\u5faa\u73af\u6765\u5b9e\u73b0\u7684\u4e00\u79cd\u7b97\u6cd5\u601d\u7ef4\u3002"]})}),"\n",(0,t.jsx)(e.p,{children:"#\u3000\u628a\u6570\u7ec4\u4e2d\u76840\u79fb\u52a8\u5230\u6570\u7ec4\u672b\u5c3e"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nconst arr = [0, 1, 2, 0, 0 ,3, 4, 5];\nfunction moveZero(arr) {   \n\n    let j = -1; // \u8bb0\u5f55\u7b2c\u4e00\u4e2a0\u7684\u4e0b\u6807\n\n    for(let i = 0; i < arr.length; i++) {\n        if(arr[i] === 0) {\n            if(j < 0) {\n                j = i;\n            }\n\n        }\n        if(arr[i ] !== 0 && j >= 0) {\n            const n = arr[i];\n            arr[i] = arr[j];\n            arr[j] = n;\n            j++;\n        }\n        \n    }\n    \n}\nmoveZero(arr)\nconsole.log(arr);\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u5b57\u7b26\u4e32\u4e2d\u8fde\u7eed\u6700\u591a\u7684\u5b57\u7b26",children:"\u5b57\u7b26\u4e32\u4e2d\u8fde\u7eed\u6700\u591a\u7684\u5b57\u7b26"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nfunction maxChar(str) {\n    const res = {\n        char: '',\n        count: 0\n    }\n    const len = str.length;;\n\n    if(len === 0) {\n        return res;\n    }\n\n    let tmpCount = 0;\n    for(let i = 0; i < len; i++) {\n\n        tmpCount = 0;\n\n        for(let j = i; j < len; j++) {\n            if(str[i] === str[j]) {\n                tmpCount++;\n            }\n\n            if(str[i] !== str[j] || j === len -1) {\n                if(tmpCount > res.count) {\n                    res.char = str[i];\n                    res.count = tmpCount;\n                }\n\n                if(i < len -1) {\n                    i = j - 1;\n                }\n                break;\n            }\n        }\n    }\n\n    return res;\n}\n\n// \u53cc\u6307\u9488\u6cd5\nfunction maxChar2(str) {\n    const res = {\n        char: '',\n        count: 0\n    }\n    const len = str.length;;\n\n    if(len === 0) {\n        return res;\n    }\n\n    let tmpCount = 0;\n    let  j = 0;\n    for(let i = 0; i < len; i++) {\n        if(str[i] === str[j]) {\n            tmpCount++;\n        } \n        if(str[i] !== str[j] || i === len -1) {\n            if(tmpCount > res.count) {\n                res.char = str[j];\n                res.count = tmpCount;\n            }\n\n            tmpCount = 0;\n\n            if(i < len -1) {\n                j = i;\n                i--;\n            }\n            \n        }\n    }\n\n    return res;\n}\nconst ss = 'aaabndddd';\nconsole.log(maxChar2(ss));\n"})}),"\n",(0,t.jsxs)(e.admonition,{type:"note",children:[(0,t.jsx)(e.p,{children:"\u8981\u6ce8\u610f\u5b9e\u9645\u590d\u6742\u5ea6\uff0c\u4e0d\u8981\u88ab\u4ee3\u7801\u8ff7\u60d1"}),(0,t.jsx)(e.p,{children:"\u53cc\u6307\u9488\u53ef\u4ee5\u7528\u6765\u89e3\u51b3\u5d4c\u5957\u5faa\u73af\u7684\u95ee\u9898\u3000"}),(0,t.jsx)(e.p,{children:"\u7b97\u6cd5\u9898\u614e\u7528\u6b63\u5219\u8868\u8fbe\u5f0f\uff0c\u6b63\u5219\u8868\u8fbe\u5f0f\u6027\u80fd\u5dee\u3000\u3000"})]}),"\n",(0,t.jsx)(e.p,{children:"#\u3000\u5feb\u901f\u6392\u5e8f"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nfunction quickSort(arr) {\n    const len = arr.length;\n    if(len === 0) {\n        return arr;\n    }\n\n    const midIdx = Math.floor(len / 2);\n    const mid = arr.slice(midIdx, midIdx + 1)[0];\n\n    let left = [];\n    let right = [];\n\n    for(let i = 0; i < len; i++) { \n        if(i === midIdx) {\n            continue;\n        }\n        if(arr[i] <= mid) {\n            left.push(arr[i]);\n        } else if (arr[i] > mid){\n            right.push(arr[i])\n        } \n    }\n\n    return quickSort(left).concat([mid], quickSort(right));\n }\nconst arr1 = [1,4,5,7,13,5,9];\nquickSort(arr1)\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u56de\u6587\u6570",children:"\u56de\u6587\u6570"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"function findPalindrome(num) {\n    const res  = [];\n    if(num <= 0) {\n        return []\n    };\n    for(let i = 1; i <= num; i++) {\n        const str = i.toString();\n\n        if(str === str.split('').reverse().join('')) {\n            res.push(i);\n        };\n\n    }\n    return res;\n\n}\n\nfunction findPalindrome2(num) {\n    const res  = [];\n    if(num <= 0) {\n        return []\n    };\n    for(let i = 1; i <= num; i++) {\n        const str = i.toString();\n\n        let start = 0;\n        let end = str.length - 1;\n        let flag = true;\n        while(start < end) {\n            if(str[start] !== str[end]) {\n                flag = false;\n                break;\n            }\n            start++;\n            end--;\n        };\n\n        if(flag) {\n            res.push(i);\n        }\n\n    }\n    return res;\n\n}\n\n\nfunction findPalindrome3(num) {\n    const res  = [];\n    if(num <= 0) {\n        return []\n    };\n    for(let i = 1; i <= num; i++) {\n        \n        let n = i;\n        let reverseNum = 0;\n\n        while(n > 0) {\n            reverseNum = reverseNum * 10 + n % 10;\n            n = Math.floor(n / 10);\n        };\n        if(i === reverseNum) {\n            res.push(i);\n        }\n    }\n\n    return res;\n\n}\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u9ad8\u6548\u5b57\u7b26\u4e32\u524d\u7f00\u5339\u914d",children:"\u9ad8\u6548\u5b57\u7b26\u4e32\u524d\u7f00\u5339\u914d"}),"\n",(0,t.jsx)(e.p,{children:"\u4f18\u5316\u601d\u8def\uff1a"}),"\n",(0,t.jsx)(e.p,{children:"\u5728\u660e\u786e\u8303\u56f4\u60c5\u51b5\u4e0b\u53ef\u4ee5\u8003\u8651\u628a\u6570\u7ec4\u6570\u636e\u62c6\u5206\u6210\u5bf9\u8c61\u6570\u636e"}),"\n",(0,t.jsx)(e.h1,{id:"\u5b9e\u73b0\u5343\u4f4d\u5206\u9694\u7b26",children:"\u5b9e\u73b0\u5343\u4f4d\u5206\u9694\u7b26"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"\nfunction formatNum(num) {\n    const n = Math.floor(num);\n\n    const str = n.toString();\n    const arr = str.split('').reverse();\n\n    // console.log(arr);\n\n    return arr.reduce((prev, curr, idx) => {\n        if(idx % 3 === 0) {\n            if(prev) {\n                return curr + ',' + prev;\n            }else {\n                return curr\n            }\n        } else {\n            return curr + prev;\n        }\n    }, '')\n}\n\n\nfunction formatNum2(num) {\n    const n = Math.floor(num);\n\n    const str = n.toString();\n\n\n    let res = '';\n    const len = str.length;\n    for(let i = len - 1; i >= 0; i--) {\n        const j = len - i;\n\n        if(j % 3 === 0 && j !== len) {\n           res =  \",\" + str[i] + res;\n        }else {\n            res = str[i] + res;\n        }\n    }\n\n    return res;\n}\n\nformatNum2(12313212311)\n"})}),"\n",(0,t.jsx)(e.h1,{id:"\u5207\u6362\u5b57\u7b26\u4e32\u4e2d\u5b57\u6bcd\u7684\u5927\u5c0f\u5199",children:"\u5207\u6362\u5b57\u7b26\u4e32\u4e2d\u5b57\u6bcd\u7684\u5927\u5c0f\u5199"}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-javascript",children:"function switchCase(str) {\n    let res = '';\n    for(let i = 0; i < str.length; i++) {\n        const char = str[i];\n        if(char >= 'a' && char <= 'z') {\n            res += char.toUpperCase();\n        }else if (char >= 'A' && char <= 'Z') {\n            res += char.toLowerCase();\n        }else {\n            res += char;    \n        }\n    }\n\n    return res;\n}\n\nswitchCase('hello World')\n\n"})})]})}function h(n={}){const{wrapper:e}={...(0,i.R)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(d,{...n})}):d(n)}},8453:(n,e,r)=>{r.d(e,{R:()=>l,x:()=>o});var t=r(6540);const i={},s=t.createContext(i);function l(n){const e=t.useContext(s);return t.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function o(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:l(n.components),t.createElement(s.Provider,{value:e},n.children)}}}]);