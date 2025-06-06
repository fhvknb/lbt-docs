---
tag:
  - http
---

# HTTP常见面试题

![Http大纲](../../../static/images/1747213235598.png)

## HTTP 基本概念

**HTTP 是什么？**

HTTP 是超文本传输协议，也就是**H**yperText **T**ransfer **P**rotocol。

> 能否详细解释「超文本传输协议」？

HTTP 的名字「超文本协议传输」，它可以拆成三个部分：

- 超文本
- 传输
- 协议

![Image 3: 三个部分](../../../static/images/1747213235583.png)


#### 超文本   
HTTP 传输的内容是「超文本」。我们先来理解「文本」，在互联网早期的时候只是简单的字符文字，但现在「文本」的涵义已经可以扩展为图片、视频、压缩包等，在 HTTP 眼里这些都算作「文本」。   
再来理解「超文本」，它就是**超越了普通文本的文本**，它是文字、图片、视频等的混合体，最关键有超链接，能从一个超文本跳转到另外一个超文本。   
HTML就是一种最常见的超文本了，它本身只是纯文字文件，但内部用很多标签定义了图片、视频等的链接，再经过浏览器的解释，呈现给我们的就是一个文字、有画面的网页了。

#### 传输  
所谓的「传输」，很好理解，就是把一堆东西从 A 点搬到 B 点，或者从 B 点 搬到 A 点。别轻视了这个简单的动作，它至少包含两项重要的信息。   
HTTP 协议是一个**双向协议**。我们在上网冲浪时，浏览器是请求方 A，百度网站就是应答方 B。双方约定用 HTTP 协议来通信，于是浏览器把请求数据发送给网站，网站再把一些数据返回给浏览器，最后由浏览器渲染在屏幕，就可以看到图片、视频了。

![请求与应答](../../../static/images/1747213235646.png)

数据虽然是在 A 和 B 之间传输，但允许中间有**中转或接力**。就好像第一排的同学想传递纸条给最后一排的同学，那么传递的过程中就需要经过好多个同学（中间人），这样的传输方式就从`A > B`，变成了`A > N > M > B`。而在 HTTP 里，需要中间人遵从 HTTP 协议，只要不打扰基本的数据传输，就可以添加任意额外的东西。   
通过**传输**，我们可以进一步理解HTTP。HTTP 是一个在计算机世界里专门用来在**两点之间传输数据**的约定和规范。

#### 协议
在生活中，我们也能随处可见「协议」，例如：   
刚毕业时会签一个「三方协议」；
找房子时会签一个「租房协议」；   
生活中的协议，本质上与计算机中的协议是相同的。   
「**协**」字，代表的意思是必须有**两个以上的参与者**。例如三方协议里的参与者有三个：你、公司、学校三个；租房协议里的参与者有两个：你和房东。   
「**议**」字，代表的意思是对参与者的一种**行为约定和规范**。例如三方协议里规定试用期期限、毁约金等；租房协议里规定租期期限、每月租金金额、违约如何处理等。   
针对 HTTP **协议**，我们可以这么理解。HTTP 是一个用在计算机世界里的**协议**。它使用计算机能够理解的语言确立了一种计算机之间交流通信的规范（**两个以上的参与者**），以及相关的各种控制和错误处理方式（**行为约定和规范**）。


#### 总结
**HTTP是一个在计算机世界里专门在「两点」之间「传输」文字、图片、音频、视频等「超文本」数据的「约定和规范」。**

:::note Q & A
Q: 那「HTTP 是用于从互联网服务器传输超文本到本地浏览器的协议」，这种说法正确吗？  
A: 这种说法是**不正确**的。因为也可以是`Server > Server`，所以采用**两点之间**的描述会更准确。
:::



## HTTP 常见的状态码有哪些
![HTTP 状态码 ](../../../static/images/1747213236349.png)

`1xx` 类状态码属于**提示信息**，是协议处理中的一种中间状态，实际用到的比较少。

`2xx` 类状态码表示服务器**成功**处理了客户端的请求，也是我们最愿意看到的状态。   
- **200 OK** 是最常见的成功状态码，表示一切正常。如果是非 `HEAD` 请求，服务器返回的响应头都会有 body 数据。   
- **204 No Content** 也是常见的成功状态码，与 200 OK 基本相同，但响应头没有 body 数据。  
- **206 Partial Content** 是应用于 HTTP 分块下载或断点续传，表示响应返回的 body 数据并不是资源的全部，而是其中的一部分，也是服务器处理成功的状态。
    
`3xx` 类状态码表示客户端请求的资源发生了变动，需要客户端用新的 URL 重新发送请求获取资源，也就是**重定向**。   
- **301 Moved Permanently** 表示永久重定向，说明请求的资源已经不存在了，需改用新的 URL 再次访问。   
- **302 Found** 表示临时重定向，说明请求的资源还在，但暂时需要用另一个 URL 来访问。  
301 和 302 都会在响应头里使用字段 `Location`，指明后续要跳转的 URL，浏览器会自动重定向新的 URL。   
- **304 Not Modified** 不具有跳转的含义，表示资源未修改，重定向已存在的缓冲文件，也称缓存重定向，也就是告诉客户端可以继续使用缓存资源，用于缓存控制。

`4xx` 类状态码表示客户端发送的**报文有误**，服务器无法处理，也就是错误码的含义。  
- **400 Bad Request** 表示客户端请求的报文有错误，但只是个笼统的错误。  
- **403 Forbidden** 表示服务器禁止访问资源，并不是客户端的请求出错。   
- **404 Not Found** 表示请求的资源在服务器上不存在或未找到，所以无法提供给客户端。

`5xx` 类状态码表示客户端请求报文正确，但是**服务器处理时内部发生了错误**，属于服务器端的错误码。  
- **500 Internal Server Error** 与 400 类型，是个笼统通用的错误码，服务器发生了什么错误，我们并不知道。  
- **501 Not Implemented** 表示客户端请求的功能还不支持，类似“即将开业，敬请期待”的意思。  
- **502 Bad Gateway** 通常是服务器作为网关或代理时返回的错误码，表示服务器自身工作正常，访问后端服务器发生了错误。  
- **503 Service Unavailable** 表示服务器当前很忙，暂时无法响应客户端，类似“网络服务正忙，请稍后重试”的意思。
    

## HTTP协议中常见字段有哪些

__Host__ ：客户端发送请求时，用来指定服务器的域名。   
`Host: www.example.com`

![Image 7](../../../static/images/1747213235911.png)

