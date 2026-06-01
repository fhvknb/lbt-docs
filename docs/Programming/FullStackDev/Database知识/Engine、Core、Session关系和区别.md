下面我把这几个容易混淆的点**彻底拆开讲**：

1. **SQLAlchemy 里的 Core 查询 和 ORM 查询，到底分别是什么**
2. **Session 到底是什么，它和“数据库连接 connection”是什么关系**
3. **为什么 Web 项目推荐“每个请求一个 Session”**
4. **什么时候用 Core，什么时候用 ORM**
5. **常见误区与最佳实践**

我会尽量用**概念 + 类比 + 代码 + Web 场景**来解释。

---

# 一、先说结论：你现在模糊，主要是混了 3 层东西

很多人刚学 SQLAlchemy 时会把下面三件事混在一起：

- **SQL 表达方式**
  - 原生 SQL
  - SQLAlchemy Core
  - SQLAlchemy ORM

- **数据库连接方式**
  - `Engine`
  - `Connection`
  - `Session`

- **事务管理方式**
  - 手动 `BEGIN / COMMIT / ROLLBACK`
  - `Connection` 级事务
  - `Session` 级事务

其实这三层不是一回事。

你可以先记住：

---

## 一句话理解

- **Core**：偏底层，主要是“**怎么写 SQL**”
- **ORM**：偏对象化，主要是“**怎么把表记录当 Python 对象来操作**”
- **Connection**：一条具体数据库连接，偏底层
- **Session**：ORM 世界里的工作单元，负责**对象状态管理 + 事务边界 + 持有/使用连接**
- **Web 请求一个 Session**：是为了让**一次请求中的数据库操作处在统一的事务和状态管理范围内**

---

# 二、Core 和 ORM 到底是什么关系

---

## 1. Core 是什么

SQLAlchemy Core 可以理解为：

> **Python 方式来拼装 SQL 语句的工具层**

它不是把数据库记录先变成 Python 对象来给你改，而是更接近：

- 表
- 列
- SQL 表达式
- `select / insert / update / delete`
- `join / group by / order by / returning`

### Core 的特点

- 更贴近 SQL
- 更适合复杂 SQL、批量操作、高性能场景
- 查询结果通常是 **Row**，不是 ORM 实体对象
- 不负责对象生命周期管理

---

### Core 例子

```python
from sqlalchemy import create_engine, MetaData, Table, select

engine = create_engine("postgresql+psycopg://user:pass@localhost/db")
metadata = MetaData()

users = Table("users", metadata, autoload_with=engine)

with engine.connect() as conn:
    stmt = select(users).where(users.c.id == 1)
    result = conn.execute(stmt)
    row = result.first()
    print(row)
```

这里的 `row` 一般像一行结果，不是 `User()` 对象。

---

## 2. ORM 是什么

ORM 是：

> **Object Relational Mapping，对象关系映射**

它的核心思想是：

- 数据库表 ↔ Python 类
- 表中的一行 ↔ Python 对象实例
- 列 ↔ 类属性
- 外键关系 ↔ 对象关系属性

你写的是 `User(username="alice")`，但底层会帮你变成 `INSERT INTO users ...`

---

### ORM 例子

```python
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session
from sqlalchemy import create_engine, select

engine = create_engine("postgresql+psycopg://user:pass@localhost/db")


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str]


with Session(engine) as session:
    stmt = select(User).where(User.id == 1)
    user = session.execute(stmt).scalar_one_or_none()
    print(user.username)
```

这里拿到的是 `User` 对象，不是简单一行结果。

---

## 3. Core 和 ORM 的根本区别

最重要的区别不是“语法不同”，而是：

### Core 关注的是：

- **SQL 语句本身**
- 查询出什么列
- 怎样拼条件、join、group by
- 执行后得到结果行

### ORM 关注的是：

- **对象**
- `User`、`Order` 这些实体
- 实体之间的关系
- 对象状态是否修改过
- 提交时自动生成相应 SQL

---

