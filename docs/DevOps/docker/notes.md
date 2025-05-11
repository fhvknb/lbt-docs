---
title: Docker 使用笔记
tags: 
  - Docker
---


## Docker端口映射
```docker
# 　-p port:port  前宿主机　后容器
docker run -d -p 8080:8080 --name mynginx nginx
```
