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

## Linux Command Line Shortcuts

|Keyboard Shortcut |	Description  |
|:---|:---|
| CTRL + A  |	Moves the cursor to the beginning of the line. |
| CTRL + E  |	Moves the cursor to the end of the line. |
| CTRL + U  |	Deletes text from the cursor to the beginning of the line. |
| CTRL + K  |	Deletes text from the cursor to the end of the line. |
| CTRL + L  | 	Clears the terminal screen. |
| CTRL + C  |	Interrupts (stops) the current command. |
| CTRL + D  |	Exits the current shell or terminal session. |
| CTRL + Z  |	Suspends the current command (resumable with the fg command). |


```bash

# To overwrite a file with command output: 
command > output.txt 

# To append command output to an existing file: 
command >> output.txt 

# This allows you to feed a command with data from a file instead of typing it manually. 
command < input.txt 

# Using grep for Text Search in the Linux Terminal
grep "pattern" file.txt 

# Linux Text Manipulation with sed and awk 
sed 's/old/new/g' file.txt 

awk -F',' '{print $2}' file.csv 


# Sorting and Filtering Text (sort, cut, uniq) in Linux 
sort data.txt 
cut -d',' -f1,3 file.csv  

# uniq is used to filter out duplicate lines from sorted text. 
sort file.txt | uniq


```
## 检查系统信息

| Command 	| Description 	| Example  |
|:---|:---|:---|
| uname  | 	Displays basic system information such as the kernel version and system architecture.         |	Uname -a |
| df 	   | Shows disk space usage, including information about disk partitions and their available space. |	df -h |
| free   | Displays memory (RAM) usage information, including total, used, and available memory.    	    |  free -m | 

## Linux 系统日志与故障排除

– journalctl：journalctl 命令提供对 systemd 日志的访问，其中包含各种系统服务和事件的日志。此工具使您能够查看和筛选日志条目，对于诊断系统问题非常宝贵。要显示最近的系统日志：

`journalctl -xe `

– dmesg：此外，dmesg 命令还会显示内核环形缓冲区消息，这对于诊断与硬件相关的问题非常有用。它特别展示了与硬件检测、驱动程序初始化和系统引导相关的消息。要查看内核消息：

`dmesg | less `


## 监控资源使用情况

htop 是 top 命令的一个出色的替代工具。此外，它提供了一个更友好的用户界面和额外的功能来监控和管理系统资源及进程。

```bash

# On Debian/Ubuntu-based systems: 
sudo apt-get install htop 

# On Red Hat/CentOS-based systems: 
sudo yum install htop 

htop
```
---

## 文件压缩与解压

```bash

# zip and unzip:

# zip [选项] 压缩包名称.zip 文件或目录 
# -r	递归压缩目录及其子目录
# -q	静默模式，不显示压缩过程
# -x	排除特定文件或目录
# -m	压缩后删除原文件（移动文件到压缩包中）

zip -rq archive.zip my_folder  # 压缩整个目录


unzip archive.zip -d /path/to/destination  # 解压到指定目录

```
---

## Linux 磁盘清理

要查看 Linux