## 4. 你可以把它们这样类比

### Core 像什么

Core 像你自己在写：

- SQL 模板
- 参数绑定
- 执行查询
- 获取结果

它更像一个**SQL 构造器/查询生成器**

---

### ORM 像什么

ORM 像你在操作：

- `user.name = "Tom"`
- `user.orders.append(order)`
- `session.add(user)`

然后 ORM 替你决定什么时候发 `INSERT/UPDATE/DELETE`

---

# 三、为什么很多 ORM 查询看起来也在用 `select()`，却还是 ORM

这是 SQLAlchemy 2 最容易让人困惑的地方。

在 SQLAlchemy 2 里，**Core 和 ORM 都用 `select()` 语法**，所以看起来很像。

但关键区别在于：

---

## 1. 你 `select()` 的对象是什么

### Core

```python
select(users)
select(users.c.id, users.c.username)
```

这里 `users` 是 `Table` 对象，结果更偏向**行数据**

---

### ORM

```python
select(User)
select(User.id, User.username)
```

这里 `User` 是 ORM 映射类，结果会带有 ORM 语义。

---

## 2. 谁在执行它

### Core 通常是 `Connection.execute()`

```python
with engine.connect() as conn:
    result = conn.execute(select(users))
```

---

### ORM 通常是 `Session.execute()`

```python
with Session(engine) as session:
    result = session.execute(select(User))
```

---

## 3. 结果长什么样

### Core 查询结果

```python
with engine.connect() as conn:
    result = conn.execute(select(users))
    rows = result.all()
```

你拿到的是：

- Row
- tuple 风格
- mapping 风格

---

### ORM 查询结果

```python
with Session(engine) as session:
    result = session.execute(select(User))
    users = result.scalars().all()
```

你拿到的是：

- `User` 对象实例
- 这些对象被 `Session` 管理
- 后续修改对象属性，可能自动转成 `UPDATE`

---

# 四、最核心：Session 到底是什么

这个概念是最关键的。

---

## 1. Session 不是数据库连接池

不是。

连接池主要是 `Engine` 管。

---

## 2. Session 也不是“数据库本身的 session”这个词的简单等价物

数据库里也有 session/会话这个概念，但 SQLAlchemy 的 `Session` 是一个**应用层抽象**。

它更准确的理解是：

> **ORM 的工作单元（Unit of Work） + 身份映射（Identity Map） + 事务边界管理器**

你先别被名词吓住，我拆开讲。

---

## 3. Session 的三个核心职责

---

### 职责 1：管理 ORM 对象

比如：

```python
user = session.get(User, 1)
```

这个 `user` 对象不是普通对象，而是被 `session` 跟踪的对象。

如果你改它：

```python
user.username = "newname"
```

Session 知道：

- 这个对象原来是什么
- 现在变成了什么
- 在提交时需要发一条 `UPDATE`

这叫**对象状态追踪**

---

### 职责 2：管理事务

比如：

```python
with Session(engine) as session:
    user = User(username="alice")
    session.add(user)
    session.commit()
```

这个 `commit()` 本质上是：

- flush 所有待提交改动
- 提交当前事务

如果报错：

```python
session.rollback()
```

当前事务回滚。

---

### 职责 3：按需使用数据库连接

Session 自己不是数据库 socket 连接，但它会在需要执行 SQL 时：

- 从 Engine 的连接池中拿一个连接
- 用这个连接执行 SQL
- 在事务结束后归还连接

所以你可以理解为：

> Session 是“更高一层”的工作单元，它底下会借用 Connection。

---

# 五、Connection 和 Session 的关系

这是另一个非常重要的点。

---

## 1. Engine、Connection、Session 的关系图

```text
Engine
  └── Connection（底层数据库连接）
         └── Session（ORM 层借助连接完成事务和对象管理）
```

更准确一点：

```text
Engine = 工厂 + 连接池
Connection = 一次底层数据库连接通道
Session = ORM 工作单元，需要时向 Engine/Connection 借连接执行 SQL
```

