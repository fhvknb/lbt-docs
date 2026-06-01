下面给你一份**尽可能全面**的整理，分成两大部分：

1. **`psql` 命令行操作指南**
2. **SQLAlchemy 2（含 Core / ORM）常用数据库操作命令清单**

我会尽量按**查阅手册**的形式来写，方便你后续收藏、检索和复制使用。

---

# 一、`psql` 命令行操作指南

`psql` 是 PostgreSQL 官方提供的命令行客户端。

---

## 1. 连接数据库

### 1.1 基本连接

```bash
psql -U 用户名 -d 数据库名
```

例如：

```bash
psql -U postgres -d mydb
```

---

### 1.2 指定主机和端口

```bash
psql -h 主机 -p 端口 -U 用户名 -d 数据库名
```

例如：

```bash
psql -h 127.0.0.1 -p 5432 -U postgres -d mydb
```

---

### 1.3 使用 URI 连接

```bash
psql postgresql://用户名:密码@主机:端口/数据库名
```

例如：

```bash
psql postgresql://postgres:secret@localhost:5432/mydb
```

---

### 1.4 通过环境变量连接

常见环境变量：

```bash
export PGHOST=localhost
export PGPORT=5432
export PGUSER=postgres
export PGPASSWORD=secret
export PGDATABASE=mydb
psql
```

---

### 1.5 连接后查看当前信息

```sql
SELECT current_user;
SELECT current_database();
SELECT version();
```

---

## 2. `psql` 元命令（反斜杠命令）

> 注意：这些不是 SQL，而是 `psql` 自己的命令，**结尾不加分号**。

---

## 3. 帮助与基础信息

### 3.1 查看 `psql` 帮助

```text
\?
```

---

### 3.2 查看 SQL 语法帮助

```text
\h
```

查看某个具体命令帮助：

```text
\h SELECT
\h CREATE TABLE
\h ALTER TABLE
```

---

### 3.3 查看当前连接信息

```text
\conninfo
```

---

### 3.4 显示当前设置

```text
\set
```

查看某个变量：

```text
\echo :DBNAME
\echo :USER
\echo :HOST
\echo :PORT
```

---

## 4. 数据库相关操作

### 4.1 列出数据库

```text
\l
```

或：

```text
\list
```

---

### 4.2 切换数据库

```text
\c 数据库名
```

例如：

```text
\c mydb
```

指定用户连接：

```text
\c mydb postgres
```

---

### 4.3 创建数据库

```sql
CREATE DATABASE mydb;
```

指定所有者、编码等：

```sql
CREATE DATABASE mydb
    OWNER = myuser
    ENCODING = 'UTF8'
    TEMPLATE template0;
```

---

### 4.4 删除数据库

```sql
DROP DATABASE mydb;
```

如果数据库有连接占用，可能需要先断开会话。

---

## 5. Schema 相关操作

### 5.1 列出 schema

```text
\dn
```

---

### 5.2 创建 schema

```sql
CREATE SCHEMA myschema;
```

指定所有者：

```sql
CREATE SCHEMA myschema AUTHORIZATION myuser;
```

---

### 5.3 删除 schema

```sql
DROP SCHEMA myschema;
DROP SCHEMA myschema CASCADE;
```

---

### 5.4 查看当前搜索路径

```sql
SHOW search_path;
```

---

### 5.5 设置搜索路径

```sql
SET search_path TO myschema, public;
```

---

## 6. 表相关操作

### 6.1 列出表

当前 schema 下：

```text
\dt
```

所有 schema：

```text
\dt *.*
```

指定 schema：

```text
\dt myschema.*
```

---

### 6.2 列出视图、序列、索引等

```text
\dv      -- 视图
\dm      -- 物化视图
\ds      -- 序列
\di      -- 索引
\df      -- 函数
\du      -- 角色/用户
```

---

### 6.3 查看表结构

```text
\d 表名
```

例如：

```text
\d users
```

更详细：

```text
\d+ users
```

---

### 6.4 查看 schema 下对象

```text
\d myschema.*
```

---

### 6.5 创建表

```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT now()
);
```

---

### 6.6 删除表

```sql
DROP TABLE users;
DROP TABLE users CASCADE;
DROP TABLE IF EXISTS users;
```

---

### 6.7 重命名表

```sql
ALTER TABLE users RENAME TO app_users;
```

---

### 6.8 移动表到其他 schema

```sql
ALTER TABLE users SET SCHEMA myschema;
```

---

## 7. 列相关操作

### 7.1 添加列

```sql
ALTER TABLE users ADD COLUMN age INT;
```

带默认值：

```sql
ALTER TABLE users ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT true;
```

---

### 7.2 删除列

```sql
ALTER TABLE users DROP COLUMN age;
ALTER TABLE users DROP COLUMN IF EXISTS age;
```

---

### 7.3 重命名列

```sql
ALTER TABLE users RENAME COLUMN username TO login_name;
```

---

### 7.4 修改列类型

```sql
ALTER TABLE users ALTER COLUMN age TYPE BIGINT;
```

带转换：

```sql
ALTER TABLE users ALTER COLUMN age TYPE BIGINT USING age::BIGINT;
```

---

### 7.5 设置/删除默认值

