
- `Session` **常用方法有哪些**
- 每个方法**什么时候用**
- 在 **FastAPI** 里**怎么组织代码**
- 如何避免新手常见坑
- 如何写得像一个“已经上线过项目的人”

---

# 一、先记住一句话：`Session` 是什么

`Session` 不是简单的“数据库连接”。

你可以把它理解成：

> **一次业务操作的工作区 + 事务管理器 + ORM 对象状态跟踪器**

它负责：

- 管理 ORM 对象
- 管理事务
- 需要时借用数据库连接
- 在 `commit()` 时提交
- 在 `rollback()` 时回滚
- 在 `close()` 时释放资源

在 **FastAPI** 里通常遵循：

> **一个请求，一个 Session**

---

# 二、FastAPI 场景下你真正要会的 `Session` 方法

先给你一个最实用的结论：

如果是日常 CRUD，最常用的就是这几个：

- `add()`
- `add_all()`
- `get()`
- `execute()`
- `scalars()`
- `scalar()`
- `commit()`
- `rollback()`
- `refresh()`
- `flush()`
- `delete()`
- `close()`

如果你把这 12 个吃透，已经能完成大多数业务开发。

---

# 三、`Session` 常用方法总表

---

## 1. `add(obj)`

把一个 ORM 对象加入当前 Session 管理。

```python
session.add(user)
```

### 用途
- 新增一条记录
- 让某个新对象进入待插入状态

### 示例

```python
user = User(username="alice", email="alice@example.com")
session.add(user)
session.commit()
```

### 注意
- `add()` 之后**还没真正写入数据库**
- 真正发 `INSERT` 一般在：
  - `flush()`
  - `commit()`
  - 某些查询触发自动 flush 时

---

## 2. `add_all(iterable)`

批量把多个对象加入 Session。

```python
session.add_all([user1, user2, user3])
```

### 示例

```python
users = [
    User(username="a"),
    User(username="b"),
    User(username="c"),
]
session.add_all(users)
session.commit()
```

### 老鸟建议
- 少量对象新增可以用
- **超大量批量导入**不推荐 ORM `add_all()`，更推荐 Core 的 `insert()`

---

## 3. `get(Model, pk)`

按主键获取对象。

```python
user = session.get(User, 1)
```

### 特点
- 按主键查最方便
- 优先从 Session 的 identity map 中取
- 找不到返回 `None`

### 示例

```python
user = session.get(User, user_id)
if not user:
    raise HTTPException(status_code=404, detail="User not found")
```

### 老鸟建议
- **主键查询优先用 `get()`**
- 比 `select(User).where(User.id == xxx)` 更直观

---

## 4. `execute(statement, params=None)`

执行 SQLAlchemy 语句或原生 SQL。

```python
result = session.execute(select(User))
```

或者：

```python
result = session.execute(
    text("SELECT * FROM users WHERE id=:id"),
    {"id": 1}
)
```

### 用途
- 执行 ORM 查询
- 执行 Core 查询
- 执行原生 SQL
- 执行 `update()` / `delete()` / `insert()`

### 示例

```python
stmt = select(User).where(User.username == "alice")
result = session.execute(stmt)
user = result.scalar_one_or_none()
```

### 老鸟建议
- SQLAlchemy 2 风格中，`execute()` 非常核心
- ORM 查询几乎都围绕它展开

---

## 5. `commit()`

提交当前事务。

```python
session.commit()
```

### 发生了什么
通常会先：

1. `flush()` 把改动发到数据库
2. 然后提交事务

### 示例

```python
user = User(username="alice")
session.add(user)
session.commit()
```

### 老鸟建议
- **不要到处 `commit()`**
- 通常在 service 层 / 请求结束处统一提交
- 一段完整业务逻辑最好只有一个明确提交点

---

## 6. `rollback()`

回滚当前事务。

```python
session.rollback()
```

### 用途
- 发生异常时回滚
- 清空当前事务中的未提交修改