__Content-Length__ : 服务器在返回数据时，会有 `Content-Length` 字段，表明本次回应的数据长度。  
`Content-Length: 1000`    

![Image 8: a diagram showing the contents of a web page in chinese](../../../static/images/1747213235787.png)


__Connection__ : 字段最常用于客户端要求服务器使用「HTTP 长连接」机制，以便其他请求复用。   
`Connection: keep-alive`   

![Image 9: a diagram showing how to connect to the internet](../../../static/images/1747213236198.png)

HTTP 长连接的特点是，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。   
HTTP/1.1 版本的默认连接都是长连接，但为了兼容老版本的 HTTP，需要指定 `Connection: Keep-Alive` 才能开启长连接。  

![Image 10: HTTP 长连接](../../../static/images/1747213235581.png)

开启了 HTTP Keep-Alive 机制后， 连接就不会中断，而是保持连接。当客户端发送另一个请求时，它会使用同一个连接，一直持续到客户端或服务器端提出断开连接。

__Content-Type__ :  字段用于服务器回应时，告诉客户端，本次数据是什么格式。   
`Content-Type: text/html; Charset=utf-8`   
客户端发起请求时，可能通过`Accepte: */*` 来声明自己可以接受哪些数据格式

![Image 11: a diagram of a content type that is used in chinese](../../../static/images/1747213235826.png)

__Content-Encoding__ : 字段说明数据的压缩方法。表示服务器返回的数据使用了什么压缩格式.   
`Content-Encoding: gzip`    
客户端发起请求时，可能通过 `Accept-Encoding: gzip, deflate` 来声明自己可以接受哪些压缩方法。

![Image 12: a diagram showing the process of encrypting and decrypting a file](../../../static/images/1747213235804.png)

## GET 和 POST 有什么区别
根据 RFC 规范， **`GET` 从服务器获取指定的资源**，这个资源可以是静态的文本、页面、图片视频等。    
**`GET`** 请求的参数位置一般是写在 URL 中，URL 规定只能支持 ASCII，所以 **`GET`** 请求的参数只允许 ASCII 字符 ，而且浏览器会对 URL 的长度有限制（HTTP协议本身对 URL长度并没有做任何规定）。   
比如，你打开我的文章，浏览器就会发送 **`GET`** 请求给服务器，服务器就会返回文章的所有文字及资源。   

![Image 13: GET 请求](../../../static/images/1747213235837.png)

根据 RFC 规范，**`POST` 是根据请求负荷（body报文）对指定的资源做出处理**，具体的处理方式根据资源类型而不同。   
**`POST`** 请求携带数据的位置一般是写在报文 body 中，body 中的数据可以是任意格式的数据，只要客户端与服务端协商好即可，而且浏览器不会对 body 大小做限制。 

![Image 14: POST 请求](../../../static/images/1747213235665.png)

## GET 和 POST 方法安全幂等吗
**安全和幂等的概念**   
在 HTTP 协议里，所谓的 ***安全*** 是指请求方法不会「破坏」服务器上的资源。所谓的 ***幂等*** ，意思是多次执行相同的操作，结果都是「相同」的。从 RFC 规范定义的语义来讲：  

**GET 方法安全且幂等** 因为它是「只读」操作，无论操作多少次，服务器上的数据都是安全的，且每次的结果都是相同的。所以，**可以对 GET 请求的数据做缓存，这个缓存可以做到浏览器本身上（彻底避免浏览器发请求），也可以做到代理服务上（如nginx），而且在浏览器中 GET 请求可以保存为书签**。 

**POST 方法为非幂等** 因为是「新增或提交数据」的操作，会修改服务器上的资源，所以是**不安全**的，且多次提交数据就会创建多个资源，所以，**浏览器一般不会缓存 POST 请求，也不能把 POST 请求保存为书签**。    
:::note 小结
**`GET`** 的语义是请求获取指定的资源。`GET` 方法是安全、幂等、可被缓存的。  
**`POST`** 的语义是根据请求负荷（报文主体）对指定的资源做出处理，具体的处理方式视资源类型而不同。`POST` 不安全，不幂等，（大部分实现）不可缓存。   

*`GET` 请求可以带 body 吗？*  
RFC 规范并没有规定 GET 请求不能带 body 的。理论上，任何请求都可以带 body 的。因为 RFC 规范定义的 GET 请求是获取资源，所以根据这个语义不需要用到 body。另外，URL 中的查询参数也不是 GET 所独有的，POST 请求的 URL 中也可以有参数的。
:::



## HTTP 缓存技术
**为什么要使用 HTTP 缓存？**     
当我们打开一个网页的时候，浏览器会发送很多 `http` 请求到服端，比如请求 HTML、CSS、JS、图片等资源，这些资源都是**静态资源**，它们**不会随着用户行为而改变**，所以我们可以把这些资源缓存到本地，下次再访问的时候，直接从本地读取，这样就避免了网络请求，提高了网页展示速度和网站的性能。


**HTTP 缓存有哪些实现方式？**   
**`HTTP`** 缓存有两种实现方式，分别是**强制缓存** 和 **协商缓存**。

### 强制缓存
强缓存指的是**浏览器**判断缓存有没有过期，没有过期直接使用本地缓存，决定是否使用缓存的主动性在浏览器这边。如下图所示

![Image 15: A web inspector showing the request URL, method, status code and the remote address](../../../static/images/1747213235995.png)

强制缓存是通过`HTTP` 响应头部(Response Header)中 `Cache-Control` 和 `Expires` 来实现的，它们都用来表示资源在客户端缓存的有效期。   
`Cache-Control` 表示一个相对时间。`Expires` 表示一个绝对时间。如果 HTTP 响应头部同时有 `Cache-Control` 和 `Expires` 字段的话，`Cache-Control` 的优先级高于 `Expires` 。

**`Cache-Control` 和 `Expires`的区别：** `Cache-control` 的选项更多一些，设置更加精细。所以建议使用 `Cache-Control` 来实现强缓存。

**实现流程**
1. 浏览器第一次向服务器请求资源A，服务器返回资源A的同时，在`Response Headers`返回 `Cache-Control` 和 `Expires` 字段，`Cache-Control` 中设置了过期时间大小，`Expires `中设置了过期时间；
2. 浏览器第二次向服务器请求资源A，浏览器会先判断资源A是否过期，如果过期了，浏览器会重新请求服务器，否则使用本地缓存；
3. 服务器收到请求后，会判断资源A是否过期，如果过期了，服务器会返回资源A，同时再次返回 `Cache-Control` 和 `Expires` 字段，如果资源A没有过期，服务器会返回 304 状态码，表示可以使用本地缓存。   
   
