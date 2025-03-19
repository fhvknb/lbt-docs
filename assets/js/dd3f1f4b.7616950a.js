"use strict";(self.webpackChunklbt_docs=self.webpackChunklbt_docs||[]).push([[2255],{5010:e=>{e.exports=JSON.parse('{"permalink":"/blog/snell-deploy","source":"@site/blog/snell-deploy.md","title":"\u90e8\u7f72snell-server","description":"*","date":"2024-04-25T22:18:46.000Z","tags":[{"inline":true,"label":"vps","permalink":"/blog/tags/vps"},{"inline":true,"label":"linux","permalink":"/blog/tags/linux"}],"readingTime":4.16,"hasTruncateMarker":true,"authors":[{"name":"Damas NanPu","title":"Maintainer of Blog","url":"https://github.com/fhvknb","imageURL":"https://avatars.githubusercontent.com/u/19361229","key":"shaun","page":null}],"frontMatter":{"slug":"snell-deploy","title":"\u90e8\u7f72snell-server","authors":"shaun","tags":["vps","linux"],"date":"2024-04-25T22:18:46.000Z"},"unlisted":false,"prevItem":{"title":"\u670d\u52a1\u7aef\u7f16\u7a0b\u8bed\u8a00\u7279\u6027\u6d45\u6790","permalink":"/blog/\u670d\u52a1\u7aef\u7f16\u7a0b\u8bed\u8a00\u7279\u6027\u6d45\u6790"},"nextItem":{"title":"\u5199\u88b1\u5b50\u987a\u53e3\u6e9c","permalink":"/blog/\u4f20\u7edf\u98ce\u4fd7\u4e4b\u5199\u88b1\u5b50"}}')},8453:(e,n,l)=>{l.d(n,{R:()=>i,x:()=>c});var s=l(6540);const r={},t=s.createContext(r);function i(e){const n=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:i(e.components),s.createElement(t.Provider,{value:n},e.children)}},9258:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>o});var s=l(5010),r=l(4848),t=l(8453);const i={slug:"snell-deploy",title:"\u90e8\u7f72snell-server",authors:"shaun",tags:["vps","linux"],date:new Date("2024-04-25T22:18:46.000Z")},c=void 0,d={authorsImageUrls:[void 0]},o=[{value:"Snell\u7b80\u4ecb",id:"snell\u7b80\u4ecb",level:2},{value:"\u7248\u672c\u4ecb\u7ecd",id:"\u7248\u672c\u4ecb\u7ecd",level:2},{value:"MacOS",id:"macos",level:2},{value:"Linux",id:"linux",level:2}];function a(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.hr,{}),"\n",(0,r.jsx)(n.h2,{id:"snell\u7b80\u4ecb",children:"Snell\u7b80\u4ecb"}),"\n",(0,r.jsx)(n.p,{children:"Snell \u662f Surge \u56e2\u961f\u5f00\u53d1\uff0c\u4ec5\u9002\u7528\u4e8e Surge \u7528\u6237\u7684\u7cbe\u7b80\u52a0\u5bc6\u4ee3\u7406\u534f\u8bae\uff0c\u4ee5\u4e0b\u662f\u4e00\u4e9b\u4eae\u70b9\uff1a"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"\u6781\u81f4\u7684\u6027\u80fd\uff1b"}),"\n",(0,r.jsx)(n.li,{children:"\u652f\u6301 UDP over TCP \u8f6c\u53d1\uff1b"}),"\n",(0,r.jsx)(n.li,{children:"\u5177\u6709\u96f6\u4f9d\u8d56\u5173\u7cfb\u7684\u5355\u4e00\u4e8c\u8fdb\u5236\u6587\u4ef6 (\u9664\u4e86 glibc)\uff1b"}),"\n",(0,r.jsx)(n.li,{children:"\u4e00\u4e2a\u5e2e\u52a9\u5165\u95e8\u7684\u5411\u5bfc\uff1b"}),"\n",(0,r.jsx)(n.li,{children:"\u5982\u679c\u9047\u5230\u8fdc\u7a0b\u9519\u8bef\uff0c\u4ee3\u7406\u670d\u52a1\u5668\u5c06\u5411\u5ba2\u6237\u7aef\u62a5\u544a\u3002\u5ba2\u6237\u7aef\u53ef\u4ee5\u9488\u5bf9\u4e0d\u540c\u7684\u573a\u666f\u9009\u62e9\u5bf9\u7b56\uff1b"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"\u7248\u672c\u4ecb\u7ecd",children:"\u7248\u672c\u4ecb\u7ecd"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"Snell v2"})})}),"\n",(0,r.jsx)(n.p,{children:"\u63d0\u4f9b\u4e86\u5b8c\u6574\u7684 TCP \u5168\u72b6\u6001\u673a\u652f\u6301\u7684 multiplex \u652f\u6301\uff0c\u4ee5\u63d0\u9ad8\u6027\u80fd\u548c\u51cf\u5c11\u5ef6\u8fdf\u3002"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"Snell v3"})})}),"\n",(0,r.jsx)(n.p,{children:"\u5728\u5b9e\u9645\u4f7f\u7528\u4e2d\uff0c\u7531\u4e8e\u5927\u591a\u6570\u7f51\u7ad9\u548c\u7a0b\u5e8f\u5747\u5df2\u4f7f\u7528 HTTP/2 \u534f\u8bae\uff0c\u81ea\u5e26\u4e86 multiplex \u652f\u6301\uff0c\u6240\u4ee5\u5e76\u4e0d\u4f1a\u4ea7\u751f\u5f88\u591a\u7684\u5e95\u5c42 TCP \u8fde\u63a5\uff0c\u4ee3\u7406\u5c42\u518d\u652f\u6301 multiplex \u7684\u4f18\u5316\u610f\u4e49\u4e0d\u5927\u3002"}),"\n",(0,r.jsx)(n.p,{children:"\u8003\u8651\u5230 multiplex \u7684\u652f\u6301\u4f1a\u5bfc\u81f4\u989d\u5916\u7684\u95ee\u9898\uff0c\u5982\u5355 TCP \u8fde\u63a5\u88ab\u9650\u901f\uff0c\u66f4\u52a0\u590d\u6742\u7e41\u7410\u7684\u8fde\u63a5\u9519\u8bef\u68c0\u67e5\u548c\u7ea0\u9519\u7b49\u3002\u6240\u4ee5\u5728 Snell v3 \u4e2d\u5df2\u7ecf\u53d6\u6d88\u4e86 multiplex \u652f\u6301\uff1b"}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.em,{children:(0,r.jsx)(n.strong,{children:"Snell v4"})})}),"\n",(0,r.jsxs)(n.p,{children:["\u65b0\u589e\u5ba2\u6237\u7aef\u53c2\u6570",(0,r.jsx)(n.code,{children:"reuse=true"}),"\uff0c\u53ef\u9009\u5f00\u542f v2 \u7248\u672c\u7684\u8fde\u63a5\u590d\u7528\u673a\u5236\u3002\u8fde\u63a5\u590d\u7528\u673a\u5236\u53ef\u4ee5\u907f\u514d\u540e\u7eed\u8bf7\u6c42\u7684\u8fde\u63a5\u5efa\u7acb\u5f00\u9500\uff0c\u4f46\u662f\u5728\u51fa\u73b0\u7f51\u7edc\u5f02\u5e38\u6216\u5176\u4ed6\u95ee\u9898\u65f6\uff0c\u53ef\u80fd\u4f1a\u9700\u8981\u66f4\u957f\u7684\u65f6\u95f4\u624d\u80fd\u68c0\u67e5\u5230\u9519\u8bef\u5e76\u91cd\u5efa\u8fde\u63a5\uff0c\u4f18\u52a3\u53c2\u534a\uff0c\u5efa\u8bae\u5bf9\u4e8e\u5ef6\u8fdf\u8f83\u9ad8\u7684\u670d\u52a1\u5668\u5f00\u542f\u3002\u8be5\u529f\u80fd\u4e0d\u9700\u8981\u5728\u670d\u52a1\u7aef\u989d\u5916\u4f7f\u7528\u53c2\u6570\u5f00\u542f\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u53d6\u6d88\u652f\u6301 TLS \u6d41\u91cf\u6df7\u6dc6 (",(0,r.jsx)(n.code,{children:"obfs=tls"}),") \u529f\u80fd\uff1b\u670d\u52a1\u5668\u7aef\u7a0b\u5e8f\u5df2\u4e0d\u80fd\u591f\u4e0e\u5ba2\u6237\u7aef\u81ea\u52a8\u534f\u5546\u5bc6\u7801\u548c\u7248\u672c\uff0c\u5ba2\u6237\u7aef\u9700\u624b\u52a8\u914d\u7f6e",(0,r.jsx)(n.code,{children:"version=4"}),"\uff1b"]}),"\n",(0,r.jsx)(n.h2,{id:"macos",children:"MacOS"}),"\n",(0,r.jsx)(n.p,{children:"\u5982\u679c\u4f60\u6b63\u5728\u4f7f\u7528 Surge Mac \u5e76\u60f3\u4ee5\u6b64\u90e8\u7f72 Snell Server \u662f\u975e\u5e38\u7b80\u5355\u7684\uff0c\u53ea\u8981\u5728 Surge \u7684\u914d\u7f6e\u6587\u4ef6\u4e2d\u52a0\u5165\u4ee5\u4e0b\u5b57\u6bb5\uff1a"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"[Snell Server]\ninterface = 0.0.0.0\nport = 6160\npsk = RANDOM_KEY_HERE\nobfs = off\n"})}),"\n",(0,r.jsx)(n.admonition,{type:"info",children:(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"interface\uff1a\u76d1\u542c\u5730\u5740\nport\uff1a\u7aef\u53e3\npsk\uff1a\u5bc6\u94a5\nobfs\uff1aoff \u4e3a\u5173\u95ed\u6df7\u6dc6\uff0c\u6216\u4f7f\u7528http\u6d41\u91cf\u6df7\u6dc6\n"})})}),"\n",(0,r.jsx)(n.h2,{id:"linux",children:"Linux"}),"\n",(0,r.jsxs)(n.p,{children:["\u5728 ",(0,r.jsx)(n.a,{href:"https://manual.nssurge.com/others/snell.html",children:"Surge \u5b98\u7f51"}),"\u6839\u636e\u4f60\u7684\u670d\u52a1\u5668\u83b7\u53d6\u72ec\u7acb\u670d\u52a1\u7aef\u4e8c\u8fdb\u5236\u6587\u4ef6."]}),"\n",(0,r.jsxs)(n.p,{children:["\u5982\u679c\u60f3\u8981\u4ee5\u5f80\u7684\u5386\u53f2\u7248\u672c\uff0c\u53ef\u4ee5\u524d\u5f80",(0,r.jsx)(n.a,{href:"https://github.com/fhvknb/Snell-oldbak",children:"\u5386\u53f2\u5907\u4efd"}),"\u8fdb\u884c\u83b7\u53d6\u3002"]}),"\n",(0,r.jsxs)(n.p,{children:["\u4e0b\u9762\u4ee5",(0,r.jsx)(n.code,{children:"linux-amd64"}),"\u7cfb\u7edf\u4e3a\u793a\u4f8b"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["\u73af\u5883\u5b89\u88c5\uff0c\u4e0b\u8f7d\u5b89\u88c5 ",(0,r.jsx)(n.code,{children:"snell"})]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"# \u5982\u679c\u7cfb\u7edf\u6ca1\u6709\u9884\u88c5\u53ef\u80fd\u9700\u8981\u5148\u4e0b\u8f7d\u5b89\u88c5 wget \u53ca unzip\n# APT\nsudo apt update && sudo apt install wget unzip\n# DNF\nsudo dnf install unzip\n\n# \u4e0b\u8f7d Snell Server\nwget https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-amd64.zip\n\n# \u89e3\u538b Snell Server \u5230\u6307\u5b9a\u76ee\u5f55\nsudo unzip snell-server-v4.0.1-linux-amd64.zip -d /usr/local/bin\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"2",children:["\n",(0,r.jsxs)(n.li,{children:["\u751f\u6210 ",(0,r.jsx)(n.code,{children:"snell"})," \u914d\u7f6e\u6587\u4ef6"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-basheee",children:"# \u53ef\u4ee5\u4f7f\u7528 Snell \u7684 wizard \u751f\u6210\u4e00\u4e2a\u914d\u7f6e\u6587\u4ef6\nsudo snell-server --wizard -c /etc/snell-server.conf\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"3",children:["\n",(0,r.jsxs)(n.li,{children:["\u4fee\u6539 ",(0,r.jsx)(n.code,{children:"snell"})," \u914d\u7f6e\u6587\u4ef6"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo vi /etc/snell-server.conf\n\n#\u3000\u6839\u636e\u9700\u8981\u4fee\u6539\u4ee5\u4e0b\u5185\u5bb9\u3000\n[snell-server]\nlisten = 0.0.0.0:11807\npsk = AijHCeos15IvqDZTb1cJMX5GcgZzIVE\nipv6 = false\nobfs = off\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"4",children:["\n",(0,r.jsx)(n.li,{children:"\u914d\u7f6esystemd\u670d\u52a1\u6587\u4ef6"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo vim /lib/systemd/system/snell.service\n\n# \u6dfb\u52a0\u4ee5\u4e0b\u5185\u5bb9\n[Unit]\nDescription=Snell Proxy Service\nAfter=network.target\n\n[Service]\nType=simple\nUser=nobody\nGroup=nobody\nLimitNOFILE=32768\nExecStart=/usr/local/bin/snell-server -c /etc/snell-server.conf\n\n[Install]\nWantedBy=multi-user.target\n"})}),"\n",(0,r.jsxs)(n.ol,{start:"5",children:["\n",(0,r.jsx)(n.li,{children:"\u4f7f\u7528systemctl\u542f\u52a8\u670d\u52a1"}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"# \u91cd\u8f7d\u670d\u52a1\nsudo systemctl daemon-reload\n\n# \u5f00\u673a\u8fd0\u884c Snell\nsudo systemctl enable snell\n\n# \u5f00\u542f Snell\nsudo systemctl start snell\n\n# \u5173\u95ed Snell\nsudo systemctl stop snell\n\n## \u67e5\u770b Snell \u72b6\u6001\nsudo systemctl status snell\n"})}),"\n",(0,r.jsxs)(n.admonition,{type:"warning",children:[(0,r.jsx)(n.p,{children:"\u5bf9\u4e8e Snell v3 \u53ef\u4ee5\u5c1d\u8bd5\u589e\u52a0\u5185\u6838\u7f13\u51b2\u533a\u5927\u5c0f\u53ef\u4ee5\u663e\u8457\u63d0\u9ad8 UDP \u6027\u80fd"}),(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-sh",children:"sudo sysctl -w net.core.rmem_max=26214400\nsudo sysctl -w net.core.rmem_default=26214400\n"})})]})]})}function h(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(a,{...e})}):a(e)}}}]);