---

## 2. 打个类比

### Engine
像“出租车平台”

### Connection
像“实际派给你的一辆车”

### Session
像“一次完整的出行订单”

你的订单里可能包括：

- 上车
- 中途几次停靠
- 最终到达
- 统一结算

**Session 管的是这一整次业务过程**
而不是单纯某一个瞬间的数据库连接。

---

# 六、直接用 Connection 操作数据库，和用 Session 有什么区别

下面是重点对比。

---

## 1. 用 Connection：你偏底层地执行 SQL

```python
with engine.connect() as conn:
    result = conn.execute(text("SELECT * FROM users WHERE id=:id"), {"id": 1})
    row = result.first()
```

你要自己关心：

- 执行哪条 SQL
- 返回的是什么结构
- 是否 commit
- 事务边界怎么处理

### 适合场景

- 批量 SQL
- 执行原生 SQL
- 数据迁移脚本
- 高性能批量导入
- 不需要 ORM 对象管理

---

## 2. 用 Session：你偏“业务对象”地操作数据

```python
with Session(engine) as session:
    user = session.get(User, 1)
    user.username = "alice2"
    session.commit()
```

你关心的是：

- 获取一个 `User`
- 修改属性
- 提交

Session 帮你处理：

- 对象状态追踪
- 自动 flush
- 事务一致性
- identity map

---

## 3. 最大区别：Session 有“身份映射 Identity Map”

这个特别重要。

---

### 什么是 Identity Map

在同一个 Session 中，同一个主键对象，通常只会有**一个 Python 实例**。

例如：

```python
with Session(engine) as session:
    user1 = session.get(User, 1)
    user2 = session.get(User, 1)

    print(user1 is user2)  # True
```

为什么？

因为 Session 会缓存并管理这个对象。

这好处非常大：

- 避免同一事务里出现多个“代表同一行”的对象副本
- 保证对象状态一致
- 便于自动脏检查和统一更新

而 `Connection` 查询一般不会帮你做这些对象身份管理。

---

## 4. Session 有“脏检查”

```python
user = session.get(User, 1)
user.username = "newname"
session.commit()
```

你没有写 `UPDATE`，但它照样更新数据库。

因为 Session 会检查：

- 哪些对象新建了
- 哪些对象修改了
- 哪些对象删除了

然后在 flush 时生成对应 SQL。

而 Connection 不会做这个，它只执行你明确写的 SQL。

---

# 七、Session 的工作流程到底是什么

一个典型 ORM 事务流程大概是这样：

---

## 1. 创建 Session

```python
session = Session(engine)
```

此时通常还**未必真正占用数据库连接**。

---

## 2. 第一次执行 SQL

```python
user = session.get(User, 1)
```

这时候 Session 才可能：

- 从连接池拿连接
- 开启事务
- 执行查询

---

## 3. 你修改对象

```python
user.username = "alice_new"
```

只是改 Python 对象，数据库此时可能还没更新。

---

## 4. flush

在这些时机可能触发 flush：

- `session.commit()`
- 某些查询之前
- 手动 `session.flush()`

flush 时 ORM 会发 SQL：

```sql
UPDATE users SET username='alice_new' WHERE id=1;
```

但此时还只是“发到当前事务里”，未必提交。

---

## 5. commit

```python
session.commit()
```

事务真正提交。

---

## 6. close

```python
session.close()
```

释放资源，连接归还连接池。

---

# 八、为什么 Web 项目推荐“每个请求一个 Session”

这是你问题里最关键、最实战的一部分。

---

## 1. Web 请求天然就是一个“工作单元”

一个 HTTP 请求通常代表一次完整业务操作，比如：

- 查看用户资料
- 创建订单
- 修改密码
- 提交评论

一次请求里可能会有多次数据库操作，但这些操作通常应该视为**一个整体**。

比如“创建订单”：

1. 插入订单表
2. 插入订单明细表
3. 扣减库存
4. 写审计日志

