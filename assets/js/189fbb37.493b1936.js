"use strict";(self.webpackChunklbt_docs=self.webpackChunklbt_docs||[]).push([[519],{18:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>d,contentTitle:()=>r,default:()=>p,frontMatter:()=>i,metadata:()=>c,toc:()=>a});var o=t(4848),s=t(8453);const i={sidebar_position:4,title:"JS Code Snippets",tag:["js","frontend"]},r=void 0,c={id:"front-end/JS Code Snippets",title:"JS Code Snippets",description:"Code Snippets",source:"@site/docs/front-end/JS Code Snippets.md",sourceDirName:"front-end",slug:"/front-end/JS Code Snippets",permalink:"/docs/front-end/JS Code Snippets",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4,title:"JS Code Snippets",tag:["js","frontend"]},sidebar:"tutorialSidebar",previous:{title:"Study Blogs",permalink:"/docs/front-end/Study Blogs"},next:{title:"Linux",permalink:"/docs/category/linux"}},d={},a=[{value:"Code Snippets",id:"code-snippets",level:2},{value:"\u6570\u636e\u6587\u4ef6\u4e0b\u8f7d",id:"\u6570\u636e\u6587\u4ef6\u4e0b\u8f7d",level:3},{value:"\u9632\u6296\u51fd\u6570",id:"\u9632\u6296\u51fd\u6570",level:3}];function l(n){const e={code:"code",h2:"h2",h3:"h3",pre:"pre",...(0,s.R)(),...n.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(e.h2,{id:"code-snippets",children:"Code Snippets"}),"\n",(0,o.jsx)(e.h3,{id:"\u6570\u636e\u6587\u4ef6\u4e0b\u8f7d",children:"\u6570\u636e\u6587\u4ef6\u4e0b\u8f7d"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-js",children:'const data_json = {\n        name: "Shawn",\n        email: "xxx@gmail.com",\n    };\n\nconst exportFn = () => {\n    const json = JSON.stringify(data_json);\n    const blob = new Blob([json], { type: "application/json" });\n    const url = URL.createObjectURL(blob);\n    const link = document.createElement("a");\n    link.href = url;\n    link.download = "data.json";\n    link.click();\n    URL.revokeObjectURL(url);\n};\n'})}),"\n",(0,o.jsx)(e.h3,{id:"\u9632\u6296\u51fd\u6570",children:"\u9632\u6296\u51fd\u6570"}),"\n",(0,o.jsx)(e.pre,{children:(0,o.jsx)(e.code,{className:"language-js",children:"function debounce(fn, duration){\n    var timerId;\n    return function() {\n    if(timerId) {\n        clearTimeout(timerId);\n    }\n    const _this = this;\n    const _slice = Array.prototype.slice;\n    const args = _slice.call(arguments);\n    timerId = setTimeout(() => {\n        fn.apply(_this, args);\n    }, duration);\n    }\n}\n"})})]})}function p(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,o.jsx)(e,{...n,children:(0,o.jsx)(l,{...n})}):l(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>c});var o=t(6540);const s={},i=o.createContext(s);function r(n){const e=o.useContext(i);return o.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function c(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(s):n.components||s:r(n.components),o.createElement(i.Provider,{value:e},n.children)}}}]);