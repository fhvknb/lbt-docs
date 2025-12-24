
`curl` 是一个强大的命令行工具，用于在终端中执行 HTTP 请求。它支持多种协议（如 HTTP、HTTPS、FTP 等），可以用来下载文件、测试 API、上传数据等。以下是 `curl` 的常用使用说明：

---

## **一、基本语法**
```bash
curl [选项] [URL]
```

---

## **二、常用功能说明**

### **1. 下载文件**
- 下载一个文件并保存到本地：
  ```bash
  curl -O URL
  ```
  示例：
  ```bash
  curl -O https://example.com/file.txt
  ```
  > `-O` 表示使用文件的原始名称保存。

- 指定文件名保存：
  ```bash
  curl -o 保存的文件名 URL
  ```
  示例：
  ```bash
  curl -o myfile.txt https://example.com/file.txt
  ```

---

### **2. 查看网页内容**
- 获取网页的 HTML 内容：
  ```bash
  curl URL
  ```
  示例：
  ```bash
  curl https://example.com
  ```

- 如果需要显示响应头：
  ```bash
  curl -i URL
  ```
  示例：
  ```bash
  curl -i https://example.com
  ```

---

### **3. 测试 API**
- 发送 GET 请求：
  ```bash
  curl URL
  ```
  示例：
  ```bash
  curl https://api.example.com/get-data
  ```

- 发送 POST 请求：
  ```bash
  curl -X POST -d "key=value&key2=value2" URL
  ```
  示例：
  ```bash
  curl -X POST -d "username=admin&password=12345" https://api.example.com/login
  ```

- 发送 JSON 数据：
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' URL
  ```
  示例：
  ```bash
  curl -X POST -H "Content-Type: application/json" -d '{"username":"admin","password":"12345"}' https://api.example.com/login
  ```

---

### **4. 下载多个文件**
- 使用多个 URL 下载文件：
  ```bash
  curl -O URL1 -O URL2
  ```
  示例：
  ```bash
  curl -O https://example.com/file1.txt -O https://example.com/file2.txt
  ```

---

### **5. 限制下载速度**
- 限制下载速度（单位：字节/秒）：
  ```bash
  curl --limit-rate 100k URL
  ```
  示例：
  ```bash
  curl --limit-rate 100k https://example.com/largefile.zip
  ```

---

### **6. 跟踪重定向**
- 默认情况下，`curl` 不会自动跟踪重定向。使用 `-L` 选项可以跟踪：
  ```bash
  curl -L URL
  ```
  示例：
  ```bash
  curl -L https://example.com
  ```

---

### **7. 添加请求头**
- 添加自定义请求头：
  ```bash
  curl -H "Header-Name: Header-Value" URL
  ```
  示例：
  ```bash
  curl -H "Authorization: Bearer token123" https://api.example.com/data
  ```

- 添加多个请求头：
  ```bash
  curl -H "Header1: Value1" -H "Header2: Value2" URL
  ```

---

### **8. 保存 Cookie**
- 保存 Cookie 到文件：
  ```bash
  curl -c cookie.txt URL
  ```

- 使用保存的 Cookie：
  ```bash
  curl -b cookie.txt URL
  ```

---

### **9. 上传文件**
- 上传文件到服务器：
  ```bash
  curl -F "file=@文件路径" URL
  ```
  示例：
  ```bash
  curl -F "file=@/home/user/file.txt" https://example.com/upload
  ```

---

### **10. 显示请求和响应的详细信息**
- 显示请求和响应的详细信息（调试模式）：
  ```bash
  curl -v URL
  ```
  示例：
  ```bash
  curl -v https://example.com
  ```

---

### **11. 批量请求**
- 使用文件保存 URL 列表并批量请求：
  ```bash
  curl -O -K url_list.txt
  ```
  `url_list.txt` 文件内容示例：
  ```
  https://example.com/file1.txt
  https://example.com/file2.txt
  ```

---

### **12. 设置代理**
- 使用代理进行请求：
  ```bash
  curl -x 代理地址:端口 URL
  ```
  示例：
  ```bash
  curl -x 127.0.0.1:8080 https://example.com
  ```

- 如果代理需要认证：
  ```bash
  curl -x 代理地址:端口 -U 用户名:密码 URL
  ```

---

### **13. 自定义 User-Agent**
- 设置自定义 User-Agent：
  ```bash
  curl -A "User-Agent-String" URL
  ```
  示例：
  ```bash
  curl -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" https://example.com
  ```

---

### **14. 测试网络连接**
- 测试是否能够连接到某个地址：
  ```bash
  curl -I URL
  ```
  示例：
  ```bash
  curl -I https://example.com
  ```
  > `-I` 选项只显示响应头，不显示正文。

---

### **15. 基本认证**
- 使用用户名和密码进行认证：
  ```bash
  curl -u 用户名:密码 URL
  ```
  示例：
  ```bash
  curl -u admin:12345 https://example.com/admin
  ```

---

### **16. 下载并显示进度条**
- 显示下载进度条：
  ```bash
  curl -# URL
  ```
  示例：
  ```bash
  curl -O -# https://example.com/file.zip
  ```

---

## **三、常用选项总结**

| 选项                  | 功能说明                                 |
|-----------------------|------------------------------------------|
| `-O`                 | 使用原文件名保存文件                     |
| `-o 文件名`          | 指定保存文件名                           |
| `-L`                 | 跟踪重定向                               |
| `-H`                 | 添加请求头                               |
| `-X`                 | 指定请求方法（如 GET、POST）             |
| `-d`                 | 发送 POST 数据                           |
| `-F`                 | 上传文件                                 |
| `-u 用户名:密码`     | 基本认证                                 |
| `-b cookie.txt`      | 使用 Cookie 文件                         |
| `-c cookie.txt`      | 保存 Cookie 到文件                       |
| `-v`                 | 显示详细调试信息                         |
| `--limit-rate`       | 限制下载速度                             |
| `-A`                 | 设置 User-Agent                         |
| `-x 代理地址:端口`   | 使用代理                                 |

---

### **四、示例总结**
1. 下载文件并保存：
   ```bash
   curl -O https://example.com/file.txt
   ```

2. 发送 POST 请求：
   ```bash
   curl -X POST -d "key=value" https://api.example.com
   ```

3. 添加请求头：
   ```bash
   curl -H "Authorization: Bearer token123" https://api.example.com
   ```

4. 上传文件：
   ```bash
   curl -F "file=@/path/to/file.txt" https://example.com/upload
   ```

5. 使用代理：
   ```bash
   curl -x 127.0.0.1:8080 https://example.com
   ```

---

`curl` 是一个非常灵活的工具，适合处理各种网络请求和文件操作。根据需求选择合适的选项即可完成任务！


`curl` 和 `wget` 都是常用的命令行工具，用于下载文件、测试网络请求等。尽管它们功能相似，但命令参数和设计理念有所不同：

- **`curl`**：主要用于发送 HTTP 请求，支持多种协议，功能灵活，适合 API 测试和复杂的网络交互。
- **`wget`**：专注于文件下载，支持递归下载，适合大批量文件获取。

以下是 **`curl` 和 `wget`** 的相似功能及其对应的命令参数对比：

---

## **1. 下载文件**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 下载单个文件        | `curl -O URL`              | `wget URL`                 |
| 指定文件名保存      | `curl -o filename URL`     | `wget -O filename URL`     |
| 限制下载速度        | `curl --limit-rate 100k URL`| `wget --limit-rate=100k URL`|
| 显示下载进度条      | 默认无进度条，需加 `-#`    | 默认显示进度条             |