**Cache-Control 的值**    
`no-cache`：表示资源可以被缓存，但是需要在每次请求时都验证资源是否过期。   
`no-store`：表示资源不能被缓存。   
`max-age`：表示资源在客户端缓存的有效期，单位是秒。   
`must-revalidate`：表示资源在过期后，必须重新验证。   
`public`：表示资源可以被任何客户端缓存。   
`private`：表示资源只能被客户端缓存。
`immutable`：表示资源不会被修改，可以被缓存。   

### 协商缓存

当浏览器向服务端请求资源A的时候，共同使用一组头部信息来判断是否使用本地缓存，这个过程称为协商缓存。如下图所示

![Image 16: a diagram showing how to connect to a server in chinese](../../../static/images/1747213236319.png)   

**实现流程**  
1. 请求头部字段 `If-Modified-Since` 和 响应头部字段 `Last-Modified` 组合实现。   
a. 当浏览器向服务端请求资源A，服务器第一次返回资源A的时候，会在`Response Headers`中返回`Last-Modified` 字段。   
b. 当浏览器第二次请求资源A，浏览器会先判断本地是否有缓存，如果有缓存，且缓存判断为过期，浏览器会向服务端发送一个带 `If-Modified-Since` 头部，这个头部的值就是服务端第一次返回头部中 `Last-Modified` 值。服务端收到请求后，会判断本地资源A的**最后修改时间**和从请求头中的**最后修改时间**是否一致，如果一致，服务端会返回 `304` 状态码，表示可以使用本地缓存，不一致则返回 `200` 状态码，表示需要重新请求资源。
2. 请求头部字段 `If-None-Match` 和 响应头部字段 `ETag` 组合实现。    
a. 当浏览器向服务端请求资源A，服务器第一次返回资源A的时候，会在`Response Headers`中返回`ETag` 字段。   
b. 当浏览器第二次请求资源A，浏览器会先判断本地是否有缓存，如果有缓存，且缓存判断为过期，浏览器会向服务端发送一个 `If-None-Match` 头部，这个头部的值是第一次服务端返回头部中`ETag` 的值。　服务端收到请求后，会判断**本地资源A的 `ETag`** 值和**请求头部中 `ETag`** 值是否一致，如果一致，服务端会返回 `304` 状态码，表示可以使用本地缓存，否则服务端会返回 `200` 状态码，表示需要重新请求资源。 

　
第一种实现方式是基于时间实现的，第二种实现方式是基于一个唯一标识实现的，相对来说后者可以更加准确地判断文件内容是否被修改，避免由于时间篡改导致的不可靠问题。  

**ETag 和 Last-Modified 的区别**   
- `ETag` 是一个资源的唯一标识，它是由服务端生成的，它会随着资源的修改而改变，所以它是一个**强标识**。   
- `Last-Modified` 是一个资源的最后修改时间，它是由服务端生成的，它会随着资源的修改而改变，所以它是一个**弱标识**。   
- `ETag`优先级比`Last-Modified` 高。 `ETag` 和 `Last-Modified` 可以同时存在，这时服务端会优先判断 ETag 是否变化了，如果 ETag 没有变化，再判断 Last-Modified 是否变化了。

**为什么 ETag 的优先级更高？**   
这是因为 ETag 主要能解决 Last-Modified 几个比较难以解决的问题
1. 在没有修改文件内容情况下文件的最后修改时间可能也会改变，这会导致客户端认为这文件被改动了，从而重新请求；
2. 可能有些文件是在秒级以内修改的，`If-Modified-Since` 能检查到的粒度是秒级的，使用 Etag就能够保证这种需求下客户端在 1 秒内能刷新多次；
3. 有些服务器不能精确获取文件的最后修改时间。

:::caution 注意
协商缓存这两个字段都需要配合强制缓存中 Cache-Control 字段来使用，只有在未能命中强制缓存的时候，才能发起带有协商缓存字段的请求
:::

下图是强制缓存和协商缓存的工作流程：

![http-cache](./imgs/http-cache.png)

## HTTP 特性
### HTTP/1.1 的优点有哪些

__1. 简单__   
HTTP 基本的报文格式就是 `header + body`，头部信息也是 `key: value` 简单文本的形式，**易于理解**，降低了学习和使用的门槛。

__2. 灵活和易于扩展__   
HTTP 协议里的各类请求方法、URI/URL、状态码、头字段等每个组成要求都没有被固定死，都允许开发人员**自定义和扩充**。   
因为HTTP协议运行在在应用层，所以它的下层可以**随意变化**。比如：HTTPS 就是在 HTTP 与 TCP 层之间增加了 SSL/TLS 安全传输层；HTTP/1.1 和 HTTP/2.0 传输协议使用的是 TCP 协议，而到了 HTTP/3.0 传输协议改用了 UDP 协议。

__3. 应用广泛和跨平台__   
互联网发展至今，HTTP 的应用范围非常的广泛，从台式机的浏览器到手机上的各种 APP，从看新闻、刷贴吧到购物、理财、吃鸡，HTTP 的应用遍地开花，同时天然具有**跨平台**的优越性。

### HTTP/1.1 的缺点有哪些

__1. 无状态双刃剑__   

**无状态的好处**：因为服务器不会去记忆 HTTP 的状态，所以不需要额外的资源来记录状态信息，这能减轻服务器的负担，能够把更多的 CPU 和内存用来对外提供服务。

**无状态的坏处**：导致服务器无法识别客户端的身份，无法识别客户端的请求是否有关联    
例如简单购物流程：`登录 -> 添加购物车 -> 下单 -> 结算 -> 支付`，这一系列操作都要知道用户的身份才行。但服务器不知道这些请求是否有关联，所以需要每次都要确认身份信息。

**解决方案**：`Cookie` 技术，通过在请求和响应报文中写入 Cookie 信息来控制客户端的状态。相当于，在客户端第一次请求后，服务器会下发一个装有客户信息的*小贴纸*，后续客户端请求服务器的时候，带上*小贴纸*，服务器就能认识了。

![Image 18: Cookie 技术](../../../static/images/1747213236123.png)

__2. 明文传输双刃剑__

**好处**：明文意味着在传输过程中的信息，是可方便阅读的，比如 Wireshark 抓包都可以直接肉眼查看，为我们调试工作带了极大的便利性。