`/dev/vda3` 分区（需要先知道它挂载到哪个目录，通常是根目录 `/` 或 `/home`）中的文件和目录，主要使用 `ls`, [du](https://www.google.com/search?q=du&oq=linux+%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E7%A3%81%E7%9B%98%2Fdev%2Fvda3+%E4%B8%AD%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%87%E4%BB%B6%E5%8F%8A%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRiPAtIBCTQxODQyajBqMagCCLACAfEFs1uIGdwHUvs&sourceid=chrome&ie=UTF-8&mstk=AUtExfBWJF5Rc0e7dk6Avn-tasN16s95RTXTch0kvby-vlMettSxT7c4xyG3iHqptEOgG8PoBLytgoDkZgXc9KuwWVz992MCZLqIxwXBQ5Nm7JJw8lqLxfcxBHNegBK2EFTNCfUq3sSyfLjnoO4xmNRo85Vx8iKVpdvEreMRYNwRQIY1Mrk&csui=3&ved=2ahUKEwjZn9jw0ZuSAxWjjYkEHZSgAaEQgK4QegQIARAB), [df](https://www.google.com/search?q=df&oq=linux+%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E7%A3%81%E7%9B%98%2Fdev%2Fvda3+%E4%B8%AD%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%87%E4%BB%B6%E5%8F%8A%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRiPAtIBCTQxODQyajBqMagCCLACAfEFs1uIGdwHUvs&sourceid=chrome&ie=UTF-8&mstk=AUtExfBWJF5Rc0e7dk6Avn-tasN16s95RTXTch0kvby-vlMettSxT7c4xyG3iHqptEOgG8PoBLytgoDkZgXc9KuwWVz992MCZLqIxwXBQ5Nm7JJw8lqLxfcxBHNegBK2EFTNCfUq3sSyfLjnoO4xmNRo85Vx8iKVpdvEreMRYNwRQIY1Mrk&csui=3&ved=2ahUKEwjZn9jw0ZuSAxWjjYkEHZSgAaEQgK4QegQIARAC) 等命令，先用 `df -h` 确认挂载点，然后 `cd` 到该挂载点（如 `cd /`），再用 `ls -l` 查看内容，用 `du -sh *` 查找大文件，[find](https://www.google.com/search?q=find&oq=linux+%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E7%A3%81%E7%9B%98%2Fdev%2Fvda3+%E4%B8%AD%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%87%E4%BB%B6%E5%8F%8A%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRiPAtIBCTQxODQyajBqMagCCLACAfEFs1uIGdwHUvs&sourceid=chrome&ie=UTF-8&mstk=AUtExfBWJF5Rc0e7dk6Avn-tasN16s95RTXTch0kvby-vlMettSxT7c4xyG3iHqptEOgG8PoBLytgoDkZgXc9KuwWVz992MCZLqIxwXBQ5Nm7JJw8lqLxfcxBHNegBK2EFTNCfUq3sSyfLjnoO4xmNRo85Vx8iKVpdvEreMRYNwRQIY1Mrk&csui=3&ved=2ahUKEwjZn9jw0ZuSAxWjjYkEHZSgAaEQgK4QegQIARAD) 命令可用于查找特定文件.

**步骤一：确认 `/dev/vda3` 挂载到哪个目录**

1. **运行 `df -h`**:bash

```
df -h

```

- 查找 `/dev/vda3` 对应的 `Mounted on` (挂载点) 列，比如 `/` (根目录) 或 `/home`.


**步骤二：进入该目录并查看内容**

1. **`cd` 到挂载点**:- 如果挂载点是 `/`，则直接操作 `cd /`.
- 如果挂载点是 `/home`，则 `cd /home`.


2. **使用 `ls -l` 列出文件和目录**:bash

```
ls -l

```

- 这会显示详细信息，包括文件大小（需在挂载点下）、权限、修改时间等.


3. **使用 [du](https://www.google.com/search?q=du&oq=linux+%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E7%A3%81%E7%9B%98%2Fdev%2Fvda3+%E4%B8%AD%E6%9C%89%E5%93%AA%E4%BA%9B%E6%96%87%E4%BB%B6%E5%8F%8A%E6%96%87%E4%BB%B6%E7%9B%AE%E5%BD%95&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIHCAEQIRigATIHCAIQIRiPAtIBCTQxODQyajBqMagCCLACAfEFs1uIGdwHUvs&sourceid=chrome&ie=UTF-8&mstk=AUtExfBWJF5Rc0e7dk6Avn-tasN16s95RTXTch0kvby-vlMettSxT7c4xyG3iHqptEOgG8PoBLytgoDkZgXc9KuwWVz992MCZLqIxwXBQ5Nm7JJw8lqLxfcxBHNegBK2EFTNCfUq3sSyfLjnoO4xmNRo85Vx8iKVpdvEreMRYNwRQIY1Mrk&csui=3&ved=2ahUKEwjZn9jw0ZuSAxWjjYkEHZSgAaEQgK4QegQIBRAI) 命令查看目录大小**:- `du -sh *` 或 `du -sh ./*`: 查看当前目录下所有文件和子目录的总大小 (更易读).
- `du -h --max-depth=1`: 查看当前目录下的文件和一级子目录的大小.


**步骤三：高级查找（可选）**

- **查找特定类型文件 (例如，查找所有日志文件)**:bash

```
find . -type f -name "*.log" -ls

```

- **查找大文件 (例如，大于 100MB 的文件)**:bash

```
find . -type f -size +100M -ls

```


- **按修改时间查找 (例如，超过 7 天未修改的文件)**:bash

```
find . -type f -mtime +7 -ls

```

**总结常用命令**

- `df -h`: 查看磁盘和挂载点.
- `ls -l`: 列出目录内容.
- `du -sh <目录>/*`: 查看指定目录大小.
- `find <路径> -name <模式>`: 按名称查找文件.





