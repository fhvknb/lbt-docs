在 Nginx 中配置域名重定向可以通过修改 Nginx 配置文件来实现。以下是一个简单的步骤和示例，帮助你完成域名重定向的设置。

### 步骤

1. **打开 Nginx 配置文件**  
   通常，Nginx 的配置文件位于 `/etc/nginx/nginx.conf` 或者 `/etc/nginx/sites-available/default`。你可以使用文本编辑器（如 `vim` 或 `nano`）打开它。

2. **添加重定向配置**  
   在配置文件中，找到 `server` 块，或者添加一个新的 `server` 块来处理重定向。

### 示例

假设你想将 `example.com` 重定向到 `www.example.com`，可以使用以下配置：

```nginx
server {
    listen 80;
    server_name example.com;

    return 301 http://www.example.com$request_uri;
}

server {
    listen 80;
    server_name www.example.com;

    # 这里可以放置处理 www.example.com 的其他配置
    location / {
        # 处理请求的配置
        proxy_pass http://backend_server;  # 示例，替换为你的后端服务
    }
}
```

### 说明

- **listen 80;**: 指定监听的端口，这里是 HTTP 的默认端口 80。
- **server_name**: 指定需要重定向的域名。
- **return 301**: 发送一个 301 永久重定向的响应，后面的 URL 是重定向的目标。
- **$request_uri**: 保留请求的 URI，确保用户访问的路径不会丢失。

### 3. **测试配置**

在修改完配置文件后，使用以下命令测试 Nginx 配置是否正确：

```bash
sudo nginx -t
```

### 4. **重启 Nginx**

如果没有错误，重启 Nginx 以应用更改：

```bash
sudo systemctl restart nginx
```

### 注意事项

- 确保 DNS 记录已经正确指向你的服务器。
- 如果使用 HTTPS，记得在 `listen` 指令中添加 443 端口的配置，并处理 SSL 证书。

这样，你就完成了 Nginx 的域名重定向配置。如果有其他问题，欢迎随时询问！