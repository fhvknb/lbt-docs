
以下是关于 **WebDAV** 的详细 API 说明文档，涵盖了常见的 **CRUD**（创建、读取、更新、删除）操作，以及 WebDAV 的扩展功能（如文件锁定和属性管理）。WebDAV 是基于 HTTP 协议的扩展，因此其操作主要通过 HTTP 方法实现。

---

## **WebDAV API 说明文档**

### **1. HTTP 方法与功能对应表**

| HTTP 方法 | WebDAV 功能       | 描述                                   |
|-----------|-------------------|----------------------------------------|
| `OPTIONS` | 功能查询           | 查询服务器支持的功能和方法。            |
| `GET`     | 读取文件           | 下载文件或获取文件内容。                |
| `HEAD`    | 获取文件元信息     | 获取文件的元数据（如大小、类型等）。    |
| `PUT`     | 上传文件           | 上传文件到服务器，支持覆盖已存在文件。  |
| `DELETE`  | 删除文件或目录     | 删除指定的文件或目录。                  |
| `MKCOL`   | 创建目录           | 创建一个新的目录。                      |
| `PROPFIND`| 获取资源属性       | 获取文件或目录的属性（如大小、修改时间）。|
| `PROPPATCH`| 修改资源属性      | 更新文件或目录的自定义属性。            |
| `COPY`    | 复制文件或目录     | 将文件或目录复制到目标位置。            |
| `MOVE`    | 移动文件或目录     | 将文件或目录移动到目标位置。            |
| `LOCK`    | 锁定资源           | 锁定文件或目录，防止并发修改冲突。      |
| `UNLOCK`  | 解锁资源           | 解锁已锁定的文件或目录。                |

---

## **2. CRUD 操作详细说明**

### **2.1 创建资源**

#### **2.1.1 上传文件**
- **方法**：`PUT`
- **描述**：将文件上传到服务器，若目标路径已存在文件，则会覆盖。
- **请求示例**：
```http
PUT /webdav/example.txt HTTP/1.1
Host: example.com
Content-Type: text/plain
Content-Length: 11
Authorization: Basic <base64-encoded-credentials>

Hello World
```
- **响应示例**：
```http
HTTP/1.1 201 Created
```

---

#### **2.1.2 创建目录**
- **方法**：`MKCOL`
- **描述**：创建一个新的目录。
- **请求示例**：
```http
MKCOL /webdav/new-folder/ HTTP/1.1
Host: example.com
Authorization: Basic <base64-encoded-credentials>
```
- **响应示例**：
```http
HTTP/1.1 201 Created
```
- **错误响应**：
  - `403 Forbidden`：无权限创建目录。
  - `405 Method Not Allowed`：目标路径已存在非目录资源。

---

### **2.2 读取资源**

#### **2.2.1 获取文件内容**
- **方法**：`GET`
- **描述**：下载文件或获取文件内容。
- **请求示例**：
```http
GET /webdav/example.txt HTTP/1.1
Host: example.com
Authorization: Basic <base64-encoded-credentials>
```
- **响应示例**：
```http
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 11

Hello World
```

---

#### **2.2.2 获取资源属性**
- **方法**：`PROPFIND`
- **描述**：获取文件或目录的属性（如大小、修改时间等）。
- **请求示例**：
```http
PROPFIND /webdav/example.txt HTTP/1.1
Host: example.com
Depth: 0
Authorization: Basic <base64-encoded-credentials>
```
- **请求头说明**：
  - `Depth`：
    - `0`：仅获取目标资源的属性。
    - `1`：获取目标资源及其直接子资源的属性。
    - `infinity`：递归获取所有子资源的属性。
- **响应示例**：
```http
HTTP/1.1 207 Multi-Status
Content-Type: application/xml; charset="utf-8"

<?xml version="1.0" encoding="utf-8" ?>
<multistatus xmlns="DAV:">
  <response>
    <href>/webdav/example.txt</href>
    <propstat>
      <prop>
        <getcontentlength>11</getcontentlength>
        <getlastmodified>Thu, 11 Dec 2025 12:00:00 GMT</getlastmodified>
        <getcontenttype>text/plain</getcontenttype>
      </prop>
      <status>HTTP/1.1 200 OK</status>
    </propstat>
  </response>
</multistatus>
```

---

### **2.3 更新资源**

#### **2.3.1 上传文件（覆盖）**
- **方法**：`PUT`
- **描述**：与创建文件相同，若目标路径已存在文件，则会覆盖。
- **请求示例**：
```http
PUT /webdav/example.txt HTTP/1.1
Host: example.com
Content-Type: text/plain
Content-Length: 13
Authorization: Basic <base64-encoded-credentials>

Updated Content
```
- **响应示例**：
```http
HTTP/1.1 200 OK
```

---

