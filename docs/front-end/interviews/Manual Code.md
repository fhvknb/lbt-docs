---
sidebar_position: 4
title: Manual Code
tag: [frontend]
---
# 手写代码

```js



export function flattenArray(arr: any[]): any[] {
    return arr.reduce((acc, val) => {
        if (Array.isArray(val)) acc = acc.concat(flattenArray(val));
        else acc.push(val);
        return acc;
    }, []);

}
/**
 * 获取扁平数组
 * @param arr 　需要拍平的数组
 * @param level 　获取的层级
 * @returns 
 */
export function flattenArray2(arr: any[], level: number): any[] {
    // const result: any[] = [];
    let count = 0;
    function getVal(a: any[]) {
        const res: any[] = [];

        for (const item of a) {
            if (Array.isArray(item) && level >= count++) {
                res.push(...getVal(item));
            } else {
                res.push(item);
            }
        }
        return res;
    }

    return getVal(arr);

    // return result;
}

export function getType(value: any) {
    return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}


/**
 * new 操作符实现
 */
export function New<T>(constructor: Function, ...args: any[]): T {
    //创建新对象，继承constructor的原型
    const obj = Object.create(constructor.prototype);
    //执行构造函数，绑定this
    constructor.apply(obj, args);

    return obj;
}


export function visiteNode(node: Node) {
    // console.dir(node);
    if (node instanceof Text) {
        const t = node.textContent?.trim();
        if (t) {
            console.info('文本节点---', t);

        }
    }

    if (node instanceof HTMLElement) {
        console.info('标签节点---', node.tagName.toLowerCase());
    }
}
/**
 * 深度优先遍历
 * @param root 根节点
 * @returns 
 */
export function deepthFistTravse(root: Node) {
    if (!root) return false;

    visiteNode(root)

    const childNodes = root.childNodes;
    childNodes.forEach((node) => {
        deepthFistTravse(node);
    })

}
/**
 * 广度优化遍历
 * @param root 根节点
 * @returns 
 */
export function breadthFistTravse(root: Node) {
    if (!root) return false;

    const queue: Node[] = [root];

    while (queue.length) {
        const node = queue.shift();

        if (!node) continue;
        visiteNode(node);


        if (node) {
            for (let i = 0; i < node.childNodes.length; i++) {
                queue.push(node.childNodes[i]);
            }
        }
    }
}


export class LazyMan {

    private name: string;

    private task: Function[] = []
    constructor(name: string) {
        this.name = name;
        setTimeout(() => {
            this.next();
        }, 100);
    }

    private next() {
        const task = this.task.shift();
        task && task();
    }

    eat(food: string) {
        const eatTask = () => {
            console.log(`${this.name} is eating ${food}`);
            this.next();
        };

        this.task.push(eatTask);
        return this;
    }


    sleep(time: number) {
        const sleepTask = () => {
            console.log(`${this.name} is sleeping.`);
            setTimeout(() => {
                console.log(`${this.name} is wake up`);
                this.next();
            }, time * 1000);
        };
        this.task.push(sleepTask);

        return this;
    }
}


export function curry(fn: Function) {

    let _args: any[] = [];

    const fnParamsLen = fn.length;

    const calc = function (this: any, ...args: any[]) {
        _args = [..._args, ...args];
        if (_args.length >= fnParamsLen) {
            return fn.apply(this, _args.slice(0, fnParamsLen));
        } else {
            return calc;
        }
    }


    return calc;
}

export function myInstanceof(instance: any, origin: any): boolean {

    if (instance == null) return false;
    const type = typeof instance;
    if (type !== 'object' && type !== 'function') {
        return false;
    }
    let tmpInst = Object.getPrototypeOf(instance);
    while (tmpInst) {
        if (tmpInst === origin.prototype) {
            return true;
        }
        tmpInst = Object.getPrototypeOf(tmpInst);
    }

    return false;
}

// @ts-ignore
Function.prototype.myBind = function (ctx: any, ...newArgs: any[]) {

    const self = this;

    return function (...args: any[]) {
        return self.apply(ctx, newArgs.concat(args));
    }

}

// @ts-ignore
Function.prototype.myCall = function (ctx: any, ...args: any[]) {
    if (ctx === null || ctx === undefined) {
        ctx = globalThis
    }

    if (typeof ctx !== 'object') {
        ctx = new Object(ctx);
    }

    const fnKey = Symbol('fn');

    ctx[fnKey] = this;
    const result = ctx[fnKey](...args);
    delete ctx[fnKey];

    return result;

}


export class EventBus {

    private events: { [key: string]: { fn: Function, isOnce: boolean }[] } = {};

    on(type: string, fn: Function, isOnce: boolean) {
        this.events[type] = this.events[type] || [];
        this.events[type].push({
            fn,
            isOnce
        });
    }

    once(type: string, fn: Function) {
        this.on(type, fn, true);
    }

    off(type: string, fn?: Function) {
        if (!this.events[type]) return;
        if (!fn) {
            this.events[type] = [];
        } else {
            const index = this.events[type].findIndex(item => item.fn === fn);
            index !== -1 && this.events[type].splice(index, 1);
        }
    }

    emit(type: string, ...args: any[]) {
        if (!this.events[type]) return;

        this.events[type] = this.events[type].filter(item => {
            item.fn(...args);
            return !item.isOnce;
        });
    }
}


export class LRUCache {
    private len: number;

    private data: Map<any, any> = new Map();

    constructor(len: number) {
        this.len = len;
    }


    set(key: any, value: any) {

        if (this.data.has(key)) {
            this.data.delete(key);
            this.data.set(key, value);
        } else {
            this.data.set(key, value);
        }

        if (this.data.size > this.len) {
            this.data.delete(this.data.keys().next().value);
        }

    }

    get(key: any) {
        if (this.data.has(key)) {
            const value = this.data.get(key);

            this.data.delete(key);
            this.set(key, value);
            return value;
        } else {
            return null;
        }
    }
}

interface IDoubleNode {
    val: any;
    key: any;
    next?: IDoubleNode | null;
    prev?: IDoubleNode | null;
}

export class LRUCache2 {
    private capacity: number;
    private dataLen: number = 0;
    private data: { [key: string]: IDoubleNode } = {};
    private head: IDoubleNode | null = null;
    private tail: IDoubleNode | null = null;

    constructor(capacity: number) {
        if (capacity < 1) throw new Error('capacity must be greater than zero');

        this.capacity = capacity;
    }


    moveToTail(curNode: IDoubleNode) {
        if (curNode === this.tail) return;

        const prev = curNode.prev;
        const next = curNode.next;
        if (prev) {
            if (next) {
                prev.next = next;

            } else {
                delete prev.next;
            }
        }

        if (next) {

            if (prev) {
                next.prev = prev;

            } else {
                delete next.prev;
            }

            if (this.head === curNode) {
                this.head = next;
            }
        }

        delete curNode.next;
        delete curNode.prev;

        if (this.tail) {
            this.tail.next = curNode;
            curNode.prev = this.tail;
        }

        this.tail = curNode;
    }

    tryClean() {
        while (this.dataLen > this.capacity) {

            if (!this.head) {
                throw new Error('head is null');
            }
            const nextNode = this.head.next;
            const delKey = this.head.key;

            if (!nextNode) {
                throw new Error('next node is null');
            }


            delete nextNode.prev;
            delete this.head.next;

            this.head = nextNode;


            delete this.data[delKey];
            this.dataLen--;
        }
    }

    set(key: any, value: any) {

        const curNode = this.data[key];

        if (!curNode) {
            const newNode = { key, val: value };

            this.moveToTail(newNode);
            this.data[key] = newNode;
            this.dataLen++;

            if (this.dataLen === 1) {
                this.head = newNode;
            }


        } else {
            curNode.val = value;
            this.moveToTail(curNode);
        }

        this.tryClean();

    }


    get(key: any): any {
        const curNode = this.data[key];
        if (!curNode) return null;

        if (curNode !== this.tail) {
            this.moveToTail(curNode);
        }

        return curNode.val;
    }
}


export function deepClone(obj: any, wmap: WeakMap<any, any> = new WeakMap()) {
    let result: any = {};
    if (obj === null) return obj;

    if (typeof obj !== 'object') return obj;

    if (wmap.has(obj)) return wmap.get(obj);
    wmap.set(obj, result);

    if (obj instanceof Map) {
        result = new Map();
        for (let [key, value] of obj) {
            result.set(deepClone(key, wmap), deepClone(value, wmap));
        }
        return result;

    }

    if (obj instanceof Set) {
        result = new Set();
        for (let value of obj) {
            result.add(deepClone(value, wmap));
        }
        return result;

    }

    if (Array.isArray(obj)) {
        result = [];
        for (let i = 0; i < obj.length; i++) {
            result[i] = deepClone(obj[i], wmap);
        }
        return result;
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {

            result[key] = deepClone(obj[key], wmap);
        }
    }

    return result;
}


interface ITreeNode {
    id: number;
    name: string;
    children?: ITreeNode[];
}
export function covertArrToTree(arr: any[]) {
    const treeIdMap: Map<number, ITreeNode> = new Map();
    let rootNode: ITreeNode | null = null;
    arr.forEach((item) => {
        const node: ITreeNode = {
            id: item.id,
            name: item.name,
        };

        const parent = treeIdMap.get(item.parentId);

        if (parent) {
            parent.children = parent.children || [];
            parent.children.push(node);
        }

        if (item.parentId === 0) {
            rootNode = node;
        }

        treeIdMap.set(item.id, node);


    });


    return rootNode;
}



export function covertTreeToArr(obj: any) {
    const pidMap: Map<number, any> = new Map();

    const result: any[] = [];
    const queue: any[] = [obj];

    while (queue.length) {
        const node = queue.shift();

        const item = {
            id: node.id,
            name: node.name,
            parentId: pidMap.get(node.id) || 0,
        };

        result.push(item);

        if (node.children) {
            for (let child of node.children) {
                queue.push(child);
                pidMap.set(child.id, node.id);
            }

        }

    }

    return result;
}



```