```sql
ALTER TABLE users ALTER COLUMN is_active SET DEFAULT true;
ALTER TABLE users ALTER COLUMN is_active DROP DEFAULT;
```

---

### 7.6 设置/取消 NOT NULL

```sql
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users ALTER COLUMN email DROP NOT NULL;
```

---

## 8. 约束相关操作

### 8.1 添加主键

```sql
ALTER TABLE users ADD PRIMARY KEY (id);
```

---

### 8.2 添加唯一约束

```sql
ALTER TABLE users ADD CONSTRAINT uq_users_email UNIQUE (email);
```

---

### 8.3 添加检查约束

```sql
ALTER TABLE users ADD CONSTRAINT chk_users_age CHECK (age >= 0);
```

---

### 8.4 添加外键

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user_id
FOREIGN KEY (user_id) REFERENCES users(id);
```

带级联：

```sql
ALTER TABLE orders
ADD CONSTRAINT fk_orders_user_id
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE;
```

---

### 8.5 删除约束

```sql
ALTER TABLE users DROP CONSTRAINT uq_users_email;
```

---

## 9. 索引操作

### 9.1 查看索引

```text
\di
\di users*
```

---

### 9.2 创建索引

```sql
CREATE INDEX idx_users_email ON users(email);
```

---

### 9.3 创建唯一索引

```sql
CREATE UNIQUE INDEX idx_users_username ON users(username);
```

---

### 9.4 多列索引

```sql
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
```

---

### 9.5 部分索引

```sql
CREATE INDEX idx_users_active ON users(id) WHERE is_active = true;
```

---

### 9.6 表达式索引

```sql
CREATE INDEX idx_users_lower_email ON users(LOWER(email));
```

---

### 9.7 并发创建索引

```sql
CREATE INDEX CONCURRENTLY idx_users_email ON users(email);
```

> 注意：不能在事务块中运行。

---

### 9.8 删除索引

```sql
DROP INDEX idx_users_email;
DROP INDEX CONCURRENTLY idx_users_email;
```

---

## 10. 数据查询

### 10.1 基本查询

```sql
SELECT * FROM users;
SELECT id, username FROM users;
```

---

### 10.2 条件查询

```sql
SELECT * FROM users WHERE id = 1;
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE email IS NOT NULL;
```

---

### 10.3 排序

```sql
SELECT * FROM users ORDER BY created_at DESC;
SELECT * FROM users ORDER BY age ASC, id DESC;
```

---

### 10.4 分页

```sql
SELECT * FROM users LIMIT 10;
SELECT * FROM users OFFSET 20;
SELECT * FROM users LIMIT 10 OFFSET 20;
```

---

### 10.5 去重

```sql
SELECT DISTINCT username FROM users;
```

---

### 10.6 聚合查询

```sql
SELECT COUNT(*) FROM users;
SELECT AVG(age) FROM users;
SELECT MIN(age), MAX(age) FROM users;
```

---

### 10.7 分组

```sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status;
```

带筛选：

```sql
SELECT status, COUNT(*)
FROM orders
GROUP BY status
HAVING COUNT(*) > 10;
```

---

### 10.8 连接查询

#### INNER JOIN

```sql
SELECT o.id, u.username
FROM orders o
JOIN users u ON o.user_id = u.id;
```

#### LEFT JOIN

```sql
SELECT u.id, u.username, o.id AS order_id
FROM users u
LEFT JOIN orders o ON o.user_id = u.id;
```

#### RIGHT JOIN

```sql
SELECT *
FROM users u
RIGHT JOIN orders o ON o.user_id = u.id;
```

#### FULL JOIN

```sql
SELECT *
FROM users u
FULL JOIN orders o ON o.user_id = u.id;
```

---

### 10.9 子查询

```sql
SELECT *
FROM users
WHERE id IN (
    SELECT user_id FROM orders WHERE status = 'paid'
);
```

---

### 10.10 EXISTS

```sql
SELECT *
FROM users u
WHERE EXISTS (
    SELECT 1 FROM orders o WHERE o.user_id = u.id
);
```

---

### 10.11 CASE

```sql
SELECT
    id,
    username,
    CASE
        WHEN age < 18 THEN 'minor'
        WHEN age < 60 THEN 'adult'
        ELSE 'senior'
    END AS age_group
FROM users;
```

---

### 10.12 Common Table Expression（CTE）

```sql
WITH active_users AS (
    SELECT * FROM users WHERE is_active = true
)
SELECT * FROM active_users;
```

递归 CTE：

```sql
WITH RECURSIVE t(n) AS (
    VALUES (1)
    UNION ALL
    SELECT n + 1 FROM t WHERE n < 10
)
SELECT * FROM t;
```

---

### 10.13 窗口函数

```sql
SELECT
    id,
    user_id,
    amount,
    ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY created_at DESC) AS rn
FROM orders;
```

---

## 11. 数据写入与修改

### 11.1 插入数据

```sql
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com');
```

插入多行：

```sql
INSERT INTO users (username, email)
VALUES
    ('alice', 'alice@example.com'),
    ('bob', 'bob@example.com');
```

---

### 11.2 返回插入结果

```sql
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com')
RETURNING id, username;
```

---

### 11.3 更新数据

```sql
UPDATE users
SET email = 'new@example.com'
WHERE id = 1;
```

更新多列：

```sql
UPDATE users
SET email = 'new@example.com',
    updated_at = now()