---

## **2. HTTP 请求**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 发送 GET 请求       | `curl URL`                 | `wget URL`                 |
| 发送 POST 请求      | `curl -X POST -d "data" URL`| `wget --post-data="data" URL`|
| 添加自定义请求头    | `curl -H "Header: Value" URL`| `wget --header="Header: Value" URL`|
| 发送 JSON 数据      | `curl -X POST -H "Content-Type: application/json" -d '{"key":"value"}' URL` | `wget --header="Content-Type: application/json" --post-data='{"key":"value"}' URL`|

---

## **3. 重定向**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 跟随重定向          | `curl -L URL`              | `wget --max-redirect=10 URL`|

---

## **4. 代理**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 使用代理            | `curl -x proxy:port URL`   | `wget -e use_proxy=yes -e http_proxy=proxy:port URL`|
| 代理认证            | `curl -x proxy:port -U user:password URL`| `wget --proxy-user=user --proxy-password=password URL`|

---

## **5. 用户认证**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| HTTP 基本认证       | `curl -u user:password URL`| `wget --user=user --password=password URL`|

---

## **6. Cookie**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 保存 Cookie         | `curl -c cookie.txt URL`   | `wget --save-cookies=cookie.txt URL`|
| 使用 Cookie         | `curl -b cookie.txt URL`   | `wget --load-cookies=cookie.txt URL`|

---

## **7. 调试信息**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 显示详细调试信息    | `curl -v URL`              | `wget --debug URL`         |
| 仅显示响应头        | `curl -I URL`              | `wget --server-response URL`|

---

## **8. 下载控制**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 限制下载速度        | `curl --limit-rate 100k URL`| `wget --limit-rate=100k URL`|
| 超时设置            | `curl --max-time 10 URL`   | `wget --timeout=10 URL`    |
| 重试次数            | `curl --retry 3 URL`       | `wget --tries=3 URL`       |

---

## **9. 文件下载管理**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 断点续传            | `curl -C - -O URL`         | `wget -c URL`              |
| 下载多个文件        | `curl -O URL1 -O URL2`     | `wget URL1 URL2`           |

---

## **10. 递归下载**
| 功能                | `curl` 参数                 | `wget` 参数                 |
|---------------------|-----------------------------|-----------------------------|
| 下载整个网站        | 不支持                     | `wget -r URL`              |
| 限制递归深度        | 不支持                     | `wget -r -l depth URL`     |

---

## **总结**

| 功能               | `curl` 优势                                     | `wget` 优势                                   |
|--------------------|------------------------------------------------|----------------------------------------------|
| **灵活性**         | 支持复杂的 HTTP 请求（如 API 调试、发送 JSON 数据等）。| 简单高效，专注于文件下载和递归下载。         |
| **下载能力**       | 支持断点续传，但不支持递归下载。                | 支持断点续传和递归下载，适合大批量文件下载。 |
| **请求头与代理**   | 更灵活地处理自定义头和代理认证。                | 支持代理，但功能较简单。                     |
| **Cookie 支持**    | 提供更细粒度的 Cookie 管理。                    | 更适合简单的 Cookie 使用场景。               |

### **选择建议**：
- 如果需要复杂的 HTTP 请求（如 API 调试、发送 JSON 数据等），推荐使用 **`curl`**。
- 如果需要下载大批量文件或整个网站，推荐使用 **`wget`**。