**坏处**：HTTP 的所有信息都暴露在了光天化日下，相当于**信息裸奔**。在传输的漫长的过程中，信息的内容很容易被窃取，容易泄露隐私信息和造成财产损失。

__3. 不安全__
- 通信使用明文（不加密），内容可能会被窃听。比如，**账号信息容易泄漏，那你号没了。**
- 不验证通信方的身份，因此有可能遭遇伪装。比如，**访问假的淘宝、拼多多，那你钱没了。**
- 无法证明报文的完整性，所以有可能已遭篡改。比如，**网页上植入垃圾广告，视觉污染，眼没了。**

**解决方案**：使用 `HTTPS` 的方式解决，通过引入 `SSL/TLS` 层，提高安全性。

### HTTP/1.1 的性能如何
__1. 支持长连接__   

早期 HTTP/1.0 性能上的一个很大的问题，那就是每发起一个请求，都要新建一次 TCP 连接（三次握手），而且是串行请求，做了无谓的 TCP 连接建立和断开，增加了通信开销。   
为了解决上述 TCP 连接问题，HTTP/1.1 提出了**长连接**的通信方式，也叫持久连接。这种方式的好处在于减少了 TCP 连接的重复建立和断开所造成的额外开销，减轻了服务器端的负载。    
持久连接建立过后，只要任意一端没有明确提出断开连接，则保持 TCP 连接状态。　但是当某个 HTTP 长连接超过一定时间没有任何数据交互，服务端就会主动断开这个连接。

![Image 20: 短连接与长连接](../../../static/images/1747213235978.png)


__2. 管道网络传输__

HTTP/1.1 采用了长连接的方式，这使得管道（pipeline）网络传输成为了可能。即可在同一个 TCP 连接里面，客户端可以发起多个请求，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以**减少整体的响应时间。**    
例如：客户端需要请求两个资源。以前的做法是，在同一个 TCP 连接里面，先发送 A 请求，然后等待服务器做出回应，收到后再发出 B 请求。那么，管道机制则是允许浏览器同时发出 A 请求和 B 请求，如下图：

![Image 21: 管道网络传输](../../../static/images/1747213235690.png)

但是**服务器必须按照接收请求的顺序发送对这些管道化请求的响应**。如果服务端在处理 A 请求时耗时比较长，那么后续的请求的处理都会被阻塞住，这称为**队头堵塞**。所以，**HTTP/1.1 管道解决了请求的队头阻塞，但是没有解决响应的队头阻塞**。

__3. 队头阻塞__

`HTTP/1.1`使用`TCP/IP`协议，通过`请求 - 应答`的模式，来实现客户端与服务器之间的数据传输。当顺序发送的请求序列中的一个请求因为某种原因被阻塞了，在后面排队的所有请求也一同被阻塞了，这会导致客户端一直请求不到数据，这就是所谓的**队头阻塞**，好比阻塞道路上的汽车。

![Image 22: 队头阻塞](../../../static/images/1747213236168.png)

**结论**： HTTP/1.1 的性能一般。 HTTP/2 和 HTTP/3 更进一步优化了 HTTP 的性能。

## HTTP 与 HTTPS 有哪些区别
1. HTTP 是超文本传输协议，信息是明文传输，存在安全风险的问题。HTTPS 则解决 HTTP 不安全的缺陷，在 TCP 和 HTTP 网络层之间加入了 SSL/TLS 安全协议，使得报文能够加密传输。
2. HTTP 连接建立相对简单， TCP 三次握手之后便可进行 HTTP 的报文传输。而 HTTPS 在 TCP 三次握手之后，还需进行 SSL/TLS 的握手过程，才可进入加密报文传输。
3. 两者的默认端口不一样，HTTP 默认端口号是 80，HTTPS 默认端口号是 443。
4. HTTPS 协议需要向 CA（证书权威机构）申请数字证书，来保证服务器的身份是可信的。
    

## HTTPS 解决了 HTTP 的哪些问题

`HTTP` 由于是明文传输，所以安全上存在以下三个风险  
1. **窃听风险**，比如通信链路上可以获取通信内容，用户号容易没。   
2. **篡改风险**，比如强制植入垃圾广告，视觉污染，用户眼容易瞎。    
3. **冒充风险**，比如冒充淘宝网站，用户钱容易没。    

**`HTTPS`** 通过在 HTTP 与 TCP 层之间加入了 `SSL/TLS` 协议层，通过对**信息加密**，加入**校验机制**和**身份证书**手段来解决上述问题。

![Image 23: HTTP 与 HTTPS 网络层](../../../static/images/1747213235399.jpeg)

**HTTPS 是如何解决上面的三个风险的？**

1. **混合加密**的方式实现信息的机密性，解决了窃听的风险。
2. **摘要算法**的方式来实现完整性，它能够为数据生成独一无二的指纹，指纹用于校验数据的完整性，解决了篡改的风险。
3. 将服务器公钥放入到**数字证书**中，解决了冒充的风险。

__混合加密__

通过**混合加密**的方式可以保证信息的**机密性**，解决了窃听的风险。`HTTPS` 采用的是**对称加密**和**非对称加密**结合的混合加密方式。    
在通信建立前采用**非对称加密**的方式交换 __会话秘钥__，后续就不再使用非对称加密。在通信过程中全部使用**对称加密**的**会话秘钥**的方式加密明文数据。

采用**混合加密**的方式的原因：

**对称加密**只使用一个密钥，运算速度快，密钥必须保密，无法做到安全的密钥交换。   
**非对称加密**使用两个密钥：公钥和私钥，公钥可以任意分发而私钥保密，解决了密钥交换问题但速度慢。

![Image 24: 混合加密](../../../static/images/1747213236116.png)

__摘要算法 + 数字签名__

为了保证传输的内容不被篡改，我们需要对内容计算出一个 __指纹__，然后同内容一起传输给对方。对方收到后，先是对内容也计算出一个 __指纹__，然后跟发送方发送的 __指纹__ 做一个比较，如果 __指纹__ 相同，说明内容没有被篡改，否则就可以判断出内容被篡改了。     
在计算机里通过使用**摘要算法（哈希函数）**　来计算出内容的哈希值，也就是内容的 **指纹**，这个哈希值是**唯一的**，且无法通过哈希值推导出内容。

![Image 25: a diagram showing the process of creating a file in a korean language](../../../static/images/1747213236238.png)