WHERE id = 1;
```

---

### 11.4 删除数据

```sql
DELETE FROM users WHERE id = 1;
```

返回删除的数据：

```sql
DELETE FROM users
WHERE id = 1
RETURNING *;
```

---

### 11.5 UPSERT

```sql
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com')
ON CONFLICT (username)
DO UPDATE SET email = EXCLUDED.email;
```

忽略冲突：

```sql
INSERT INTO users (username, email)
VALUES ('alice', 'alice@example.com')
ON CONFLICT (username)
DO NOTHING;
```

---

## 12. 事务操作

### 12.1 开启事务

```sql
BEGIN;
```

---

### 12.2 提交事务

```sql
COMMIT;
```

---

### 12.3 回滚事务

```sql
ROLLBACK;
```

---

### 12.4 保存点

```sql
SAVEPOINT sp1;
ROLLBACK TO SAVEPOINT sp1;
RELEASE SAVEPOINT sp1;
```

---

### 12.5 查看事务隔离级别

```sql
SHOW transaction_isolation;
```

---

### 12.6 设置事务隔离级别

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
```

---

## 13. 导入导出

### 13.1 执行 SQL 文件

在 shell 中：

```bash
psql -U postgres -d mydb -f init.sql
```

在 `psql` 中：

```text
\i init.sql
```

---

### 13.2 导出查询结果到文件

```text
\o output.txt
SELECT * FROM users;
\o
```

---

### 13.3 使用 `COPY`

数据库服务器侧：

```sql
COPY users TO '/tmp/users.csv' CSV HEADER;
COPY users(username, email) TO '/tmp/users.csv' CSV HEADER;
```

导入：

```sql
COPY users(username, email) FROM '/tmp/users.csv' CSV HEADER;
```

> 这是服务器文件路径，需要数据库服务器进程可访问。

---

### 13.4 使用 `\copy`

客户端侧，更常用：

```text
\copy users TO 'users.csv' CSV HEADER
\copy users(username, email) TO 'users.csv' CSV HEADER
\copy users(username, email) FROM 'users.csv' CSV HEADER
```

---

## 14. 输出格式控制

### 14.1 开启扩展显示

```text
\x
```

自动扩展显示：

```text
\x auto
```

---

### 14.2 设置边框

```text
\pset border 2
```

---

### 14.3 设置空值显示

```text
\pset null '(null)'
```

---

### 14.4 关闭分页器

```text
\pset pager off
```

---

### 14.5 对齐显示/非对齐显示

```text
\a
```

---

### 14.6 设置字段分隔符

```text
\f ','
```

---

### 14.7 HTML 输出

```text
\H
```

---

### 14.8 计时

```text
\timing
```

---

## 15. 脚本与变量

### 15.1 定义变量

```text
\set myvar 123
```

使用变量：

```sql
SELECT :myvar;
```

字符串变量：

```text
\set name 'alice'
SELECT :'name';
```

---

### 15.2 输出文本

```text
\echo hello
\echo :myvar
```

---

### 15.3 条件执行

```text
\if :{?myvar}
\echo variable exists
\else
\echo variable not exists
\endif
```

---

## 16. 用户、角色、权限管理

### 16.1 列出角色

```text
\du
```

---

### 16.2 创建角色

```sql
CREATE ROLE myuser;
```

创建可登录用户：

```sql
CREATE ROLE myuser LOGIN PASSWORD 'secret';
```

或：

```sql
CREATE USER myuser WITH PASSWORD 'secret';
```

---

### 16.3 修改密码

```sql
ALTER USER myuser WITH PASSWORD 'new_secret';
```

---

### 16.4 授权数据库连接

```sql
GRANT CONNECT ON DATABASE mydb TO myuser;
```

---

### 16.5 授权 schema 使用权限

```sql
GRANT USAGE ON SCHEMA public TO myuser;
```

---

### 16.6 授权表权限

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE users TO myuser;
```

对所有表：

```sql
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO myuser;
```

---

### 16.7 授权序列权限

```sql
GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO myuser;
```

---

### 16.8 回收权限

```sql
REVOKE ALL ON TABLE users FROM myuser;
```

---

### 16.9 默认权限

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO myuser;
```

---

## 17. 查看执行计划与性能分析

### 17.1 EXPLAIN

```sql
EXPLAIN SELECT * FROM users WHERE email = 'a@example.com';
```

---

### 17.2 EXPLAIN ANALYZE

```sql
EXPLAIN ANALYZE
SELECT * FROM users WHERE email = 'a@example.com';
```

---

### 17.3 缓冲区信息

```sql
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM users WHERE email = 'a@example.com';
```

---

## 18. 监控与系统查询

### 18.1 查看当前会话

```sql
SELECT * FROM pg_stat_activity;
```

---

### 18.2 查看锁

```sql
SELECT * FROM pg_locks;
```

---

### 18.3 终止会话

先查 pid：

```sql
SELECT pid, usename, datname, state, query
FROM pg_stat_activity;
```

终止：

```sql
SELECT pg_terminate_backend(pid);
```

---

### 18.4 取消查询