这些应该属于**一个事务单元**：

- 都成功，才提交
- 任何一步失败，全部回滚

而 Session 恰好就是这种“工作单元”的理想载体。

---

## 2. 一个请求一个 Session，事务边界清晰

例如：

```python
def create_order(request):
    with Session(engine) as session:
        try:
            # 1. 查商品
            # 2. 扣库存
            # 3. 建订单
            # 4. 建明细
            session.commit()
        except:
            session.rollback()
            raise
```

好处：

- 这次请求中的所有数据库改动都在一个事务范围内
- 逻辑非常清晰
- 出错回滚简单

---

## 3. Session 不是线程安全的，不能全局共享

这是非常重要的工程原因。

### Session 一般不应：

- 作为全局单例
- 被多个请求并发共享
- 被多个线程同时使用

因为 Session 内部维护了：

- 当前事务状态
- identity map
- 对象缓存
- 待 flush 的变更队列

如果多个请求共用一个 Session，会出现：

- A 请求读到 B 请求未提交的对象状态
- 对象污染
- 事务互相干扰
- 提交/回滚边界混乱
- 并发安全问题

所以 Web 项目一定要让 Session 的作用域足够小。

最常见就是：

> **每个请求一个 Session，请求结束就关闭**

---

## 4. 避免对象状态跨请求污染

假设你用全局 Session：

```python
global_session = Session(engine)
```

请求 A：

```python
user = global_session.get(User, 1)
user.username = "aaa"
```

请求 B 又来：

```python
user = global_session.get(User, 1)
```

它可能直接从 Session 的 identity map 中拿到之前的对象，而不是你以为的新鲜数据库状态。

这会导致：

- 数据过期
- 脏状态残留
- 很难排查的 bug

---

## 5. 连接资源不会被长期占用

短生命周期 Session 的另一个好处：

- 需要时拿连接
- 请求结束归还连接

如果你把 Session 长时间挂着不关：

- 连接可能一直占着
- 事务可能一直不提交
- 容易产生连接池耗尽
- 容易产生长事务，影响数据库性能

Web 服务并发一高，问题会非常明显。

---

## 6. 与依赖注入模型天然契合

像 FastAPI / Flask / Django 这类 Web 框架都适合做：

- 请求开始：创建 Session
- 请求处理中：传给 service / repository
- 请求结束：commit/rollback + close

这非常符合请求生命周期。

---

# 九、为什么不用“每次数据库操作都 new 一个 Connection”就好了

可以，但会有几个问题。

---

## 1. 多次操作难以形成统一事务

比如一个请求里：

- 查用户
- 建订单
- 扣库存
- 写日志

如果你每一步都自己单独拿一个 `Connection`：

```python
with engine.connect() as conn:
    ...
```

那这些操作可能不在同一个事务里，除非你自己非常仔细地管理事务。

Session 则天然更适合把这些操作组织成一个整体。

---

## 2. 对 ORM 对象不友好

如果你要操作的是：

- `User`
- `Order`
- `OrderItem`

这些对象关系和状态，用 Session 非常顺手。

如果全手动 Connection：

- 你自己写 SQL
- 自己映射结果
- 自己维护一致性

成本高很多。

---

## 3. 缺少 identity map / dirty checking / cascade 等 ORM 能力

Connection 只有执行能力，没有 ORM 语义。

---

# 十、Session 和 Connection 哪个更“高级”

可以这么理解：

- `Connection` 是更底层的数据库通信接口
- `Session` 是建立在连接之上的 ORM 工作单元

但注意：

> Session 不是 Connection 的“替代品”，而是更高层的抽象。

你仍然可以在 ORM 项目里同时使用：

- 常规 CRUD：`Session`
- 批量导入 / 特殊 SQL：Core + Connection
- 某些复杂 PostgreSQL 特性：`session.execute(text(...))`

这很常见。

---

# 十一、Web 项目里典型的 Session 生命周期

以“每请求一个 Session”为例：

---

