
在安卓设备上安装 **Termux** 后，可以通过配置 SSH 服务来让电脑通过 SSH 连接到安卓设备。以下是详细步骤：

---

### **步骤 1：在 Termux 上安装 OpenSSH**
1. 打开 Termux，输入以下命令安装 OpenSSH：
   ```bash
   pkg update && pkg upgrade
   pkg install openssh
   ```

2. 安装完成后，确认 SSH 是否可以正常工作：
   ```bash
   sshd
   ```
   如果没有报错，说明 SSH 服务已经启动。

---

### **步骤 2：设置 SSH 服务**
1. **查看安卓设备的 IP 地址**  
   在 Termux 中运行以下命令：
   ```bash
   ifconfig
   ```
   或者：
   ```bash
   ip addr show
   ```
   找到类似 `wlan0` 的接口，记录其 `inet` 后的 IP 地址，例如 `192.168.1.100`。

2. **设置 SSH 服务的端口（可选）**  
   默认情况下，Termux 的 SSH 服务运行在端口 `8022`。如果需要更改端口，可以编辑 `sshd_config` 文件：
   ```bash
   nano ~/.ssh/sshd_config
   ```
   添加或修改以下内容：
   ```
   Port 8022
   ```
   保存后重新启动 SSH 服务：
   ```bash
   pkill sshd
   sshd
   ```

---

### **步骤 3：设置登录用户和密码**
1. 设置密码：
   ```bash
   passwd
   ```
   输入并确认密码。

2. 确保 SSH 服务允许密码登录。编辑 `sshd_config` 文件：
   ```bash
   nano ~/.ssh/sshd_config
   ```
   确保以下内容存在且未被注释（如果没有，则添加）：
   ```
   PasswordAuthentication yes
   PermitRootLogin yes
   ```
   保存后重新启动 SSH 服务：
   ```bash
   pkill sshd
   sshd
   ```

---

### **步骤 4：在电脑上通过 SSH 连接到安卓设备**
1. 打开电脑的终端（Linux/Mac）或使用 SSH 客户端（如 Windows 上的 PuTTY）。
2. 使用以下命令连接到安卓设备：
   ```bash
   ssh 用户名@安卓设备IP地址 -p 8022
   ```
   示例：
   ```bash
   ssh root@192.168.1.100 -p 8022
   ```
3. 输入之前设置的密码，即可成功连接。

---

### **额外提示**
- **自动启动 SSH 服务**  
  如果希望 Termux 在启动时自动启动 SSH 服务，可以在 `~/.bashrc` 文件中添加以下内容：
  ```bash
  sshd
  ```

- **使用公钥认证（更安全）**  
  如果不想每次输入密码，可以设置 SSH 公钥认证：
  1. 在电脑上生成 SSH 密钥对：
     ```bash
     ssh-keygen
     ```
  2. 将公钥复制到安卓设备：
     ```bash
     ssh-copy-id -p 8022 用户名@安卓设备IP地址
     ```
  3. 之后即可通过公钥认证登录，无需输入密码。

---

完成上述步骤后，您就可以通过电脑 SSH 连接到安卓设备上的 Termux。


