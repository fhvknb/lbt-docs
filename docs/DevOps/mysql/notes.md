---
title: Sql 使用笔记
---


## Mysql如何添加远程连接账户？


```sql
mysql -u root -p
CREATE USER 'new_user'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'new_user'@'localhost';
FLUSH PRIVILEGES;
```
