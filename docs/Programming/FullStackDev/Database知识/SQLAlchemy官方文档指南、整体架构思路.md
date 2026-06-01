下面我会把你这个问题分成 4 大部分讲清楚：

1. **你这段查询到底算 Core 还是 ORM**
2. **`select()` 返回的对象到底是什么、常见有哪些方法**
3. **怎么用 SQLAlchemy 官方文档快速定位你要的内容**
4. **SQLAlchemy 2 的整体架构思路：几大模块分别解决什么问题**

你这个问题问得非常好，因为一旦把这套“地图”建立起来，后面你就不会再陷入：

- “这个 API 到底在哪看？”
- “这个写法是 Core 还是 ORM？”
- “我现在应该查哪部分文档？”

这种混乱了。

---

# 一、你这段查询到底算 Core 还是 ORM？

你这段代码：

````python
stmt = (
    select(
        User.id,
        User.username,
        Employee.name
    )
    .outerjoin(Employee, User.id == Employee.user_id)
)
result = await db.execute(stmt)
users = result.mappings().all()
````

---

## 1. 先说结论

这段写法更准确地说是：

> **ORM-enabled select 写法**
> 或者叫：
> **SQLAlchemy 2 统一查询风格下的 SQL Expression / ORM 混合风格**

它**不是“纯 ORM 实体查询”**，但也**不是传统意义上纯 Core 表级查询**。

---

## 2. 为什么不是“纯 Core”

因为你这里用的是：

- `User.id`
- `User.username`
- `Employee.name`

如果 `User` 和 `Employee` 是 ORM 映射类，那么这些列属性来自 **ORM mapped class**，不是 `Table.c.column` 这种纯 Core 表达。

纯 Core 更像这样：

````python
stmt = select(users_table.c.id, users_table.c.username, employees_table.c.name)
````

这里的 `users_table`、`employees_table` 是 `Table` 对象。

---

## 3. 为什么又不算典型 ORM 对象查询

典型 ORM 查询通常是：

````python
stmt = select(User)
result = await db.execute(stmt)
users = result.scalars().all()
````

这里返回的是 **`User` 实体对象**。

而你这里：

````python
select(User.id, User.username, Employee.name)
````

你查的是**列**，不是实体类本身。  
所以结果不是 ORM 实体对象，而是行结果。你才会用：

````python
result.mappings().all()
````

这说明你想拿的是：

```python
[
    {"id": 1, "username": "tom", "name": "Tom Employee"},
    ...
]
```

---

## 4. 所以它到底该怎么归类最准确

最准确的理解方式是：

### 这属于：

- **SQLAlchemy 2 的统一 `select()` 语法**
- 使用的是 **ORM 映射类属性**
- 但结果是 **列结果集**，不是 ORM 实体对象
- 执行器是 `Session/AsyncSession.execute()`，因此属于 **ORM 上下文中的 SQL 表达式查询**

所以你可以这样记：

> **“你写的是 ORM 类列属性的 select 列查询，不是纯实体 ORM 查询，也不是纯 Table Core 查询。”**

---

## 5. 一个最实用的判断标准

你可以用下面这套判断法：

---

### A. 如果你 `select(User)` 或 `select(User, Employee)`
通常偏 ORM 实体查询

结果常配：
- `.scalars()`
- `.all()`
- `.unique()`

---

### B. 如果你 `select(User.id, User.username, Employee.name)`
通常偏列查询 / 行查询

结果常配：
- `.all()`
- `.mappings().all()`
- `.first()`

---

### C. 如果你 `select(user_table.c.id, user_table.c.username)`
通常偏纯 Core

---

# 二、你这段代码的结果为什么用 `mappings()` 很合理

你现在这段查询：

````python
stmt = (
    select(
        User.id,
        User.username,
        Employee.name
    )
    .outerjoin(Employee, User.id == Employee.user_id)
)
result = await db.execute(stmt)
users = result.mappings().all()
````

如果你直接 `.all()`，结果通常像：

```python
[(1, "tom", "Tom Employee"), (2, "jack", None)]
```

这当然也能用，但可读性不够好。

而 `.mappings().all()` 会更适合 API 层：

