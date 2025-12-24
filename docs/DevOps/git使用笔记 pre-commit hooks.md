
在 Git 中，你可以通过使用 **Git Hooks** 来在特定的 Git 操作（如 `commit`）时触发自定义脚本。以下是实现你需求的步骤：

### 1. 找到 Git Hook 的路径
Git Hooks 是存储在 `.git/hooks` 目录中的脚本文件。你需要找到项目的 `.git/hooks` 目录。

```bash
cd /path/to/your/repo
cd .git/hooks
```

### 2. 创建或编辑 `pre-commit` Hook
Git 提供了许多钩子，其中 `pre-commit` 是在执行 `git commit` 之前运行的。我们可以在这个钩子中调用你的自定义 shell 脚本。

#### 创建或编辑 `pre-commit` 文件：
```bash
touch pre-commit
chmod +x pre-commit
```

#### 编辑 `pre-commit` 文件：
用你喜欢的编辑器打开这个文件（例如 `vim`、`nano` 或其他工具），并将以下内容添加到文件中：

```bash
#!/bin/bash

# 调用你的自定义脚本
/path/to/your/script.sh

# 如果需要，可以添加其他命令
# echo "Pre-commit hook executed."

# 如果脚本返回非零状态，commit 将被中止
```

### 3. 编写你的 Shell 脚本
假设你的脚本路径是 `/path/to/your/script.sh`，你可以按以下方式编写：

```bash
#!/bin/bash

echo "Running custom shell script..."
# 在这里添加你的逻辑
# 比如检查文件、格式化代码、运行测试等

# 示例：打印当前目录中的文件
ls -l

# 如果需要中断 commit，可以返回非零状态
# exit 1
```

别忘了给脚本赋予可执行权限：
```bash
chmod +x /path/to/your/script.sh
```

### 4. 测试
完成后，你可以尝试执行一个 `git commit`，看看是否会触发你的脚本。

### 注意事项
1. **Hooks 是本地的**：Git Hooks 不会被推送到远程仓库。如果希望团队成员都能使用相同的 Hook，可以考虑将脚本存储在仓库中，并通过文档或其他方式让团队成员手动安装 Hook。
2. **调试 Hook**：如果 Hook 没有按预期运行，可以检查：
   - Hook 文件是否有可执行权限。
   - Hook 文件是否有正确的路径和逻辑。
   - 使用 `set -x` 调试脚本。
