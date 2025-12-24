---
title: Windows 操作Tips
tag: 
   - Windows
   - Tips
---


## Shell  Order
```powershell
# 设置脚本执行策略 
set-ExecutionPolicy RemoteSigned
get-ExecutionPolicy

# 设置代理环境变量
set http_proxy=127.0.0.1

# 查看应用端口
netstat -ano |findstr "21272"
# 终止程序
taskkill /f /t /im "21272"


# win10 激活
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX

# slmgr /skms zh.us.to
slmgr /skms kms.03k.org  

slmgr /ato

# way 2
irm https://massgrave.dev/get | iex
# end

```


## 实用CMD指令

%tmp%  缓存文件  
mrt  恶意软件删除   
mstsc 远程桌面   

## ShortCut

Win+E：打开文件管理器   
Win+R：快速启动  
Win+D：显示桌面  
Win + Ctrl + D: 新建桌面   
Win + Ctrl + 左右方向: 切换桌面   
Win + Tab : 打开任务视图  
Win＋L：快速锁屏  
Win+X：打开windows移动中心  
Win+S: 桌面搜索   
Win + Shift + S: 截图   
Win + 空格： 切换输入法   
Ctrl+Shift：切换输入法     
Ctrl+F：查找指定关键字    
Ctrl+A：全选   
Ctrl+C：复制    
Ctrl+X：剪切   
Ctrl+V：粘贴   
Ctrl+S：保存   
DELETE：删除    
F2：重命名所选文件或文件夹   
F3：查找指定关键字   
F5：刷新   
F11：全屏   
F12：打开任务管理器   
Shift+F10：打开快捷菜单   
Shift+Delete：删除所选文件或文件夹   
Shift+Ctrl+N：创建新文件夹  