### 示例

```python
try:
    session.add(user)
    session.commit()
except Exception:
    session.rollback()
    raise
```

### 老鸟建议
- 只要 `commit()` 失败，通常要先 `rollback()`
- 否则 Session 可能处于错误状态，后续不能继续正常用

---

## 7. `refresh(obj)`

从数据库重新加载对象最新状态。

```python
session.refresh(user)
```

### 用途
- 刚插入后重新加载数据库生成字段
- 确保对象状态和数据库一致

### 示例

```python
user = User(username="alice")
session.add(user)
session.commit()
session.refresh(user)
print(user.id)
```

### 什么时候很有用
- 你要拿数据库生成的：
  - 自增主键
  - 默认值
  - 触发器生成值
  - 更新时间字段

### 老鸟建议
- 在 FastAPI 创建资源时非常常见：
  - `add()`
  - `commit()`
  - `refresh()`
  - 返回对象

---

## 8. `flush()`

把当前改动同步到数据库，但**不提交事务**。

```python
session.flush()
```

### 重要理解
- `flush != commit`
- `flush` 后 SQL 已经发出去了
- 但仍然在事务里，之后还能 `rollback()`

### 典型场景

#### 场景 1：你要提前拿到自增主键

```python
order = Order(user_id=1)
session.add(order)
session.flush()

print(order.id)  # 此时通常已经有 id 了
```

然后你继续插入订单项：

```python
item = OrderItem(order_id=order.id, product_id=2, qty=3)
session.add(item)
```

### 老鸟建议
- 需要“先插父表，再用父表 id 插子表”时，`flush()` 非常好用
- 不要把 `flush()` 理解成“保存成功”
- 真正事务完成还是靠 `commit()`

---

## 9. `delete(obj)`

删除一个 ORM 对象。

```python
session.delete(user)
```

### 示例

```python
user = session.get(User, 1)
if user:
    session.delete(user)
    session.commit()
```

### 注意
- 删除的前提通常是对象先被加载进 Session
- 删除真正生效还是在 flush/commit 时

---

## 10. `close()`

关闭 Session，释放资源。

```python
session.close()
```

### 用途
- 请求结束时关闭
- 让连接归还连接池
- 清理 Session 状态

### 老鸟建议
- FastAPI 里一般用依赖注入自动处理，不手搓 `close()`
- 但你必须知道底层就是要关闭

---

# 四、返回结果相关：你会经常一起用到的 Result 方法

虽然它们不是 `Session` 的方法，但和 `session.execute()` 总是一起出现，必须掌握。

---

## 1. `scalar_one()`

要求结果**恰好一条**，否则报错。

```python
user = session.execute(
    select(User).where(User.id == 1)
).scalar_one()
```

### 适合
- 你非常确定一定存在且只有一条

---

## 2. `scalar_one_or_none()`

结果要么一条，要么没有；多条报错。

```python
user = session.execute(
    select(User).where(User.username == "alice")
).scalar_one_or_none()
```

### 适合
- 查唯一字段，如用户名、邮箱

---

## 3. `scalars().all()`

把 ORM 对象提取出来，返回列表。

```python
users = session.execute(select(User)).scalars().all()
```

### 老鸟建议
- 查询 ORM 对象列表时，这是最常用写法

---

## 4. `first()`

取第一条，拿到的是 Row 或 ORM 包装结果，要分场景。

---

## 5. `all()`

取所有结果。

---

# 五、`Session` 进阶但很常用的方法

---

## 1. `merge(obj)`

把一个游离对象重新合并到当前 Session。

```python
merged_user = session.merge(user)
```

### 用途
- detached 对象重新纳入当前 Session
- 不过日常业务里不如前面那些方法高频

---

## 2. `expunge(obj)`

把对象从 Session 中移除。

```python
session.expunge(user)
```

### 作用
- 让对象不再被当前 Session 管理

---

## 3. `expire(obj)` / `expire_all()`