```python
[
    {"id": 1, "username": "tom", "name": "Tom Employee"},
    {"id": 2, "username": "jack", "name": None},
]
```

这在 FastAPI 里非常常见。

---

# 三、`select()` 返回的对象到底是什么

`select(...)` 返回的是一个：

> **`Select` 对象**

它属于 SQLAlchemy 的 **SQL Expression Language** 体系。

你可以把它理解成：

> **一棵“尚未执行”的 SQL 语句构造对象**

它不是结果，也不是连接，它只是“SQL 的抽象表示”。

---

## 1. `Select` 对象的本质

比如：

````python
stmt = select(User.id, User.username)
````

此时 `stmt` 不是查询结果，而是一个“待编译 SQL”对象。

你可以：

- 继续加 `where()`
- 加 `join()`
- 加 `order_by()`
- 加 `limit()`
- 加 `options()`
- 最后交给 `Session.execute()` / `Connection.execute()`

---

## 2. 你可以把 `Select` 理解成“可链式拼装 SQL 的 builder”

像这样：

````python
stmt = (
    select(User)
    .where(User.is_active.is_(True))
    .order_by(User.id.desc())
    .limit(20)
)
````

每一步都在返回一个新的 SQL 表达式对象。

---

# 四、`Select` 对象常用方法到底有哪些

你说得对，`Select` 上方法很多，初学时很容易被吓到。

所以不要试图背全，要按**用途分类记忆**。

---

## 1. 最常用方法：按“作用类别”记

---

### 第一类：选择什么

#### `select(...)`
创建查询

#### `add_columns()`
追加列

````python
stmt = select(User.id).add_columns(User.username)
````

#### `with_only_columns()`
替换列列表

---

### 第二类：过滤条件

#### `where()`

````python
stmt = select(User).where(User.id == 1)
````

#### `filter()`
ORM 习惯写法，底层也是条件过滤  
在 2.x 里更推荐统一理解 `where()`。

#### `filter_by()`
按属性名简写

````python
stmt = select(User).filter_by(username="tom")
````

---

### 第三类：联表

#### `join()`

````python
stmt = select(User).join(User.orders)
````

#### `outerjoin()`

````python
stmt = select(User).outerjoin(Employee, User.id == Employee.user_id)
````

#### `join_from()`
指定 join 起点

#### `select_from()`
显式指定 from 子句

---

### 第四类：排序分页

#### `order_by()`

````python
stmt = select(User).order_by(User.id.desc())
````

#### `limit()`

#### `offset()`

#### `slice()`

---

### 第五类：分组聚合

#### `group_by()`

#### `having()`

---

### 第六类：去重与集合

#### `distinct()`

#### `union()`

#### `union_all()`

#### `except_()`

#### `intersect()`

---

### 第七类：子查询与 CTE

#### `subquery()`

#### `cte()`

#### `scalar_subquery()`

#### `exists()`

---

### 第八类：ORM 加载选项

#### `options()`

只有 ORM 语境下很关键：

````python
stmt = select(User).options(selectinload(User.orders))
````

---

### 第九类：锁和执行选项

#### `with_for_update()`

#### `execution_options()`

---

# 五、你不需要背 API，要学会“按问题找文档”

这是最关键的部分。

你真正该掌握的不是所有方法，而是：

> **“我现在遇到的问题属于哪一类，然后去查对应文档章节。”**

这才是老鸟用文档的方式。

---

# 六、SQLAlchemy 2 的几大模块架构地图

下面我给你一个“脑图级别”的架构视图。

---

## 1. Engine / Connection / Pool

### 这一层解决什么问题？
- 如何连接数据库
- 如何管理连接池
- 如何执行 SQL
- 如何控制事务边界（底层）

### 核心对象
- `Engine`
- `Connection`
- Pool

### 你什么时候看这部分文档？
当你遇到这些问题时：

- 数据库 URL 怎么写？
- 连接池参数怎么调？
- `create_engine()` 参数有哪些？
- 连接超时、断线重连怎么处理？
- 如何直接执行 SQL？

### 官方文档关键词
- **Engine Configuration**
- **Working with Engines and Connections**
- **Connection Pooling**

---

## 2. SQL Expression Language（Core）