```sql
SELECT pg_cancel_backend(pid);
```

---

## 19. 常见实用技巧

### 19.1 查看最近命令历史

shell 中通常可用：

```bash
history | grep psql
```

`psql` 内部也会记录到历史文件。

---

### 19.2 单行模式执行

```bash
psql -U postgres -d mydb -c "SELECT now();"
```

---

### 19.3 不加载 `psqlrc`

```bash
psql -X -U postgres -d mydb
```

---

### 19.4 只输出结果，适合脚本

```bash
psql -At -d mydb -c "SELECT count(*) FROM users;"
```

常见参数：
- `-A`：非对齐输出
- `-t`：只输出数据，不要表头
- `-q`：安静模式

---

## 20. `psql` 速查表

### 常用元命令

```text
\l              列出数据库
\c dbname       切换数据库
\dn             列出 schema
\dt             列出表
\dv             列出视图
\di             列出索引
\d tablename    查看表结构
\d+ tablename   查看详细表结构
\du             列出角色
\conninfo       当前连接信息
\h SQL命令      SQL 帮助
\?              psql 元命令帮助
\i file.sql     执行 SQL 文件
\timing         开启/关闭计时
\x auto         自动扩展显示
\q              退出
```

---

# 二、SQLAlchemy 2 数据库操作指南

下面以 **SQLAlchemy 2.x 风格** 为主，覆盖：

- Engine
- Connection
- Transaction
- Core
- ORM
- Session
- 查询、增删改查
- 关系、加载策略
- PostgreSQL 常用扩展写法
- 异步版基础

---

## 1. 安装

### PostgreSQL 驱动

常见：

```bash
pip install sqlalchemy psycopg[binary]
```

或者：

```bash
pip install sqlalchemy psycopg2-binary
```

如果用异步：

```bash
pip install sqlalchemy asyncpg
```

---

## 2. 创建 Engine

### 2.1 同步 Engine

```python
from sqlalchemy import create_engine

engine = create_engine(
    "postgresql+psycopg://postgres:secret@localhost:5432/mydb",
    echo=True,
)
```

---

### 2.2 常见参数

```python
engine = create_engine(
    "postgresql+psycopg://postgres:secret@localhost:5432/mydb",
    echo=True,              # 打印 SQL
    future=True,            # 2.x 中通常可省略
    pool_size=10,
    max_overflow=20,
    pool_timeout=30,
    pool_recycle=1800,
    pool_pre_ping=True,
)
```

---

## 3. 连接与执行 SQL

### 3.1 获取连接

```python
from sqlalchemy import text

with engine.connect() as conn:
    result = conn.execute(text("SELECT 1"))
    print(result.scalar())
```

---

### 3.2 执行原生 SQL

```python
with engine.connect() as conn:
    result = conn.execute(
        text("SELECT * FROM users WHERE id = :id"),
        {"id": 1}
    )
    rows = result.all()
    print(rows)
```

---

### 3.3 提交事务

`engine.connect()` 默认需要手动提交 DML：

```python
with engine.connect() as conn:
    conn.execute(text("INSERT INTO users (username) VALUES (:u)"), {"u": "alice"})
    conn.commit()
```

---

### 3.4 自动事务块

```python
with engine.begin() as conn:
    conn.execute(text("INSERT INTO users (username) VALUES (:u)"), {"u": "alice"})
```

> `begin()` 成功自动提交，异常自动回滚。

---

## 4. Metadata 与表定义（Core）

---

## 5. 定义表

```python
from sqlalchemy import (
    MetaData, Table, Column, Integer, BigInteger, String,
    Boolean, DateTime, ForeignKey, Text, Numeric
)
from sqlalchemy.sql import func

metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id", BigInteger, primary_key=True),
    Column("username", String(50), nullable=False, unique=True, index=True),
    Column("email", String(255)),
    Column("is_active", Boolean, nullable=False, server_default="true"),
    Column("created_at", DateTime, nullable=False, server_default=func.now()),
)

orders = Table(
    "orders",
    metadata,
    Column("id", BigInteger, primary_key=True),
    Column("user_id", ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
    Column("amount", Numeric(10, 2), nullable=False),
    Column("status", String(20), nullable=False),
)
```

---

## 6. 创建/删除表

```python
metadata.create_all(engine)
metadata.drop_all(engine)
```

只创建部分表：

```python
metadata.create_all(engine, tables=[users])
```

---

## 7. 插入数据（Core）

### 7.1 单条插入

```python
from sqlalchemy import insert

stmt = insert(users).values(username="alice", email="alice@example.com")

with engine.begin() as conn:
    result = conn.execute(stmt)
```

---

### 7.2 多条插入

```python
stmt = insert(users)

data = [
    {"username": "alice", "email": "alice@example.com"},
    {"username": "bob", "email": "bob@example.com"},
]

with engine.begin() as conn:
    conn.execute(stmt, data)
```

---

### 7.3 `RETURNING`

```python
stmt = (
    insert(users)
    .values(username="alice", email="alice@example.com")
    .returning(users.c.id, users.c.username)
)

with engine.begin() as conn:
    row = conn.execute(stmt).first()
    print(row)
```

---

## 8. 查询数据（Core）

### 8.1 基本查询