让对象属性过期，下次访问时重新从数据库加载。

```python
session.expire(user)
session.expire_all()
```

### 日常开发
- 理解即可，普通 CRUD 不高频

---

## 4. `is_modified(obj)`

判断对象是否被修改。

```python
session.is_modified(user)
```

---

## 5. `begin()`

显式开启事务上下文。

```python
with session.begin():
    session.add(user)
```

### 老鸟建议
- 很推荐
- 比手工 `try/commit/rollback` 更优雅

---

## 6. `begin_nested()`

开启嵌套事务 / SAVEPOINT。

```python
with session.begin_nested():
    ...
```

### 场景
- 比较复杂的事务控制
- 测试场景很常见

---

# 六、你必须掌握的 Session 对象状态观念

这块很重要，不然你永远只是“会写 CRUD”，不算真正理解 ORM。

---

## 1. transient

刚创建、还没加入 Session 的对象。

```python
user = User(username="alice")
```

此时：
- 只是 Python 对象
- 不在 Session 管理中
- 没进数据库

---

## 2. pending

调用 `add()` 后，还没 flush/commit。

```python
session.add(user)
```

此时对象等待插入数据库。

---

## 3. persistent

已经在 Session 中，并且数据库中有对应记录。

例如：
- 查询出来的对象
- 已 flush/commit 的新增对象

---

## 4. detached

对象以前被 Session 管理过，但现在脱离了。

例如：
- Session 关闭后
- `expunge()` 后

---

# 七、FastAPI 中最标准的 Session 写法

下面给你最实用的工程模板。

---

## 1. 建立数据库连接与 Session 工厂

```python
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql+psycopg://postgres:secret@localhost:5432/mydb"

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)
```

---

## 2. 提供 FastAPI 依赖

```python
from sqlalchemy.orm import Session

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
```

---

## 3. 路由里注入 Session

```python
from fastapi import Depends, FastAPI
from sqlalchemy.orm import Session

app = FastAPI()

@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    return user
```

---

# 八、为什么 FastAPI 里推荐 `expire_on_commit=False`

默认情况下，`commit()` 后对象可能被标记为过期，后续访问属性时会触发重新加载。

在 Web 接口里，常常是：

1. `commit()`
2. 立刻把对象返回给响应模型

如果对象过期，可能出现：
- 额外 SQL
- Session 已结束导致访问异常

所以很多 FastAPI 项目会设置：

```python
expire_on_commit=False
```

### 这样做的好处
- `commit()` 后对象属性还能直接用
- 更适合接口返回

---

# 九、FastAPI 下最常见 CRUD 模板

---

## 1. 新增

```python
@app.post("/users")
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    user = User(username=data.username, email=data.email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
```

### 这个模式你一定要记住

> `add -> commit -> refresh -> return`

这是创建接口最经典套路。

---

## 2. 查询单个

```python
@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
```

---

## 3. 查询列表

```python
@app.get("/users")
def list_users(db: Session = Depends(get_db)):
    stmt = select(User).order_by(User.id.desc())
    users = db.execute(stmt).scalars().all()
    return users
```

---

## 4. 更新

```python
@app.put("/users/{user_id}")
def update_user(user_id: int, data: UserUpdate, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.username = data.username
    user.email = data.email

    db.commit()
    db.refresh(user)
    return user
```

### 老鸟建议
- ORM 更新时，优先“查出来改属性”
- 这样更直观，也更符合业务语义

---

## 5. 删除

```python
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"ok": True}
```

---

# 十、老鸟级实战建议：怎么写 service 层

不要把所有数据库逻辑都堆在路由里。

推荐拆成：

- router 层：收请求、返回响应
- service 层：业务逻辑
- repository/crud 层：数据库操作

---

## 示例

### crud.py