### 这一层解决什么问题？
- 如何用 Python 构造 SQL
- 如何表示表、列、条件、join、子查询、CTE
- 如何做 insert/update/delete/select

### 核心对象
- `Table`
- `Column`
- `select()`
- `insert()`
- `update()`
- `delete()`
- `func`
- `text`

### 你什么时候看这部分文档？
当你遇到：

- `select()` 怎么联表？
- 子查询怎么写？
- `group by` / `having` 怎么写？
- `cte()` 怎么写？
- `case` / `func.count()` 怎么写？
- 我要写复杂 SQL，不一定关心 ORM 对象

### 官方文档关键词
- **SQL Expression Language Tutorial**
- **SELECT and Related Constructs**
- **SQL Statements and Expressions API**

---

## 3. ORM 映射层

### 这一层解决什么问题？
- Python 类如何映射成数据库表
- 字段如何映射
- 关系如何定义
- 一对多、多对一、多对多怎么表示

### 核心对象
- `DeclarativeBase`
- `Mapped`
- `mapped_column`
- `relationship`

### 你什么时候看这部分文档？
当你遇到：

- 模型怎么定义？
- 一对一、一对多、多对多怎么写？
- `back_populates` 是什么？
- `cascade` 怎么用？
- `foreign_keys` 怎么指定？
- `uselist=False` 是什么？

### 官方文档关键词
- **ORM Declarative Mapping**
- **Relationship Configuration**
- **Mapped Class Configuration**

---

## 4. ORM Querying / Loader Strategies

### 这一层解决什么问题？
- ORM 查询怎么写
- `select(User)` 怎么拿对象
- `options(selectinload(...))` 是什么意思
- 如何避免 N+1
- join 和 eager load 怎么配合

### 核心对象
- `select(User)`
- `Session.execute()`
- `selectinload`
- `joinedload`
- `contains_eager`
- `load_only`

### 你什么时候看这部分文档？
当你遇到：

- `selectinload` 和 `joinedload` 的区别？
- 查询关联数据怎么写？
- 如何分页并预加载？
- 查询结果为什么重复？
- `unique()` 为什么要加？
- `contains_eager()` 什么时候用？

### 官方文档关键词
- **ORM Querying Guide**
- **Relationship Loading Techniques**
- **Column Loading Options**

---

## 5. Session / Transaction

### 这一层解决什么问题？
- ORM 中事务怎么管理
- 对象状态怎么管理
- `commit()` / `flush()` / `rollback()` 的区别
- 请求级 Session 怎么设计

### 核心对象
- `Session`
- `AsyncSession`
- `sessionmaker`
- `flush`
- `commit`
- `rollback`

### 你什么时候看这部分文档？
当你遇到：

- 为什么 `add()` 后数据库还没变？
- `flush()` 和 `commit()` 有什么区别？
- 为什么 Session 不能全局共享？
- FastAPI 里 Session 怎么写？
- detached / persistent / pending 是什么？

### 官方文档关键词
- **Using the Session**
- **Session Basics**
- **Transactions and Connection Management**
- **State Management**

---

## 6. AsyncIO 扩展

### 这一层解决什么问题？
- 异步引擎
- 异步 Session
- `await session.execute()`
- FastAPI / asyncio 场景下怎么用

### 核心对象
- `create_async_engine`
- `AsyncSession`
- `async_sessionmaker`

### 你什么时候看这部分文档？
当你遇到：

- `AsyncSession` 怎么创建？
- 异步版 `commit()` / `refresh()` 怎么用？
- `run_sync()` 干嘛的？
- 异步项目里怎么初始化表？

### 官方文档关键词
- **AsyncIO Support**

---

## 7. Dialects（方言）

### 这一层解决什么问题？
- 各数据库的专属特性
- PostgreSQL / MySQL / SQLite 的差异
- `JSONB`、`ARRAY`、`UUID`、`ON CONFLICT` 等等

### 你什么时候看这部分文档？
当你遇到：

- PostgreSQL `insert().on_conflict_do_update()` 怎么写？
- JSONB 查询怎么写？
- UUID 类型怎么配？
- MySQL 的特殊语法怎么支持？

### 官方文档关键词
- **Dialects**
- **PostgreSQL Dialect**

