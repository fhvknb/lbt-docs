# 如何给双网口主机添加桥接网络

> 使用场景：有一个双网口主机A，其中一网口接入AP网口，另一网口连接另一台主机B，此时需要B的IP也能向AP自动获取。

## 操作步骤
### 安装工具：
在操作前，我们需要安装一下管理网桥的命令行工具bridge-utils。

`brctl` 是 Linux 系统中用于管理网桥的命令行工具。它是 `bridge-utils` 软件包的一部分,需要先安装这个软件包才能使用 `brctl` 命令。

以下是在不同的 Linux 发行版上安装 `bridge-utils` 软件包的方法:

1. **Ubuntu/Debian**:
   ```
   sudo apt-get update
   sudo apt-get install bridge-utils
   ```

2. **CentOS/RHEL**:
   ```
   sudo yum install bridge-utils
   ```

3. **Fedora**:
   ```
   sudo dnf install bridge-utils
   ```

4. **Arch Linux**:
   ```
   sudo pacman -S bridge-utils
   ```
5. **SUSE/openSUSE**:
   ```
   sudo zypper install bridge-utils
   ```

安装完成后,您就可以使用 `brctl` 命令来管理网桥了。一些常用的 `brctl` 命令包括:

- `brctl show`: 显示当前系统上配置的所有网桥。
- `brctl addbr <bridge>`: 创建一个新的网桥。
- `brctl delbr <bridge>`: 删除一个网桥。
- `brctl addif <bridge> <interface>`: 将一个网络接口添加到指定的网桥。
- `brctl delif <bridge> <interface>`: 从指定的网桥中删除一个网络接口。
- `brctl stp <bridge> {on|off}`: 启用或禁用网桥的生成树协议 (STP)。

使用 `brctl` 命令可以帮助您更好地管理和配置 Linux 系统上的网桥,从而实现更复杂的网络拓扑和功能。

### 在机器A上的操作：

1. **创建网络桥接**：创建一个网络桥接接口（比如br0），并将eth0和eth1添加到这个网络桥接口中：
   ```bash
   # 这里的eth0, eth1 为样例，具体操作时要根据实际网口名称
   sudo brctl addbr br0
   sudo brctl addif br0 eth0
   sudo brctl addif br0 eth1
   ```
 

2. **配置网络接口**：将eth0和eth1配置为不再使用DHCP，而是将br0配置为DHCP客户端，以便从AP的DHCP服务器获取IP地址：
    
    编辑`/etc/network/interfaces`文件，将以下配置添加到文件末尾：
     ```
     auto br0
     iface br0 inet dhcp
     bridge_ports eth0 eth1
     ```

1. **启用IP转发**：启用IP转发功能，以便实现数据包在不同网口之间的转发：
   ```
   sudo sysctl -w net.ipv4.ip_forward=1
   ```

2. **重启网络服务**：重启网络服务以应用新的网络配置：
   ```
   sudo systemctl restart networking
   ```

### 在机器B上的操作：
1. **配置网络接口**：将机器B的网口配置为DHCP客户端，以便从AP的DHCP服务器获取IP地址。

通过以上操作，就实现机器A作为一个网络桥接设备，连接机器B和AP，并使它们共享同一个IP地址池，从AP的DHCP服务器获取IP地址。请确保网络配置正确，并根据实际情况调整配置。

## 问题指南

正常情况下，进行如上配置后，主机B可以正常从AP获取IP，但在有些机器上可能会出现一些小问题，这些小问题可能是主机A上之前的旧的网络规则配置产生干扰，如果发现在重启主机A,B后，主机B不能正常获得IP，可以进行如何尝试
```
# 清空 iptables 防火墙的所有规则
iptables -F 
```