```python
from sqlalchemy import select
from sqlalchemy.orm import Session

def get_user_by_id(db: Session, user_id: int):
    return db.get(User, user_id)

def get_user_by_username(db: Session, username: str):
    stmt = select(User).where(User.username == username)
    return db.execute(stmt).scalar_one_or_none()

def create_user(db: Session, username: str, email: str):
    user = User(username=username, email=email)
    db.add(user)
    return user
```

### service.py

```python
def register_user(db: Session, username: str, email: str):
    existing = get_user_by_username(db, username)
    if existing:
        raise ValueError("用户名已存在")

    user = create_user(db, username, email)
    db.commit()
    db.refresh(user)
    return user
```

### router.py

```python
@app.post("/users")
def create_user_api(data: UserCreate, db: Session = Depends(get_db)):
    try:
        return register_user(db, data.username, data.email)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
```

---

# 十一、老鸟视角下最重要的几条习惯

---

## 1. 主键查找优先 `db.get(Model, id)`

别什么都写：

```python
select(User).where(User.id == user_id)
```

主键查询就直接：

```python
db.get(User, user_id)
```

更清晰。

---

## 2. 创建对象记住固定套路

```python
db.add(obj)
db.commit()
db.refresh(obj)
return obj
```

---

## 3. 出异常必须 `rollback()`

如果你自己手动控制事务：

```python
try:
    ...
    db.commit()
except:
    db.rollback()
    raise
```

---

## 4. 一个请求里尽量只在合适的地方统一 commit

不要底层函数偷偷 `commit()`，否则事务边界会混乱。

### 不推荐

```python
def create_user(db, data):
    user = User(...)
    db.add(user)
    db.commit()
```

如果这个函数只是大业务的一部分，就不该自己提交。

---

## 5. 要拿新插入对象主键，用 `flush()` 或 `commit()+refresh()`

### 事务中间就要拿 id

```python
db.add(order)
db.flush()
print(order.id)
```

### 请求结束后返回完整对象

```python
db.commit()
db.refresh(order)
```

---

## 6. 列表查询优先 `scalars().all()`

```python
users = db.execute(select(User)).scalars().all()
```

这几乎是 ORM 查询列表标准写法。

---

## 7. 唯一记录查询优先 `scalar_one_or_none()`

```python
user = db.execute(
    select(User).where(User.email == email)
).scalar_one_or_none()
```

---

## 8. 慎用长生命周期 Session

在 FastAPI 中不要全局共享一个 Session。

必须是：

- 每请求创建
- 每请求关闭

---

# 十二、你必须会的 FastAPI + SQLAlchemy 模板

下面给你一份接近生产的简化模板。

````python
from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, select, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, Session, sessionmaker

DATABASE_URL = "postgresql+psycopg://postgres:secret@localhost:5432/mydb"

engine = create_engine(
    DATABASE_URL,
    echo=False,
    pool_pre_ping=True,
)

SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True)


class UserCreate(BaseModel):
    username: str
    email: EmailStr


app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users")
def create_user(data: UserCreate, db: Session = Depends(get_db)):
    exists = db.execute(
        select(User).where(User.username == data.username)
    ).scalar_one_or_none()

    if exists:
        raise HTTPException(status_code=400, detail="用户名已存在")

    user = User(username=data.username, email=data.email)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


@app.get("/users/{user_id}")
def get_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")
    return user


@app.get("/users")
def list_users(db: Session = Depends(get_db)):
    users = db.execute(
        select(User).order_by(User.id.desc())
    ).scalars().all()
    return users


@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    user = db.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="用户不存在")

    db.delete(user)
    db.commit()
    return {"message": "删除成功"}
````

---

# 十三、`Session` 常见坑位总结

---

## 坑 1：`add()` 了就以为入库了

不是。

`add()` 只是把对象放进 Session 管理。  
真正入库要等 `flush()` 或 `commit()`。

---

## 坑 2：`flush()` 了就以为事务完成了

不是。

`flush()` 只是把 SQL 发出去了，事务仍未提交。  
可以继续 `rollback()`。

---