---

# 七、一个“问题 -> 去哪看”的速查地图

这个非常实用，我给你直接做成查阅表。

| 你遇到的问题                                          | 去看哪部分文档                                  |
| ----------------------------------------------- | ---------------------------------------- |
| 数据库 URL 怎么配、连接池怎么调                              | Engine / Connection / Pool               |
| 想直接执行 SQL 或 text                                | Engine / Connection / Core               |
| `select()` / `join()` / `group_by()` / 子查询怎么写   | SQL Expression Language                  |
| ORM 模型、外键、relationship 怎么定义                     | ORM Mapping / Relationship Configuration |
| `select(User)`、`options()`、`selectinload()` 怎么写 | ORM Querying Guide                       |
| `Session.commit()` / `flush()` / `rollback()`   | Session Basics                           |
| 异步版 `AsyncSession` 怎么用                          | AsyncIO Support                          |
| PostgreSQL UPSERT / JSONB / ARRAY               | Dialects / PostgreSQL                    |

---

# 八、怎么在官方文档里快速查到你要的内容

你真正需要的是“查找策略”，不是死记目录。

---

## 1. 先分辨你现在的问题属于哪一层

先问自己：

### 我现在是在问：
- 连接数据库？
- 写 SQL 表达式？
- 定义模型关系？
- 做 ORM 查询？
- 管理 Session？
- 用异步？
- 用 PostgreSQL 专属特性？

只要先分层，文档范围就已经缩小很多。

---

## 2. SQLAlchemy 官方文档最值得优先看的几个入口

如果你要快速上手，我建议优先记住这几个总入口：

- **Unified Tutorial**
- **ORM Querying Guide**
- **Relationship Loading Techniques**
- **Session Basics**
- **AsyncIO Support**
- **PostgreSQL Dialect**
- **Core / SQL Expression Language**

---

## 3. 遇到 API，不要先搜博客，先看对象文档页

比如你想知道 `Select` 对象有哪些方法：

最正确的思路不是乱搜：

- “sqlalchemy select 方法大全”

而是找：

- `Select` 类的官方 API 页面
- `Session` 类的官方 API 页面
- `Result` / `ScalarResult` / `AsyncSession` API 页面

也就是说，你要学会用“对象名 + API 文档”的思路查。

---

## 4. 最推荐的搜索方式

直接搜索：

```text
site:docs.sqlalchemy.org sqlalchemy Select API
site:docs.sqlalchemy.org sqlalchemy Session API
site:docs.sqlalchemy.org sqlalchemy relationship loading
site:docs.sqlalchemy.org sqlalchemy async session
site:docs.sqlalchemy.org sqlalchemy postgresql on conflict
```

这个效率非常高。

---

## 5. 学会区分 Tutorial、Guide、API Reference

这是很多人不会用官方文档的根本原因。

---

### A. Tutorial
适合：
- 入门
- 看整体用法
- 看官方推荐写法

如果你不知道“这东西大概怎么用”，先看 Tutorial。

---

### B. Guide
适合：
- 某一主题深入理解
- 比如 ORM 查询、Relationship Loading、Session 管理

如果你已经知道概念，但不会选方案，看 Guide。

---

### C. API Reference
适合：
- 我已经知道对象名了
- 我现在就想看这个类/方法的参数、返回值、可用方法

比如：
- `Select`
- `Session`
- `AsyncSession`
- `Result`

如果你想知道“`Select` 对象到底还有哪些方法”，看 API Reference 最准。

---

# 九、你该怎么理解 SQLAlchemy 2 的架构意图

这一部分是“底层思路”。

你要的是“为什么 SQLAlchemy 要设计成这样”。

---

## 1. 第一层意图：统一 SQL 构造能力

SQLAlchemy 最核心的基础是：

> **SQL Expression Language（Core）**

这是它的根。

无论你是否使用 ORM，底层都依赖这套 SQL 表达式系统。

### 设计意图
- 不把你绑死在 ORM 上
- 让复杂 SQL 仍然可表达
- 保留接近 SQL 的能力

所以：
- ORM 查询在 SQLAlchemy 2 中也统一到 `select()` 风格
- 这就是“统一查询接口”的设计方向

---

