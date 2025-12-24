在 Python 中，使用 `requests` 模块可以方便地自定义请求头，从而模拟真实浏览器发起的请求。以下是具体方法和示例代码：

### 自定义请求头的步骤
1. 使用 `requests` 模块。
2. 在请求中通过 `headers` 参数自定义请求头。
3. 模拟真实浏览器的请求头信息，如 `User-Agent`、`Accept`、`Referer` 等。

### 示例代码
```python
import requests

# 自定义请求头
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Referer": "https://www.google.com/",
}

# 目标 URL
url = "https://example.com"

# 发起 GET 请求
response = requests.get(url, headers=headers)

# 打印响应内容
print(response.status_code)
print(response.text)
```

### 关键点说明
1. **User-Agent**:
   - 模拟浏览器的标识，表明请求来自某种特定的浏览器。
   - 可以在浏览器开发者工具中查看真实的 `User-Agent`，或者从网上搜索常见的浏览器 `User-Agent` 字符串。

2. **Accept**:
   - 指定客户端可以处理的内容类型。
   - 通常设置为 `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8`。

3. **Accept-Encoding**:
   - 指定支持的压缩编码格式，例如 `gzip`、`deflate` 或 `br`。

4. **Accept-Language**:
   - 指定客户端支持的语言。

5. **Referer**:
   - 表示当前请求的来源地址，某些网站会检查 `Referer` 来防止盗链。

6. **Connection**:
   - 表示是否保持连接，通常设置为 `keep-alive`。

### 模拟真实浏览器的完整请求头
可以通过浏览器开发者工具（F12）查看真实的请求头，并将其复制到代码中。例如：
1. 打开浏览器开发者工具。
2. 转到 **网络（Network）** 标签。
3. 选择一个请求，查看其请求头（Request Headers）。
4. 将这些请求头复制到代码中。

### 提交 POST 请求并附带数据
如果需要模拟浏览器提交表单，可以在 POST 请求中附带表单数据：
```python
# 表单数据
data = {
    "username": "test",
    "password": "123456",
}

# 发起 POST 请求
response = requests.post(url, headers=headers, data=data)

print(response.status_code)
print(response.text)
```

### 使用 Cookie 模拟登录
如果目标网站需要登录，可以通过 `requests.Session` 保存会话中的 Cookie：
```python
# 创建会话
session = requests.Session()

# 自定义请求头
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
}

# 登录 URL 和表单数据
login_url = "https://example.com/login"
login_data = {
    "username": "test",
    "password": "123456",
}

# 模拟登录
session.post(login_url, headers=headers, data=login_data)

# 登录后访问其他页面
response = session.get("https://example.com/dashboard", headers=headers)

print(response.status_code)
print(response.text)
```

### 总结
通过自定义请求头和使用 `requests.Session`，可以很好地模拟浏览器的行为，从而绕过一些简单的反爬机制。如果目标网站有更复杂的反爬策略（如动态加载、验证码等），可能需要结合其他工具（如 Selenium）进一步处理。