---
sidebar_position: 5
title: Base Konwledges 
tag: [frontend]
---

# 基础知识

## JSOP 实现原理：静态资源请求不受同源策略影响

```javascript
const script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://www.domain.com/a?data=1&callback=cb";
const cb = (res) => {
  console.log(JSON.stringify(res));
};
```

## CORS：跨域资源共享(CORS) 是一种机制，它使用额外的 HTTP 头来告诉浏览器 让运行在一个 origin (domain) 上的 Web 应用被准许访问来自不同源服务器上的指定的资源。

```javascript
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  next();
});
```

```shell
server {
    ...

    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Origin $http_origin;


    location /file {
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin $http_origin;
            add_header Access-Control-Allow-Methods $http_access_control_request_method;
            add_header Access-Control-Allow-Credentials true;
            add_header Access-Control-Allow-Headers $http_access_control_request_headers;
            add_header Access-Control-Max-Age 1728000;
            return 204;
        }
    }

    ...
}
```

## 网络协议（ISO / OSI 模型）

```
应用层 --> 表示层 --> 会话层 --> 传输层 --> 网络层 --> 数据链路层 --> 物理层

应用层 <-- 表示层 <-- 会话层 <-- 传输层 <-- 网络层 <-- 数据链路层 <-- 物理层
```
## 页面渲染流程

1.  创建 DOM 树
    - 遍历 DOM 树中的所有可见节点，并把这些节点加到布局树中。
    - 遍历 DOM 树中的所有可见节点，并把这些节点加到布局树中。
2.  CSS 样式计算
    - 创建 CSSOM tree
    - 转换样式表中的属性值
    - 计算出 DOM 节点样式
3.  生成 layout tree
4.  分层
    - 生成图层树（LayerTree）
    - 拥有层叠上下文属性的元素会被提升为单独的一层
    - 需要剪裁（clip）的地方也会被创建为图层
    - 图层绘制
5.  将图层转换为位图
6.  合成位图并显示在页面中

## 页面更新机制

1.  更新了元素的几何属性（重排）
2.  更新元素的绘制属性（重绘）
3.  直接合成（CSS3 属性）

## 编译 JS 代码的过程

1.  生成抽象语法树（AST）和执行上下文
2.  第一阶段是分词（tokenize），又称为词法分析
3.  第二阶段是解析（parse），又称为语法分析
4.  生成字节码
5.  字节码就是介于 AST 和机器码之间的一种代码。但是与特定类型的机器码无关，字节码需要通过解释器将其转换为机器码后才能执行。
6.  执行代码

## 高级语言编译步骤

1.  输入源程序字符流
2.  词法分析
3.  语法分析
4.  语义分析
5.  中间代码生成
6.  机器无关代码优化
7.  代码生成
8.  机器相关代码优化
9.  目标代码生成

## JS 数据转换

对象在转换类型的时候，会执行原生方法 ToPrimitive 。

1.  如果已经是 原始类型，则返回当前值；
2.  如果需要转化的是字符串 则先调用 toSting 方法，如果此时是 原始类型 则直接返回，否则再调用 valueOf 方法并返回结果；
3.  如果不是 字符串，则先调用 valueOf 方法，如果此时是 原始类型 则直接返回，否则再调用 toString 方法并返回结果；
4.  如果都没有 原始类型 返回，则抛出 TypeError 类型错误。

可以通过重写 Symbol.toPrimitive 来制定转换规则，此方法在转原始类型时调用优先级最高。

## 闭包

_没有被引用的闭包会被自动回收，但还存在全局变量中，则依然会内存泄漏。_

在 JavaScript 中，根据词法作用域的规则，内部函数总是可以访问其外部函数中声明的变量，当通过调用一个外部函数返回一个内部函数后，即使该外部函数已经执行结束了，但是内部函数引用外部函数的变量依然保存在内存中，我们就把这些变量的集合称为闭包。比如外部函数是 foo，那么这些变量的集合就称为 foo 函数的闭包。

## 原型&原型链
其实每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型。
原型也是一个对象，并且这个对象中包含了很多函数，对于 obj 来说，可以通过 `__proto__` 找到一个原型对象，在该对象中定义了很多函数让我们来使用

- Object 是所有对象的爸爸，所有对象都可以通过 **__proto__** 找到它
- Function 是所有函数的爸爸，所有函数都可以通过 **__proto__** 找到它
- 函数的 prototype 是一个对象
- 对象的 **__proto__** 属性指向原型， **__proto__** 将对象和原型连接起来组成了原型链

## 浏览器安全
  _攻击方式_

- xss：将代码注入到网页
- csrf：跨站请求伪造。攻击者会虚构一个后端请求地址，诱导用户通过某些途径发送请求。
- 中间人攻击：中间人攻击是攻击方同时与服务端和客户端建立起了连接，并让对方认为连接是安全的，但是实际上整个通信过程都被攻击者控制了。攻击者不仅能获得双方的通信信息，还能修改通信信息。 
- DNS 欺骗：入侵 DNS 来将用户访问目标改为入侵者指定机器 - 
- 会话劫持：在一次正常的通信过程中，攻击者作为第三方参与到其中，或者是在数据里加入其他信息，甚至将双方的通信模式暗中改变，即从直接联系变成有攻击者参与的联系。
  
  _防御措施_
- 预防 XSS
  - 使用转义字符过滤 html 代码
  - 过滤 SQL 代码
- 预防 CSRF

  - 验证 HTTP Referer 字段
  - 在请求地址中添加 token 并验证
  - 在 HTTP 头中自定义属性并验证
  - 接口防跨域处理
  - 不让第三方网站访问用户 cookie

- 预防中间人攻击

  - 对于 DNS 欺骗：检查本机的 HOSTS 文件
  - 对于会话劫持：使用交换式网络代替共享式网络，还必须使用静态 ARP、捆绑 MAC+IP 等方法来限制欺骗，以及采用认证方式的连接等。

- 内容安全策略（CSP）
  内容安全策略 (CSP) 是一个额外的安全层，用于检测并削弱某些特定类型的攻击，包括跨站脚本 (XSS) 和数据注入攻击等。无论是数据盗取、网站内容污染还是散发恶意软件，这些攻击都是主要的手段。 - HTTP Header 中的 Content-Security-Policy - `<meta http-equiv="Content-Security-Policy">`

## 浏览器性能优化

1.  DNS 预解析
    - `<link rel="dns-prefetch" href="" />`
    - Chrome 和 Firefox 3.5+ 能自动进行预解析
    - 关闭 DNS 预解析：`<meta http-equiv="x-dns-prefetch-control" content="off|on">`
2.  合理利用缓存机制（强缓存 & 协商缓存）
    1.  强缓存
        - Expires
        - Cache-Control
    2.  协商缓存
        协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程。

> https://mp.weixin.qq.com/s/xVVP_Uk8rLBhHJaMqMMJoA
