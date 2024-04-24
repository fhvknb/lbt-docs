---
title: 解决Mac启动台图标顺序错乱
categories: Study
tags: Mac
abbrlink: 5e0d73e9
date: 2018-11-01 20:59:06
---
有没有朋友和我遇到相同的问题呢？突然有天发现自己的Mac启动页的图标完全错乱了，对于有点强迫症的我来说这当然不能忍受了，后来找到了重置Launchpad的方法。方法如下：
```
// 重置 Dock 图标数据库
rm ~/Library/Application\ Support/Dock/*.db && killall Dock
// 重置 Launchpad 图标数据库
defaults write com.apple.dock ResetLaunchPad -bool true && killall Dock
```

原文地址： https://sspai.com/post/35734