通过哈希算法可以确保内容不会被篡改，但是并不能保证**内容 + 哈希值**不会被**中间人替换**，因为这里缺少了对客户端收到的消息是否来源于服务端的证明。  
举个例子，你想向老师请假，一般来说是要求由家长写一份请假理由并签名，老师才能允许你请假。但是你有模仿你爸爸字迹的能力，你用你爸爸的字迹写了一份请假理由然后签上你爸爸的名字，老师一看到这个请假条，查看字迹和签名，就误以为是你爸爸写的，就会允许你请假。那作为老师，要如何避免这种情况发生呢？现实生活中的，可以通过电话或视频来确认是否是由父母发出的请假。    

那么在计算机里会用**非对称加密算法**来解决。完成加密需要两个密钥，一个是公钥，这个是可以公开给所有人的；一个是私钥，这个必须由本人管理，不可泄露;   
这两个密钥可以**双向加解密**的，比如可以用公钥加密内容，然后用私钥解密，也可以用私钥加密内容，公钥解密内容。加密顺序不同，意味着目的也不同。

**公钥加密，私钥解密**。这个目的是为了**保证内容传输的安全**，因为被公钥加密的内容，其他人是无法解密的，只有持有私钥的人，才能解密出实际的内容；   
**私钥加密，公钥解密**。这个目的是为了**保证消息不会被冒充**，因为私钥是不可泄露的，如果公钥能正常解密出私钥加密的内容，就能证明这个消息是来源于持有私钥身份的人发送的。

一般我们不会用非对称加密来加密实际的传输内容，因为非对称加密的计算比较耗费资源性影响性能。所以非对称加密的用途主要通过 __私钥加密，公钥解密__ 的方式来确认消息的身份，我们常说的**数字签名算法**，就是用的是这种方式，不过私钥加密的内容不是内容本身，而是对**内容的哈希值**加密。

![Image 26: The image illustrates the digital signature process in Chinese](../../../static/images/1747213236263.png)

私钥是由服务端保管，然后服务端会向客户端颁发对应的公钥。如果客户端收到的信息，能被公钥解密，就说明该消息是由服务器发送的。   
引入了数字签名算法后，你就无法模仿你爸爸的字迹来请假了，你爸爸手上持有着私钥，你老师持有着公钥。这样只有用你爸爸手上的私钥才对请假条进行**签名**，老师通过公钥看能不能解出这个**签名**，如果能解出并且内容的完整，就能证明是由你爸爸发起的请假条，这样老师才允许你请假，否则老师就不认。

__数字证书__

在前面，我们知道可以通过哈希算法来保证消息的完整性；可以通过数字签名来保证消息的来源可靠性（能确认消息是由持有私钥的一方发送的）；但是，这还远远不够，还缺少**身份验证**的环节，因为公钥有可能被人为伪造。    

在上面请假例子中，虽然你爸爸持有私钥，老师持有和你爸爸配对的公钥，老师通过是否能用公钥解密来确认这个请假条是不是来源你父亲的。但是我们还可以自己伪造出一对新的公私钥，在交作业的时候，偷偷把老师桌面上和你爸爸配对的公钥换成了你的公钥，那么下次你又可以继续模仿你爸爸的字迹写请假条了，然后用你的私钥做个了**数字签名**。老师并不知道自己的公钥被你替换过了，所以他还是按照往常一样用公钥解密，由于这个公钥和你的私钥是配对的，老师当然能用这个被替换的公钥解密出来，并确认了内容的完整性，所以老师就会以为是你父亲写的请假条，允许你的请假了。

正所谓魔高一丈，道高一尺。既然伪造公私钥那么随意，所以你爸把他的公钥注册到**警察局**，警察局用他们自己的私钥对你父亲的公钥做了个数字签名，然后把你爸爸的`个人信息 + 公钥 + 数字签名`打包成一个**数字证书**，这个数字证书中包含你爸爸的公钥。   
你爸爸如果因为家里确实有事要向老师帮你请假的时候，不仅会用自己的私钥对内容进行签名，还会把**数字证书**给到老师。老师拿到了**数字证书**后，首先会去警察局验证这个**数字证书**是否合法，因为数字证书里有警察局的数字签名，警察局使用自己的公钥进行解密，如果能解密成功，就说明这个数字证书是在警察局注册过的，就认为该数字证书是合法的，然后就会把数字证书里头的公钥(你爸爸的)给到老师，于是老师就可以安心的用这个公钥解密出请假条，如果能解密出，就证明是你爸爸写的请假条。

在计算机里，这个权威的机构就是 CA （数字证书认证机构），将服务器公钥放在数字证书中（由数字证书认证机构颁发），只要证书是可信的，公钥就是可信的。通过数字证书的方式保证服务器公钥的身份，解决冒充伪造的风险。

![Image 27: 数子证书工作流程](../../../static/images/1747213235990.jpeg)



## HTTPS 如何建立连接并交互

**SSL/TLS 协议基本流程**
1. 客户端向服务器索要并验证服务器的公钥
2. 双方协商生产**会话秘钥**
3. 双方采用**会话秘钥**进行加密通信

前两步就是 `SSL/TLS` 的建立过程，也是 `TLS` 握手阶段。
`TLS` 的**握手阶段**涉及**四次通信**，使用不同的密钥交换算法，`TLS` 握手流程也会不一样的，现在常用的密钥交换算法有两种，**RSA 算法**和 **ECDHE 算法** 。

基于 RSA 算法的 TLS 握手过程比较容易理解，所以这里先用这个给大家展示 TLS 握手过程，如下图：

![Image 28: HTTPS 连接建立过程](../../../static/images/1747213235881.jpeg)

**`TLS` 协议建立的详细流程**

__1. ClientHello__

首先，由客户端向服务器发起加密通信请求，也就是 `ClientHello` 请求。在这一步，客户端主要向服务器发送以下信息：

a. 客户端支持的 TLS 协议版本，如 TLS 1.2 版本。   
b. 客户端生产的随机数（`Client Random`），后面用于生成会话秘钥。   
c. 客户端支持的密码套件列表，如 RSA 加密算法。

__2. SeverHello__

服务器收到客户端请求后，向客户端发出响应，也就是 `SeverHello`。服务器回应的内容有如下内容：     
a. 确认 TLS 协议版本，如果浏览器不支持，则关闭加密通信。  
b. 服务器生产的随机数（`Server Random`），也是后面用于生产会话秘钥条件之一。   
c. 确认的密码套件列表，如 RSA 加密算法。   
d. 服务器的数字证书。

__3. 客户端回应__

