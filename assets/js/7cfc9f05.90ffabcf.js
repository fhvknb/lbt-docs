"use strict";(self.webpackChunklbt_docs=self.webpackChunklbt_docs||[]).push([[9928],{2268:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>x,contentTitle:()=>l,default:()=>o,frontMatter:()=>r,metadata:()=>i,toc:()=>h});var c=s(4848),d=s(8453);const r={},l="xargs",i={id:"linux/command/xargs",title:"xargs",description:"xargs \u7528\u4e8e\u5c06\u6807\u51c6\u8f93\u5165\uff08stdin\uff09\uff0c\u8f6c\u6210\u5176\u540e\u547d\u4ee4\u7684\u5b57\u7b26\u4e32\u53c2\u6570\u3002\u5b83\u901a\u5e38\u8ddf\u7ba1\u9053\u547d\u4ee4\uff08|\uff09\u7ed3\u5408\u4f7f\u7528\u3002",source:"@site/docs/linux/command/xargs.md",sourceDirName:"linux/command",slug:"/linux/command/xargs",permalink:"/docs/linux/command/xargs",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"systemD",permalink:"/docs/linux/command/systemd"},next:{title:"Python \u5b89\u88c5\u53ca\u6307\u5b9apython\u547d\u4ee4\u7248\u672c",permalink:"/docs/linux/envconf/python install"}},x={},h=[{value:"xargs \u7684\u5355\u72ec\u4f7f\u7528",id:"xargs-\u7684\u5355\u72ec\u4f7f\u7528",level:2},{value:"-d \u53c2\u6570\u4e0e\u5206\u9694\u7b26",id:"-d-\u53c2\u6570\u4e0e\u5206\u9694\u7b26",level:2},{value:"-p \u53c2\u6570\uff0c-t \u53c2\u6570",id:"-p-\u53c2\u6570-t-\u53c2\u6570",level:2},{value:"-0 \u53c2\u6570\u4e0e find \u547d\u4ee4",id:"-0-\u53c2\u6570\u4e0e-find-\u547d\u4ee4",level:2},{value:"-L \u53c2\u6570",id:"-l-\u53c2\u6570",level:2},{value:"-n \u53c2\u6570",id:"-n-\u53c2\u6570",level:2},{value:"-I \u53c2\u6570",id:"-i-\u53c2\u6570",level:2},{value:"--max-procs \u53c2\u6570",id:"--max-procs-\u53c2\u6570",level:2},{value:"\u53c2\u8003\u94fe\u63a5",id:"\u53c2\u8003\u94fe\u63a5",level:2}];function a(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,d.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h1,{id:"xargs",children:"xargs"}),"\n",(0,c.jsxs)(n.p,{children:["xargs \u7528\u4e8e\u5c06\u6807\u51c6\u8f93\u5165\uff08stdin\uff09\uff0c\u8f6c\u6210\u5176\u540e\u547d\u4ee4\u7684\u5b57\u7b26\u4e32\u53c2\u6570\u3002\u5b83\u901a\u5e38\u8ddf\u7ba1\u9053\u547d\u4ee4\uff08",(0,c.jsx)(n.code,{children:"|"}),"\uff09\u7ed3\u5408\u4f7f\u7528\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"{{command1}} | xargs {{command2}}\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u662f xargs \u7684\u7528\u6cd5\u3002\u6b63\u5e38\u60c5\u51b5\u4e0b\uff0c\u7b2c\u4e00\u4e2a\u547d\u4ee4",(0,c.jsx)(n.code,{children:"command1"}),"\u4f1a\u8f93\u51fa\u7ed3\u679c\u5230\u63a7\u5236\u53f0\uff08\u5373\u6807\u51c6\u8f93\u51fa",(0,c.jsx)(n.code,{children:"stdout"}),"\uff09\uff0c\u4f46\u662f\u7ba1\u9053\u547d\u4ee4\uff08",(0,c.jsx)(n.code,{children:"|"}),"\uff09\u4f1a\u62e6\u622a",(0,c.jsx)(n.code,{children:"command1"}),"\u7684\u6807\u51c6\u8f93\u51fa\uff0c\u5c06\u5176\u8f6c\u4e3a\u540e\u9762\u547d\u4ee4\u7684\u6807\u51c6\u8f93\u5165\uff08",(0,c.jsx)(n.code,{children:"stdin"}),"\uff09\uff0c\u5373",(0,c.jsx)(n.code,{children:"xargs"}),"\u547d\u4ee4\u4f1a\u63a5\u6536\u5230\u6807\u51c6\u8f93\u5165\uff0c\u5b83\u518d\u5c06\u5176\u8f6c\u4e3a",(0,c.jsx)(n.code,{children:"command2"}),"\u7684\u5b57\u7b26\u4e32\u53c2\u6570\u6765\u8fd0\u884c\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u4e3e\u4f8b\u6765\u8bf4\uff0c\u6587\u672c\u6587\u4ef6",(0,c.jsx)(n.code,{children:"list.txt"}),"\u7684\u5185\u5bb9\u662f\u4e00\u7ec4\u6587\u4ef6\u540d\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"a.txt\nb.txt\nc.txt\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u7136\u540e\uff0c\u6267\u884c\u4e0b\u9762\u7684\u547d\u4ee4\uff0c\u4f1a\u5c06\u8fd9\u7ec4\u6587\u4ef6\u5168\u90e8\u5220\u9664\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"# \u5220\u9664 a.txt b.txt c.txt\n$ cat list.txt | xargs rm\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u793a\u4f8b\u4e2d\uff0c",(0,c.jsx)(n.code,{children:"cat"}),"\u547d\u4ee4\u5c06",(0,c.jsx)(n.code,{children:"list.txt"}),"\u7684\u5185\u5bb9\u8f93\u51fa\u5230\u6807\u51c6\u8f93\u51fa\uff0c\u4f46\u662f\u88ab\u7ba1\u9053\u547d\u4ee4\u62e6\u622a\uff0c\u8f6c\u4e3a",(0,c.jsx)(n.code,{children:"xargs"}),"\u7684\u6807\u51c6\u8f93\u5165\uff0c\u540e\u8005\u518d\u5c06\u6807\u51c6\u8f93\u5165\u8f6c\u6210",(0,c.jsx)(n.code,{children:"rm"}),"\u547d\u4ee4\u7684\u5b57\u7b26\u4e32\u53c2\u6570\uff0c\u5373\u5b9e\u9645\u6267\u884c\u7684\u662f\u4e0b\u9762\u7684\u547d\u4ee4\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"rm a.txt b.txt c.txt\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u901a\u5e38\u6765\u8bf4\uff0cLinux \u547d\u4ee4\u5206\u6210\u4e24\u79cd\uff0c\u4e00\u79cd\u63a5\u53d7\u6807\u51c6\u8f93\u5165\uff08\u4e00\u822c\u662f\u952e\u76d8\uff09\u4f5c\u4e3a\u53c2\u6570\uff0c\u53e6\u4e00\u79cd\u63a5\u53d7\u547d\u4ee4\u884c\u7684\u5b57\u7b26\u4e32\u4f5c\u4e3a\u53c2\u6570\u3002\u8fd9\u4e24\u79cd\u53c2\u6570\u7684\u6027\u8d28\u6709\u5f88\u5927\u7684\u4e0d\u540c\uff1a\u6807\u51c6\u8f93\u5165\uff08stdin\uff09\u662f\u6587\u672c\u6d41\uff08stream\uff09\uff0c\u7406\u8bba\u4e0a\u53ea\u8981\u4e0d\u7ec8\u6b62\uff0c\u5c31\u662f\u65e0\u9650\u7684\uff1b\u547d\u4ee4\u884c\u53c2\u6570\u5219\u662f\u4e00\u4e2a\u6709\u56fa\u5b9a\u957f\u5ea6\u7684\u6587\u672c\u6570\u7ec4\u3002xargs \u7684 \u4f5c\u7528\u5c31\u662f\u63a5\u53d7\u6807\u51c6\u8f93\u5165\uff0c\u5c06\u5176\u8f6c\u6210\u547d\u4ee4\u884c\u53c2\u6570\u3002"}),"\n",(0,c.jsx)(n.p,{children:"xargs \u6709\u70b9\u50cf echo \u547d\u4ee4\u7684\u9006\u64cd\u4f5c\u3002echo \u547d\u4ee4\u662f\u5c06\u547d\u4ee4\u884c\u53c2\u6570\u8f6c\u4e3a\u6807\u51c6\u8f93\u51fa\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"echo abc\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u4e2d\uff0c",(0,c.jsx)(n.code,{children:"abc"}),"\u662f\u547d\u4ee4\u884c\u53c2\u6570\uff0c",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\u5c06\u5176\u8f6c\u4e3a\u6807\u51c6\u8f93\u5165\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u81f3\u4e8e\u7ba1\u9053\u547d\u4ee4",(0,c.jsx)(n.code,{children:"|"}),"\uff0c\u5219\u662f\u5c06\u524d\u4e00\u4e2a\u547d\u4ee4\u7684\u6807\u51c6\u8f93\u51fa\uff0c\u8f6c\u6210\u540e\u4e00\u4e2a\u547d\u4ee4\u7684\u6807\u51c6\u8f93\u5165\u3002\u4f46\u662f\uff0c\u5927\u591a\u6570\u547d\u4ee4\u53ea\u63a5\u53d7\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u6240\u4ee5\u7ba1\u9053\u547d\u4ee4\u5c31\u9700\u8981 \u8ddf xargs \u7ed3\u5408\u4f7f\u7528\uff0c\u8fd9\u662f Linux \u7684\u5e38\u89c1\u64cd\u4f5c\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"xargs-\u7684\u5355\u72ec\u4f7f\u7528",children:"xargs \u7684\u5355\u72ec\u4f7f\u7528"}),"\n",(0,c.jsxs)(n.p,{children:["xargs \u547d\u4ee4\u4e5f\u53ef\u4ee5\u5355\u72ec\u4f7f\u7528\uff0c\u8fd9\u65f6\u7b49\u540c\u4e8e\u6267\u884c",(0,c.jsx)(n.code,{children:"xargs echo"}),"\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"$ xargs\n# \u7b49\u540c\u4e8e\n$ xargs echo\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u8f93\u5165",(0,c.jsx)(n.code,{children:"xargs"}),"\u540e\u6309\u4e0b\u56de\u8f66\uff0c\u547d\u4ee4\u884c\u5c31\u4f1a\u7b49\u5f85\u6807\u51c6\u8f93\u5165\uff08\u5373\u7528\u6237\u7684\u952e\u76d8\u8f93\u5165\uff09\u3002\u4f60\u53ef\u4ee5\u8f93\u5165\u4efb\u610f\u5185\u5bb9\uff0c\u7136\u540e\u6309\u4e0b Ctrl+d\uff0c\u8868\u793a\u8f93\u5165\u7ed3\u675f\uff0c\u8fd9\u65f6",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\u5c31\u4f1a\u628a\u524d\u9762\u7684\u8f93\u5165\u6253\u5370\u51fa\u6765\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"$ xargs\nhello (Ctrl + d)\nhello\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u793a\u4f8b\u4e2d\uff0c\u6267\u884c",(0,c.jsx)(n.code,{children:"xargs"}),"\u540e\uff0c\u4ece\u952e\u76d8\u8f93\u5165",(0,c.jsx)(n.code,{children:"hello"}),"\uff0c\u7136\u540e\u6309\u4e0b Ctrl+d\uff0c\u5c31\u4f1a\u81ea\u52a8\u6267\u884c",(0,c.jsx)(n.code,{children:"echo hello"}),"\u3002"]}),"\n",(0,c.jsx)(n.p,{children:"\u518d\u770b\u4e00\u4e2a\u4f8b\u5b50\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'$ xargs find -name\n"*.txt"\n./foo.txt\n./hello.txt\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u793a\u4f8b\u4e2d\uff0c\u8f93\u5165",(0,c.jsx)(n.code,{children:"xargs find -name"}),"\u4ee5\u540e\uff0c\u547d\u4ee4\u884c\u4f1a\u7b49\u5f85\u7528\u6237\u8f93\u5165\u6240\u8981\u641c\u7d22\u7684\u6587\u4ef6\u3002\u7528\u6237\u8f93\u5165",(0,c.jsx)(n.code,{children:'"*.txt"'}),"\uff0c\u8868\u793a\u641c\u7d22\u5f53\u524d\u76ee\u5f55\u4e0b\u7684\u6240\u6709 TXT \u6587\u4ef6\uff0c\u7136\u540e\u6309\u4e0b Ctrl+d\uff0c\u8868\u793a\u8f93\u5165\u7ed3\u675f\uff0c\u8fd9\u65f6\u5c31\u76f8\u5f53\u6267\u884c",(0,c.jsx)(n.code,{children:"find -name *.txt"}),"\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"-d-\u53c2\u6570\u4e0e\u5206\u9694\u7b26",children:"-d \u53c2\u6570\u4e0e\u5206\u9694\u7b26"}),"\n",(0,c.jsxs)(n.p,{children:["\u9ed8\u8ba4\u60c5\u51b5\u4e0b\uff0c",(0,c.jsx)(n.code,{children:"xargs"}),"\u5c06\u6362\u884c\u7b26\u548c\u7a7a\u683c\u4f5c\u4e3a\u5206\u9694\u7b26\uff0c\u628a\u6807\u51c6\u8f93\u5165\u5206\u89e3\u6210\u4e00\u4e2a\u4e2a\u547d\u4ee4\u884c\u53c2\u6570\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'echo "one two three" | xargs mkdir\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c",(0,c.jsx)(n.code,{children:"mkdir"}),"\u4f1a\u65b0\u5efa\u4e09\u4e2a\u5b50\u76ee\u5f55\uff0c\u56e0\u4e3a",(0,c.jsx)(n.code,{children:"xargs"}),"\u5c06",(0,c.jsx)(n.code,{children:"one two three"}),"\u5206\u89e3\u6210\u4e09\u4e2a\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u6267\u884c",(0,c.jsx)(n.code,{children:"mkdir one two three"}),"\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"-d"}),"\u53c2\u6570\u53ef\u4ee5\u66f4\u6539\u5206\u9694\u7b26\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'$ echo -e "a\\tb\\tc" | xargs -d "\\t" echo\na b c\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u7684\u547d\u4ee4\u6307\u5b9a\u5236\u8868\u7b26",(0,c.jsx)(n.code,{children:"\\t"}),"\u4f5c\u4e3a\u5206\u9694\u7b26\uff0c\u6240\u4ee5",(0,c.jsx)(n.code,{children:"a\\tb\\tc"}),"\u5c31\u8f6c\u6362\u6210\u4e86\u4e09\u4e2a\u547d\u4ee4\u884c\u53c2\u6570\u3002",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\u7684",(0,c.jsx)(n.code,{children:"-e"}),"\u53c2\u6570\u8868\u793a\u89e3\u91ca\u8f6c\u4e49\u5b57\u7b26\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"-p-\u53c2\u6570-t-\u53c2\u6570",children:"-p \u53c2\u6570\uff0c-t \u53c2\u6570"}),"\n",(0,c.jsxs)(n.p,{children:["\u4f7f\u7528",(0,c.jsx)(n.code,{children:"xargs"}),"\u547d\u4ee4\u4ee5\u540e\uff0c\u7531\u4e8e\u5b58\u5728\u8f6c\u6362\u53c2\u6570\u8fc7\u7a0b\uff0c\u6709\u65f6\u9700\u8981\u786e\u8ba4\u4e00\u4e0b\u5230\u5e95\u6267\u884c\u7684\u662f\u4ec0\u4e48\u547d\u4ee4\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"-p"}),"\u53c2\u6570\u6253\u5370\u51fa\u8981\u6267\u884c\u7684\u547d\u4ee4\uff0c\u8be2\u95ee\u7528\u6237\u662f\u5426\u8981\u6267\u884c\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"$ echo 'one two three' | xargs -p touch\ntouch one two three ?...\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u4e0a\u9762\u7684\u547d\u4ee4\u6267\u884c\u4ee5\u540e\uff0c\u4f1a\u6253\u5370\u51fa\u6700\u7ec8\u8981\u6267\u884c\u7684\u547d\u4ee4\uff0c\u8ba9\u7528\u6237\u786e\u8ba4\u3002\u7528\u6237\u6309\u4e0b\u56de\u8f66\u4ee5\u540e\uff0c\u624d\u4f1a\u771f\u6b63\u6267\u884c\u3002"}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"-t"}),"\u53c2\u6570\u5219\u662f\u6253\u5370\u51fa\u6700\u7ec8\u8981\u6267\u884c\u7684\u547d\u4ee4\uff0c\u7136\u540e\u76f4\u63a5\u6267\u884c\uff0c\u4e0d\u9700\u8981\u7528\u6237\u786e\u8ba4\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"$ echo 'one two three' | xargs -t rm\nrm one two three\n"})}),"\n",(0,c.jsx)(n.h2,{id:"-0-\u53c2\u6570\u4e0e-find-\u547d\u4ee4",children:"-0 \u53c2\u6570\u4e0e find \u547d\u4ee4"}),"\n",(0,c.jsxs)(n.p,{children:["\u7531\u4e8e",(0,c.jsx)(n.code,{children:"xargs"}),"\u9ed8\u8ba4\u5c06\u7a7a\u683c\u4f5c\u4e3a\u5206\u9694\u7b26\uff0c\u6240\u4ee5\u4e0d\u592a\u9002\u5408\u5904\u7406\u6587\u4ef6\u540d\uff0c\u56e0\u4e3a\u6587\u4ef6\u540d\u53ef\u80fd\u5305\u542b\u7a7a\u683c\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"find"}),"\u547d\u4ee4\u6709\u4e00\u4e2a\u7279\u522b\u7684\u53c2\u6570",(0,c.jsx)(n.code,{children:"-print0"}),"\uff0c\u6307\u5b9a\u8f93\u51fa\u7684\u6587\u4ef6\u5217\u8868\u4ee5",(0,c.jsx)(n.code,{children:"null"}),"\u5206\u9694\u3002\u7136\u540e\uff0c",(0,c.jsx)(n.code,{children:"xargs"}),"\u547d\u4ee4\u7684",(0,c.jsx)(n.code,{children:"-0"}),"\u53c2\u6570\u8868\u793a\u7528",(0,c.jsx)(n.code,{children:"null"}),"\u5f53\u4f5c\u5206\u9694\u7b26\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"find /path -type f -print0 | xargs -0 rm\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u5220\u9664",(0,c.jsx)(n.code,{children:"/path"}),"\u8def\u5f84\u4e0b\u7684\u6240\u6709\u6587\u4ef6\u3002\u7531\u4e8e\u5206\u9694\u7b26\u662f",(0,c.jsx)(n.code,{children:"null"}),"\uff0c\u6240\u4ee5\u5904\u7406\u5305\u542b\u7a7a\u683c\u7684\u6587\u4ef6\u540d\uff0c\u4e5f\u4e0d\u4f1a\u62a5\u9519\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u8fd8\u6709\u4e00\u4e2a\u539f\u56e0\uff0c\u4f7f\u5f97",(0,c.jsx)(n.code,{children:"xargs"}),"\u7279\u522b\u9002\u5408",(0,c.jsx)(n.code,{children:"find"}),"\u547d\u4ee4\u3002\u6709\u4e9b\u547d\u4ee4\uff08\u6bd4\u5982",(0,c.jsx)(n.code,{children:"rm"}),"\uff09\u4e00\u65e6\u53c2\u6570\u8fc7\u591a\u4f1a\u62a5\u9519\u201c\u53c2\u6570\u5217\u8868\u8fc7\u957f\u201d\uff0c\u800c\u65e0\u6cd5\u6267\u884c\uff0c\u6539\u7528",(0,c.jsx)(n.code,{children:"xargs"}),"\u5c31\u6ca1\u6709\u8fd9\u4e2a\u95ee\u9898\uff0c\u56e0\u4e3a\u5b83\u5bf9\u6bcf\u4e2a\u53c2\u6570\u6267\u884c\u4e00\u6b21\u547d\u4ee4\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'find . -name "*.txt" | xargs grep "abc"\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u627e\u51fa\u6240\u6709 TXT \u6587\u4ef6\u4ee5\u540e\uff0c\u5bf9\u6bcf\u4e2a\u6587\u4ef6\u641c\u7d22\u4e00\u6b21\u662f\u5426\u5305\u542b\u5b57\u7b26\u4e32",(0,c.jsx)(n.code,{children:"abc"}),"\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"-l-\u53c2\u6570",children:"-L \u53c2\u6570"}),"\n",(0,c.jsxs)(n.p,{children:["\u5982\u679c\u6807\u51c6\u8f93\u5165\u5305\u542b\u591a\u884c\uff0c",(0,c.jsx)(n.code,{children:"-L"}),"\u53c2\u6570\u6307\u5b9a\u591a\u5c11\u884c\u4f5c\u4e3a\u4e00\u4e2a\u547d\u4ee4\u884c\u53c2\u6570\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'$ xargs find -name\n"*.txt"\n"*.md"\nfind: paths must precede expression: `*.md\'\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u540c\u65f6\u5c06",(0,c.jsx)(n.code,{children:'"*.txt"'}),"\u548c",(0,c.jsx)(n.code,{children:"*.md"}),"\u4e24\u884c\u4f5c\u4e3a\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u4f20\u7ed9",(0,c.jsx)(n.code,{children:"find"}),"\u547d\u4ee4\u5bfc\u81f4\u62a5\u9519\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:["\u4f7f\u7528",(0,c.jsx)(n.code,{children:"-L"}),"\u53c2\u6570\uff0c\u6307\u5b9a\u6bcf\u884c\u4f5c\u4e3a\u4e00\u4e2a\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u5c31\u4e0d\u4f1a\u62a5\u9519\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'$ xargs -L 1 find -name\n"*.txt"\n./foo.txt\n./hello.txt\n"*.md"\n./README.md\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u6307\u5b9a\u4e86\u6bcf\u4e00\u884c\uff08",(0,c.jsx)(n.code,{children:"-L 1"}),"\uff09\u4f5c\u4e3a\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u5206\u522b\u8fd0\u884c\u4e00\u6b21\u547d\u4ee4\uff08",(0,c.jsx)(n.code,{children:"find -name"}),"\uff09\u3002"]}),"\n",(0,c.jsx)(n.p,{children:"\u4e0b\u9762\u662f\u53e6\u4e00\u4e2a\u4f8b\u5b50\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'$ echo -e "a\\nb\\nc" | xargs -L 1 echo\na\nb\nc\n'})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u4ee3\u7801\u6307\u5b9a\u6bcf\u884c\u8fd0\u884c\u4e00\u6b21",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\uff0c\u6240\u4ee5",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\u6267\u884c\u4e86\u4e09\u6b21\uff0c\u8f93\u51fa\u4e86\u4e09\u884c\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"-n-\u53c2\u6570",children:"-n \u53c2\u6570"}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"-L"}),"\u53c2\u6570\u867d\u7136\u89e3\u51b3\u4e86\u591a\u884c\u7684\u95ee\u9898\uff0c\u4f46\u662f\u6709\u65f6\u7528\u6237\u4f1a\u5728\u540c\u4e00\u884c\u8f93\u5165\u591a\u9879\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:'$ xargs find -name\n"*.txt" "*.md"\nfind: paths must precede expression: `*.md\'\n'})}),"\n",(0,c.jsx)(n.p,{children:"\u4e0a\u9762\u7684\u547d\u4ee4\u5c06\u540c\u4e00\u884c\u7684\u4e24\u9879\u4f5c\u4e3a\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u5bfc\u81f4\u62a5\u9519\u3002"}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"-n"}),"\u53c2\u6570\u6307\u5b9a\u6bcf\u6b21\u5c06\u591a\u5c11\u9879\uff0c\u4f5c\u4e3a\u547d\u4ee4\u884c\u53c2\u6570\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"xargs -n 1 find -name\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u6307\u5b9a\u5c06\u6bcf\u4e00\u9879\uff08",(0,c.jsx)(n.code,{children:"-n 1"}),"\uff09\u6807\u51c6\u8f93\u5165\u4f5c\u4e3a\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u5206\u522b\u6267\u884c\u4e00\u6b21\u547d\u4ee4\uff08",(0,c.jsx)(n.code,{children:"find -name"}),"\uff09\u3002"]}),"\n",(0,c.jsx)(n.p,{children:"\u4e0b\u9762\u662f\u53e6\u4e00\u4e2a\u4f8b\u5b50\u3002"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"$ echo {0..9} | xargs -n 2 echo\n0 1\n2 3\n4 5\n6 7\n8 9\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u547d\u4ee4\u6307\u5b9a\uff0c\u6bcf\u4e24\u4e2a\u53c2\u6570\u8fd0\u884c\u4e00\u6b21",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\u3002\u6240\u4ee5\uff0c10\u4e2a\u963f\u62c9\u4f2f\u6570\u5b57\u8fd0\u884c\u4e86\u4e94\u6b21",(0,c.jsx)(n.code,{children:"echo"}),"\u547d\u4ee4\uff0c\u8f93\u51fa\u4e86\u4e94\u884c\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"-i-\u53c2\u6570",children:"-I \u53c2\u6570"}),"\n",(0,c.jsxs)(n.p,{children:["\u5982\u679c",(0,c.jsx)(n.code,{children:"xargs"}),"\u8981\u5c06\u547d\u4ee4\u884c\u53c2\u6570\u4f20\u7ed9\u591a\u4e2a\u547d\u4ee4\uff0c\u53ef\u4ee5\u4f7f\u7528",(0,c.jsx)(n.code,{children:"-I"}),"\u53c2\u6570\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"-I"}),"\u6307\u5b9a\u6bcf\u4e00\u9879\u547d\u4ee4\u884c\u53c2\u6570\u7684\u66ff\u4ee3\u5b57\u7b26\u4e32\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"$ cat foo.txt\none\ntwo\nthree\n\n$ cat foo.txt | xargs -I file sh -c 'echo file; mkdir file'\none\ntwo\nthree\n\n$ ls\none two three\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e0a\u9762\u4ee3\u7801\u4e2d\uff0c",(0,c.jsx)(n.code,{children:"foo.txt"}),"\u662f\u4e00\u4e2a\u4e09\u884c\u7684\u6587\u672c\u6587\u4ef6\u3002\u6211\u4eec\u5e0c\u671b\u5bf9\u6bcf\u4e00\u9879\u547d\u4ee4\u884c\u53c2\u6570\uff0c\u6267\u884c\u4e24\u4e2a\u547d\u4ee4\uff08",(0,c.jsx)(n.code,{children:"echo"}),"\u548c",(0,c.jsx)(n.code,{children:"mkdir"}),"\uff09\uff0c\u4f7f\u7528",(0,c.jsx)(n.code,{children:"-I file"}),"\u8868\u793a",(0,c.jsx)(n.code,{children:"file"}),"\u662f\u547d\u4ee4\u884c\u53c2\u6570\u7684\u66ff\u4ee3\u5b57\u7b26\u4e32\u3002\u6267\u884c\u547d\u4ee4\u65f6\uff0c\u5177\u4f53\u7684\u53c2\u6570\u4f1a\u66ff\u4ee3\u6389",(0,c.jsx)(n.code,{children:"echo file; mkdir file"}),"\u91cc\u9762\u7684\u4e24\u4e2a",(0,c.jsx)(n.code,{children:"file"}),"\u3002"]}),"\n",(0,c.jsx)(n.h2,{id:"--max-procs-\u53c2\u6570",children:"--max-procs \u53c2\u6570"}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"xargs"}),"\u9ed8\u8ba4\u53ea\u7528\u4e00\u4e2a\u8fdb\u7a0b\u6267\u884c\u547d\u4ee4\u3002\u5982\u679c\u547d\u4ee4\u8981\u6267\u884c\u591a\u6b21\uff0c\u5fc5\u987b\u7b49\u4e0a\u4e00\u6b21\u6267\u884c\u5b8c\uff0c\u624d\u80fd\u6267\u884c\u4e0b\u4e00\u6b21\u3002"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.code,{children:"--max-procs"}),"\u53c2\u6570\u6307\u5b9a\u540c\u65f6\u7528\u591a\u5c11\u4e2a\u8fdb\u7a0b\u5e76\u884c\u6267\u884c\u547d\u4ee4\u3002",(0,c.jsx)(n.code,{children:"--max-procs 2"}),"\u8868\u793a\u540c\u65f6\u6700\u591a\u4f7f\u7528\u4e24\u4e2a\u8fdb\u7a0b\uff0c",(0,c.jsx)(n.code,{children:"--max-procs 0"}),"\u8868\u793a\u4e0d\u9650\u5236\u8fdb\u7a0b\u6570\u3002"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-bash",children:"docker ps -q | xargs -n 1 --max-procs 0 docker kill\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u4e0a\u9762\u547d\u4ee4\u8868\u793a\uff0c\u540c\u65f6\u5173\u95ed\u5c3d\u53ef\u80fd\u591a\u7684 Docker \u5bb9\u5668\uff0c\u8fd9\u6837\u8fd0\u884c\u901f\u5ea6\u4f1a\u5feb\u5f88\u591a\u3002"}),"\n",(0,c.jsx)(n.h2,{id:"\u53c2\u8003\u94fe\u63a5",children:"\u53c2\u8003\u94fe\u63a5"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"https://dhashe.com/xargs-is-the-inverse-function-of-echo.html",children:"xargs is the inverse function of echo"})}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"https://shapeshed.com/unix-xargs/",children:"Linux and Unix xargs command tutorial with examples"}),", George Ornbo"]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"https://www.howtoforge.com/tutorial/linux-xargs-command/",children:"8 Practical Examples of Linux Xargs Command for Beginners"}),", Himanshu Arora"]}),"\n"]})]})}function o(e={}){const{wrapper:n}={...(0,d.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(a,{...e})}):a(e)}},8453:(e,n,s)=>{s.d(n,{R:()=>l,x:()=>i});var c=s(6540);const d={},r=c.createContext(d);function l(e){const n=c.useContext(r);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(d):e.components||d:l(e.components),c.createElement(r.Provider,{value:n},e.children)}}}]);