## 1. 请求开始

创建一个 Session

```python
session = SessionLocal()
```

---

## 2. 请求处理过程中

service/repository 层共用这个 Session

```python
user = session.get(User, user_id)
order = Order(user_id=user.id)
session.add(order)
```

---

## 3. 请求成功

```python
session.commit()
```

---

## 4. 请求异常

```python
session.rollback()
```

---

## 5. 请求结束

```python
session.close()
```

---

## 一个标准模板

```python
def handle_request():
    session = SessionLocal()
    try:
        # do something
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()
```

---

# 十二、为什么不是“每个函数一个 Session”

这也是常见问题。

假设：

```python
def create_user():
    with Session(engine) as session:
        ...

def create_order():
    with Session(engine) as session:
        ...
```

如果上层业务流程需要：

1. 创建用户
2. 创建订单

你希望它们是一个事务。

但每个函数自己开 Session，就变成两个独立事务了：

- `create_user()` 成功提交
- `create_order()` 失败回滚

结果就是数据库出现“用户创建了，但订单没创建”的半成状态。

所以更推荐：

> **由请求层/服务层统一创建和传递 Session，底层函数只使用，不自行随便创建。**

---

## 更合理的写法

```python
def create_user(session, data):
    user = User(**data)
    session.add(user)
    return user

def create_order(session, user, data):
    order = Order(user_id=user.id, **data)
    session.add(order)
    return order

def handle_request():
    with Session(engine) as session:
        with session.begin():
            user = create_user(session, {...})
            create_order(session, user, {...})
```

这样它们属于同一个事务。

---

# 十三、什么时候更适合直接用 Connection / Core

虽然 Web 项目大多数业务 CRUD 推荐 ORM + Session，但不是说 Connection 没用。

下面这些场景，Core/Connection 常常更好：

---

## 1. 批量插入、批量更新

比如一次导入 10 万条数据。

ORM 一个个对象 `add()` 可能较慢，Core `insert()` 更高效。

---

## 2. 数据迁移脚本

例如：

- 清洗历史数据
- 批量修复字段
- 跑一次性脚本

这类通常直接 Core / text SQL 更直接。

---

## 3. 极复杂 SQL

比如：

- 复杂 CTE
- 窗口函数
- 数据库专属语法
- 大型报表查询

有时 Core 或原生 SQL 更清晰。

---

## 4. 不需要对象状态跟踪

如果你只是：

- 查结果
- 生成报表
- 返回 JSON

不一定要把每行都映射成 ORM 对象。

---

# 十四、什么时候更适合 ORM + Session

---

## 1. 典型业务系统 CRUD

比如：

- 用户
- 订单
- 商品
- 权限
- 博客文章

这些都是强实体关系，ORM 很自然。

---

## 2. 关系复杂的对象图操作

例如：

- 创建用户时同时创建 profile、addresses
- 删除父对象时联动删除子对象
- 加载订单及其订单项、商品信息

ORM 的关系映射和级联会大幅简化代码。

---

## 3. 想让业务代码更面向对象

```python
order.user.name
user.orders
```

这类业务表达非常符合 ORM 使用方式。

---

# 十五、再帮你彻底澄清几个易混点

---

## 误区 1：Session 就是一个数据库连接

**不完全对。**

更准确说：

- Session 会在需要时使用数据库连接
- 但 Session 本身是 ORM 工作单元，不只是连接句柄

---

## 误区 2：有了 Session 就不需要事务概念了

**错。**

Session 仍然有事务，而且事务非常重要。

- `commit()`：提交事务
- `rollback()`：回滚事务

Session 只是帮你更方便地管理事务。

---

## 误区 3：Session 越长越好，省得反复创建

**错。**

Session 应该短生命周期，尤其 Web 中。

长生命周期 Session 会带来：

- 连接占用
- 对象过期
- 缓存污染
- 事务过长
- 并发问题

---

## 误区 4：ORM 查询就不能写复杂 SQL

**也不对。**