客户端收到服务器的回应之后，首先通过浏览器或者操作系统中的 CA 公钥，确认服务器的数字证书的真实性。如果证书没有问题，客户端会从**数字证书中取出服务器的公钥**，然后使用它加密报文，向服务器发送如下信息：   
a. 一个随机数（`pre-master key`）。该随机数会被服务器公钥加密。   
b. 加密通信算法改变通知，表示随后的信息都将用**会话秘钥**加密通信。   
c. 客户端握手结束通知，表示客户端的握手阶段已经结束。同时把之前所有内容的发生的数据做个摘要，用来供服务端校验。

上面第一项的随机数是整个握手阶段的第三个随机数，会发给服务端，所以这个随机数客户端和服务端都是一样的。服务器和客户端有了这**三个随机数（Client Random、Server Random、pre-master key）**，接着就用双方协商的加密算法，各自生成本次通信的**会话秘钥**。

__4. 服务器的最后回应__

服务器收到客户端的第三个随机数（`pre-master key`）之后，通过协商的加密算法，计算出本次通信的**会话秘钥**。然后，向客户端发送最后的信息：　　　
a. 加密通信算法改变通知，表示随后的信息都将用「会话秘钥」加密通信。   
b. 服务器握手结束通知，表示服务器的握手阶段已经结束。这一项同时把之前所有内容的发生的数据做个摘要，用来供客户端校验。

至此，整个 `TLS` 的握手阶段全部结束。接下来，客户端与服务器进入加密通信，就完全是使用普通的 HTTP 协议，只不过用**会话秘钥**加密内容。

**客户端校验数字证书的流程**  

![Image 29: a diagram of a system with chinese characters](../../../static/images/1747213236017.png)

*数字证书生成*

1. CA 会把持有者的公钥、用途、颁发者、有效时间等信息打成一个包，然后对这些信息进行 Hash 计算，得到一个 Hash 值；
2. CA 会使用自己的私钥将该 Hash 值加密，生成 Certificate Signature，也就是 CA 对证书做了签名；
3. 最后将 Certificate Signature 添加在文件证书上，形成数字证书；

*客户端校验服务端的数字证书*

1. 客户端会使用同样的 Hash 算法获取该证书的 Hash 值 H1；
2. 浏览器和操作系统中集成了 CA 的公钥信息，浏览器收到证书后可以使用 CA 的公钥解密 Certificate Signature 内容，得到一个 Hash 值 H2；
3. 最后比较 H1 和 H2的值，如果值相同，则为可信赖的证书，否则则认为证书不可信。

*证书信任链*

我们向 CA 申请的证书一般不是根证书签发的，而是由中间证书签发的，比如百度的证书，从下图你可以看到，证书的层级有三级：

![Image 30: a screenshot of a web page with chinese and chinese text](../../../static/images/1747213235652.png)

对于这种三级层级关系的证书的验证过程如下：

1. 客户端收到 baidu.com 的证书后，发现这个证书的签发者不是根证书，就无法根据本地已有的根证书中的公钥去验证 baidu.com 证书是否可信。
2. 客户端根据 baidu.com 证书中的签发者，找到该证书的颁发机构是 “GlobalSign Organization Validation CA - SHA256 - G2”，然后向 CA 请求该中间证书。
3. 请求到证书后发现 “GlobalSign Organization Validation CA - SHA256 - G2” 证书是由 “GlobalSign Root CA” 签发的，由于 “GlobalSign Root CA” 没有再上级签发机构，说明它是根证书，也就是自签证书。应用软件会检查此证书有否已预载于根证书清单上，如果有，则可以利用根证书中的公钥去验证 “GlobalSign Organization Validation CA - SHA256 - G2” 证书，如果发现验证通过，就认为该中间证书是可信的。
4. “GlobalSign Organization Validation CA - SHA256 - G2” 证书被信任后，可以使用 “GlobalSign Organization Validation CA - SHA256 - G2” 证书中的公钥去验证 baidu.com 证书的可信性，如果验证通过，就可以信任 baidu.com 证书。   
   
在这四个步骤中，最开始客户端只信任根证书 GlobalSign Root CA 证书的，然后 “GlobalSign Root CA” 证书信任 “GlobalSign Organization Validation CA - SHA256 - G2” 证书，而 “GlobalSign Organization Validation CA - SHA256 - G2” 证书又信任 baidu.com 证书，于是客户端也信任 baidu.com 证书。    
总括来说，由于用户信任 GlobalSign，所以由 GlobalSign 所担保的 baidu.com 可以被信任，另外由于用户信任操作系统或浏览器的软件商，所以由软件商预载了根证书的 GlobalSign 都可被信任。

![Image 31: a diagram showing the process of a globalsign root](../../../static/images/1747213235779.png)

*为什么需要证书链*

`Root CA` 为什么不直接颁发证书，而是要搞那么多中间层级呢? 这是为了**确保根证书的绝对安全性**，将根证书隔离地越严格，根证书就不容易失守，整个信任链才不会出现问题。

## HTTPS 如何保证应用数据的完整性

 `TLS` 在实现上分为**握手协议**和**记录协议**两层：

**握手协议**就是我们前面说的 TLS 四次握手的过程，负责协商加密算法和生成对称密钥，后续用此密钥来保护应用程序数据（即 HTTP 数据）；   
**记录协议**负责保护应用程序数据并验证其完整性和来源，所以对 HTTP 数据加密是使用记录协议；

记录协议主要负责消息（HTTP 数据）的压缩，加密及数据的认证，具体过程如下：   
1. 消息被分割成多个较短的片段,然后分别对每个片段进行压缩。
2. 经过压缩的片段会被加上**消息认证码（MAC 值，这个是通过哈希算法生成的）**，这是为了保证完整性，并进行数据的认证。通过附加消息认证码的 MAC 值，可以识别出篡改。与此同时，为了防止重放攻击，在计算消息认证码时，还加上了片段的编码。
3. 经过压缩的片段再加上消息认证码后会一起通过对称密钥进行加密。
4. 经过加密的数据再加上由数据类型、版本号、压缩后的长度组成的报头就是最终的报文数据。
5. 记录协议完成后，最终的报文数据将传递到传输控制协议 (TCP) 层进行传输。
   
![Image 34: a diagram showing the structure of a chinese company](../../../static/images/1747213236421.png)


## HTTPS 一定安全可靠吗

`HTTPS` 协议本身到目前为止还是没有漏洞，是安全可靠的。但有客户端可能被黑客进行中间人攻击，它的前提是客户端被黑客入侵，在本地导入了信任的根证书。比如抓包工具`Charles` 就可能实现`HTTPS` 数据包的获取解密。

