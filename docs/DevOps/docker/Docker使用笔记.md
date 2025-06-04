---
title: Docker 使用笔记
tags: 
  - Docker
---


## Docker端口映射
```bash
# 　-p port:port  前宿主机　后容器
docker run -d -p 8080:8080 --name mynginx nginx

```

## alpine镜像特性

```bash
# 安装包
apk add --update --no-cache nginx
# 删除包
apk del nginx
# 查看包
apk info nginx

# 安装 node-gyp 依赖
RUN apk add --no-cache python3 make g++ 

# 安装 Sharp 图像处理依赖
RUN apk add --no-cache vips-dev fftw-dev

# 安装 Canvas 依赖
RUN apk add --no-cache \
    build-base \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

# 安装常用开发工具
RUN apk add --no-cache \
    git \
    curl \
    bash \
    openssh-client \
    ca-certificates

# 在node-alpine中安装python
apk add --no-cache python3 make g++ \
    && ln -sf python3 /usr/bin/python

# 在node-alpine设置时区
RUN apk add --no-cache tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone && \
    apk del tzdata

# 添加语言支持
RUN apk add --no-cache icu-libs
ENV NODE_ICU_DATA=/node_modules/full-icu

# 安装完整的国际化支持
RUN npm install -g full-icu
```

## docker清理脚本

```bash
#!/bin/bash
# 清理所有悬空镜像
echo "Removing dangling images..."
docker image prune -f

# 清理悬空卷
echo "Removing dangling volumes..."
docker volume prune -f

# 清理未使用的网络
echo "Removing unused networks..."
docker network prune -f

# 显示清理后的状态
echo "Current Docker disk usage:"
docker system df

```

## docker 镜像的导出导入

```bash
# docker save -o <保存路径> <镜像名>:<标签>

docker save -o my-image.tar my-image:latest

# docker load -i <导入文件路径>

docker load -i my-image.tar


```