---
title: Linux 使用笔记
tags:
  - Linux
---

## Linux如何查看安装软件目录？

```bash
dpkg -L package_name
whereis software_name
echo $PATH
```

## Dpkg如何卸载软件？
```bash
dpkg -l ：  查看安装软件包名
sudo dpkg -r package_name  ： 卸载软件包
sudo dpkg --purge package_name  ： 卸载软件包及其配置文件
sudo apt autoremove ： 清理残留文件
```


## Linux如何创建or删除快捷方式（符号链接）？
```bash
ln -s source_file symbolic_link_name

rm /path/symbolic_link_name
```