![Image 36: a diagram showing the process of creating a chinese website](../../../static/images/1747213236074.png)

**为什么抓包工具能截取 HTTPS 数据？**

很多抓包工具 之所以可以明文看到 `HTTPS` 数据，工作原理与中间人一致的。对于 HTTPS 连接来说，中间人要满足以下两点，才能实现真正的明文代理:
1. 中间人，作为客户端与真实服务端建立连接这一步不会有问题，因为服务端不会校验客户端的身份；
2. 中间人，作为服务端与真实客户端建立连接，这里会有客户端信任服务端的问题，也就是服务端(中间人)必须有对应域名的私钥；

中间人要拿到私钥只能通过如下方式：
1. 去网站服务端拿到私钥；
2. 去CA处拿域名签发私钥；
3. **自己签发证书，切要被浏览器信任**；

抓包工具只能使用第三种方式取得中间人的身份。使用抓包工具进行 HTTPS 抓包的时候，需要在客户端安装 `Charles` 的根证书，这里实际上起认证中心（CA）的作用。抓包工具能够抓包的关键是客户端会往系统受信任的根证书列表中导入抓包工具生成的证书，而这个证书会被浏览器信任，也就是抓包工具给自己创建了一个认证中心 CA，客户端拿着中间人签发的证书去中间人自己的 CA 去认证，当然认为这个证书是有效的。

**如何避免被中间人抓取数据？**

我们要保证自己电脑的安全，不要被病毒乘虚而入，而且也不要点击任何证书非法的网站，这样 `HTTPS` 数据就不会被中间人截取到了。当然，我们还可以通过 **HTTPS 双向认证**来避免这种问题。一般我们的 `HTTPS` 是单向认证，客户端只会验证了服务端的身份，但是服务端并不会验证客户端的身份。   
如果用了双向认证方式，不仅客户端会验证服务端的身份，而且服务端也会验证客户端的身份。服务端一旦验证到请求自己的客户端为不可信任的，服务端就拒绝继续通信，客户端如果发现服务端为不可信任的，那么也中止通信。

![Image 38: a diagram of a chinese language with chinese characters](../../../static/images/1747213236004.png)


## HTTP/1.1、HTTP/2、HTTP/3 演变

### HTTP/1.1 提高了哪些性能

HTTP/1.1 相比 HTTP/1.0 性能上的改进：
1. 使用长连接的方式改善了 HTTP/1.0 短连接造成的性能开销。
2. 支持管道（pipeline）网络传输，只要第一个请求发出去了，不必等其回来，就可以发第二个请求出去，可以减少整体的响应时间。

HTTP/1.1 性能瓶颈：
1. 请求 / 响应头部（Header）未经压缩就发送，首部信息越多延迟越大。只能压缩 `Body` 的部分；
2. 发送冗长的首部。每次互相发送相同的首部造成的浪费较多；
3. 服务器是按请求的顺序响应的，如果服务器响应慢，会招致客户端一直请求不到数据，也就是队头阻塞；
4. 没有请求优先级控制；
5. 请求只能从客户端开始，服务器只能被动响应。

### HTTP/2 做了什么优化

`HTTP/2` 协议是基于 HTTPS 的，具有数据安全性保障。

![Image 39: HTT/1 ~ HTTP/2](../../../static/images/1747213235549.jpeg)

HTTP/2 相比 HTTP/1.1 性能上的改进：

__1. 头部压缩__

`HTTP/2` 会**压缩请求头（Header）**，如果你同时发出多个请求，他们的头是一样的或是相似的，那么协议会帮你**消除重复的部分**。   
这就是所谓的 `HPACK` 算法：在客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，提高了**传输速度**。

__2. 二进制格式__

`HTTP/2` 不再像 `HTTP/1.1` 里的纯文本形式的报文，而是全面采用了**二进制格式**，头信息和数据体都是二进制，并且统称为帧（frame）。分为**头信息帧（Headers Frame）和数据帧（Data Frame）**。

![Image 40: HTTP/1 与 HTTP/2 ](../../../static/images/1747213236176.png)

这样虽然对人查阅不是很友好，但是对计算机非常友好，因为计算机只懂二进制，那么收到报文后，无需再将明文的报文转成二进制，而是直接解析二进制报文，增加了**数据传输的效率**。

__3. 并发传输__

我们都知道 HTTP/1.1 的实现是基于请求-响应模型的。同一个连接中，HTTP 完成一个事务（请求与响应），才能处理下一个事务，也就是说在发出请求等待响应的过程中，是没办法做其他事情的，如果响应迟迟不来，那么后续的请求是无法发送的，也造成了**队头阻塞**的问题。在`HTTP/2` 中引出了 `Stream` 概念，多个 `Stream` 复用在一条 TCP 连接上。

![Image 44: a diagram of a message frame and a response message frame](../../../static/images/1747213235937.png)

从上图可以看到，1 个 TCP 连接包含多个 Stream，Stream 里可以包含 1 个或多个 Message，Message 对应 HTTP/1 中的请求或响应，由 HTTP 头部和包体构成。Message 里包含一条或者多个 Frame，Frame 是 HTTP/2 最小单位，以二进制压缩格式存放 HTTP/1 中的内容（头部和包体）。

**针对不同的 HTTP 请求用独一无二的 Stream ID 来区分，接收端可以通过 Stream ID 有序组装成 HTTP 消息，不同 Stream 的帧是可以乱序发送的，因此可以并发不同的 Stream ，也就是 HTTP/2 可以并行交错地发送请求和响应**。如下图

![Image 45: a diagram of an http2 connection](../../../static/images/1747213235607.jpeg)

服务端**并行交错地**发送了两个响应： Stream 1 和 Stream 3，这两个 Stream 都是跑在一个 TCP 连接上，客户端收到后，会根据相同的 Stream ID 有序组装成 HTTP 消息。

__4. 服务器推送__

HTTP/2 还在一定程度上改善了传统的`请求 - 应答`工作模式，服务端不再是被动地响应，而是可以**主动**向客户端发送消息。客户端和服务器**双方都可以建立 Stream**， `Stream ID` 也是有区别的，客户端建立的 Stream 必须是**奇数**号，而服务器建立的 Stream 必须是**偶数**号。如下图

![Image 46: a diagram of the http2 connection](../../../static/images/1747213235987.png)

Stream 1 是客户端向服务端请求的资源，属于客户端建立的 Stream，所以该 Stream 的 ID 是奇数（数字 1）。Stream 2 和 4 都是服务端主动向客户端推送的资源，属于服务端建立的 Stream，所以这两个 Stream 的 ID 是偶数（数字 2 和 4）。

