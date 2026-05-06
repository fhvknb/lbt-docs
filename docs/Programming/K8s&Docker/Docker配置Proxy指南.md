# Docker 代理配置指南

## 一、Linux 系统代理配置步骤

### 1. 创建代理配置文件
在指定路径创建系统级配置文件：
```bash
sudo mkdir -p /etc/systemd/system/docker.service.d/
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf
```

配置文件内容示例（需替换实际代理地址）：
```ini
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:8080/"
Environment="HTTPS_PROXY=http://proxy.example.com:8080/"
Environment="NO_PROXY=localhost,127.0.0.1"
```

### 2. 重载系统配置
应用新的服务配置：
```bash
sudo systemctl daemon-reload
```

### 3. 重启 Docker 服务
使配置生效：
```bash
sudo systemctl restart docker
```

### 4. 验证配置有效性
测试网络连通性：
```bash
docker pull ubuntu
```

## 二、关键注意事项

1. **代理服务器参数**
   - 必须确保代理地址（proxy.example.com）和端口（8080）准确有效
   - 支持身份验证的代理需使用 `http://user:password@proxy:port` 格式

2. **白名单设置**
   - `NO_PROXY` 应包含以下内容：
     ```text
     本地地址：localhost, 127.0.0.1
     内网域名：*.internal.example.com
     容器网络：172.16.0.0/12
     ```

3. **服务级配置**
   - 通过 systemd 环境变量配置属于全局设置
   - 会影响所有 Docker 容器和守护进程的网络访问

4. **多环境适配**
   - 该方法适用于 CentOS/RHEL、Ubuntu/Debian 等主流发行版
   - 针对非 systemd 系统需使用其他配置方式

## 三、配置验证方法

### 查看生效配置
```bash
systemctl show docker --property Environment
```

### 容器网络测试
```bash
docker run --rm alpine ping -c 4 google.com
```

### 代理日志检查
建议同时查看代理服务器的访问日志，确认 Docker 请求是否正常通过代理。