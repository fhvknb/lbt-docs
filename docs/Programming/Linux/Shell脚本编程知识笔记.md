
## 基础知识

### 1. Shebang行
```bash
#!/bin/bash
```
- 指定脚本使用的解释器
- 必须放在脚本的第一行
- 常见解释器：`/bin/bash`, `/bin/sh`, `/usr/bin/env bash`等

### 2. 注释
```bash
# 这是一个注释
```
- 以`#`开头的行为注释
- 注释不会被执行
- 良好的注释有助于理解代码逻辑

## 变量与字符串

### 1. 变量定义与使用
```bash
NAME="value"    # 定义变量(等号两边不能有空格)
echo $NAME      # 使用变量
echo ${NAME}    # 使用花括号明确变量名边界
```

### 2. 命令行参数
```bash
$0              # 脚本名称
$1, $2, $3...   # 第1、2、3个参数
$#              # 参数数量
$@              # 所有参数(作为独立的单词)
$*              # 所有参数(作为单个字符串)
```

### 3. 字符串操作
```bash
${variable#pattern}    # 从头删除最短匹配
${variable##pattern}   # 从头删除最长匹配
${variable%pattern}    # 从尾删除最短匹配
${variable%%pattern}   # 从尾删除最长匹配
${variable/old/new}    # 替换第一次出现的old为new
${variable//old/new}   # 替换所有old为new
```

示例:
```bash
SRC_DIR=${1%/}         # 移除末尾斜杠
REL_PATH="${FILE#$SRC_DIR/}" # 删除路径前缀
OUTPUT_FILE="${REL_PATH%.*}.$TARGET_FORMAT" # 替换文件扩展名
```

## 控制结构

### 1. 条件判断

#### if语句
```bash
if [ 条件 ]; then
    命令
elif [ 条件 ]; then
    命令
else
    命令
fi
```

#### 条件测试
```bash
[ -z "$变量" ]     # 变量为空
[ -n "$变量" ]     # 变量非空
[ "$a" = "$b" ]    # 字符串相等
[ "$a" != "$b" ]   # 字符串不相等
[ -d "$目录" ]     # 目录存在
[ -f "$文件" ]     # 文件存在
[ -x "$命令" ]     # 文件存在且可执行
[ $a -eq $b ]      # 数值相等
[ $a -ne $b ]      # 数值不相等
[ $a -lt $b ]      # 小于
[ $a -le $b ]      # 小于等于
[ $a -gt $b ]      # 大于
[ $a -ge $b ]      # 大于等于
```

#### 逻辑运算
```bash
[ 条件1 ] && [ 条件2 ]   # 逻辑与
[ 条件1 ] || [ 条件2 ]   # 逻辑或
! [ 条件 ]               # 逻辑非
```

### 2. 循环结构

#### while循环
```bash
while [ 条件 ]; do
    命令
done
```

#### for循环
```bash
for 变量 in 列表; do
    命令
done
```

#### 读取文件的循环
```bash
while IFS= read -r line; do
    echo "$line"
done < 文件名

# 使用分隔符读取
while IFS="|" read -r field1 field2; do
    echo "$field1 - $field2"
done < 文件名
```

## 函数

### 1. 函数定义与调用
```bash
function_name() {
    命令
    return 值
}

# 调用函数
function_name 参数1 参数2
```

### 2. 函数中的参数
```bash
function print_header() {
    echo -e "\n${BOLD}${BLUE}=== $1 ===${NC}\n"
}
```
- 函数内部使用`$1`, `$2`等访问参数
- `$@`表示所有参数
- `$#`表示参数数量

## 命令执行与管道

### 1. 命令替换
```bash
result=$(command)    # 推荐的现代语法
result=`command`     # 旧式语法
```

### 2. 命令退出状态
```bash
command
if [ $? -eq 0 ]; then
    echo "命令成功"
else
    echo "命令失败"
fi
```

### 3. 管道与重定向
```bash
command1 | command2    # 管道：command1的输出作为command2的输入
command > file         # 重定向输出到文件(覆盖)
command >> file        # 重定向输出到文件(追加)
command < file         # 从文件读取输入
command &> file        # 重定向标准输出和错误输出
```

### 4. 条件执行
```bash
command1 && command2   # 当command1成功时执行command2
command1 || command2   # 当command1失败时执行command2
```

## 文件操作

### 1. 文件查找
```bash
find 目录 -type f      # 查找文件
find 目录 -type d      # 查找目录
find 目录 -name "模式"  # 按名称查找
```

### 2. 文本处理
```bash
grep "模式" 文件       # 查找包含模式的行
grep -E "正则表达式" 文件 # 使用扩展正则表达式
cut -d":" -f1,2 文件   # 按分隔符切割并提取字段
sed 's/old/new/g' 文件 # 替换文本
awk '{print $1}' 文件  # 按空格分割并打印第一列
```

## 系统交互

### 1. 命令检测
```bash
if command -v 命令 &> /dev/null; then
    echo "命令存在"
else
    echo "命令不存在"
fi
```

### 2. 系统类型检测
```bash
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS特定命令
else
    # 其他系统命令
fi
```

### 3. 临时文件
```bash
temp_file=$(mktemp)    # 创建临时文件
# 使用临时文件...
rm -f "$temp_file"     # 删除临时文件
```

## 高级技巧

### 1. 计数器和算术运算
```bash
count=0
((count++))           # 增加计数器
((count+=5))          # 加5
result=$((a + b))     # 算术运算
```

### 2. 颜色和格式化输出
```bash
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'          # No Color

echo -e "${RED}错误信息${NC}"
echo -e "${GREEN}成功信息${NC}"
```

### 3. 错误处理
```bash
set -e                # 任何命令失败就退出脚本
trap 'cleanup' EXIT   # 脚本退出时执行cleanup函数
```

### 4. 兼容性处理
```bash
# 根据系统选择合适的命令
if command -v md5sum &> /dev/null; then
    MD5_CMD="md5sum"
elif command -v md5 &> /dev/null; then
    MD5_CMD="md5"
fi

# 根据系统使用不同的命令选项
if [[ "$OSTYPE" == "darwin"* ]]; then
    sed -i '' "s/old/new/g" file  # macOS
else
    sed -i "s/old/new/g" file     # Linux
fi
```

## 实用示例

### 1. 批量文件处理
```bash
find . -type f -name "*.txt" | while read -r file; do
    echo "处理: $file"
    # 对每个文件执行操作
done
```

### 2. 增量处理与状态跟踪
```bash
# 使用哈希值跟踪文件变化
FILE_HASH=$(md5sum "$FILE" | awk '{print $1}')
echo "$FILE_PATH|$FILE_HASH" >> "$MANIFEST_FILE"

# 检查文件是否需要处理
OLD_HASH=$(grep "^$FILE_PATH|" "$OLD_MANIFEST" | cut -d"|" -f2)
if [ "$OLD_HASH" != "$NEW_HASH" ]; then
    # 文件已更改，需要处理
fi
```

### 3. 目录递归处理
```bash
process_directory() {
    local dir="$1"
    for item in "$dir"/*; do
        if [ -d "$item" ]; then
            process_directory "$item"  # 递归处理子目录
        elif [ -f "$item" ]; then
            process_file "$item"       # 处理文件
        fi
    done
}
```

### 4. 统计和报告
```bash
# 计数器
total=0
success=0
failed=0

# 处理文件并更新计数器
process_files() {
    while read -r file; do
        ((total++))
        if process "$file"; then
            ((success++))
        else
            ((failed++))
        fi
    done
}

# 显示报告
echo "总数: $total"
echo "成功: $success"
echo "失败: $failed"
```
```