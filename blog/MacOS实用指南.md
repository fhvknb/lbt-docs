---
slug: MacOS实用指南
title: MacOS实用指南
authors: shaun
tags: [MacOS]
date: 2018-11-01 20:59:06
---

***
简单记录使用MacOS的一些错误异常是如何恢复正常的。
 <!-- truncate -->

***如何解决Launchpad 图标完全错乱***

```bash
# 重置Dock图标数据库
rm ~/Library/Application\ Support/Dock/*.db && killall Dock
# 重置Launchpad图标数据库
defaults write com.apple.dock ResetLaunchPad -bool true && killall Dock
```