#### **2.3.2 修改资源属性**
- **方法**：`PROPPATCH`
- **描述**：更新文件或目录的自定义属性。
- **请求示例**：
```http
PROPPATCH /webdav/example.txt HTTP/1.1
Host: example.com
Authorization: Basic <base64-encoded-credentials>
Content-Type: application/xml; charset="utf-8"
Content-Length: 200

<?xml version="1.0" encoding="utf-8" ?>
<propertyupdate xmlns="DAV:">
  <set>
    <prop>
      <customproperty xmlns="http://example.com/">Custom Value</customproperty>
    </prop>
  </set>
</propertyupdate>
```
- **响应示例**：
```http
HTTP/1.1 207 Multi-Status
Content-Type: application/xml; charset="utf-8"

<?xml version="1.0" encoding="utf-8" ?>
<multistatus xmlns="DAV:">
  <response>
    <href>/webdav/example.txt</href>
    <propstat>
      <prop>
        <customproperty xmlns="http://example.com/">Custom Value</customproperty>
      </prop>
      <status>HTTP/1.1 200 OK</status>
    </propstat>
  </response>
</multistatus>
```

---

### **2.4 删除资源**

#### **2.4.1 删除文件或目录**
- **方法**：`DELETE`
- **描述**：删除文件或目录（若删除目录，则会删除其所有内容）。
- **请求示例**：
```http
DELETE /webdav/example.txt HTTP/1.1
Host: example.com
Authorization: Basic <base64-encoded-credentials>
```
- **响应示例**：
```http
HTTP/1.1 204 No Content
```
- **错误响应**：
  - `403 Forbidden`：无权限删除资源。
  - `404 Not Found`：资源不存在。

---

## **3. 扩展功能**

### **3.1 文件锁定**
- **方法**：`LOCK`
- **描述**：锁定文件，防止其他用户修改。
- **请求示例**：
```http
LOCK /webdav/example.txt HTTP/1.1
Host: example.com
Timeout: Second-3600
Authorization: Basic <base64-encoded-credentials>
Content-Type: application/xml; charset="utf-8"

<?xml version="1.0" encoding="utf-8" ?>
<lockinfo xmlns="DAV:">
  <lockscope><exclusive/></lockscope>
  <locktype><write/></locktype>
  <owner>
    <href>http://example.com/owner</href>
  </owner>
</lockinfo>
```
- **响应示例**：
```http
HTTP/1.1 200 OK
Content-Type: application/xml; charset="utf-8"

<?xml version="1.0" encoding="utf-8" ?>
<prop xmlns="DAV:">
  <lockdiscovery>
    <activelock>
      <locktype><write/></locktype>
      <lockscope><exclusive/></lockscope>
      <depth>infinity</depth>
      <owner>
        <href>http://example.com/owner</href>
      </owner>
      <timeout>Second-3600</timeout>
      <locktoken>
        <href>opaquelocktoken:1234-5678-90ab-cdef</href>
      </locktoken>
    </activelock>
  </lockdiscovery>
</prop>
```

---

### **3.2 解锁文件**
- **方法**：`UNLOCK`
- **描述**：解除文件锁定。
- **请求示例**：
```http
UNLOCK /webdav/example.txt HTTP/1.1
Host: example.com
Authorization: Basic <base64-encoded-credentials>
Lock-Token: <opaquelocktoken:1234-5678-90ab-cdef>
```
- **响应示例**：
```http
HTTP/1.1 204 No Content
```

---

## **4. 错误状态码**

| 状态码 | 描述                        |
|--------|-----------------------------|
| `200`  | 成功。                      |
| `201`  | 资源已创建。                |
| `204`  | 请求成功，无内容返回。        |
| `207`  | 多状态响应（用于 PROPFIND）。 |
| `403`  | 无权限访问或操作资源。        |
| `404`  | 资源未找到。                |
| `405`  | 方法不被允许。              |
| `409`  | 请求冲突（如父目录不存在）。  |

---

以上文档涵盖了 WebDAV 的常用操作和扩展功能，您可以根据需求实现文件的管理与同步。


#### **Authorization 头说明**：

- 格式：`Authorization: Basic <Base64(username:password)>`
- 示例：
    - 用户名：`user1`
    - 密码：`password123`
    - Base64 编码：`Base64("user1:password123")` = `dXNlcjE6cGFzc3dvcmQxMjM=`
    - 完整头部：
        
        复制
        
        `Authorization: Basic dXNlcjE6cGFzc3dvcmQxMjM=`

使用 `echo` 将字符串传递给 `base64` 命令进行编码：

```shell
echo -n "your_string" | base64

```
使用 `base64 -d`（或 `--decode`）对编码后的字符串进行解码：

```shell
echo "SGVsbG8gV29ybGQ=" | base64 -d
```