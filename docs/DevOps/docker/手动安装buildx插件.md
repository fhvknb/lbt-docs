
# 手动安装 Docker Buildx
```bash
# 创建 CLI 插件目录
mkdir -p ~/.docker/cli-plugins

# 下载最新版本的 buildx
BUILDX_VERSION=v0.23.0 # 最新稳定版本，截至2025年5月
curl -L "https://github.com/docker/buildx/releases/download/${BUILDX_VERSION}/buildx-${BUILDX_VERSION}.linux-amd64" -o ~/.docker/cli-plugins/docker-buildx

# 添加执行权限
chmod +x ~/.docker/cli-plugins/docker-buildx

# 验证安装
docker buildx version

# 安装完成后，初始化 buildx

# 创建新的构建器实例
docker buildx create --name mybuilder

# 使用新创建的构建器
docker buildx use mybuilder

# 查看可用的构建器
docker buildx ls
```