```python
from sqlalchemy import select

stmt = select(users)

with engine.connect() as conn:
    rows = conn.execute(stmt).all()
    print(rows)
```

---

### 8.2 选择部分列

```python
stmt = select(users.c.id, users.c.username)
```

---

### 8.3 条件过滤

```python
stmt = select(users).where(users.c.id == 1)
stmt = select(users).where(users.c.age >= 18)
stmt = select(users).where(users.c.email.is_not(None))
```

---

### 8.4 多条件

```python
from sqlalchemy import and_, or_

stmt = select(users).where(
    and_(
        users.c.is_active.is_(True),
        users.c.email.is_not(None),
    )
)

stmt = select(users).where(
    or_(
        users.c.username == "alice",
        users.c.username == "bob",
    )
)
```

---

### 8.5 排序与分页

```python
stmt = select(users).order_by(users.c.created_at.desc())
stmt = select(users).limit(10).offset(20)
```

---

### 8.6 去重

```python
stmt = select(users.c.username).distinct()
```

---

### 8.7 聚合

```python
from sqlalchemy import func

stmt = select(func.count()).select_from(users)
stmt = select(func.avg(users.c.age))
stmt = select(func.min(users.c.age), func.max(users.c.age))
```

---

### 8.8 分组

```python
stmt = (
    select(orders.c.status, func.count())
    .group_by(orders.c.status)
    .having(func.count() > 10)
)
```

---

### 8.9 JOIN

```python
stmt = (
    select(orders.c.id, users.c.username)
    .select_from(orders.join(users, orders.c.user_id == users.c.id))
)
```

左连接：

```python
stmt = (
    select(users.c.id, users.c.username, orders.c.id.label("order_id"))
    .select_from(users.outerjoin(orders, users.c.id == orders.c.user_id))
)
```

---

### 8.10 子查询

```python
subq = select(orders.c.user_id).where(orders.c.status == "paid")

stmt = select(users).where(users.c.id.in_(subq))
```

---

### 8.11 EXISTS

```python
from sqlalchemy import exists

stmt = select(users).where(
    exists(
        select(1).where(orders.c.user_id == users.c.id)
    )
)
```

---

### 8.12 CTE

```python
active_users = select(users).where(users.c.is_active.is_(True)).cte("active_users")
stmt = select(active_users)
```

---

### 8.13 窗口函数

```python
stmt = select(
    orders.c.id,
    orders.c.user_id,
    orders.c.amount,
    func.row_number().over(
        partition_by=orders.c.user_id,
        order_by=orders.c.id.desc()
    ).label("rn")
)
```

---

## 9. 更新数据（Core）

```python
from sqlalchemy import update

stmt = (
    update(users)
    .where(users.c.id == 1)
    .values(email="new@example.com")
)

with engine.begin() as conn:
    conn.execute(stmt)
```

返回更新结果：

```python
stmt = (
    update(users)
    .where(users.c.id == 1)
    .values(email="new@example.com")
    .returning(users.c.id, users.c.email)
)
```

---

## 10. 删除数据（Core）

```python
from sqlalchemy import delete

stmt = delete(users).where(users.c.id == 1)

with engine.begin() as conn:
    conn.execute(stmt)
```

返回删除结果：

```python
stmt = delete(users).where(users.c.id == 1).returning(users.c.id)
```

---

## 11. PostgreSQL UPSERT（Core）

```python
from sqlalchemy.dialects.postgresql import insert

stmt = insert(users).values(
    username="alice",
    email="alice@example.com"
)

stmt = stmt.on_conflict_do_update(
    index_elements=[users.c.username],
    set_={"email": stmt.excluded.email}
)

with engine.begin() as conn:
    conn.execute(stmt)
```

忽略冲突：

```python
stmt = insert(users).values(
    username="alice",
    email="alice@example.com"
).on_conflict_do_nothing(
    index_elements=[users.c.username]
)
```

---

## 12. ORM 映射定义（SQLAlchemy 2 风格）

---

## 13. Declarative Base

```python
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

from sqlalchemy import String, ForeignKey, DateTime, Numeric, Boolean, func
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass
```

---

## 14. 定义模型

```python
class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[Optional[str]] = mapped_column(String(255))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, server_default="true")
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())

    orders: Mapped[List["Order"]] = relationship(
        back_populates="user",
        cascade="all, delete-orphan"
    )


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    amount: Mapped[Decimal] = mapped_column(Numeric(10, 2))
    status: Mapped[str] = mapped_column(String(20))

    user: Mapped["User"] = relationship(back_populates="orders")
```

---

## 15. 创建表（ORM）

```python
Base.metadata.create_all(engine)
Base.metadata.drop_all(engine)
```

---

## 16. Session 创建

```python
from sqlalchemy.orm import Session, sessionmaker

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

with SessionLocal() as session:
    pass
```

也可以直接：

```python
with Session(engine) as session:
    pass
```

---

## 17. 新增数据（ORM）

### 17.1 单个对象

```python
with Session(engine) as session:
    user = User(username="alice", email="alice@example.com")
    session.add(user)
    session.commit()
    print(user.id)
```

---

### 17.2 批量新增多个对象

