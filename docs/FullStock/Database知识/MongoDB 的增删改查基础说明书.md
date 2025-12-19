以下是 MongoDB 的增删改查（CRUD）操作的基础文档说明，包含常见的操作命令及示例代码。MongoDB 是一个 NoSQL 数据库，使用文档存储数据，支持灵活的 JSON 格式。

---

## **1. 数据库和集合操作**

### **1.1 连接数据库**
```javascript
// 使用 MongoDB Shell 连接数据库
use <database_name>
```
- 如果数据库不存在，MongoDB 会在插入数据时自动创建数据库。

---

### **1.2 查看数据库和集合**
```javascript
// 查看所有数据库
show databases

// 查看当前数据库的集合
show collections
```

---

## **2. 增（Create）**

### **2.1 插入单条文档**
```javascript
db.<collection_name>.insertOne({
  name: "Alice",
  age: 25,
  city: "New York"
})
```

### **2.2 插入多条文档**
```javascript
db.<collection_name>.insertMany([
  { name: "Bob", age: 30, city: "Los Angeles" },
  { name: "Charlie", age: 35, city: "Chicago" }
])
```

- `insertOne`：插入单个文档。
- `insertMany`：批量插入多个文档。

---

## **3. 查（Read）**

### **3.1 查询所有文档**
```javascript
db.<collection_name>.find()
```

### **3.2 查询符合条件的文档**
```javascript
db.<collection_name>.find({ age: { $gt: 30 } })
```
- 示例：查询 `age` 大于 30 的文档。

### **3.3 查询单条文档**
```javascript
db.<collection_name>.findOne({ name: "Alice" })
```

### **3.4 查询指定字段**
```javascript
db.<collection_name>.find({ age: { $gt: 30 } }, { name: 1, city: 1, _id: 0 })
```
- 示例：只返回 `name` 和 `city` 字段，并排除 `_id`。

### **3.5 排序**
```javascript
db.<collection_name>.find().sort({ age: -1 }) // 按 age 降序排序
```

### **3.6 分页**
```javascript
db.<collection_name>.find().skip(5).limit(10)
```
- `skip(5)`：跳过前 5 条数据。
- `limit(10)`：限制返回 10 条数据。

---

## **4. 改（Update）**

### **4.1 更新单条文档**
```javascript
db.<collection_name>.updateOne(
  { name: "Alice" },                // 查询条件
  { $set: { age: 26, city: "Boston" } } // 更新内容
)
```

### **4.2 更新多条文档**
```javascript
db.<collection_name>.updateMany(
  { age: { $lt: 30 } },             // 查询条件
  { $set: { city: "San Francisco" } } // 更新内容
)
```

### **4.3 替换文档**
```javascript
db.<collection_name>.replaceOne(
  { name: "Alice" },                // 查询条件
  { name: "Alice", age: 27 }        // 替换为的新文档
)
```
- `replaceOne` 会用新文档完全替换旧文档。

---

## **5. 删（Delete）**

### **5.1 删除单条文档**
```javascript
db.<collection_name>.deleteOne({ name: "Alice" })
```

### **5.2 删除多条文档**
```javascript
db.<collection_name>.deleteMany({ age: { $lt: 30 } })
```

### **5.3 删除所有文档**
```javascript
db.<collection_name>.deleteMany({})
```

---

## **6. 其他常用操作**

### **6.1 统计文档数**
```javascript
db.<collection_name>.countDocuments({ age: { $gt: 30 } })
```

### **6.2 创建索引**
```javascript
db.<collection_name>.createIndex({ name: 1 })
```
- `1` 表示升序索引，`-1` 表示降序索引。

### **6.3 删除集合**
```javascript
db.<collection_name>.drop()
```

### **6.4 删除数据库**
```javascript
db.dropDatabase()
```

---

## **7. 常用查询操作符**

| 操作符    | 描述                                   | 示例                                   |
|-----------|----------------------------------------|----------------------------------------|
| `$eq`     | 等于                                   | `{ age: { $eq: 25 } }`                |
| `$ne`     | 不等于                                 | `{ age: { $ne: 25 } }`                |
| `$gt`     | 大于                                   | `{ age: { $gt: 25 } }`                |
| `$gte`    | 大于等于                               | `{ age: { $gte: 25 } }`               |
| `$lt`     | 小于                                   | `{ age: { $lt: 25 } }`                |
| `$lte`    | 小于等于                               | `{ age: { $lte: 25 } }`               |
| `$in`     | 在数组中的任意值                       | `{ city: { $in: ["New York", "Boston"] } }` |
| `$nin`    | 不在数组中的值                         | `{ city: { $nin: ["New York", "Boston"] } }` |
| `$and`    | 与条件                                 | `{ $and: [{ age: { $gt: 20 } }, { city: "New York" }] }` |
| `$or`     | 或条件                                 | `{ $or: [{ age: { $gt: 30 } }, { city: "Boston" }] }` |
| `$not`    | 取反                                   | `{ age: { $not: { $gt: 30 } } }`      |
| `$exists` | 字段是否存在                           | `{ city: { $exists: true } }`         |
| `$regex`  | 正则匹配                               | `{ name: { $regex: /^A/ } }`          |

---

## **8. 示例操作**

假设我们有一个集合 `users`，其中包含以下数据：
```javascript
db.users.insertMany([
  { name: "Alice", age: 25, city: "New York" },
  { name: "Bob", age: 30, city: "Los Angeles" },
  { name: "Charlie", age: 35, city: "Chicago" }
])
```

1. 查询年龄大于 30 的用户：
   ```javascript
   db.users.find({ age: { $gt: 30 } })
   ```

2. 更新 Bob 的城市为 San Francisco：
   ```javascript
   db.users.updateOne({ name: "Bob" }, { $set: { city: "San Francisco" } })
   ```

3. 删除年龄小于 30 的用户：
   ```javascript
   db.users.deleteMany({ age: { $lt: 30 } })
   ```

4. 统计用户数量：
   ```javascript
   db.users.countDocuments()
   ```

---

以上是 MongoDB 基础增删改查操作的说明文档，适用于日常开发和管理需求。如需更高级功能（如聚合查询等），可以进一步深入学习 MongoDB 的文档！