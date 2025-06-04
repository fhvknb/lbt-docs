---
title: 不使用ORM如何优雅管理数据库更新
tag: 
  - postgres
  - sql
---

## **1. 使用 SQL 脚本管理数据库初始化**
在项目初始化阶段，直接使用 SQL 脚本来创建数据库结构和初始化数据。

### **步骤**
1. **创建初始化 SQL 脚本**
   - 将所有创建表、索引、外键约束和初始数据插入操作写入一个 SQL 文件（如 `init.sql`）。
   - 示例 `init.sql` 文件：
     ```sql
     -- 创建表
     CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         username VARCHAR(50) NOT NULL UNIQUE,
         password VARCHAR(255) NOT NULL,
         email VARCHAR(100),
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

     CREATE TABLE posts (
         id SERIAL PRIMARY KEY,
         user_id INT NOT NULL,
         content TEXT NOT NULL,
         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
         FOREIGN KEY (user_id) REFERENCES users (id)
     );

     -- 插入初始数据
     INSERT INTO users (username, password, email) VALUES
         ('admin', 'hashed_password', 'admin@example.com'),
         ('test_user', 'hashed_password', 'test@example.com');
     ```

2. **执行 SQL 脚本**
   使用 `psql` 或其他数据库客户端工具执行脚本：
   ```bash
   psql -U postgres -d your_database -f init.sql
   ```

3. **版本控制**
   将 `init.sql` 文件放入项目的 `migrations` 或 `db` 文件夹，并使用 Git 等工具对其进行版本控制。

---

## **2. 数据库迁移管理**
当项目升级需要修改数据库表结构时（如新增字段、修改字段类型、删除表等），可以通过以下方式优雅地管理迁移。

### **手动维护迁移脚本**
1. **创建迁移脚本**
   - 每次需要修改数据库表结构时，创建一个新的 SQL 文件（如 `migrations/001_add_new_column.sql`）。
   - 示例迁移脚本：
     ```sql
     -- 添加新字段
     ALTER TABLE users ADD COLUMN last_login TIMESTAMP;

     -- 修改字段类型
     ALTER TABLE posts ALTER COLUMN content TYPE VARCHAR(1000);

     -- 删除字段
     ALTER TABLE users DROP COLUMN email;
     ```

2. **执行迁移脚本**
   - 使用 `psql` 或其他工具逐步执行迁移脚本：
     ```bash
     psql -U postgres -d your_database -f migrations/001_add_new_column.sql
     ```

3. **迁移脚本的版本控制**
   - 使用文件命名规则（如 `001_`、`002_` 等）确保迁移脚本的执行顺序。
   - 使用 Git 等工具对迁移脚本进行版本控制。

---

## **3. 自动化迁移管理**
为了避免手动执行迁移脚本的繁琐，可以通过脚本或工具实现迁移的自动化。

### **实现自动化迁移**
1. **创建迁移日志表**
   在数据库中创建一个表，用于记录已执行的迁移脚本：
   ```sql
   CREATE TABLE migrations (
       id SERIAL PRIMARY KEY,
       migration_name VARCHAR(255) NOT NULL UNIQUE,
       applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **自动执行迁移脚本**
   编写一个脚本（如 Python、Shell），自动检测未执行的迁移脚本并依次执行。

   **示例 Shell 脚本：**
   ```bash
   #!/bin/bash

   DB_NAME="your_database"
   DB_USER="postgres"
   MIGRATIONS_DIR="./migrations"

   # 获取已执行的迁移
   EXECUTED_MIGRATIONS=$(psql -U $DB_USER -d $DB_NAME -t -c "SELECT migration_name FROM migrations")

   # 遍历迁移文件夹中的脚本
   for FILE in $(ls $MIGRATIONS_DIR/*.sql | sort); do
       BASENAME=$(basename $FILE)
       if [[ ! $EXECUTED_MIGRATIONS =~ $BASENAME ]]; then
           echo "Applying migration: $BASENAME"
           psql -U $DB_USER -d $DB_NAME -f $FILE
           psql -U $DB_USER -d $DB_NAME -c "INSERT INTO migrations (migration_name) VALUES ('$BASENAME')"
       else
           echo "Migration already applied: $BASENAME"
       fi
   done
   ```

   **执行脚本：**
   ```bash
   ./apply_migrations.sh
   ```

---

## **4. 数据初始化与迁移的集成**
在项目启动时，可以自动进行数据初始化和迁移。例如：
1. 在项目启动脚本中调用初始化和迁移脚本。
2. 如果数据库为空，自动执行 `init.sql`。
3. 如果数据库需要升级，自动检测并执行迁移脚本。

---

## **5. 优雅实践建议**
- **版本控制**：将所有 SQL 脚本（包括初始化和迁移脚本）纳入版本控制系统（如 Git）。
- **命名规范**：迁移脚本命名应清晰，建议使用时间戳或编号，例如：
  ```
  001_create_users_table.sql
  002_add_last_login_column.sql
  ```
- **备份数据库**：在执行迁移之前，备份数据库以防止数据丢失。
- **测试迁移**：在开发和测试环境中先执行迁移，确保脚本无误后再应用到生产环境。

---

## **总结**
在没有第三方 ORM 的情况下，可以通过以下方式优雅地维护数据初始化和迁移：
1. 使用 SQL 脚本管理数据库结构和初始化数据。
2. 编写迁移脚本来记录表结构的变化。
3. 创建迁移日志表并编写自动化脚本管理迁移。
4. 将所有 SQL 脚本纳入版本控制，确保团队协作和历史可追溯性。