```python
with Session(engine) as session:
    users = [
        User(username="alice", email="alice@example.com"),
        User(username="bob", email="bob@example.com"),
    ]
    session.add_all(users)
    session.commit()
```

---

### 17.3 带事务自动控制

```python
with Session(engine) as session:
    with session.begin():
        session.add(User(username="alice"))
        session.add(User(username="bob"))
```

---

## 18. 查询数据（ORM）

### 18.1 查询全部

```python
from sqlalchemy import select

with Session(engine) as session:
    users = session.execute(select(User)).scalars().all()
```

---

### 18.2 查询单条

```python
with Session(engine) as session:
    user = session.get(User, 1)
```

---

### 18.3 条件查询

```python
with Session(engine) as session:
    stmt = select(User).where(User.username == "alice")
    user = session.execute(stmt).scalar_one_or_none()
```

---

### 18.4 查询第一条

```python
user = session.execute(select(User).where(User.username == "alice")).scalars().first()
```

---

### 18.5 精确一条

```python
user = session.execute(select(User).where(User.username == "alice")).scalar_one()
```

如果不存在或多条都会抛异常。

---

### 18.6 一条或空

```python
user = session.execute(select(User).where(User.username == "alice")).scalar_one_or_none()
```

---

### 18.7 排序分页

```python
stmt = select(User).order_by(User.created_at.desc()).limit(10).offset(20)
users = session.execute(stmt).scalars().all()
```

---

### 18.8 聚合查询

```python
stmt = select(func.count()).select_from(User)
count = session.execute(stmt).scalar_one()
```

---

### 18.9 指定列查询

```python
stmt = select(User.id, User.username)
rows = session.execute(stmt).all()
```

---

### 18.10 JOIN 查询

```python
stmt = select(Order, User).join(User, Order.user_id == User.id)
rows = session.execute(stmt).all()
```

---

## 19. 更新数据（ORM）

### 19.1 先查后改

```python
with Session(engine) as session:
    user = session.get(User, 1)
    if user:
        user.email = "new@example.com"
        session.commit()
```

---

### 19.2 使用 `update`

```python
from sqlalchemy import update

with Session(engine) as session:
    session.execute(
        update(User)
        .where(User.id == 1)
        .values(email="new@example.com")
    )
    session.commit()
```

---

## 20. 删除数据（ORM）

### 20.1 删除对象

```python
with Session(engine) as session:
    user = session.get(User, 1)
    if user:
        session.delete(user)
        session.commit()
```

---

### 20.2 批量删除

```python
from sqlalchemy import delete

with Session(engine) as session:
    session.execute(delete(User).where(User.is_active.is_(False)))
    session.commit()
```

---

## 21. Session 常用操作

### 21.1 刷新

```python
session.refresh(user)
```

---

### 21.2 flush

```python
session.flush()
```

> `flush()` 会把 SQL 发到数据库，但不一定提交事务。

---

### 21.3 回滚

```python
session.rollback()
```

---

### 21.4 合并 detached 对象

```python
merged_user = session.merge(user)
```

---

### 21.5 expunge

```python
session.expunge(user)
```

---

### 21.6 关闭

```python
session.close()
```

---

## 22. 事务控制（ORM）

### 22.1 基本事务

```python
with Session(engine) as session:
    try:
        user = User(username="alice")
        session.add(user)
        session.commit()
    except:
        session.rollback()
        raise
```

---

### 22.2 `session.begin()`

```python
with Session(engine) as session:
    with session.begin():
        session.add(User(username="alice"))
```

---

### 22.3 嵌套事务 / SAVEPOINT

```python
with Session(engine) as session:
    with session.begin():
        with session.begin_nested():
            session.add(User(username="alice"))
```

---

## 23. 关系操作（ORM）

### 23.1 一对多新增

```python
with Session(engine) as session:
    user = User(
        username="alice",
        orders=[
            Order(amount=100, status="paid"),
            Order(amount=50, status="pending"),
        ]
    )
    session.add(user)
    session.commit()
```

---

### 23.2 通过关系访问

```python
user = session.get(User, 1)
print(user.orders)
```

---

### 23.3 设置反向关系

```python
order = Order(amount=100, status="paid")
order.user = user
```

---

## 24. 关系加载策略

### 24.1 `selectinload`

```python
from sqlalchemy.orm import selectinload

stmt = select(User).options(selectinload(User.orders))
users = session.execute(stmt).scalars().all()
```

---

### 24.2 `joinedload`

```python
from sqlalchemy.orm import joinedload

stmt = select(User).options(joinedload(User.orders))
users = session.execute(stmt).scalars().unique().all()
```

> 对一对多 `joinedload` 常常要配合 `.unique()`。

---

### 24.3 `subqueryload`

```python
from sqlalchemy.orm import subqueryload

stmt = select(User).options(subqueryload(User.orders))
```

---

### 24.4 延迟加载

默认很多关系就是 lazy load。

---

## 25. 常见过滤表达式

```python
User.id == 1
User.id != 1
User.age > 18
User.age >= 18
User.age < 60
User.age <= 60
User.email.is_(None)
User.email.is_not(None)
User.username.in_(["alice", "bob"])
User.username.not_in(["tom"])
User.username.like("%ali%")
User.username.ilike("%ali%")
User.created_at.between(start, end)
```

组合：

