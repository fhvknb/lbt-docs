#!/bin/bash

# 定义颜色和样式
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# 输出样式函数
print_header() {
    echo -e "\n${BOLD}${BLUE}=== $1 ===${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

print_progress() {
    echo -e "${PURPLE}➤ $1${NC}"
}

# 显示脚本标题
print_header "Pandoc 批量文件转换工具"

# 输入的源目录（包含需要转换的文件）
SRC_DIR=${1%/}  # 移除末尾斜杠以规范化路径

# 输出的目标目录（存放转换后的文件）
DEST_DIR=$2

# 指定要转换的目标格式，例如 pdf、html、docx 等
TARGET_FORMAT=$3

# 检查参数是否正确
if [ -z "$SRC_DIR" ] || [ -z "$DEST_DIR" ] || [ -z "$TARGET_FORMAT" ]; then
    print_error "参数不足"
    echo -e "${BOLD}用法:${NC} $0 <源目录> <目标目录> <目标格式>"
    echo -e "${BOLD}示例:${NC} $0 ./source ./output pdf"
    exit 1
fi

print_info "源目录: $SRC_DIR"
print_info "目标目录: $DEST_DIR"
print_info "目标格式: $TARGET_FORMAT"

# 检查源目录是否存在
if [ ! -d "$SRC_DIR" ]; then
    print_error "源目录 $SRC_DIR 不存在！"
    exit 1
fi

# 检查 pandoc 是否安装
if ! command -v pandoc &> /dev/null; then
    print_error "未找到 pandoc 命令。请先安装 pandoc。"
    exit 1
fi

# 清空目标目录（如果存在）
if [ -d "$DEST_DIR" ] && [ "$(ls -A "$DEST_DIR" 2>/dev/null)" ]; then
    print_warning "目标目录 $DEST_DIR 不为空"
    read -p "$(echo -e ${YELLOW}"是否清空目标目录？(y/n): "${NC})" confirm
    if [[ $confirm == [Yy]* ]]; then
        print_progress "正在清空目标目录..."
        rm -rf "${DEST_DIR:?}"/*
        print_success "目标目录已清空"
    else
        print_info "继续操作，文件可能会被覆盖"
    fi
fi

# 创建目标目录（如果不存在）
mkdir -p "$DEST_DIR"

# 支持的文件类型（可根据需要调整）
SUPPORTED_TYPES="\.(md|txt|docx|html|pdf)$"

print_header "开始转换文件"

# 计数器
total_files=0
success_count=0
failed_count=0

# 创建临时文件存储文件列表
TEMP_FILE=$(mktemp)
find "$SRC_DIR" -type f | grep -E "$SUPPORTED_TYPES" > "$TEMP_FILE"

# 获取文件总数
total_files=$(wc -l < "$TEMP_FILE")
print_info "找到 $total_files 个文件需要转换"

# 遍历文件列表进行转换
while IFS= read -r FILE; do
    # 获取相对于源目录的文件路径
    REL_PATH="${FILE#$SRC_DIR/}"
    
    # 如果 REL_PATH 与 FILE 相同，说明路径提取有问题
    if [ "$REL_PATH" = "$FILE" ]; then
        REL_PATH="${FILE#$SRC_DIR}"  # 尝试不带斜杠的版本
    fi

    # 生成目标文件路径
    OUTPUT_FILE="$DEST_DIR/${REL_PATH%.*}.$TARGET_FORMAT"

    # 创建目标文件的父目录
    mkdir -p "$(dirname "$OUTPUT_FILE")"

    print_progress "正在转换: $FILE -> $OUTPUT_FILE"
    
    # 使用 pandoc 进行格式转换
    pandoc "$FILE" -o "$OUTPUT_FILE"

    # 检查转换是否成功
    if [ $? -eq 0 ]; then
        print_success "成功转换: $FILE -> $OUTPUT_FILE"
        ((success_count++))
    else
        print_error "转换失败: $FILE，错误代码: $?"
        ((failed_count++))
    fi
done < "$TEMP_FILE"

# 删除临时文件
rm -f "$TEMP_FILE"

# 显示统计信息
print_header "转换完成统计"
echo -e "${BOLD}总文件数:${NC} $total_files"
echo -e "${GREEN}${BOLD}成功:${NC} $success_count"
if [ $failed_count -gt 0 ]; then
    echo -e "${RED}${BOLD}失败:${NC} $failed_count"
else
    echo -e "${BOLD}失败:${NC} $failed_count"
fi

print_header "转换任务完成"