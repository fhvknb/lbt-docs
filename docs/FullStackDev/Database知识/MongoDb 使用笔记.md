
以下是 MongoDB 的登录方法和常用操作命令的详细说明，包括如何登录数据库、基础操作和常用查询命令。

---

## **1. 登录 MongoDB**

### **1.1 登录到 MongoDB**
在终端中使用 `mongo` 或 `mongosh`（推荐）登录 MongoDB 数据库。

#### 本地登录
```bash
mongosh
```

如果使用旧版 MongoDB，可以使用：
```bash
mongo
```

#### 登录指定数据库
```bash
mongosh <数据库名>
```

示例：
```bash
mongosh mydatabase
```

#### 登录远程 MongoDB
```bash
mongosh "mongodb://<用户名>:<密码>@<主机>:<端口>/<数据库名>"
```

示例：
```bash
mongosh "mongodb://admin:password@127.0.0.1:27017/mydatabase"
```

- `<用户名>`：MongoDB 用户名。
- `<密码>`：MongoDB 用户密码。
- `<主机>`：MongoDB 服务器地址（如 `127.0.0.1`）。
- `<端口>`：MongoDB 端口号（默认是 `27017`）。
- `<数据库名>`：要连接的数据库名称。

---

### **1.2 登录到 MongoDB Docker 容器**
如果 MongoDB 运行在 Docker 容器中，可以通过以下方式登录：

1. **进入容器**：
   ```bash
   docker exec -it <container_name_or_id> bash
   ```

2. **使用 `mongosh` 登录**：
   ```bash
   mongosh
   ```

或者直接运行：
```bash
docker exec -it <container_name_or_id> mongosh
```

---

## **2. 常用命令**

### **2.1 数据库相关操作**

#### 查看所有数据库
```javascript
show dbs
```

#### 切换数据库
```javascript
use <数据库名>
```

示例：
```javascript
use mydatabase
```

#### 创建数据库
MongoDB 不需要显式创建数据库。只需切换到一个不存在的数据库并插入数据，数据库会自动创建。

#### 删除数据库
```javascript
db.dropDatabase()
```

---

### **2.2 集合（表）相关操作**

#### 查看当前数据库中的所有集合
```javascript
show collections
```

#### 创建集合
```javascript
db.createCollection("<集合名>")
```

示例：
```javascript
db.createCollection("users")
```

#### 删除集合
```javascript
db.<集合名>.drop()
```

示例：
```javascript
db.users.drop()
```

---

### **2.3 插入、查询、更新和删除数据**

#### 插入数据
```javascript
db.<集合名>.insertOne({ <字段名>: <值>, <字段名>: <值>, ... })
```

示例：
```javascript
db.users.insertOne({ name: "Alice", age: 25, email: "alice@example.com" })
```

批量插入：
```javascript
db.<集合名>.insertMany([
  { <字段名>: <值>, ... },
  { <字段名>: <值>, ... }
])
```

示例：
```javascript
db.users.insertMany([
  { name: "Bob", age: 30, email: "bob@example.com" },
  { name: "Charlie", age: 35, email: "charlie@example.com" }
])
```

---

#### 查询数据
```javascript
db.<集合名>.find(<查询条件>)
```

- 查询所有数据：
  ```javascript
  db.users.find()
  ```

- 查询特定条件的数据：
  ```javascript
  db.users.find({ age: { $gt: 25 } })
  ```

- 查询指定字段：
  ```javascript
  db.users.find({}, { name: 1, email: 1, _id: 0 })
  ```

- 查询单条数据：
  ```javascript
  db.users.findOne({ name: "Alice" })
  ```

---

#### 更新数据
```javascript
db.<集合名>.updateOne(<查询条件>, { $set: { <字段名>: <新值> } })
```

示例：
```javascript
db.users.updateOne({ name: "Alice" }, { $set: { age: 26 } })
```

批量更新：
```javascript
db.<集合名>.updateMany(<查询条件>, { $set: { <字段名>: <新值> } })
```

示例：
```javascript
db.users.updateMany({ age: { $lt: 30 } }, { $set: { status: "young" } })
```

---

#### 删除数据
```javascript
db.<集合名>.deleteOne(<查询条件>)
```

示例：
```javascript
db.users.deleteOne({ name: "Alice" })
```

批量删除：
```javascript
db.<集合名>.deleteMany(<查询条件>)
```

示例：
```javascript
db.users.deleteMany({ age: { $lt: 30 } })
```

---

### **2.4 索引操作**

#### 创建索引
```javascript
db.<集合名>.createIndex({ <字段>: 1 })
```

示例：
```javascript
db.users.createIndex({ email: 1 })
```

#### 查看索引
```javascript
db.<集合名>.getIndexes()
```

#### 删除索引
```javascript
db.<集合名>.dropIndex("<索引名>")
```

示例：
```javascript
db.users.dropIndex("email_1")
```

---

### **2.5 用户管理**

#### 创建用户
```javascript
db.createUser({
  user: "<用户名>",
  pwd: "<密码>",
  roles: [{ role: "<角色>", db: "<数据库名>" }]
})
```

示例：
```javascript
db.createUser({
  user: "admin",
  pwd: "password",
  roles: [{ role: "readWrite", db: "mydatabase" }]
})
```

#### 查看用户
```javascript
db.getUsers()
```

#### 删除用户
```javascript
db.dropUser("<用户名>")
```

示例：
```javascript
db.dropUser("admin")
```

---

### **2.6 聚合操作**

#### 聚合查询
```javascript
db.<集合名>.aggregate([
  { <阶段1> },
  { <阶段2> },
  ...
])
```

示例：按年龄分组并统计人数
```javascript
db.users.aggregate([
  { $group: { _id: "$age", count: { $sum: 1 } } }
])
```

---

### **2.7 备份与还原**

#### 备份数据库
使用 `mongodump` 工具备份：
```bash
mongodump --host <主机> --port <端口> --db <数据库名> --out <备份路径>
```

示例：
```bash
mongodump --host 127.0.0.1 --port 27017 --db mydatabase --out /backup/
```

#### 还原数据库
使用 `mongorestore` 工具还原：
```bash
mongorestore --host <主机> --port <端口> --db <数据库名> <备份路径>
```

示例：
```bash
mongorestore --host 127.0.0.1 --port 27017 --db mydatabase /backup/mydatabase
```

---

### **2.8 退出 MongoDB**
在 `mongosh` 或 `mongo` 中输入以下命令退出：
```javascript
exit
```

---

### **2.9 其他常用命令**

#### 查看当前数据库
```javascript
db
```

#### 查看数据库状态
```javascript
db.stats()
```

#### 查看集合文档总数
```javascript
db.<集合名>.countDocuments()
```

示例：
```javascript
db.users.countDocuments()
```

---

### 总结
- **登录 MongoDB**：使用 `mongosh` 或 `mongo` 登录本地或远程数据库。
- **常用命令**：包括数据库和集合管理、插入/查询/更新/删除数据等。
- **备份与还原**：使用 `mongodump` 和 `mongorestore` 进行数据备份和恢复。

如果有其他问题或需求，请随时告诉我！