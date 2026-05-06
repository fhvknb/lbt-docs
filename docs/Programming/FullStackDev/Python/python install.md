# Python 安装及指定python命令版本

```shell

# 先update一下
sudo apt-get update
sudo apt-get install software-properties-common python-software-properties -y 


sudo add-apt-repository ppa:jonathonf/python-3.6 -y

sudo apt-get update
sudo apt-get install python3.6 -y 

#没有curl的话，就install一下
sudo apt-get install curl -y 

# 安装pip
curl https://bootstrap.pypa.io/pip/3.6/get-pip.py -o get-pip.py
python get-pip.py
# curl https://bootstrap.pypa.io/get-pip.py | sudo -H python3.6
apt-get install python3-pip
```

使用`ls /usr/local/lib/` 查看本机上有哪些可用Python版本

```shell
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.6 1
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.8 2

# update-alternatives是ubuntu系统中专门维护系统命令链接符的工具，通过它可以很方便的设置系统默认使用哪个命令、哪个软件版本
# 上面三行指令最后的数字 1 2 3 分别代表优先级。1是最高。所以等下 config的时候，会发现默认版本是2.7（因为它的优先级设为了1）.
```

使用`sudo update-alternatives --config python` 查看本机上有哪些可用Python版本， 进行选择切换