## 2. 第二层意图：在 SQL 之上增加 ORM 对象世界

ORM 不是替代 SQL，而是：

> **在 SQL 表达式能力之上，增加对象映射、关系管理、状态追踪**

### 它解决什么痛点？
- 表行映射成对象
- 关系自动装配
- 修改对象自动生成 UPDATE
- 事务中维护对象一致性

所以 ORM 是“增强层”，不是“完全另一套系统”。

---

## 3. 第三层意图：把执行、事务、对象状态管理分层

SQLAlchemy 很强调分层：

- Engine：连接与执行基础设施
- Connection：底层执行通道
- Session：ORM 的工作单元
- Select / Insert / Update：SQL 表达
- Mapping：对象和表的映射

### 设计意图
让你可以：
- 只用 Core
- 只用 ORM
- Core + ORM 混用
- 同步 / 异步切换
- 不同数据库切换

这就是它比很多“只能 ORM”的框架更强大的地方。

---

# 十、为什么你会觉得“对象方法太多”

因为 SQLAlchemy 不是一个“只服务 CRUD 的简单 ORM”。

它本质上是：

> **数据库抽象层 + SQL 构造器 + ORM + 执行引擎 + 连接池 + 方言系统**

所以 API 多是必然的。

但真正高效的学习方式不是背 API，而是：

---

## 只掌握三件事

### 1. 知道大模块边界
知道问题属于哪一层。

### 2. 知道核心对象名
比如：
- `Select`
- `Session`
- `AsyncSession`
- `Result`
- `relationship`
- `selectinload`

### 3. 需要时查 API Reference
而不是试图记住所有对象方法。

---

# 十一、针对你现在的学习阶段，我建议你建立这套“查询定位法”

以后每次碰到 SQLAlchemy 问题，先问自己：

---

## 问题 1：我现在是在写 SQL 表达式，还是在处理 ORM 对象？

### 如果是 SQL 表达式：
去看：
- Core / SQL Expression Language
- `Select API`

### 如果是 ORM 对象：
去看：
- ORM Querying Guide
- Relationship Loading
- Session Basics

---

## 问题 2：我是想控制“查谁”，还是“怎么加载关系”？

### 查谁
- `join()`
- `where()`
- `exists()`
- `group_by()`

看：
- Core 查询文档
- ORM Querying Guide

### 怎么加载关系
- `selectinload()`
- `joinedload()`
- `contains_eager()`

看：
- Relationship Loading Techniques

---

## 问题 3：我是想查 API 用法，还是理解概念？

### 查 API 参数
看 API Reference

### 理解为什么这样设计
看 Guide / Tutorial

---

# 十二、最后我帮你把你的示例重新归位一次

你这段：

````python
stmt = (
    select(
        User.id, 
        User.username, 
        Employee.name
    )
    .outerjoin(Employee, User.id == Employee.user_id)
)
result = await db.execute(stmt)
users = result.mappings().all()
````

最适合你脑中归类为：

---

## 归类方式

### 1. 语法层面
- `select()` 构造的 `Select` 对象
- 属于 SQLAlchemy 2 统一查询语法

### 2. 数据来源
- 使用的是 ORM mapped class 的列属性

### 3. 结果层面
- 返回列映射结果，不是 ORM 实体对象

### 4. 文档定位
如果你想查这种写法，主要看：

- **ORM Querying Guide**：因为你在用 ORM class attributes
- **SELECT and Related Constructs**：因为本质是 `Select`
- **Result Set API**：因为你在用 `mappings().all()`

---

# 十三、给你一份“文档导航心法”

最后送你一个真正实用的办法：

---

## 如果你以后碰到一个 SQLAlchemy API，不知道去哪看，就按这个顺序：

### 第一步：认对象
这是哪个对象的方法？
- `Session`？
- `Select`？
- `Result`？
- `relationship()`？
- `AsyncSession`？

### 第二步：认层级
它属于哪一层？
- Engine/Connection
- Core SQL
- ORM Mapping
- ORM Querying
- Session/Transaction
- AsyncIO
- Dialect

### 第三步：选文档类型
- 不懂概念 → 看 Tutorial / Guide
- 已懂概念只查参数 → 看 API Reference
