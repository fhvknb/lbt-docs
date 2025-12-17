#!/bin/bash

# --- 配置区 ---
# 注意：源目录末尾的 / 非常重要！
# 有斜杠：同步目录下的内容；没斜杠：同步整个目录文件夹本身
SOURCE_DIR="./test/"
TARGET_DIR="./backup/"

# --- 执行区 ---

# 检查源目录是否存在
if [ ! -d "$SOURCE_DIR" ]; then
  echo "错误: 源目录 $SOURCE_DIR 不存在。"
  exit 1
fi

echo "正在开始同步..."

# rsync 参数说明：
# -a (archive): 归档模式，保留权限、时间戳、软连接等
# -v (verbose): 显示详细过程
# --delete: 如果源端删除了文件，目标端也同步删除（满足你的核心需求）
# --progress: 显示传输进度
rsync -av --delete "$SOURCE_DIR" "$TARGET_DIR"

# 检查上一个命令的退出状态
if [ $? -eq 0 ]; then
  echo "--- 同步成功 ---"
else
  echo "--- 同步过程中出现错误 ---"
fi