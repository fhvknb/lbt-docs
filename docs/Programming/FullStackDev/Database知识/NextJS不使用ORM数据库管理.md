---
title: 不使用ORM如何优雅管理数据库更新
tag: 
  - postgres
  - sql
  - nextjs
---

## **1. 数据库初始化和迁移的核心思想**
与普通项目相比，Next.js 的数据库管理需要结合其文件结构和 API 路由来实现。以下是几个关键点：
- **数据库初始化**：可以在项目启动时（如通过一个特定的 API 路由或脚本）执行数据库初始化操作。
- **数据库迁移**：通过编写脚本或 API 路由管理迁移脚本的执行。
- **自动化**：利用 Next.js 的全栈能力，结合 Node.js 脚本，自动检测和执行迁移。

---

## **2. 在 Next.js 中实现数据库初始化**

### **方法 1：通过脚本初始化数据库**
可以在 Next.js 项目根目录编写一个脚本（如 `scripts/init-db.js`），用于初始化数据库。

**示例：`scripts/init-db.js`**
```javascript
const { Client } = require('pg'); // 使用 pg 库连接 PostgreSQL

const initDB = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
  });

  try {
    await client.connect();

    // 创建表
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    // 插入初始数据
    await client.query(`
      INSERT INTO users (username, password, email) VALUES
      ('admin', 'hashed_password', 'admin@example.com')
      ON CONFLICT (username) DO NOTHING;
    `);

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await client.end();
  }
};

initDB();
```

**运行脚本：**
```bash
node scripts/init-db.js
```

---

### **方法 2：通过 API 路由初始化数据库**
在 Next.js 的 API 路由中创建一个初始化接口，通过访问该接口完成数据库初始化。

**示例：`pages/api/init-db.js`**
```javascript
import { Client } from 'pg';

export default async function handler(req, res) {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
  });

  try {
    await client.connect();

    // 初始化数据库
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      );
    `);

    await client.query(`
      INSERT INTO users (username, password, email) VALUES
      ('admin', 'hashed_password', 'admin@example.com')
      ON CONFLICT (username) DO NOTHING;
    `);

    res.status(200).json({ message: 'Database initialized successfully!' });
  } catch (error) {
    console.error('Error initializing database:', error);
    res.status(500).json({ error: 'Database initialization failed' });
  } finally {
    await client.end();
  }
}
```

**访问接口：**
启动项目后访问 `http://localhost:3000/api/init-db`，即可完成数据库初始化。

---

## **3. 在 Next.js 中实现数据库迁移**

### **迁移的核心逻辑**
1. **迁移脚本管理**：将迁移脚本存储在 `migrations` 文件夹中，每次修改数据库结构时新增一个 SQL 文件。
2. **迁移日志表**：在数据库中创建一个 `migrations` 表，记录已执行的迁移脚本。
3. **自动检测与执行迁移**：通过脚本或 API 路由，检测未执行的迁移脚本并依次执行。

---

### **实现迁移管理**

#### **Step 1: 创建迁移日志表**
在数据库中创建一个表，用于记录已执行的迁移脚本：
```sql
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    migration_name VARCHAR(255) NOT NULL UNIQUE,
    applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### **Step 2: 编写自动迁移脚本**
**示例：`scripts/migrate.js`**
```javascript
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

const migrate = async () => {
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
  });

  try {
    await client.connect();

    // 确保迁移日志表存在
    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        migration_name VARCHAR(255) NOT NULL UNIQUE,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 获取已执行的迁移
    const { rows: executedMigrations } = await client.query('SELECT migration_name FROM migrations');
    const executedMigrationNames = executedMigrations.map(row => row.migration_name);

    // 获取所有迁移脚本
    const migrationsDir = path.join(__dirname, '../migrations');
    const migrationFiles = fs.readdirSync(migrationsDir).filter(file => file.endsWith('.sql'));

    // 执行未执行的迁移
    for (const file of migrationFiles) {
      if (!executedMigrationNames.includes(file)) {
        const migrationPath = path.join(migrationsDir, file);
        const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

        console.log(`Applying migration: ${file}`);
        await client.query(migrationSQL);
        await client.query('INSERT INTO migrations (migration_name) VALUES ($1)', [file]);
      } else {
        console.log(`Migration already applied: ${file}`);
      }
    }

    console.log('All migrations applied successfully!');
  } catch (error) {
    console.error('Error applying migrations:', error);
  } finally {
    await client.end();
  }
};

migrate();
```

#### **Step 3: 创建迁移脚本**
在 `migrations` 文件夹中添加迁移脚本。例如：
- `migrations/001_add_last_login_column.sql`
  ```sql
  ALTER TABLE users ADD COLUMN last_login TIMESTAMP;
  ```

- `migrations/002_add_index_to_posts.sql`
  ```sql
  CREATE INDEX idx_user_id ON posts (user_id);
  ```

#### **Step 4: 运行迁移脚本**
运行迁移脚本：
```bash
node scripts/migrate.js
```

---

## **4. 与 Next.js 的集成**
### **结合 API 路由**
可以将迁移逻辑封装到 API 路由中，通过访问接口触发迁移。例如：
```javascript
// pages/api/migrate.js
import migrate from '../../scripts/migrate';

export default async function handler(req, res) {
  try {
    await migrate();
    res.status(200).json({ message: 'Migrations applied successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Migration failed' });
  }
}
```

### **结合 CI/CD**
在 CI/CD 管道中，在部署时自动运行数据库迁移脚本。例如，添加到 CI/CD 的部署步骤中：
```bash
node scripts/migrate.js
```

---

## **5. 优雅实践建议**
1. **文件组织结构**
   - `scripts/`: 存放初始化和迁移脚本。
   - `migrations/`: 存放所有迁移 SQL 文件。

2. **版本控制**
   - 使用 Git 对所有 SQL 文件和脚本进行版本控制。

3. **环境变量**
   - 使用 `.env` 文件管理数据库连接信息，结合 `dotenv` 加载环境变量。

4. **日志记录**
   - 在迁移脚本中添加日志输出，方便排查问题。