```python
from sqlalchemy import and_, or_, not_

and_(User.is_active.is_(True), User.email.is_not(None))
or_(User.username == "alice", User.username == "bob")
not_(User.is_active.is_(True))
```

---

## 26. 排序、标签、函数

```python
select(User).order_by(User.id.desc())
select(User.username.label("name"))
select(func.count(User.id))
select(func.lower(User.email))
select(func.coalesce(User.email, ""))
```

---

## 27. 别名与自连接

```python
from sqlalchemy.orm import aliased

u1 = aliased(User)
u2 = aliased(User)

stmt = select(u1, u2).where(u1.id < u2.id)
```

---

## 28. 子查询、CTE、Union

### 子查询

```python
subq = select(User.id).where(User.is_active.is_(True)).subquery()
stmt = select(subq)
```

### CTE

```python
active_users = select(User).where(User.is_active.is_(True)).cte("active_users")
stmt = select(active_users)
```

### UNION

```python
from sqlalchemy import union_all

stmt = union_all(
    select(User.username).where(User.id < 10),
    select(User.username).where(User.id >= 10),
)
```

---

## 29. 锁与并发控制

### 29.1 行锁

```python
stmt = select(User).where(User.id == 1).with_for_update()
user = session.execute(stmt).scalar_one()
```

### 29.2 常见参数

```python
stmt = select(User).with_for_update(nowait=True)
stmt = select(User).with_for_update(skip_locked=True)
stmt = select(User).with_for_update(of=User)
```

---

## 30. 批量操作

### 30.1 批量插入（推荐 Core 风格）

```python
with engine.begin() as conn:
    conn.execute(
        insert(users),
        [
            {"username": "a"},
            {"username": "b"},
        ],
    )
```

---

### 30.2 ORM 批量执行 SQL

```python
with Session(engine) as session:
    session.execute(
        insert(User),
        [
            {"username": "a"},
            {"username": "b"},
        ],
    )
    session.commit()
```

---

## 31. 原生 SQL 与 ORM 混用

```python
from sqlalchemy import text

with Session(engine) as session:
    result = session.execute(
        text("SELECT id, username FROM users WHERE id = :id"),
        {"id": 1}
    )
    print(result.all())
```

---

## 32. PostgreSQL 特性写法

### 32.1 JSON / JSONB

```python
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy import cast

class Event(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True)
    payload: Mapped[dict] = mapped_column(JSONB)
```

查询 JSON 字段：

```python
stmt = select(Event).where(Event.payload["type"].astext == "login")
```

---

### 32.2 ARRAY

```python
from sqlalchemy.dialects.postgresql import ARRAY

class Article(Base):
    __tablename__ = "articles"

    id: Mapped[int] = mapped_column(primary_key=True)
    tags: Mapped[list[str]] = mapped_column(ARRAY(String))
```

查询：

```python
stmt = select(Article).where(Article.tags.contains(["python"]))
```

---

### 32.3 UUID

```python
import uuid
from sqlalchemy.dialects.postgresql import UUID

class Task(Base):
    __tablename__ = "tasks"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
```

---

### 32.4 ENUM

```python
from enum import Enum
from sqlalchemy import Enum as SAEnum

class OrderStatus(str, Enum):
    pending = "pending"
    paid = "paid"
    cancelled = "cancelled"


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    status: Mapped[OrderStatus] = mapped_column(SAEnum(OrderStatus, name="order_status"))
```

---

## 33. 结果对象常用方法

### 33.1 Core / Session.execute 返回的 Result

```python
result = session.execute(select(User))
```

常用方法：

```python
result.all()
result.first()
result.one()
result.one_or_none()
result.scalar()
result.scalar_one()
result.scalar_one_or_none()
result.scalars().all()
result.mappings().all()
```

---

## 34. 执行选项

```python
stmt = select(User).execution_options(populate_existing=True)
```

连接级别：

```python
with engine.connect().execution_options(stream_results=True) as conn:
    result = conn.execute(select(users))
```

---

## 35. 异步 SQLAlchemy 2

如果你使用 FastAPI / asyncio，通常会用异步版。

---

## 36. 创建异步 Engine

```python
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

async_engine = create_async_engine(
    "postgresql+asyncpg://postgres:secret@localhost:5432/mydb",
    echo=True,
)

AsyncSessionLocal = async_sessionmaker(
    bind=async_engine,
    expire_on_commit=False,
)
```

---

## 37. 异步创建表

```python
async with async_engine.begin() as conn:
    await conn.run_sync(Base.metadata.create_all)
```

---

## 38. 异步新增查询

```python
from sqlalchemy import select

async with AsyncSessionLocal() as session:
    user = User(username="alice")
    session.add(user)
    await session.commit()
```

查询：

```python
async with AsyncSessionLocal() as session:
    result = await session.execute(select(User))
    users = result.scalars().all()
```

---

## 39. 异步事务

```python
async with AsyncSessionLocal() as session:
    async with session.begin():
        session.add(User(username="alice"))
        session.add(User(username="bob"))
```

---

## 40. SQLAlchemy 2 常用速查表

---

## 40.1 Engine / Connection

