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

- **安装apk**:
```
adb install [options] <path_to_apk>
```
options:

-l: 将应用安装到保护目录下。
-r: 重新安装现有应用，保留其数据。
-t: 允许安装测试 APK。
-s: 将应用安装到 SD 卡。
-d: 允许降级覆盖安装。
-g: 授予所有运行时权限。
--abi \<ABI\>: 强制使用指定的 ABI 进行安装。这在你的 APK 支持多种 ABI，但设备支持的 ABI 不是 APK 的默认 ABI 时很有用。
--instant: 将应用作为 Instant App 安装。
--no-streaming: 通过 USB 安装大 APK 时不使用流式传输。
--fastdeploy: 使用 Fast Deploy 更新应用。
--incremental: 使用增量更新安装 APK。
--force-agent: 使用 Fast Deploy 强制使用安装代理，即使 APK 没有改变。
--no-restart: 安装 APK 后不重启应用。
--no-cache: 安装应用时不使用安装器缓存。
--force-queryable: 安装不可查询的应用。
--wait: 安装完成后等待，直到设备准备就绪。