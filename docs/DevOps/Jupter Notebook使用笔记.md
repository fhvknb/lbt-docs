

在服务器上运行 Jupyter Notebook 并映射到 `0.0.0.0` 以便通过外部网络访问，可以按照以下步骤操作：

---

### **步骤 1：安装 Jupyter Notebook**
如果尚未安装 Jupyter Notebook，可以通过以下命令安装：
```bash
pip install notebook
```

---

### **步骤 2：启动 Jupyter Notebook 并监听 `0.0.0.0`**
使用以下命令启动 Jupyter Notebook：

```bash
jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser
```

- `--ip=0.0.0.0`：将 Jupyter Notebook 绑定到所有网络接口。
- `--port=8888`：指定端口号（可以更改为其他端口）。
- `--no-browser`：阻止自动打开浏览器（通常服务器上无法打开浏览器）。

---

### **步骤 3：配置 Jupyter Notebook**
如果需要更高级的配置，可以生成 Jupyter 配置文件并进行修改。

#### **生成配置文件**
运行以下命令生成配置文件：
```bash
jupyter notebook --generate-config
```
配置文件通常位于 `~/.jupyter/jupyter_notebook_config.py`。

#### **修改配置文件**
打开配置文件，找到以下选项并进行修改：

```python
# 监听所有 IP 地址
c.NotebookApp.ip = '0.0.0.0'

# 指定端口号
c.NotebookApp.port = 8888

# 禁用自动打开浏览器
c.NotebookApp.open_browser = False

# 如果需要设置访问密码，可以启用以下选项
# c.NotebookApp.password = 'sha1:your_password_hash'
```

---

### **步骤 4：防火墙配置**
确保服务器上的防火墙允许外部访问指定的端口（如 8888）。以下是一些常见的防火墙配置示例：

#### **使用 `ufw`**
```bash
sudo ufw allow 8888
```

#### **使用 `iptables`**
```bash
sudo iptables -A INPUT -p tcp --dport 8888 -j ACCEPT
```

---

### **步骤 5：通过外部访问**
完成以上步骤后，可以通过以下方式访问 Jupyter Notebook：

```plaintext
http://<服务器IP>:8888
```

如果设置了密码或 token，访问时需要进行验证。

---

### **注意事项**
1. **安全性**：
   - 直接暴露 Jupyter Notebook 到外网可能存在安全风险，建议设置密码或使用 HTTPS。
   - 可以通过 SSH 隧道访问 Jupyter Notebook，而不是直接暴露端口。

2. **设置访问密码**：  
```python
c.NotebookApp.password = 'sha1:your_hashed_password'
```

3. **使用 HTTPS**：
   配置 SSL 证书以启用 HTTPS，参考配置文件中的 `c.NotebookApp.certfile` 和 `c.NotebookApp.keyfile`。

---

完成以上配置后，你的 Jupyter Notebook 应该可以通过外部网络访问。


在 Jupyter Notebook 中添加密码和启用 HTTPS 是保护服务器安全的重要步骤。以下是详细的配置方法：

---

### **1. 配置密码**

#### **步骤 1.1：生成密码哈希**
Jupyter Notebook 不直接存储明文密码，而是存储加密的哈希值。你可以通过以下方式生成密码哈希：

1. 进入 Python 交互环境：
   ```bash
   python
   ```

2. 运行以下代码生成哈希值：
   ```python
   from notebook.auth import passwd
   passwd()
   ```
Ps: *From Jupyter Notebook 7, use the jupyter_server.auth module instead of notebook.auth*

```shell
$ jupyter server password
Enter password:  ****
Verify password: ****
[JupyterPasswordApp] Wrote hashed password to /Users/you/.jupyter/jupyter_server_config.json

```

3. 输入你想要设置的密码，系统会输出一个类似如下的哈希值：
   ```
   Enter password: ******
   Verify password: ******
   'sha1:your_hashed_password'
   ```

4. 复制生成的哈希值（包括 `sha1:` 部分）。

#### **步骤 1.2：修改配置文件**
打开 Jupyter Notebook 的配置文件（通常位于 `~/.jupyter/jupyter_notebook_config.py`）。如果没有配置文件，可以通过以下命令生成：
```bash
jupyter notebook --generate-config
```

在配置文件中找到（或添加）以下行，将 `your_hashed_password` 替换为生成的哈希值：
```python
c.NotebookApp.password = 'sha1:your_hashed_password'
```

---

### **2. 启用 HTTPS**

#### **步骤 2.1：生成 SSL 证书**
为了启用 HTTPS，需要生成一个 SSL 证书。你可以使用 `openssl` 工具生成自签名证书（适用于测试环境）。

运行以下命令生成证书和私钥：
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout mykey.key -out mycert.pem
```

- `mykey.key`：生成的私钥文件。
- `mycert.pem`：生成的证书文件。

在执行命令时，系统会提示你输入一些信息（如国家、组织等）。你可以随意填写，或者直接按回车跳过。

#### **步骤 2.2：修改配置文件**
在 Jupyter Notebook 的配置文件中，添加以下内容：
```python
c.NotebookApp.certfile = '/path/to/mycert.pem'  # 替换为证书路径
c.NotebookApp.keyfile = '/path/to/mykey.key'    # 替换为私钥路径
```

---

### **3. 启动 Jupyter Notebook**

完成配置后，启动 Jupyter Notebook：
```bash
jupyter notebook --ip=0.0.0.0 --port=8888 --no-browser
```

现在，Jupyter Notebook 将要求输入密码，并通过 HTTPS 提供服务。

---

### **4. 访问 Jupyter Notebook**

访问地址：
```plaintext
https://<服务器IP>:8888
```

由于使用的是自签名证书，浏览器可能会提示“连接不安全”或“证书无效”。你可以手动信任证书以继续访问。

---

### **5. 注意事项**

1. **推荐使用正式证书**：
   - 在生产环境中，建议使用可信的 SSL 证书（如 Let’s Encrypt 提供的免费证书）代替自签名证书。

2. **防火墙配置**：
   确保端口（如 8888）在服务器的防火墙中是开放的。

3. **额外的安全性**：
   - 使用 SSH 隧道访问 Jupyter Notebook，而不是直接暴露端口。
   - 配置 VPN 以限制外部访问。

通过以上步骤，你的 Jupyter Notebook 将更加安全，支持密码验证和 HTTPS 加密访问。


## 给Jupyter开启代码提示功能

### 1. 基础配置：开启原生补全

Jupyter Lab 自带基础的 Tab 键补全功能，如果按 Tab 没反应，请检查设置：  
点击顶部菜单栏的 Settings -> Settings Editor。  
在左侧列表中找到 Code Completion。   
勾选 "Enable autocompletion"（启用自动补全）和 "Continuous hinting"（输入时实时提示）。    
勾选 "Show the documentation panel".

勾选 "Language Servers (Experimental)"


### 2. 安装插件
```shell
pip install jupyterlab-lsp
# 或者使用 conda
conda install -c conda-forge jupyterlab-lsp

pip install "python-lsp-server[all]"
```

