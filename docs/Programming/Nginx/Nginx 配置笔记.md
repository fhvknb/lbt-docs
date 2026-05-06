
在 Nginx 中，上传文件大小的限制通常由以下两个配置项控制：

1. **`client_max_body_size`**：限制 HTTP 请求体的最大大小（通常用于文件上传）。
2. **`client_body_buffer_size`**：设置客户端请求体缓冲区大小。

如果你需要修改上传文件的大小限制，可以按照以下步骤操作：

---

### **步骤 1：修改 Nginx 配置文件**

#### 1. 找到 Nginx 配置文件
Nginx 的主配置文件通常位于以下路径之一：
- `/etc/nginx/nginx.conf`
- `/etc/nginx/conf.d/default.conf`
- `/usr/local/nginx/conf/nginx.conf`

具体路径取决于你的安装方式。

#### 2. 修改 `client_max_body_size`
在 Nginx 配置文件的 `http`、`server` 或 `location` 块中添加或修改 `client_max_body_size`，例如：

```nginx
http {
    # 全局设置文件上传限制
    client_max_body_size 100M;  # 设置最大上传文件大小为 100MB
}

server {
    listen 80;
    server_name example.com;

    # 针对当前 server 的文件上传限制
    client_max_body_size 100M;

    location /upload {
        # 针对 /upload 路径的文件上传限制
        client_max_body_size 100M;
    }
}
```

#### 3. 可选：调整 `client_body_buffer_size`
如果上传的文件较大，可以适当增加缓冲区大小，避免 Nginx 写入临时文件时性能下降：

```nginx
http {
    client_body_buffer_size 8M;  # 设置客户端请求体缓冲区大小为 8MB
}
```

---

### **步骤 2：验证配置语法**
修改配置文件后，使用以下命令验证 Nginx 配置语法是否正确：

```bash
nginx -t
```

如果输出显示 `syntax is ok`，说明配置文件语法正确。

---

### **步骤 3：重载 Nginx 配置**
验证配置文件后，重载 Nginx 服务以使修改生效：

```bash
systemctl reload nginx
```

或者使用以下命令（取决于你的系统）：

```bash
service nginx reload
```

---

### **测试上传文件**
完成配置后，测试上传文件是否受新限制约束。如果上传文件大小超过 `client_max_body_size` 的限制，Nginx 会返回 **413 Request Entity Too Large** 错误。

---

### **注意事项**
1. **配置项的作用范围**：
   - `http` 块：对所有虚拟主机生效。
   - `server` 块：仅对特定虚拟主机生效。
   - `location` 块：仅对特定路径生效。

2. **优先级**：
   - 如果 `client_max_body_size` 在多个块中定义，优先级为 `location > server > http`。

3. **临时文件存储路径**：
   - 如果上传的文件较大，Nginx 会将请求体写入临时文件。临时文件的存储路径可以通过 `client_body_temp_path` 配置项修改：
     ```nginx
     client_body_temp_path /var/nginx/body_temp;
     ```

4. **后端限制**：
   - 如果 Nginx 作为反向代理，后端服务（如 PHP、Node.js 等）也可能有上传文件大小的限制，需要同步调整。

---

### **示例：完整的 Nginx 配置**
以下是一个完整的示例配置：

```nginx
http {
    client_max_body_size 100M;         # 全局上传限制
    client_body_buffer_size 8M;       # 请求体缓冲区大小
    client_body_temp_path /var/nginx/body_temp;  # 临时文件路径

    server {
        listen 80;
        server_name example.com;

        location / {
            root /var/www/html;
            index index.html;
        }

        location /upload {
            client_max_body_size 100M;  # 针对 /upload 路径的上传限制
        }
    }
}
```

通过这种方式，你可以灵活地控制上传文件大小限制，满足不同路径或服务的需求。