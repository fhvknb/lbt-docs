---
tag:
  - nginx
---


## Nginx 禁用缓存的方法

### 1. 添加缓存控制响应头

您可以在 Nginx 配置文件中添加以下指令，这些指令会向浏览器发送不缓存的响应头：

```nginx
location /your_static_files_path/ {
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    add_header Pragma "no-cache";
    add_header Expires "0";
    
    # 如果您是代理到其他服务器
    proxy_pass http://your_backend_server;
    
    # 禁用 Nginx 的代理缓存
    proxy_no_cache 1;
    proxy_cache_bypass 1;
}
```

### 2. 禁用 Nginx 的 open_file_cache

如果您想完全禁用 Nginx 对文件的缓存，可以在相关的 location 块中添加：

```nginx
location /your_static_files_path/ {
    open_file_cache off;
    # 其他配置...
}
```

### 3. 对特定文件类型禁用缓存

如果您只想对特定类型的静态资源禁用缓存，可以这样配置：

```nginx
# 对 HTML、CSS、JS 文件禁用缓存
location ~* \.(html|css|js)$ {
    add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
    add_header Pragma "no-cache";
    add_header Expires "0";
    
    # 如果是代理
    proxy_no_cache 1;
    proxy_cache_bypass 1;
}
```

### 4. 完整配置示例

以下是一个更完整的配置示例，适用于代理静态网站并禁用缓存：

```nginx
server {
    listen 80;
    server_name your_domain.com;
    
    # 全局禁用代理缓存
    proxy_no_cache 1;
    proxy_cache_bypass 1;
    
    location / {
        proxy_pass http://your_backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        
        # 禁用缓存的响应头
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # 对静态资源特别处理
    location ~* \.(jpg|jpeg|png|gif|ico|css|js)$ {
        proxy_pass http://your_backend_server;
        
        # 禁用缓存的响应头
        add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
}
```

## 注意事项

1. 完全禁用缓存可能会影响网站性能，因为每次请求都会重新获取资源
2. 修改 Nginx 配置后，需要重新加载或重启 Nginx 服务才能生效：
   ```bash
   sudo nginx -t       # 测试配置是否有语法错误
   sudo nginx -s reload  # 重新加载配置
   ```
3. 如果您使用的是 Nginx 作为反向代理，确保同时设置了 `proxy_no_cache` 和 `proxy_cache_bypass` 指令
