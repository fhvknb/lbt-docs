---
title: Linux 系统常用指令
tags:
  - Linux
---


```bash

# Terminal写文件内容
echo "[credential]" >> .git/config
echo "  helper = store" >> .git/config

# 环境变量配置
~/.bashrc

# 查看端口使用
ps -ef | grep nginx
ps -aux | grep httpd 
lsof  -i :8070
netstat -tunlp|grep 端口号

# 生成ssh
ssh-keygen -t rsa -C "ben@xxx.com"
cat ~/.ssh/id_rsa.pub
ssh -i [PATH_TO_PRIVATE_KEY] [USERNAME]@[EXTERNAL_IP_ADDRESS]
ssh -i ~/.ssh/id_rsa ubuntu@134.175.33.75

# 复制文件
cp -rf /WorkSpace/fintech-oss-front/build/* /WorkSpace/fintech-oss-front/deploy/front-build/

# 终止程序
Kill -9 pid

# 压缩文件
zip -rqo test.zip .    

# 添加代理环境变量
export ALL_PROXY=socks5://127.0.0.1:7891

#  服务启动
service  xxx start|stop|restart

# 启动服务
systemctl enable xxx

# 查看系统信息
top

# 查看磁盘使用情况
df -h
df -k  #（用于显示磁盘分区上的可使用的磁盘空间）

# 查看linux 发行版本
apt-get && yum

cat /proc/version # （Linux查看当前操作系统版本信息）
uname －a   #（Linux查看版本当前操作系统内核信息）
cat /proc/cpuinfo 
lscpu
cat /etc/os-release #（Linux查看版本当前操作系统发行版信息）

# 查看ubuntu 版本
lsb_release -a
cat /etc/lsb-release

lsblk # （查看磁盘信息 – 列出所有可用块设备的信息，而且还能显示他们之间的依赖关系，但是它不会列出RAM盘的信息）

fdisk -l  # （观察硬盘实体使用情况，也可对硬盘分区）

docker system df 
docker system prune
docker system prune -a
docker volume rm $(docker volume ls -q)
du -h --max-depth=1 

# 上传本地文件到远程服务器
scp -P 端口号  D:/Desktop/xxx.txt root@0.0.0.0:/opt/

# 删除除特殊文件名以外的所有文件
find /path/to/directory ! -name '*.whl' -delete

# update-alternatives 
sudo update-alternatives --install /usr/bin/command command \
 /path/to/new/command 100  # 安装新的备选项，并将其添加到备选项列表中。
sudo update-alternatives --config command  # 设置默认备选项
sudo update-alternatives --display command # 显示备选项信息
sudo update-alternatives --remove command /path/to/command # 从备选项列表中删除指定备选项

# 查看文件中的指定内容
grep 'temporary password' /var/log/mysqld.log

# 修改root密码
passwd

# 查看系统启动服务日志
journalctl -u 你的服务名.service

#　查看网络信息
ifconfig: 显示网络接口信息（较新系统使用 ip addr 替代）。
netstat -tuln: 显示网络端口监听情况。

# 查看主机端口是否开放
telnet 远程主机IP 3306
nc -zv 远程主机IP 3306
 
```