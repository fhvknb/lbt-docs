---
title: Linux本机与远程主机文件传输
categories: Study
tags:
  - liunx
  - Mac
abbrlink: 49778ea8
date: 2018-10-25 17:18:38
---

#### 命令格式
`scp -r local_folder remote_username@remote_ip:remote_folder`
`scp -r local_folder remote_ip:remote_folder`
* 第1个指定了用户名，命令执行后需要再输入密码；
* 第2个没有指定用户名，命令执行后需要输入用户名和密码；

scp其它可选参数
`-p 拷贝文件的时候保留源文件建立的时间。` 
`-q 执行文件拷贝时，不显示任何提示消息。` 
`-r 拷贝整个目录`
`-v 拷贝文件时，显示提示信息。`     
  