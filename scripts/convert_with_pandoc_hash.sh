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
print_header "Pandoc 批量文件转换工具 (增量更新版)"

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

# 创建目标目录（如果不存在）
mkdir -p "$DEST_DIR"

# 支持的文件类型（可根据需要调整）
SUPPORTED_TYPES="\.(md|txt|docx|html)$"

# 状态目录和文件
STATUS_DIR="$DEST_DIR/.pandoc_status"
mkdir -p "$STATUS_DIR"
MANIFEST_FILE="$STATUS_DIR/manifest.txt"

print_header "开始增量转换文件"

# 计数器
total_files=0
success_count=0
failed_count=0
skipped_count=0
deleted_count=0

# 创建临时文件来存储当前文件列表和哈希值
CURRENT_MANIFEST=$(mktemp)

# 创建临时文件来存储新的清单（只包含成功转换的文件）
NEW_MANIFEST=$(mktemp)

# 如果存在旧的清单文件，先复制到新的清单文件中
if [ -f "$MANIFEST_FILE" ]; then
    cp "$MANIFEST_FILE" "$NEW_MANIFEST"
fi

# 根据系统选择合适的MD5计算命令
if command -v md5sum &> /dev/null; then
    MD5_CMD="md5sum"
    MD5_EXTRACT="awk '{print \$1}'"
elif command -v md5 &> /dev/null; then
    MD5_CMD="md5"
    MD5_EXTRACT="awk '{print \$4}'"
else
    print_error "未找到 md5sum 或 md5 命令。请安装相应工具。"
    exit 1
fi

# 查找源目录中的所有支持的文件
find "$SRC_DIR" -type f | grep -E "$SUPPORTED_TYPES" | while read -r FILE; do
    # 获取相对于源目录的文件路径
    REL_PATH="${FILE#$SRC_DIR/}"
    
    # 如果 REL_PATH 与 FILE 相同，说明路径提取有问题
    if [ "$REL_PATH" = "$FILE" ]; then
        REL_PATH="${FILE#$SRC_DIR}"  # 尝试不带斜杠的版本
    fi
    
    # 计算文件哈希值 - 修正提取哈希值的方式
    if [ "$MD5_CMD" = "md5sum" ]; then
        FILE_HASH=$(md5sum "$FILE" | awk '{print $1}')
    else
        FILE_HASH=$(md5 "$FILE" | awk '{print $4}')
    fi
    
    # 将文件路径和哈希值添加到当前清单
    echo "$REL_PATH|$FILE_HASH" >> "$CURRENT_MANIFEST"
done

# 获取当前文件总数
total_files=$(wc -l < "$CURRENT_MANIFEST")
print_info "找到 $total_files 个文件"

# 创建临时文件来存储需要处理的文件
FILES_TO_PROCESS=$(mktemp)
FILES_TO_DELETE=$(mktemp)

# 如果存在旧的清单文件，比较新旧文件以确定需要处理的文件
if [ -f "$MANIFEST_FILE" ]; then
    # 找出新增或修改的文件
    while IFS="|" read -r REL_PATH FILE_HASH; do
        # 在旧清单中查找相同的文件
        OLD_HASH=$(grep "^$REL_PATH|" "$MANIFEST_FILE" | cut -d"|" -f2)
        
        # 如果文件不存在或哈希值不同，则需要处理
        if [ -z "$OLD_HASH" ] || [ "$OLD_HASH" != "$FILE_HASH" ]; then
            echo "$REL_PATH" >> "$FILES_TO_PROCESS"
        fi
    done < "$CURRENT_MANIFEST"
    
    # 找出已删除的文件
    while IFS="|" read -r REL_PATH OLD_HASH; do
        # 在新清单中查找相同的文件
        NEW_HASH=$(grep "^$REL_PATH|" "$CURRENT_MANIFEST" | cut -d"|" -f2)
        
        # 如果文件不存在于新清单中，则已被删除
        if [ -z "$NEW_HASH" ]; then
            echo "$REL_PATH" >> "$FILES_TO_DELETE"
            
            # 从新清单中删除该文件的记录
            # 使用兼容 Linux 和 macOS 的 sed 命令
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "/^$REL_PATH|/d" "$NEW_MANIFEST"
            else
                sed -i "/^$REL_PATH|/d" "$NEW_MANIFEST"
            fi
        fi
    done < "$MANIFEST_FILE"
