---
slug: snell-deploy
title: 部署snell-server
authors: shaun
tags: [vps, linux]
date: 2024-04-25 22:18:46
---
***

## Snell简介

Snell 是 Surge 团队开发，仅适用于 Surge 用户的精简加密代理协议，以下是一些亮点：

<!-- truncate -->

- 极致的性能；
- 支持 UDP over TCP 转发；
- 具有零依赖关系的单一二进制文件 (除了 glibc)；
- 一个帮助入门的向导；
- 如果遇到远程错误，代理服务器将向客户端报告。客户端可以针对不同的场景选择对策；

## 版本介绍

***Snell v2***

提供了完整的 TCP 全状态机支持的 multiplex 支持，以提高性能和减少延迟。

***Snell v3***

在实际使用中，由于大多数网站和程序均已使用 HTTP/2 协议，自带了 multiplex 支持，所以并不会产生很多的底层 TCP 连接，代理层再支持 multiplex 的优化意义不大。

考虑到 multiplex 的支持会导致额外的问题，如单 TCP 连接被限速，更加复杂繁琐的连接错误检查和纠错等。所以在 Snell v3 中已经取消了 multiplex 支持；

***Snell v4***

新增客户端参数`reuse=true`，可选开启 v2 版本的连接复用机制。连接复用机制可以避免后续请求的连接建立开销，但是在出现网络异常或其他问题时，可能会需要更长的时间才能检查到错误并重建连接，优劣参半，建议对于延迟较高的服务器开启。该功能不需要在服务端额外使用参数开启。

取消支持 TLS 流量混淆 (`obfs=tls`) 功能；服务器端程序已不能够与客户端自动协商密码和版本，客户端需手动配置`version=4`；

## MacOS

如果你正在使用 Surge Mac 并想以此部署 Snell Server 是非常简单的，只要在 Surge 的配置文件中加入以下字段：

```sh
[Snell Server]
interface = 0.0.0.0
port = 6160
psk = RANDOM_KEY_HERE
obfs = off
```
:::info
```sh
interface：监听地址
port：端口
psk：密钥
obfs：off 为关闭混淆，或使用http流量混淆
```
:::

## Linux

在 [Surge 官网](https://manual.nssurge.com/others/snell.html)根据你的服务器获取独立服务端二进制文件.

如果想要以往的历史版本，可以前往[历史备份](https://github.com/fhvknb/Snell-oldbak)进行获取。

下面以`linux-amd64`系统为示例

1. 环境安装，下载安装 `snell`
```sh
# 如果系统没有预装可能需要先下载安装 wget 及 unzip
# APT
sudo apt update && sudo apt install wget unzip
# DNF
sudo dnf install unzip

# 下载 Snell Server
wget https://dl.nssurge.com/snell/snell-server-v4.0.1-linux-amd64.zip

# 解压 Snell Server 到指定目录
sudo unzip snell-server-v4.0.1-linux-amd64.zip -d /usr/local/bin
```
2. 生成 `snell` 配置文件

```basheee
# 可以使用 Snell 的 wizard 生成一个配置文件
sudo snell-server --wizard -c /etc/snell-server.conf
```

3. 修改 `snell` 配置文件

```sh
sudo vi /etc/snell-server.conf

#　根据需要修改以下内容　
[snell-server]
listen = 0.0.0.0:11807
psk = AijHCeos15IvqDZTb1cJMX5GcgZzIVE
ipv6 = false
obfs = off
```

4. 配置systemd服务文件
```sh
sudo vim /lib/systemd/system/snell.service

# 添加以下内容
[Unit]
Description=Snell Proxy Service
After=network.target

[Service]
Type=simple
User=nobody
Group=nobody
LimitNOFILE=32768
ExecStart=/usr/local/bin/snell-server -c /etc/snell-server.conf

[Install]
WantedBy=multi-user.target
```

5. 使用systemctl启动服务

```sh
# 重载服务
sudo systemctl daemon-reload

# 开机运行 Snell
sudo systemctl enable snell

# 开启 Snell
sudo systemctl start snell

# 关闭 Snell
sudo systemctl stop snell

## 查看 Snell 状态
sudo systemctl status snell
```

:::warning
对于 Snell v3 可以尝试增加内核缓冲区大小可以显著提高 UDP 性能

```sh
sudo sysctl -w net.core.rmem_max=26214400
sudo sysctl -w net.core.rmem_default=26214400
```

:::