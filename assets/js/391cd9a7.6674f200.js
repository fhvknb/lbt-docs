"use strict";(self.webpackChunklbt_docs=self.webpackChunklbt_docs||[]).push([[1254],{4633:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>l,default:()=>a,frontMatter:()=>i,metadata:()=>c,toc:()=>o});var t=r(4848),s=r(8453);const i={},l="\u5982\u4f55\u7ed9\u53cc\u7f51\u53e3\u4e3b\u673a\u6dfb\u52a0\u6865\u63a5\u7f51\u7edc",c={id:"linux/networking/bridge_net",title:"\u5982\u4f55\u7ed9\u53cc\u7f51\u53e3\u4e3b\u673a\u6dfb\u52a0\u6865\u63a5\u7f51\u7edc",description:"\u4f7f\u7528\u573a\u666f\uff1a\u6709\u4e00\u4e2a\u53cc\u7f51\u53e3\u4e3b\u673aA\uff0c\u5176\u4e2d\u4e00\u7f51\u53e3\u63a5\u5165AP\u7f51\u53e3\uff0c\u53e6\u4e00\u7f51\u53e3\u8fde\u63a5\u53e6\u4e00\u53f0\u4e3b\u673aB\uff0c\u6b64\u65f6\u9700\u8981B\u7684IP\u4e5f\u80fd\u5411AP\u81ea\u52a8\u83b7\u53d6\u3002",source:"@site/docs/linux/networking/bridge_net.md",sourceDirName:"linux/networking",slug:"/linux/networking/bridge_net",permalink:"/docs/linux/networking/bridge_net",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Networking",permalink:"/docs/category/networking"},next:{title:"Web-Server",permalink:"/docs/category/web-server"}},d={},o=[{value:"\u64cd\u4f5c\u6b65\u9aa4",id:"\u64cd\u4f5c\u6b65\u9aa4",level:2},{value:"\u5728\u673a\u5668A\u4e0a\u7684\u64cd\u4f5c\uff1a",id:"\u5728\u673a\u5668a\u4e0a\u7684\u64cd\u4f5c",level:3},{value:"\u5728\u673a\u5668B\u4e0a\u7684\u64cd\u4f5c\uff1a",id:"\u5728\u673a\u5668b\u4e0a\u7684\u64cd\u4f5c",level:3},{value:"\u95ee\u9898\u6307\u5357",id:"\u95ee\u9898\u6307\u5357",level:2}];function h(e){const n={blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"\u5982\u4f55\u7ed9\u53cc\u7f51\u53e3\u4e3b\u673a\u6dfb\u52a0\u6865\u63a5\u7f51\u7edc",children:"\u5982\u4f55\u7ed9\u53cc\u7f51\u53e3\u4e3b\u673a\u6dfb\u52a0\u6865\u63a5\u7f51\u7edc"}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"\u4f7f\u7528\u573a\u666f\uff1a\u6709\u4e00\u4e2a\u53cc\u7f51\u53e3\u4e3b\u673aA\uff0c\u5176\u4e2d\u4e00\u7f51\u53e3\u63a5\u5165AP\u7f51\u53e3\uff0c\u53e6\u4e00\u7f51\u53e3\u8fde\u63a5\u53e6\u4e00\u53f0\u4e3b\u673aB\uff0c\u6b64\u65f6\u9700\u8981B\u7684IP\u4e5f\u80fd\u5411AP\u81ea\u52a8\u83b7\u53d6\u3002"}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"\u64cd\u4f5c\u6b65\u9aa4",children:"\u64cd\u4f5c\u6b65\u9aa4"}),"\n",(0,t.jsx)(n.h3,{id:"\u5728\u673a\u5668a\u4e0a\u7684\u64cd\u4f5c",children:"\u5728\u673a\u5668A\u4e0a\u7684\u64cd\u4f5c\uff1a"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"\u521b\u5efa\u7f51\u7edc\u6865\u63a5"}),"\uff1a\u521b\u5efa\u4e00\u4e2a\u7f51\u7edc\u6865\u63a5\u63a5\u53e3\uff08\u6bd4\u5982br0\uff09\uff0c\u5e76\u5c06eth0\u548ceth1\u6dfb\u52a0\u5230\u8fd9\u4e2a\u7f51\u7edc\u6865\u63a5\u53e3\u4e2d\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# \u8fd9\u91cc\u7684eth0, eth1 \u4e3a\u6837\u4f8b\uff0c\u5177\u4f53\u64cd\u4f5c\u65f6\u8981\u6839\u636e\u5b9e\u9645\u7f51\u53e3\u540d\u79f0\r\nsudo brctl addbr br0\r\nsudo brctl addif br0 eth0\r\nsudo brctl addif br0 eth1\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"\u914d\u7f6e\u7f51\u7edc\u63a5\u53e3"}),"\uff1a\u5c06eth0\u548ceth1\u914d\u7f6e\u4e3a\u4e0d\u518d\u4f7f\u7528DHCP\uff0c\u800c\u662f\u5c06br0\u914d\u7f6e\u4e3aDHCP\u5ba2\u6237\u7aef\uff0c\u4ee5\u4fbf\u4eceAP\u7684DHCP\u670d\u52a1\u5668\u83b7\u53d6IP\u5730\u5740\uff1a"]}),"\n",(0,t.jsxs)(n.p,{children:["\u7f16\u8f91",(0,t.jsx)(n.code,{children:"/etc/network/interfaces"}),"\u6587\u4ef6\uff0c\u5c06\u4ee5\u4e0b\u914d\u7f6e\u6dfb\u52a0\u5230\u6587\u4ef6\u672b\u5c3e\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"auto br0\r\niface br0 inet dhcp\r\nbridge_ports eth0 eth1\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"\u542f\u7528IP\u8f6c\u53d1"}),"\uff1a\u542f\u7528IP\u8f6c\u53d1\u529f\u80fd\uff0c\u4ee5\u4fbf\u5b9e\u73b0\u6570\u636e\u5305\u5728\u4e0d\u540c\u7f51\u53e3\u4e4b\u95f4\u7684\u8f6c\u53d1\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"sudo sysctl -w net.ipv4.ip_forward=1\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["\n",(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"\u91cd\u542f\u7f51\u7edc\u670d\u52a1"}),"\uff1a\u91cd\u542f\u7f51\u7edc\u670d\u52a1\u4ee5\u5e94\u7528\u65b0\u7684\u7f51\u7edc\u914d\u7f6e\uff1a"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"sudo systemctl restart networking\n"})}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.h3,{id:"\u5728\u673a\u5668b\u4e0a\u7684\u64cd\u4f5c",children:"\u5728\u673a\u5668B\u4e0a\u7684\u64cd\u4f5c\uff1a"}),"\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:[(0,t.jsx)(n.strong,{children:"\u914d\u7f6e\u7f51\u7edc\u63a5\u53e3"}),"\uff1a\u5c06\u673a\u5668B\u7684\u7f51\u53e3\u914d\u7f6e\u4e3aDHCP\u5ba2\u6237\u7aef\uff0c\u4ee5\u4fbf\u4eceAP\u7684DHCP\u670d\u52a1\u5668\u83b7\u53d6IP\u5730\u5740\u3002"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"\u901a\u8fc7\u4ee5\u4e0a\u64cd\u4f5c\uff0c\u5c31\u5b9e\u73b0\u673a\u5668A\u4f5c\u4e3a\u4e00\u4e2a\u7f51\u7edc\u6865\u63a5\u8bbe\u5907\uff0c\u8fde\u63a5\u673a\u5668B\u548cAP\uff0c\u5e76\u4f7f\u5b83\u4eec\u5171\u4eab\u540c\u4e00\u4e2aIP\u5730\u5740\u6c60\uff0c\u4eceAP\u7684DHCP\u670d\u52a1\u5668\u83b7\u53d6IP\u5730\u5740\u3002\u8bf7\u786e\u4fdd\u7f51\u7edc\u914d\u7f6e\u6b63\u786e\uff0c\u5e76\u6839\u636e\u5b9e\u9645\u60c5\u51b5\u8c03\u6574\u914d\u7f6e\u3002"}),"\n",(0,t.jsx)(n.h2,{id:"\u95ee\u9898\u6307\u5357",children:"\u95ee\u9898\u6307\u5357"}),"\n",(0,t.jsx)(n.p,{children:"\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u8fdb\u884c\u5982\u4e0a\u914d\u7f6e\u540e\uff0c\u4e3b\u673aB\u53ef\u4ee5\u6b63\u5e38\u4eceAP\u83b7\u53d6IP\uff0c\u4f46\u5728\u6709\u4e9b\u673a\u5668\u4e0a\u53ef\u80fd\u4f1a\u51fa\u73b0\u4e00\u4e9b\u5c0f\u95ee\u9898\uff0c\u8fd9\u4e9b\u5c0f\u95ee\u9898\u53ef\u80fd\u662f\u4e3b\u673aA\u4e0a\u4e4b\u524d\u7684\u65e7\u7684\u7f51\u7edc\u89c4\u5219\u914d\u7f6e\u4ea7\u751f\u5e72\u6270\uff0c\u5982\u679c\u53d1\u73b0\u5728\u91cd\u542f\u4e3b\u673aA,B\u540e\uff0c\u4e3b\u673aB\u4e0d\u80fd\u6b63\u5e38\u83b7\u5f97IP\uff0c\u53ef\u4ee5\u8fdb\u884c\u5982\u4f55\u5c1d\u8bd5"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"# \u6e05\u7a7a iptables \u9632\u706b\u5899\u7684\u6240\u6709\u89c4\u5219\r\niptables -F \n"})})]})}function a(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8453:(e,n,r)=>{r.d(n,{R:()=>l,x:()=>c});var t=r(6540);const s={},i=t.createContext(s);function l(e){const n=t.useContext(i);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:l(e.components),t.createElement(i.Provider,{value:n},e.children)}}}]);