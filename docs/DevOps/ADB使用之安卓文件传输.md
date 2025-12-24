---
title: ADB使用之安卓文件传输
tag:
  - andorid
---

# 安卓文件传输ADB工具使用


## 文件传输命令

### 从电脑传输文件到手机

```
adb push <电脑上的文件路径> <手机上的目标路径>
```

例如：
```
adb push C:\Users\用户名\Desktop\文件.jpg /sdcard/Download/
```

### 从手机下载文件到电脑

```
adb pull <手机上的文件路径> <电脑上的目标路径>
```

例如：
```
adb pull /sdcard/DCIM/Camera/IMG_20250518.jpg D:\Photos\
```

### 传输整个文件夹

```
# 上传文件夹
adb push C:\Users\用户名\Documents\文件夹 /sdcard/Documents/

# 下载文件夹
adb pull /sdcard/DCIM/Camera/ D:\Photos\
```

## 常用文件路径

- 内部存储根目录: `/sdcard/` 或 `/storage/emulated/0/`
- 下载文件夹: `/sdcard/Download/`
- 相册: `/sdcard/DCIM/Camera/`
- 文档: `/sdcard/Documents/`


## 高级用法

- **无线 ADB 连接**（手机和电脑在同一网络下）：
  ```
  # 先用USB连接并获取手机IP
  adb shell ip addr show wlan0
  
  # 启用网络ADB
  adb tcpip 5555
  
  # 断开USB，通过IP连接
  adb connect 手机IP:5555
  ```

- **查看手机文件列表**：
  ```
  adb shell ls /sdcard/Download
  ```