## 坑 3：异常后不 rollback

如果一次提交失败了，不 `rollback()`，这个 Session 往往就废了，后面继续用会报错。

---

## 坑 4：把 Session 当全局变量共享

这是 Web 项目大忌。

---

## 坑 5：在 CRUD 函数内部乱 commit

事务边界混乱，组合业务很难维护。

---

## 坑 6：查询 ORM 列表时忘了 `scalars()`

```python
result = db.execute(select(User)).all()
```

这样拿到的不是你最想要的对象列表。

通常应该：

```python
users = db.execute(select(User)).scalars().all()
```

---

# 十四、你最该背下来的 Session 速查表

---

## 新增

```python
db.add(obj)
db.commit()
db.refresh(obj)
```

---

## 批量新增

```python
db.add_all([obj1, obj2])
db.commit()
```

---

## 主键查询

```python
obj = db.get(Model, id)
```

---

## 条件查询单条

```python
obj = db.execute(
    select(Model).where(Model.name == name)
).scalar_one_or_none()
```

---

## 查询列表

```python
items = db.execute(
    select(Model).order_by(Model.id.desc())
).scalars().all()
```

---

## 更新

```python
obj = db.get(Model, id)
obj.name = "new"
db.commit()
db.refresh(obj)
```

---

## 删除

```python
obj = db.get(Model, id)
db.delete(obj)
db.commit()
```

---

## 获取新对象 id，但暂不提交

```python
db.add(obj)
db.flush()
print(obj.id)
```

---

## 异常回滚

```python
try:
    ...
    db.commit()
except:
    db.rollback()
    raise
```

---

# 十五、如果你想像老鸟一样用得稳，再补 5 条经验

---

## 经验 1：能 ORM 就 ORM，批量和复杂 SQL 再 Core

日常业务开发：
- 用户
- 订单
- 权限
- 内容管理

ORM 足够舒服。

大量批量操作、报表 SQL、复杂 PostgreSQL 特性时，再考虑 Core / 原生 SQL。

---

## 经验 2：Session 由外层统一管理

路由层或 service 边界统一控制提交和回滚，底层函数只负责操作对象。

---

## 经验 3：接口创建资源时，固定模板别乱

```python
obj = Model(...)
db.add(obj)
db.commit()
db.refresh(obj)
return obj
```

---

## 经验 4：查询列表脑中默认模板就是

```python
db.execute(select(Model)).scalars().all()
```

---

## 经验 5：事务是第一优先级，不是“能跑就行”

你要习惯问自己：

- 这几个操作是不是一个事务？
- 中间失败会不会产生半成数据？
- `commit()` 应该放在哪里？

这才是“像老鸟一样”的关键。

---

# 十六、最后给你一个最实战的学习路径

如果你想快速掌握 FastAPI + SQLAlchemy 数据操控，建议按这个顺序练：

---

## 第 1 步：先把这 8 个完全熟练

- `add`
- `get`
- `execute`
- `commit`
- `rollback`
- `refresh`
- `flush`
- `delete`

---

## 第 2 步：把这 4 个查询套路练熟

- `db.get(Model, id)`
- `db.execute(select(Model)).scalars().all()`
- `scalar_one_or_none()`
- `select(...).where(...)`

---

## 第 3 步：把 FastAPI 的依赖注入模板固定下来

- `SessionLocal`
- `get_db`
- `Depends(get_db)`

---

## 第 4 步：开始培养事务意识

不要只想着“插入成功了没”，而是想：

- 这一整段业务是不是原子性的？
- 出错时是不是应该整体回滚？

---

如果你愿意，我下一条可以继续直接给你整理两份非常实用的内容：

1. **《FastAPI + SQLAlchemy 2 CRUD 最佳实践模板》**
2. **《SQLAlchemy Session 全方法对照表（带示例）》**

如果你想，我还可以顺手给你补一份：

**“同步 Session 和 AsyncSession 的写法对照笔记”**。