else
    # 如果没有旧的清单文件，处理所有文件
    cut -d"|" -f1 "$CURRENT_MANIFEST" > "$FILES_TO_PROCESS"
fi

# 获取需要处理的文件数量
process_count=$(wc -l < "$FILES_TO_PROCESS")
delete_count=$(wc -l < "$FILES_TO_DELETE")

print_info "需要转换 $process_count 个文件"
print_info "需要删除 $delete_count 个文件"

# 处理需要转换的文件
if [ "$process_count" -gt 0 ]; then
    while IFS= read -r REL_PATH; do
        # 跳过空行
        [ -z "$REL_PATH" ] && continue
        
        # 源文件完整路径
        FILE="$SRC_DIR/$REL_PATH"
        
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
            
            # 获取文件哈希值
            FILE_HASH=$(grep "^$REL_PATH|" "$CURRENT_MANIFEST" | cut -d"|" -f2)
            
            # 从新清单中删除可能存在的旧记录
            # 使用兼容 Linux 和 macOS 的 sed 命令
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "/^$REL_PATH|/d" "$NEW_MANIFEST"
            else
                sed -i "/^$REL_PATH|/d" "$NEW_MANIFEST"
            fi
            
            # 将成功转换的文件记录添加到新清单
            echo "$REL_PATH|$FILE_HASH" >> "$NEW_MANIFEST"
        else
            print_error "转换失败: $FILE，错误代码: $?"
            ((failed_count++))
            
            # 从新清单中删除失败的文件记录（如果存在）
            # 使用兼容 Linux 和 macOS 的 sed 命令
            if [[ "$OSTYPE" == "darwin"* ]]; then
                sed -i '' "/^$REL_PATH|/d" "$NEW_MANIFEST"
            else
                sed -i "/^$REL_PATH|/d" "$NEW_MANIFEST"
            fi
        fi
    done < "$FILES_TO_PROCESS"
else
    print_info "没有文件需要转换"
fi

# 处理需要删除的文件
if [ "$delete_count" -gt 0 ]; then
    while IFS= read -r REL_PATH; do
        # 跳过空行
        [ -z "$REL_PATH" ] && continue
        
        # 生成目标文件路径
        OUTPUT_FILE="$DEST_DIR/${REL_PATH%.*}.$TARGET_FORMAT"
        
        # 如果目标文件存在，则删除
        if [ -f "$OUTPUT_FILE" ]; then
            print_progress "正在删除: $OUTPUT_FILE"
            rm -f "$OUTPUT_FILE"
            
            # 检查删除是否成功
            if [ ! -f "$OUTPUT_FILE" ]; then
                print_success "成功删除: $OUTPUT_FILE"
                ((deleted_count++))
            else
                print_error "删除失败: $OUTPUT_FILE"
            fi
            
            # 检查并删除空目录
            dir_to_check=$(dirname "$OUTPUT_FILE")
            while [ "$dir_to_check" != "$DEST_DIR" ] && [ -d "$dir_to_check" ]; do
                if [ -z "$(ls -A "$dir_to_check")" ]; then
                    rmdir "$dir_to_check"
                    dir_to_check=$(dirname "$dir_to_check")
                else
                    break
                fi
            done
        fi
    done < "$FILES_TO_DELETE"
else
    print_info "没有文件需要删除"
fi

# 更新清单文件
cp "$NEW_MANIFEST" "$MANIFEST_FILE"

# 删除临时文件
rm -f "$CURRENT_MANIFEST" "$FILES_TO_PROCESS" "$FILES_TO_DELETE" "$NEW_MANIFEST"

# 计算跳过的文件数
skipped_count=$((total_files - success_count - failed_count))

# 显示统计信息
print_header "转换完成统计"
echo -e "${BOLD}总文件数:${NC} $total_files"
echo -e "${GREEN}${BOLD}成功转换:${NC} $success_count"
echo -e "${CYAN}${BOLD}无需转换:${NC} $skipped_count"
if [ $deleted_count -gt 0 ]; then
    echo -e "${YELLOW}${BOLD}已删除:${NC} $deleted_count"
fi
if [ $failed_count -gt 0 ]; then
    echo -e "${RED}${BOLD}失败:${NC} $failed_count"
else
    echo -e "${BOLD}失败:${NC} $failed_count"
fi

print_header "转换任务完成"