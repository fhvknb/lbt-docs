以下是 Jupyter Notebook 的常用使用指南，包括安装、基本操作、快捷键、魔法命令等内容，帮助你快速上手并高效使用 Jupyter。

---

## **1. 安装与启动**

### **1.1 安装 Jupyter Notebook**
使用 `pip` 安装 Jupyter Notebook：
```bash
pip install notebook
```

如果需要支持更多科学计算库，可以使用 Anaconda 安装：
```bash
conda install notebook
```

### **1.2 启动 Jupyter Notebook**
在终端或命令行输入以下命令启动：
```bash
jupyter notebook
```

- 默认会在浏览器中打开 Jupyter Notebook 的主页。
- 如果未自动打开，可以手动在浏览器中访问地址：
  ```
  http://localhost:8888
  ```

#### **指定 IP 和端口**
如果需要指定监听的 IP 和端口：
```bash
jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser
```

---

## **2. 基本操作**

### **2.1 Notebook 界面**
- **文件管理**：在主页中，可以创建文件夹、上传文件或新建 Notebook。
- **Kernel**：每个 Notebook 都有一个内核（Kernel），用于运行代码。
  - **重启 Kernel**：点击菜单栏 `Kernel > Restart`。
  - **中断运行**：点击菜单栏 `Kernel > Interrupt`。

### **2.2 单元类型**
Jupyter Notebook 的单元分为三种类型：
1. **Code**（代码单元）：运行 Python 代码。
2. **Markdown**（文本单元）：支持 Markdown 格式，用于编写文档。
3. **Raw**（原始单元）：保存原始格式内容，不会被解释运行。

#### **切换单元类型**
- 使用工具栏的下拉菜单切换单元类型。
- 快捷键：
  - `Y`：切换为代码单元。
  - `M`：切换为 Markdown 单元。

### **2.3 运行单元**
- 点击单元左侧的 **运行按钮** 或按快捷键 `Shift + Enter` 运行单元。
- 运行结果会显示在单元下方。

---

## **3. 快捷键**

Jupyter Notebook 提供了丰富的快捷键，分为两种模式：

### **3.1 命令模式**
按 `Esc` 进入命令模式，以下是常用快捷键：
| 快捷键        | 功能                           |
|---------------|--------------------------------|
| `Enter`       | 进入编辑模式                   |
| `Shift + Enter`| 运行当前单元并跳转到下一个单元 |
| `A`           | 在当前单元上方插入新单元       |
| `B`           | 在当前单元下方插入新单元       |
| `X`           | 剪切当前单元                   |
| `C`           | 复制当前单元                   |
| `V`           | 粘贴单元                       |
| `D, D`        | 删除当前单元                   |
| `Z`           | 撤销删除单元                   |
| `M`           | 将单元类型切换为 Markdown 单元 |
| `Y`           | 将单元类型切换为代码单元       |
| `H`           | 显示所有快捷键                 |

### **3.2 编辑模式**
按 `Enter` 进入编辑模式，以下是常用快捷键：
| 快捷键        | 功能                           |
|---------------|--------------------------------|
| `Ctrl + Enter`| 运行当前单元                   |
| `Tab`         | 自动补全代码                   |
| `Shift + Tab` | 查看函数/方法的文档            |

---

## **4. 常用魔法命令**

Jupyter Notebook 提供了一些特殊的 **魔法命令**，可以提高效率。魔法命令分为两类：**行魔法（%）** 和 **单元魔法（%%）**。

### **4.1 常用行魔法**
| 命令                  | 功能                                   |
|-----------------------|----------------------------------------|
| `%time`               | 测量单行代码的执行时间                 |
| `%timeit`             | 多次运行代码并返回平均执行时间         |
| `%pwd`                | 显示当前工作目录                       |
| `%ls`                 | 列出当前目录中的文件                   |
| `%cd <路径>`          | 切换工作目录                           |
| `%who`                | 列出当前内存中的所有变量               |
| `%reset`              | 清空当前命名空间中的所有变量           |
| `%matplotlib inline`  | 在 Notebook 中直接显示 Matplotlib 图表 |

### **4.2 常用单元魔法**
| 命令                  | 功能                                   |
|-----------------------|----------------------------------------|
| `%%time`              | 测量整个单元的执行时间                 |
| `%%writefile <文件名>`| 将单元内容写入指定文件                 |
| `%%capture`           | 捕获单元的输出并保存到变量             |
| `%%bash`              | 在单元中运行 Bash 命令                 |

---

## **5. 扩展功能**

### **5.1 安装 Jupyter Notebook 扩展**
Jupyter 提供了许多扩展功能，可以增强 Notebook 的使用体验。例如，代码折叠、表格预览等。

1. 安装扩展工具：
   ```bash
   pip install jupyter_contrib_nbextensions
   jupyter contrib nbextension install --user
   ```

2. 启用扩展：
   ```bash
   jupyter nbextension enable <扩展名称>
   ```

3. 启动 Notebook 后，进入扩展管理界面，选择需要的扩展功能。

---

## **6. 数据可视化**

Jupyter Notebook 支持多种数据可视化工具，如 Matplotlib、Seaborn 和 Plotly。

