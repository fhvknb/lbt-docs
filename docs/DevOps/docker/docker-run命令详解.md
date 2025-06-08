---
title: docker-run命令详解
---

# Docker `run -e` 命令详解

`docker run -e` 命令用于在启动容器时设置环境变量。这是一个非常有用的功能，可以让您在不修改镜像的情况下，为容器配置不同的运行环境。

## 基本语法

```bash
docker run -e KEY=value ... 镜像名
```

或

```bash
docker run -e KEY ... 镜像名
```

## 用法示例

### 1. 设置单个环境变量

```bash
# 设置一个环境变量
docker run -e DEBUG=true nginx

# 设置多个环境变量
docker run -e DEBUG=true -e APP_ENV=production nginx
```

### 2. 从宿主机继承环境变量

```bash
# 假设宿主机上有环境变量 API_KEY
docker run -e API_KEY nginx
```

这会将宿主机上的 `API_KEY` 环境变量传递给容器，保持相同的值。

### 3. 从文件读取环境变量

```bash
# 从文件读取环境变量
docker run --env-file=./env.list nginx
```

其中 `env.list` 文件格式为：

```
# 注释行
KEY1=value1
KEY2=value2
```

### 4. 实际应用场景

#### 数据库配置

```bash
# 配置 MySQL 容器
docker run -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=myapp mysql:8.0
```

#### Web 应用配置

```bash
# 配置 Node.js 应用
docker run -e NODE_ENV=production -e PORT=3000 -e DB_HOST=mysql my-node-app
```

#### API 密钥和敏感信息

```bash
# 传递 API 密钥
docker run -e AWS_ACCESS_KEY_ID=AKIAIOSFODNN7EXAMPLE -e AWS_SECRET_ACCESS_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY my-aws-app
```

## 高级用法

### 1. 在 Docker Compose 中使用环境变量

```yaml
# docker-compose.yml
version: '3'
services:
  webapp:
    image: my-webapp
    environment:
      - DEBUG=true
      - API_URL=http://api:8000
      - NODE_ENV=production
```

或使用环境变量文件：

```yaml
# docker-compose.yml
version: '3'
services:
  webapp:
    image: my-webapp
    env_file:
      - ./common.env
      - ./app.env
```

### 2. 与 Kubernetes 配置对比

在 Kubernetes 中，环境变量可以通过 Pod 规范设置：

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: my-app
spec:
  containers:
  - name: my-app
    image: my-app:1.0
    env:
    - name: DEBUG
      value: "true"
    - name: API_URL
      value: "http://api-service:8000"
```

### 3. 查看容器环境变量

启动容器后，您可以查看设置的环境变量：

```bash
# 查看所有环境变量
docker exec my-container env

# 查看特定环境变量
docker exec my-container printenv NODE_ENV
```

## 最佳实践

1. **敏感信息处理**：
   - 避免在 Dockerfile 中硬编码敏感环境变量
   - 使用 `-e` 或 `--env-file` 在运行时传递敏感信息
   - 考虑使用 Docker Secrets 或其他密钥管理工具

2. **默认值设置**：
   在 Dockerfile 中可以设置默认值，运行时可覆盖：
   ```dockerfile
   ENV NODE_ENV=development
   ```

3. **环境变量命名**：
   - 使用大写字母和下划线
   - 使用有意义的前缀分组相关变量

4. **文档化**：
   - 记录应用程序需要的所有环境变量
   - 提供示例值和说明
