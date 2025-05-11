---
title: Docker 常用命令
tags: 
  - Docker
---



```docker

# 运行一个容器
docker run -it --rm --name mynginx nginx:latest
# 查看容器日志
docker logs mynginx
# 查看容器状态
docker ps -a
# 查看容器内部运行的进程
docker top mynginx
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash
# 查看容器内部的文件系统
docker exec -it mynginx /bin/sh
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash
# 查看容器内部的文件系统
docker exec -it mynginx /bin/sh
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash
# 查看容器内部的文件系统
docker exec -it mynginx /bin/sh
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash
# 查看容器内部的文件系统
docker exec -it mynginx /bin/sh
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash
# 查看容器内部的文件系统
docker exec -it mynginx /bin/sh
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash
# 查看容器内部的文件系统
docker exec -it mynginx /bin/sh
# 查看容器内部的文件系统
docker exec -it mynginx /bin/bash

# 删除多余镜像
docker rmi  imgid
# 删除所有镜像
docker rmi $(docker images -q)
# 删除多余容器
docker rm  containerid
# 删除所有容器
docker rm $(docker ps -a -q)

# 删除所有none镜像
docker rmi $(docker images -q --filter "dangling=true")


```