### **6.1 Matplotlib**
在 Notebook 中绘图时，使用 `%matplotlib inline` 命令可以直接显示图表：
```python
import matplotlib.pyplot as plt

%matplotlib inline
plt.plot([1, 2, 3, 4], [1, 4, 9, 16])
plt.show()
```

### **6.2 Seaborn**
Seaborn 是一个高级数据可视化库，基于 Matplotlib：
```python
import seaborn as sns
import matplotlib.pyplot as plt

%matplotlib inline
sns.set(style="darkgrid")
tips = sns.load_dataset("tips")
sns.scatterplot(x="total_bill", y="tip", data=tips)
plt.show()
```

---

## **7. 常见问题及解决方法**

### **7.1 无法启动 Jupyter Notebook**
- 检查是否安装了 Jupyter：
  ```bash
  pip show notebook
  ```
- 如果缺少依赖，可以重新安装：
  ```bash
  pip install --upgrade notebook
  ```

### **7.2 无法访问 Notebook**
- 检查是否绑定了正确的 IP 和端口：
  ```bash
  jupyter notebook --ip=0.0.0.0 --port=8888
  ```
- 如果使用远程访问，确保防火墙允许端口访问。

### **7.3 修改默认工作目录**
编辑配置文件 `~/.jupyter/jupyter_notebook_config.py`，找到以下行并修改为你的工作目录：
```python
c.NotebookApp.notebook_dir = '/your/path'
```

---

通过以上指南，你可以快速上手 Jupyter Notebook 并高效完成数据分析和可视化任务！如果有其他问题，随时可以向我提问！



在 Jupyter Notebook 的代码单元中，可以通过多种方式执行系统命令。以下是常用的方法：

---

## **1. 使用 `!` 执行系统命令**
在 Jupyter Notebook 中，使用 `!` 前缀可以直接运行系统命令。例如：

```python
!ls  # 列出当前目录中的文件
!pwd # 显示当前工作目录
!echo "Hello, World!" # 输出文本
```

- **特点**：
  - 适合运行简单的系统命令。
  - 输出会直接显示在 Notebook 中。

---

## **2. 使用 `subprocess` 模块**
Python 的 `subprocess` 模块提供了更灵活的方法来执行系统命令，并捕获输出。

### **2.1 使用 `subprocess.run`**
```python
import subprocess

result = subprocess.run(['ls', '-l'], capture_output=True, text=True)
print(result.stdout)  # 输出命令结果
```

- **参数说明**：
  - `['ls', '-l']`：命令及其参数。
  - `capture_output=True`：捕获命令的输出。
  - `text=True`：将输出作为字符串返回。

### **2.2 使用 `subprocess.Popen`**
如果需要实时获取命令输出，可以使用 `subprocess.Popen`：
```python
import subprocess

process = subprocess.Popen(['ping', '-c', '4', 'google.com'], stdout=subprocess.PIPE, text=True)
for line in process.stdout:
    print(line.strip())  # 实时输出命令结果
```

---

## **3. 使用 `os.system`**
`os.system` 可以直接运行系统命令，但无法捕获输出。

```python
import os

os.system('ls -l')  # 直接执行命令
```

- **特点**：
  - 简单直接，但无法获取命令结果。
  - 不推荐用于复杂场景。

---

## **4. 使用魔法命令 `%%bash`**
在 Jupyter Notebook 中，可以使用 `%%bash` 单元魔法运行 Bash 命令。

```bash
%%bash
echo "Hello, Jupyter!"
ls -l
```

- **特点**：
  - 支持运行多行 Bash 命令。
  - 适合在 Notebook 中使用。

---

## **5. 捕获命令输出到变量**
如果希望保存命令的输出到 Python 变量，可以结合 `!` 或 `subprocess`：

### **5.1 使用 `!` 捕获输出**
```python
output = !ls
print(output)  # 输出是一个列表，每行是一个元素
```

### **5.2 使用 `subprocess` 捕获输出**
```python
import subprocess

result = subprocess.run(['ls'], capture_output=True, text=True)
output = result.stdout
print(output)  # 输出是完整的字符串
```

---

## **6. 示例：执行系统命令并处理结果**
以下是一个综合示例，展示如何执行命令并处理结果：

```python
import subprocess

# 执行命令
result = subprocess.run(['ls'], capture_output=True, text=True)

# 检查是否成功
if result.returncode == 0:
    print("Command executed successfully!")
    print("Output:")
    print(result.stdout)
else:
    print("Command failed!")
    print("Error:")
    print(result.stderr)
```

---

## **7. 注意事项**
1. **权限问题**：
   - 某些命令可能需要管理员权限（如 `sudo`）。在 Jupyter Notebook 中运行 `sudo` 命令时需要注意安全性。

2. **安全性**：
   - 避免直接运行用户输入的命令，防止命令注入攻击。

3. **兼容性**：
   - 系统命令可能因操作系统不同而有所变化（如 `ls` 在 Linux/Mac 上可用，但在 Windows 上使用 `dir`）。

---

通过以上方法，你可以轻松在代码中执行系统命令，并根据需求捕获输出或处理结果。如果有其他问题，欢迎随时提问！