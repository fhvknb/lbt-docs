---
# sidebar_position: 1
---

# scp

scp命令来自英文单词“secure copy”，也可以理解为“超级复制”，它可以用在客户端需要远程拷贝其它远程服务器上的数据和文件时使用。其它主要参数是远程主机文件地址（server_addr）和本地主机文件地址(local_addr)。

scp命令在执行的时候会通过ssh验证进行连接，ssh默认端口号是22。

如果远程主机ssh的端口号不是22,那就需要手动指定端口号`-P 2314`，来进行ssh验证连接。

常用命令如下：

```bash
# 本地文件上传到远程主机
scp -r local_addr user@host_ip:server_addr

# 远程主机文件下载到本地主机
scp  -P 2314 -r user@host_ip:server_addr local_addr
```

## -P 参数

`-P  2314` 指定ssh主机端口号

## -r 参数

`-r` 拷贝整个目录

## -v 参数

`-v` 拷贝文件时，显示提示信息

## -q 参数

`-q` 执行文件拷贝时，不显示任何提示消息

## -i 参数

`-i /cert_path/cert.pem` 从指定文件中读取传输文件的密钥

## -p 参数

`-p` 拷贝文件的时候保留源文件建立的时间
  