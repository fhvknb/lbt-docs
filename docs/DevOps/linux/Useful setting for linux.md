# Useful setting for linux


## 监控GPU使用情况
```bash
watch -n 1 nvidia-smi

nvidia-smi -l 1
```
---

## 修改服务器主机名(hostname)

### 对于 Ubuntu/Debian 系统

1. **查看当前主机名**：
   ```bash
   hostnamectl
   ```

2. **修改主机名**：
   使用以下命令将主机名更改为你想要的名称（例如，将主机名更改为 `new-hostname`）：
   ```bash
   sudo hostnamectl set-hostname new-hostname
   ```

3. **编辑 `/etc/hosts` 文件**：
   确保在 `/etc/hosts` 文件中更新主机名。使用以下命令打开文件：
   ```bash
   sudo nano /etc/hosts
   ```
   找到类似于以下内容的行，并进行修改：
   ```
   127.0.1.1    old-hostname
   ```
   将其更改为：
   ```
   127.0.1.1    new-hostname
   ```

4. **重启系统（可选）**：
   为了确保所有服务都使用新的主机名，可以重启服务器：
   ```bash
   sudo reboot
   ```

### 对于 CentOS/RHEL 系统

1. **查看当前主机名**：
   ```bash
   hostnamectl
   ```

2. **修改主机名**：
   使用以下命令将主机名更改为你想要的名称（例如，将主机名更改为 `new-hostname`）：
   ```bash
   sudo hostnamectl set-hostname new-hostname
   ```

3. **编辑 `/etc/hosts` 文件**：
   同样，确保在 `/etc/hosts` 文件中更新主机名。使用以下命令打开文件：
   ```bash
   sudo nano /etc/hosts
   ```
   找到类似于以下内容的行，并进行修改：
   ```
   127.0.0.1    old-hostname
   ```
   将其更改为：
   ```
   127.0.0.1    new-hostname
   ```

4. **重启系统（可选）**：
   为了确保所有服务都使用新的主机名，可以重启服务器：
   ```bash
   sudo reboot
   ```

---

## 配置全局代理proxy

要将代理设置写入 `.bashrc` 文件，以便在每次打开终端时自动加载，可以按照以下步骤进行操作。

### 步骤

1. **打开终端**。

2. **编辑 `.bashrc` 文件**：
   使用文本编辑器（如 `nano` 或 `vim`）打开 `.bashrc` 文件。以下是使用 `nano` 的示例：
   ```bash
   nano ~/.bashrc
   ```

3. **添加代理设置**：
   在文件的末尾添加以下行，替换 `your_proxy_address` 和 `your_proxy_port` 为你的代理地址和端口。例如：
   ```bash
   export http_proxy="http://your_proxy_address:your_proxy_port"
   export https_proxy="http://your_proxy_address:your_proxy_port"
   export ftp_proxy="http://your_proxy_address:your_proxy_port"
   export no_proxy="localhost,127.0.0.1,::1"
   ```
   如果你使用的是 SOCKS 代理，可以使用如下格式：
   ```bash
   export all_proxy="socks://your_proxy_address:your_proxy_port"
   ```

4. **保存并退出**：
   如果使用 `nano`，可以按 `CTRL + O` 保存文件，然后按 `CTRL + X` 退出编辑器。如果使用 `vim`，可以按 `Esc`，然后输入 `:wq` 并按 `Enter`。

5. **使更改生效**：
   运行以下命令，使更改立即生效：
   ```bash
   source ~/.bashrc
   ```

### 验证代理设置

可以通过以下命令验证代理设置是否生效：
```bash
echo $http_proxy
echo $https_proxy
```

### 注意事项
- 确保你使用的代理地址和端口是正确的。
- 如果你需要在某些命令中不使用代理，可以在命令前加上 `no_proxy`，例如：
  ```bash
  no_proxy=your_command
  ```

---

## 添加网速监控功能

在 Linux 中，可以使用 `watch` 命令结合其他工具来监控网络的上传和下载速度。以下是几种常用的方法：

### 方法 1: 使用 `ifstat`

`ifstat` 是一个简单的工具，可以实时显示网络接口的流量。首先，你需要安装 `ifstat`：

#### 安装 `ifstat`

- **Debian/Ubuntu**:
  ```bash
  sudo apt-get install ifstat
  ```

- **CentOS/RHEL**:
  ```bash
  sudo yum install ifstat
  ```

#### 使用 `watch` 和 `ifstat`

然后，你可以使用以下命令来监控特定网络接口（例如 `eth0`）的流量：

```bash
watch -n 1 ifstat -i eth0 1
```

- `-n 1`: 每秒刷新一次。
- `-i eth0`: 指定要监控的网络接口。
- `1`: 表示显示每秒的流量。

### 方法 2: 使用 `vnstat`

`vnstat` 是另一个网络流量监控工具，能够长期记录流量并显示实时数据。

#### 安装 `vnstat`

- **Debian/Ubuntu**:
  ```bash
  sudo apt-get install vnstat
  ```

- **CentOS/RHEL**:
  ```bash
  sudo yum install vnstat
  ```

#### 初始化 `vnstat`

在使用之前，需要初始化 `vnstat`：

```bash
sudo vnstat -u -i eth0
```

#### 使用 `watch` 和 `vnstat`

然后可以使用以下命令来监控网络流量：

```bash
watch -n 1 vnstat -i eth0
```

### 方法 3: 使用 `nload`

`nload` 是一个实时监控网络流量的工具。

#### 安装 `nload`

- **Debian/Ubuntu**:
  ```bash
  sudo apt-get install nload
  ```

- **CentOS/RHEL**:
  ```bash
  sudo yum install nload
  ```

#### 使用 `nload`

直接运行 `nload`，并指定要监控的网络接口：

```bash
nload eth0
```

### 方法 4: 使用 `iftop`

`iftop` 是一个显示实时网络流量的工具，类似于 `top` 命令。

#### 安装 `iftop`

- **Debian/Ubuntu**:
  ```bash
  sudo apt-get install iftop
  ```

- **CentOS/RHEL**:
  ```bash
  sudo yum install iftop
  ```

#### 使用 `iftop`

运行以下命令，监控特定接口的流量：

```bash
sudo iftop -i eth0
```