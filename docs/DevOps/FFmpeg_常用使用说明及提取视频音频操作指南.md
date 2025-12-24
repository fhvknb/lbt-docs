# FFmpeg 常用使用说明及提取视频音频操作指南

## 1. FFmpeg 安装

支持主流操作系统的安装方法：

### macOS

```bash
brew install ffmpeg
```

### Linux (Ubuntu)

```bash
sudo apt update
sudo apt install ffmpeg
```

### Windows

从[官网](https://ffmpeg.org/download.html)下载预编译版本，解压后配置环境变量。

---

## 2. 查看 FFmpeg 版本

```bash
ffmpeg -version
```

---

## 3. 提取视频中的音频为单独文件

### 3.1 提取为 MP3 格式

```bash
ffmpeg -i input_video.mp4 -q:a 0 -map a output_audio.mp3
```

- **参数说明**：
  - `-q:a 0`：最高音频质量
  - `-map a`：仅提取音频流

### 3.2 提取原始格式（如 AAC）

```bash
ffmpeg -i input_video.mp4 -vn -acodec copy output_audio.aac
```

- **参数说明**：
  - `-vn`：禁用视频处理
  - `-acodec copy`：不重新编码音频

### 3.3 提取为 WAV 格式

```bash
ffmpeg -i input_video.mp4 -vn -ar 44100 -ac 2 -b:a 192k output_audio.wav
```

- **参数说明**：
  - `-ar 44100`：44.1kHz 采样率
  - `-ac 2`：立体声输出
  - `-b:a 192k`：192kbps 比特率

### 3.4 提取为 FLAC 无损格式

```bash
ffmpeg -i input_video.mp4 -vn -acodec flac output_audio.flac
```

### 3.5 提取时间段音频

```bash
ffmpeg -i input_video.mp4 -ss 00:01:00 -t 00:00:30 -q:a 0 -map a output_audio.mp3
```

- **参数说明**：
  - `-ss`：起始时间
  - `-t`：持续时间

---

## 4. 常用音视频操作命令

### 4.1 格式转换（MP4 → MKV）

```bash
ffmpeg -i input_video.mp4 output_video.mkv
```

### 4.2 视频压缩

```bash
ffmpeg -i input_video.mp4 -vcodec libx264 -crf 23 -preset medium -acodec aac -b:a 128k output_video.mp4
```

- **参数说明**：
  - `-crf 23`：质量参数（0-51）
  - `-preset medium`：编码速度预设

### 4.3 画面裁剪

```bash
ffmpeg -i input_video.mp4 -vf "crop=1280:720:0:0" output_video.mp4
```

### 4.4 截取视频片段

```bash
ffmpeg -i input_video.mp4 -ss 00:01:00 -t 00:00:30 -c copy output_clip.mp4
```

### 4.5 合并视频文件

1. 创建 `file_list.txt`：
   ```text
   file 'video1.mp4'
   file 'video2.mp4'
   ```
2. 执行合并：
   ```bash
   ffmpeg -f concat -safe 0 -i file_list.txt -c copy output_video.mp4
   ```

### 4.6 音量调整

```bash
ffmpeg -i input_audio.mp3 -filter:a "volume=1.5" output_audio.mp3
```

---

## 5. 查看视频或音频文件信息

```bash
ffmpeg -i input_video.mp4
```

---

## 6. FFmpeg 提取音频完整示例

### 提取 MP3 格式

```bash
ffmpeg -i example.mp4 -q:a 0 -map a extracted_audio.mp3
```

### 提取原始 AAC 格式

```bash
ffmpeg -i example.mp4 -vn -acodec copy extracted_audio.aac
```

### 提取时间段音频

```bash
ffmpeg -i example.mp4 -ss 00:01:00 -t 00:00:30 -q:a 0 -map a extracted_audio.mp3
```

---

### 提取 MP3 格式 命令2

```bash
ffmpeg -i input_video.mp4 -vn -c:a copy output_audio.mp3
```

---

### **参数详解**

#### **1. `ffmpeg`**

- **作用**：调用 FFmpeg 工具。
- **说明**：FFmpeg 是一个强大的多媒体处理工具，用于处理音频、视频以及其他多媒体文件。

---

#### **2. `-i input_video.mp4`**

- **作用**：指定输入文件。
- **说明**：
  - `-i` 表示输入文件。
  - `input_video.mp4` 是输入的视频文件路径。
  - FFmpeg 会从该视频文件中读取音频和视频流。

---

#### **3. `-vn`**

- **作用**：忽略视频流。
- **说明**：
  - `-vn` 的意思是 "video none"（不处理视频流）。
  - 这个选项告诉 FFmpeg 不要输出视频部分，只提取音频。

---

#### **4. `-c:a copy`**

- **作用**：直接复制音频流，不重新编码。
- **说明**：
  - `-c:a` 指定音频编码器。
  - `copy` 表示直接复制音频流，而不是重新编码。
  - 使用这个选项可以快速提取音频而不会损失质量，因为不会进行音频的重新压缩。

---

#### **5. `output_audio.mp3`**

- **作用**：指定输出文件。
- **说明**：
  - `output_audio.mp3` 是输出的音频文件路径。
  - 这里指定了 MP3 格式作为输出文件的格式。

---


## 参考链接

1. [FFmpeg 官方文档](https://ffmpeg.org/documentation.html)
