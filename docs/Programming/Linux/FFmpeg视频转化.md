使用 FFmpeg 将一个 4K 视频转换为高质量但大小减少的 1080P 视频，可以通过调整视频分辨率和编码参数来实现。以下是具体步骤和命令：

### FFmpeg 命令说明

```bash
ffmpeg -i input_4k.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 192k -movflags +faststart output_1080p.mp4
```

### 参数详解

1. **`-i input_4k.mp4`**
   指定输入文件，替换为你的 4K 视频文件名。
2. **`-vf scale=1920:1080`**
   使用视频滤镜将分辨率缩放到 1080P（1920x1080）。
3. **`-c:v libx264`**
   指定视频编码器为 H.264（高效压缩且兼容性好）。
4. **`-preset slow`**
   编码速度设置为 `slow`，它会在保证质量的同时优化文件大小。其他选项包括 `ultrafast`（最快但质量差）到 `veryslow`（最慢但质量最好）。
5. **`-crf 23`**
   CRF（恒定质量因子）是控制视频质量的关键参数，范围是 0-51，数值越低质量越高。推荐值为 18-28，23 是一个平衡质量和大小的选择。
6. **`-c:a aac`**
   指定音频编码器为 AAC（高效音频编码）。
7. **`-b:a 192k`**
   设置音频比特率为 192kbps，保证音频质量。
8. **`-movflags +faststart`**
   为方便视频在网页上流式播放，将文件的元数据移动到开头。
9. **`output_1080p.mp4`**
   指定输出文件名。

---

### 优化建议

1. **进一步减小文件大小**
   如果文件大小仍然较大，可以尝试增加 `-crf` 值（例如 25 或 28），但会牺牲一定的质量。
2. **切换编码器**
   如果需要更高的压缩率，可以使用 `libx265` 编码器（H.265），但需要确保目标设备支持 H.265：

   ```bash
   ffmpeg -i input_4k.mp4 -vf scale=1920:1080 -c:v libx265 -preset slow -crf 28 -c:a aac -b:a 192k -movflags +faststart output_1080p.mp4
   ```
3. **调整帧率**
   如果帧率较高（如 60fps），可以通过 `-r` 参数降低帧率（如 30fps）来进一步减少文件大小：

   ```bash
   ffmpeg -i input_4k.mp4 -vf scale=1920:1080 -r 30 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 192k -movflags +faststart output_1080p.mp4
   ```

---

### 示例

假设你的 4K 视频文件名为 `video_4k.mp4`，你希望输出的 1080P 视频文件名为 `video_1080p.mp4`，可以运行以下命令：

```bash
ffmpeg -i video_4k.mp4 -vf scale=1920:1080 -c:v libx264 -preset slow -crf 23 -c:a aac -b:a 192k -movflags +faststart video_1080p.mp4
```

运行完成后，你会得到一个高质量且大小优化的 1080P 视频文件。