客户端通过 HTTP/1.1 请求从服务器那获取到了 HTML 文件，而 HTML 可能还需要依赖 CSS 来渲染页面，这时客户端还要再发起获取 CSS 文件的请求，需要两次消息往返。在 HTTP/2 中，客户端在访问 HTML 时，服务器可以直接主动推送 CSS 文件，减少了消息传递的次数。如下图

![Image 47: Diagram showing the difference between browser loading with and without push](../../../static/images/1747213235602.png)

**HTTP/2 有什么缺陷？**

`HTTP/2` 通过 Stream 的并发能力，解决了 HTTP/1 队头阻塞的问题，看似很完美了，但是 HTTP/2 还是存在 **队头阻塞** 的问题，只不过问题不是在 HTTP 这一层面，而是在 TCP 这一层。   
`HTTP/2` 是基于 TCP 协议来传输数据的，TCP 是字节流协议，TCP 层必须保证收到的字节数据是完整且连续的，这样内核才会将缓冲区里的数据返回给 HTTP 应用，那么当 **前 1 个字节数据没有到达时**，后面收到的字节数据只能存放在内核缓冲区里，只有等到 **前1 个字节数据到达时**，HTTP/2 应用层才能从内核中拿到数据，这就是 **HTTP/2 队头阻塞问题**。

![Image 48: tcp tcp tcp tcp tcp tcp tcp t](../../../static/images/1747213235572.jpeg)

### HTTP/3 做了哪些优化

解决了**`队头阻塞`**问题，由于`HTTP/1.1` 和 `HTTP/2 ` 底层传输协议为 `TCP/IP` 协议，它始终存在**队头阻塞**问题。　`HTTP/3 `把 HTTP 下层的 `TCP` 协议改成了 `UDP`协议。

![Image 50: HTTP/1 ~ HTTP/3](../../../static/images/1747213235769.jpeg)

`UDP` 协议是不可靠传输，它发送是不管顺序，也不管是否丢包的。所以它不会出现像 HTTP/2 队头阻塞的问题。但是基于 UDP 的 **QUIC 协议** 可以实现类似 TCP 的可靠性传输。

**`QUIC` 有以下 3 个特点**

__1. 无队头阻塞__

`QUIC` 协议也有类似 HTTP/2 Stream 与多路复用的概念，也是可以在同一条连接上并发传输多个 Stream，Stream 可以认为就是一条 HTTP 请求。   
`QUIC` 有自己的一套机制可以保证传输的可靠性的。**当某个流发生丢包时，只会阻塞这个流，其他流不会受到影响，因此不存在队头阻塞问题**。这与 HTTP/2 不同，HTTP/2 只要某个流中的数据包丢失了，其他流也会因此受影响。所以，`QUIC` 连接上的多个 Stream 之间并没有依赖，都是独立的，某个流发生丢包了，只会影响该流，其他流不受影响。

![Image 51: a diagram of a cell phone with chinese text on it](../../../static/images/1747213235654.jpeg)

__2.更快的连接建立__

对于 HTTP/1 和 HTTP/2 协议，TCP 和 TLS 是分层的，分别属于内核实现的传输层、openssl 库实现的表示层，因此它们难以合并在一起，需要分批次来握手，先 TCP 握手，再 TLS 握手。    
`HTTP/3` 在传输数据前虽然需要 QUIC 协议握手，但是这个握手过程只需要 1 RTT，握手的目的是为确认双方的「连接 ID」，连接迁移就是基于连接 ID 实现的。
`HTTP/3` 的 QUIC 协议并不是与 TLS 分层，而是 QUIC 内部包含了 TLS，它在自己的帧会携带 TLS 里的“记录”，再加上 QUIC 使用的是 TLS/1.3，因此仅需 1 个 RTT 就可以「同时」完成建立连接与密钥协商，如下图：

![Image 52: TCP HTTPS（TLS/1.3） 和 QUIC HTTPS ](../../../static/images/1747213235782.jpeg)

在第二次连接的时候，应用数据包可以和 QUIC 握手信息（连接信息 + TLS 信息）一起发送，达到 0-RTT 的效果。如下图右边部分，HTTP/3 当会话恢复时，有效负载数据与第一个数据包一起发送，可以做到 0-RTT（下图的右下角）：

![Image 53: a diagram showing different types of network connections](../../../static/images/1747213235676.png)

__3. 连接迁移__

基于 TCP 传输协议的 HTTP 协议，由于是通过四元组（源 IP、源端口、目的 IP、目的端口）确定一条 TCP 连接。

![Image 54: TCP 四元组](../../../static/images/1747213235547.png)

那么**当移动设备的网络从 4G 切换到 WIFI 时，意味着 IP 地址变化了，那么就必须要断开连接，然后重新建立连接**。而建立连接的过程包含 TCP 三次握手和 TLS 四次握手的时延，以及 TCP 慢启动的减速过程，给用户的感觉就是网络突然卡顿了一下，因此连接的迁移成本是很高的。    
`QUIC` 协议没有用四元组的方式来“绑定”连接，而是通过**连接 ID** 来标记通信的两个端点，客户端和服务器可以各自选择一组 ID 来标记自己，因此即使移动设备的网络变化后，导致 IP 地址变化了，只要仍保有上下文信息（比如连接 ID、TLS 密钥等），就可以“无缝”地复用原连接，消除重连的成本，没有丝毫卡顿感，达到了**连接迁移**的功能。

 `QUIC` 是一个在 UDP 之上的**伪** TCP + TLS + HTTP/2 的多路复用的协议。由于 `QUIC` 是新协议，对于很多网络设备，根本不知道什么是 QUIC，只会当做 UDP，这样会出现新的问题，因为有的网络设备是会丢掉 UDP 包的，而 QUIC 是基于 UDP 实现的，那么如果网络设备无法识别这个是 QUIC 包，那么就会当作 UDP包，然后被丢弃。


## TLS 和 SSL的区别

这两实际上是一个东西。`SSL` 是洋文 __Secure Sockets Layer__ 的缩写，中文叫做 __安全套接层__。它是在上世纪 90 年代中期，由网景公司设计的。   
到了1999年，`SSL` 因为应用广泛，已经成为互联网上的事实标准。IETF 就在那年把 `SSL` 标准化。标准化之后的名称改为 TLS（__Transport Layer Security__ 的缩写），中文叫做 __传输层安全协议__。   
所以一般都一起结合使用 `SSL/TLS`。


