# 彻底清除安装的Python版本

```shell

# 查看已安装版本
ls /usr/local/lib/python*

apt remove python3.6

rm /usr/bin/python*
# 清理残留文件
apt purge python3.6

# 删除未使用依赖
apt autoremove

rm -rf  /usr/local/lib/python*
# 清除缓存
apt clean

```