ORM 只是对象映射层，不妨碍你：

- `select()`
- `join()`
- 子查询
- CTE
- `session.execute(text(...))`

SQLAlchemy ORM 并不意味着“不能写高级 SQL”。

---

# 十六、你可以这样建立一套脑图

---

## 第一层：Engine

- 应用的数据库入口
- 管连接池
- 不直接代表一次业务操作

---

## 第二层：Connection

- 一条具体数据库连接
- 更偏底层
- 适合执行明确 SQL
- 更像“数据库通道”

---

## 第三层：Session

- ORM 工作单元
- 管事务
- 管对象状态
- 需要时借用 Connection
- Web 中通常“每请求一个”

---

## Core

- SQL 构造层
- 偏表、列、语句

---

## ORM

- 对象映射层
- 偏类、实例、关系、状态管理

---

# 十七、一张对比表总结

| 维度 | Core + Connection | ORM + Session |
|---|---|---|
| 操作对象 | 表、列、SQL 语句 | Python 对象、实体关系 |
| 返回结果 | Row / Mapping | ORM 实体对象 |
| 是否自动跟踪对象修改 | 否 | 是 |
| 是否有 identity map | 否 | 是 |
| 是否适合复杂业务对象图 | 一般 | 很适合 |
| 是否适合批量处理 | 很适合 | 一般，重批量时不如 Core |
| 事务控制 | 手动更明显 | 更自然，集成在 Session 中 |
| Web 典型 CRUD | 可做，但偏底层 | 最常用 |
| 学习门槛 | SQL 导向 | 概念更多 |

---

# 十八、给你一个最实用的理解方式

如果你现在只想抓住本质，可以记这三句话：

---

## 1

**Core 是“写 SQL 的方式”，ORM 是“写对象业务的方式”。**

---

## 2

**Connection 是“连数据库的通道”，Session 是“ORM 的工作单元 + 事务边界 + 对象管理器”。**

---

## 3

**Web 项目每个请求一个 Session，是为了让一次请求中的数据库操作共享同一事务边界，同时避免并发污染和长生命周期问题。**

---

# 十九、给你一个 Web 场景的完整示例

下面这个例子最能体现“为什么请求级 Session 是合理的”。

---

## 需求：创建订单

要做四件事：

1. 查用户
2. 查商品库存
3. 扣库存
4. 插入订单和订单项

---

## 推荐写法

```python
def create_order(session, user_id, product_id, qty):
    user = session.get(User, user_id)
    product = session.get(Product, product_id)

    if product.stock < qty:
        raise ValueError("库存不足")

    product.stock -= qty

    order = Order(user_id=user.id)
    session.add(order)
    session.flush()

    item = OrderItem(order_id=order.id, product_id=product.id, qty=qty)
    session.add(item)

    return order


def handle_request(user_id, product_id, qty):
    with Session(engine) as session:
        try:
            order = create_order(session, user_id, product_id, qty)
            session.commit()
            return order
        except Exception:
            session.rollback()
            raise
```

### 这里 Session 带来的价值：

- `user`、`product`、`order` 都在同一个工作单元中
- `product.stock -= qty` 会被自动跟踪
- `flush()` 后可以拿到 `order.id`
- 任意一步失败，整个事务回滚
- 请求结束 Session 关闭，不污染下次请求

这就是“每请求一个 Session”的典型意义。

---

# 二十、最后给你一个学习建议

如果你现在还混乱，我建议你按这个顺序理解：

---

## 第一步：先把 SQLAlchemy 分层

- `Engine`
- `Connection`
- `Session`
- Core
- ORM

---

## 第二步：先分清 Core 和 ORM 的目标

- Core：写 SQL
- ORM：写对象业务

---

## 第三步：牢牢记住 Session 的本质

不是“连接”，而是：

- 事务边界
- 对象状态管理
- 身份映射
- 工作单元

---

## 第四步：Web 场景里记一个原则

> **一次请求 = 一个 Session = 一个清晰的工作单元**