```python
engine = create_engine(DB_URL, echo=True)
with engine.connect() as conn:
    result = conn.execute(text("SELECT 1"))
    conn.commit()

with engine.begin() as conn:
    conn.execute(text("INSERT INTO users(username) VALUES ('alice')"))
```

---

## 40.2 Core

```python
select(users)
insert(users).values(username="alice")
update(users).where(users.c.id == 1).values(username="bob")
delete(users).where(users.c.id == 1)
```

---

## 40.3 ORM

```python
session.add(obj)
session.add_all([obj1, obj2])
session.get(User, 1)
session.execute(select(User)).scalars().all()
session.commit()
session.rollback()
session.refresh(obj)
session.delete(obj)
```

---

## 40.4 常见查询

```python
select(User).where(User.id == 1)
select(User).order_by(User.id.desc())
select(func.count()).select_from(User)
select(User).limit(10).offset(20)
select(User).options(selectinload(User.orders))
select(User).with_for_update()
```

---

# 三、`psql` 与 SQLAlchemy 2 对照理解

| 场景 | psql / SQL | SQLAlchemy 2 |
|---|---|---|
| 查全部 | `SELECT * FROM users;` | `select(User)` |
| 查一条 | `SELECT * FROM users WHERE id=1;` | `select(User).where(User.id == 1)` / `session.get(User, 1)` |
| 插入 | `INSERT INTO users ...` | `insert(users).values(...)` / `session.add(User(...))` |
| 更新 | `UPDATE users SET ... WHERE ...` | `update(User).where(...).values(...)` |
| 删除 | `DELETE FROM users WHERE ...` | `delete(User).where(...)` |
| 事务 | `BEGIN/COMMIT/ROLLBACK` | `session.begin()` / `commit()` / `rollback()` |
| 查看表结构 | `\d users` | `inspect(engine).get_columns("users")` |
| 导入 SQL 文件 | `\i file.sql` | 一般在外部执行，不常由 SQLAlchemy 直接替代 |

---

# 四、补充：非常实用但经常遗漏的 SQLAlchemy 2 命令

---

## 41. inspect 反射数据库结构

```python
from sqlalchemy import inspect

insp = inspect(engine)

print(insp.get_schema_names())
print(insp.get_table_names())
print(insp.get_columns("users"))
print(insp.get_pk_constraint("users"))
print(insp.get_foreign_keys("orders"))
print(insp.get_indexes("users"))
```

---

## 42. 反射已有表

```python
from sqlalchemy import MetaData, Table

metadata = MetaData()
users = Table("users", metadata, autoload_with=engine)
```

---

## 43. 编译 SQL 看最终语句

```python
stmt = select(User).where(User.id == 1)
print(stmt)
print(stmt.compile(engine))
print(stmt.compile(engine, compile_kwargs={"literal_binds": True}))
```

---

## 44. 事件监听

```python
from sqlalchemy import event

@event.listens_for(engine, "connect")
def on_connect(dbapi_connection, connection_record):
    print("db connected")
```

---

## 45. Session 状态对象

```python
session.new
session.dirty
session.deleted
session.identity_map
```

---

## 46. 对象是否存在于 session

```python
obj in session
```

---

## 47. 延迟加载列

```python
from sqlalchemy.orm import defer

stmt = select(User).options(defer(User.email))
```

---

## 48. 只加载部分列

```python
from sqlalchemy.orm import load_only

stmt = select(User).options(load_only(User.id, User.username))
```

---

## 49. 显式刷新并加锁

```python
session.refresh(user, with_for_update=True)
```

---

## 50. 执行存储过程/函数

PostgreSQL 函数：

```python
result = session.execute(text("SELECT my_func(:x)"), {"x": 123})
print(result.scalar_one())
```

---

# 五、推荐实践

## `psql` 推荐习惯

- 常开：
  - `\x auto`
  - `\timing`
- 查结构常用：
  - `\d 表名`
  - `\d+ 表名`
- 导入导出优先：
  - `\copy`
- 看问题先跑：
  - `EXPLAIN ANALYZE`

---

## SQLAlchemy 2 推荐习惯

- 新项目优先使用 **2.x 风格**
- 写查询统一用 `select(...)`
- ORM 查询结果常用：
  - `.scalars().all()`
  - `.scalar_one_or_none()`
- 批量插入优先用 Core `insert`
- PostgreSQL UPSERT 用：
  - `sqlalchemy.dialects.postgresql.insert`
- Web 项目里建议：
  - 每请求一个 Session
  - `expire_on_commit=False`
- 避免 N+1：
  - `selectinload`
  - `joinedload`

---

# 六、如果你想要“真正尽可能全面”，还可以继续扩展的方向

我还能继续给你补下面这些内容：

1. **PostgreSQL 常用 SQL 完整手册版**
   - DDL / DML / DCL / TCL 全部分类
   - 视图、物化视图、触发器、函数、序列、分区表、继承表

2. **SQLAlchemy 2 高级专题**
   - 复杂关联查询
   - 多表关联与子查询实战
   - hybrid_property
   - association_proxy
   - 事件系统
   - 自定义类型 TypeDecorator
   - Alembic 迁移命令

3. **psql + PostgreSQL 运维常用命令**
   - 备份恢复：`pg_dump`、`pg_restore`
   - 用户权限体系
   - 锁排查、慢查询排查、连接数排查
