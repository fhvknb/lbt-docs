下面给你整理一份 **SQLAlchemy 2 ORM 查询进阶笔记**，重点讲你提到的：

- `select(...).options(...)`
- `selectinload(...)`
- `joinedload(...)`
- `subqueryload(...)`
- `contains_eager(...)`
- `lazyload(...)`
- `noload(...)`
- `raiseload(...)`
- 以及**老鸟常用的联表查询写法**

我会尽量按 **“理解原理 + 常见场景 + 推荐写法 + 易踩坑”** 来讲。  
因为这一块是 ORM 查询最容易“会用一点，但总感觉不踏实”的地方。

---

# 一、先说结论：你看到的 `.options(...)` 到底是干什么的

一句话理解：

> `select(...).options(...)` 是给 ORM 查询附加“加载策略”的地方。

它主要解决的问题不是“能不能查到数据”，而是：

- **关联对象什么时候加载**
- **一次查几条 SQL**
- **要不要 join**
- **如何避免 N+1 查询**
- **如何控制性能和结果形态**

---

# 二、先建立一个模型示例

后面所有例子都基于这个一对多关系。

````python
from typing import List, Optional
from sqlalchemy import ForeignKey, String, Integer
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship

class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(50))
    profile: Mapped[Optional["Profile"]] = relationship(back_populates="user", uselist=False)
    orders: Mapped[List["Order"]] = relationship(back_populates="user")


class Profile(Base):
    __tablename__ = "profiles"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"), unique=True)
    nickname: Mapped[str] = mapped_column(String(50))

    user: Mapped["User"] = relationship(back_populates="profile")


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    status: Mapped[str] = mapped_column(String(20))

    user: Mapped["User"] = relationship(back_populates="orders")
````

---

# 三、为什么需要 `.options(...)`

比如你这样查：

````python
stmt = select(User)
users = session.execute(stmt).scalars().all()
````

如果后面你遍历：

````python
for user in users:
    print(user.orders)
````

而 `orders` 是默认延迟加载，那么可能会发生：

- 查 `users`：1 次 SQL
- 每个 `user.orders`：再发 1 次 SQL

如果有 100 个用户，就变成：

- 1 + 100 次 SQL

这就是经典的 **N+1 查询问题**。

所以 `.options(...)` 的核心价值就是：

> **提前设计好关系属性怎么加载，避免 ORM 在你访问属性时偷偷发很多 SQL。**

---

# 四、最核心的几个加载策略

你先记住 ORM 里最重要的 4 个：

- `selectinload()`：**最常用，老鸟最爱**
- `joinedload()`：单 SQL join 预加载
- `subqueryload()`：较少见，特定场景用
- `contains_eager()`：你自己写 join 时告诉 ORM 结果怎么装配

如果你先吃透这 4 个，ORM 查询已经进阶很多了。

---

# 五、`selectinload()`：最推荐、最稳的预加载方式

---

## 1. 典型写法

````python
from sqlalchemy import select
from sqlalchemy.orm import selectinload

stmt = select(User).options(selectinload(User.orders))
users = session.execute(stmt).scalars().all()
````

---

## 2. 它会发几条 SQL

通常是 **2 条 SQL**：

### 第 1 条
查用户：

````sql
SELECT users.id, users.username
FROM users
````

### 第 2 条
查这些用户对应的订单：

````sql
SELECT orders.id, orders.user_id, orders.status
FROM orders
WHERE orders.user_id IN (1, 2, 3, ...)
````

---

## 3. 为什么老鸟很喜欢 `selectinload`

因为它有几个非常强的优点：

### 优点 1：天然避免 N+1

不会每个用户发一次 `orders` 查询，而是统一批量查。

---

### 优点 2：不会像 `joinedload` 那样导致主对象重复膨胀

如果一个用户有 100 个订单，`joinedload` 会把用户行重复很多次。  
而 `selectinload` 不会让主查询结果被放大。

---

### 优点 3：对一对多、多对多尤其友好

因为集合关系非常容易在 join 后出现重复主对象。

---

## 4. 老鸟经验结论

### 对一对多 / 多对多：
> **默认优先考虑 `selectinload()`**

这是非常常见的实战经验。

---

## 5. 多层预加载

````python
stmt = select(User).options(
    selectinload(User.orders).selectinload(Order.items)
)
````

意思是：

- 先查 `User`
- 再批量查 `orders`
- 再批量查 `items`

如果关系较深，`selectinload` 很适合。

---

## 6. 一对一也可以用

````python
stmt = select(User).options(selectinload(User.profile))
````

虽然一对一也能用，但很多时候一对一/多对一也可以考虑 `joinedload`。

---

# 六、`joinedload()`：单 SQL join 预加载

---

## 1. 基本写法

````python
from sqlalchemy.orm import joinedload

stmt = select(User).options(joinedload(User.orders))
users = session.execute(stmt).scalars().unique().all()
````

---

## 2. 它会干什么

会生成类似：

````sql
SELECT users.*, orders.*
FROM users
LEFT OUTER JOIN orders ON users.id = orders.user_id
````

即：

> **在主查询阶段直接 join 把关联对象带出来**

---

## 3. 优点

- 一次 SQL 查出来
- 对于一对一、多对一关系有时很高效
- 如果关联对象很少，性能不错

---

## 4. 最大问题：结果膨胀

如果：

- 1 个用户有 100 个订单
- 你查 100 个用户

join 后返回行数可能暴增。

这会带来：

- 传输数据量变大
- Python 端去重装配成本增加
- 主对象重复

---

## 5. 为什么经常要 `.unique()`

这是重点。

````python
users = session.execute(stmt).scalars().unique().all()
````

因为 `joinedload(User.orders)` 时，SQL 结果行里一个 `User` 可能重复出现多次。  
`.unique()` 是 ORM 结果去重时的常见配套写法。

---

## 6. 老鸟经验结论

### 一对一 / 多对一：
> **`joinedload()` 经常很合适**

例如：

- `Order.user`
- `User.profile`

### 一对多：
> **通常先考虑 `selectinload()`，除非你很确定 join 更合适**

---

# 七、`subqueryload()`：知道就好，必要时再用

---

## 1. 写法

````python
from sqlalchemy.orm import subqueryload

stmt = select(User).options(subqueryload(User.orders))
````

---

## 2. 它的思路

不是简单 `IN (...)`，而是通过子查询拿主对象主键集合，再加载关联数据。

---

## 3. 现在为什么没 `selectinload()` 常用

因为大多数场景下：

- `selectinload` 更直观
- 性能和行为更可控
- 更符合常见数据库优化习惯

### 所以老鸟一般经验是：
> 优先 `selectinload()`，除非特定场景再考虑 `subqueryload()`

---

# 八、`.options()` 不只是加载关系，还能控制列和延迟行为

很多人以为 `.options()` 只能写 `selectinload`。其实不是。

它还可以配：

- `load_only()`
- `defer()`
- `undefer()`
- `raiseload()`
- `lazyload()`
- `noload()`

这些也很常用。

---

# 九、`load_only()`：只加载某些列

---

## 1. 写法

````python
from sqlalchemy.orm import load_only

stmt = select(User).options(load_only(User.id, User.username))
users = session.execute(stmt).scalars().all()
````

---

## 2. 用途

如果 `User` 表很大，有很多你当前不需要的列，比如：

- 大文本
- JSON 字段
- 审计字段

你只想加载核心列，就可以用 `load_only()`。

---

## 3. 老鸟用途

- 列表页只取必要字段
- 降低对象装载成本
- 减少 SQL 传输列数

---

# 十、`defer()` / `undefer()`

---

## 1. `defer()`

延迟加载某个列，访问时再查。

````python
from sqlalchemy.orm import defer

stmt = select(User).options(defer(User.big_text))
````

---

## 2. `undefer()`

把原本延迟列改成这次查询时加载。

````python
from sqlalchemy.orm import undefer

stmt = select(User).options(undefer(User.big_text))
````

---

## 3. 适合场景

- 某些大字段默认不常用
- 但部分接口需要显式加载

---

# 十一、`lazyload()` / `noload()` / `raiseload()`

这几个是控制“关系属性访问行为”的利器。

---

## 1. `lazyload()`

强制延迟加载。

````python
from sqlalchemy.orm import lazyload

stmt = select(User).options(lazyload(User.orders))
````

一般不算高频，更多是覆盖默认策略。

---

## 2. `noload()`

完全不加载这个关系。

````python
from sqlalchemy.orm import noload

stmt = select(User).options(noload(User.orders))
````

适合：
- 你明确知道当前不需要关系
- 避免无意访问触发加载

---

## 3. `raiseload()`

如果访问这个关系就直接报错。

````python
from sqlalchemy.orm import raiseload

stmt = select(User).options(raiseload(User.orders))
````

### 这东西老鸟很喜欢在“防 N+1 排查”时使用

比如你怀疑某个接口里有人无意中访问了懒加载关系，就可以加 `raiseload()`，让问题暴露出来。

---

# 十二、`contains_eager()`：你自己写 join 时，告诉 ORM 如何装配关系

这个很重要，也是很多人容易忽略的“高级姿势”。

---

## 1. 为什么需要它

如果你这样写：

````python
stmt = select(User).join(User.orders)
result = session.execute(stmt).scalars().all()
````

这只是 SQL 层面 join 了，**不代表 ORM 自动把 `orders` 关系填充好了**。

也就是说：

- 你 join 了 `orders`
- 但访问 `user.orders` 时，ORM 仍可能再发 SQL

这时你需要 `contains_eager()` 告诉 ORM：

> 这次 join 出来的数据，就是用来装 `User.orders` 的

---

## 2. 写法

````python
from sqlalchemy.orm import contains_eager

stmt = (
    select(User)
    .join(User.orders)
    .options(contains_eager(User.orders))
)

users = session.execute(stmt).scalars().unique().all()
````

---

## 3. 什么时候用

### 典型场景 1：你需要对关联表做过滤

比如只查有 `paid` 订单的用户，并且想把这些 `paid` 订单直接装到 `user.orders`：

````python
stmt = (
    select(User)
    .join(User.orders)
    .where(Order.status == "paid")
    .options(contains_eager(User.orders))
)

users = session.execute(stmt).scalars().unique().all()
````

---

## 4. 为什么 `joinedload()` 不适合这个场景

因为 `joinedload()` 的目的是“加载关系”，不是“改变结果集过滤逻辑”。

### 区别很重要：

- `join()`：影响主查询结果
- `joinedload()`：只是加载策略，不应该拿来做结果筛选

这是 ORM 初学者很容易混的点。

---

# 十三、最重要的理解：`join()` 和 `joinedload()` 完全不是一回事

这个必须单独讲。

---

## 1. `join()`

作用是：

> **为了 SQL 查询逻辑服务**

它会影响：

- 筛选条件
- 排序
- 结果集范围

例如：

````python
stmt = select(User).join(User.orders).where(Order.status == "paid")
````

这表示：
- 只查有 paid 订单的用户

---

## 2. `joinedload()`

作用是：

> **为了 ORM 关系加载服务**

它的目的是：
- 把关系一并加载
- 避免额外 SQL

但原则上它**不应该改变主对象集合的语义**

---

## 3. 老鸟常说的一句话

> **`join()` 是查谁；`joinedload()` 是查出来后顺手把谁也带上。**

这句话你记住很有帮助。

---

# 十四、ORM 老鸟最常见的联表查询写法

下面给你整理最常见的套路。

---

# 十五、写法 1：查用户，同时预加载订单

### 推荐

````python
stmt = select(User).options(selectinload(User.orders))
users = session.execute(stmt).scalars().all()
````

### 适合
- 列表页
- 用户详情页
- 一对多关系展示

### 老鸟点评
这是最稳的默认写法。

---

# 十六、写法 2：查订单，同时预加载所属用户

### 推荐

````python
stmt = select(Order).options(joinedload(Order.user))
orders = session.execute(stmt).scalars().all()
````

### 为什么常用 `joinedload`
因为 `Order -> User` 是多对一，关联通常只有一个对象，join 成本低，收益高。

---

# 十七、写法 3：根据关联表字段过滤主表

例如：查有已支付订单的用户。

````python
stmt = (
    select(User)
    .join(User.orders)
    .where(Order.status == "paid")
)
users = session.execute(stmt).scalars().unique().all()
````

### 注意
这里你是为了**筛选用户**，所以要用 `join()`，不是 `joinedload()`。

---

# 十八、写法 4：根据关联表过滤，同时把关联关系装进去

例如：查有已支付订单的用户，并且后续直接访问 `user.orders` 不想再发 SQL。

````python
stmt = (
    select(User)
    .join(User.orders)
    .where(Order.status == "paid")
    .options(contains_eager(User.orders))
)

users = session.execute(stmt).scalars().unique().all()
````

### 老鸟点评
这是“手动 join + ORM 关系回填”的标准高级写法。

---

# 十九、写法 5：多层预加载

例如：查用户，同时预加载订单和订单项。

````python
stmt = select(User).options(
    selectinload(User.orders).selectinload(Order.items)
)
users = session.execute(stmt).scalars().all()
````

### 老鸟点评
深层关系优先 `selectinload`，通常更稳。

---

# 二十、写法 6：混合加载策略

例如：

- `User.profile` 是一对一，用 `joinedload`
- `User.orders` 是一对多，用 `selectinload`

````python
stmt = select(User).options(
    joinedload(User.profile),
    selectinload(User.orders)
)
users = session.execute(stmt).scalars().unique().all()
````

### 老鸟点评
这非常像真实项目写法。

---

# 二十一、写法 7：只拿需要的列 + 预加载关系

````python
stmt = select(User).options(
    load_only(User.id, User.username),
    selectinload(User.orders)
)
users = session.execute(stmt).scalars().all()
````

### 适合
- 列表页优化
- 大表字段裁剪

---

# 二十二、写法 8：关联过滤推荐用 `exists()`，而不是盲目 join

比如：查“有订单的用户”。

### 写法 A：join

````python
stmt = select(User).join(User.orders)
users = session.execute(stmt).scalars().unique().all()
````

### 写法 B：exists，更语义化

````python
from sqlalchemy import exists, select

stmt = select(User).where(
    exists(
        select(1).where(Order.user_id == User.id)
    )
)
users = session.execute(stmt).scalars().all()
````

### 老鸟点评
如果你只是判断“是否存在关联记录”，`exists()` 往往更清晰，也避免 join 造成重复。

---

# 二十三、写法 9：用 `.any()` / `.has()` 写关系过滤

这是 ORM 风格非常实用的写法。

---

## 1. 一对多：`.any()`

查有 paid 订单的用户：

````python
stmt = select(User).where(User.orders.any(Order.status == "paid"))
users = session.execute(stmt).scalars().all()
````

等价于 SQL 的 EXISTS 风格。

### 老鸟点评
很优雅，业务语义也清晰。

---

## 2. 多对一 / 一对一：`.has()`

查用户昵称是 `tom` 的 profile：

````python
stmt = select(Profile).where(Profile.user.has(User.username == "tom"))
profiles = session.execute(stmt).scalars().all()
````

---

# 二十四、写法 10：显式指定 join 路径

如果关系复杂或多表 join，老鸟更喜欢写得明确一点。

````python
stmt = (
    select(Order)
    .join(Order.user)
    .where(User.username == "alice")
)
orders = session.execute(stmt).scalars().all()
````

比手动写 `Order.user_id == User.id` 更 ORM 风格。

---

# 二十五、写法 11：使用别名 `aliased()`

自连接、多次关联同一张表时常用。

````python
from sqlalchemy.orm import aliased

buyer = aliased(User)
seller = aliased(User)

stmt = (
    select(Trade, buyer, seller)
    .join(buyer, Trade.buyer_id == buyer.id)
    .join(seller, Trade.seller_id == seller.id)
)
rows = session.execute(stmt).all()
````

---

# 二十六、写法 12：联表排序

例如按用户用户名排序订单：

````python
stmt = (
    select(Order)
    .join(Order.user)
    .order_by(User.username.asc(), Order.id.desc())
)
orders = session.execute(stmt).scalars().all()
````

---

# 二十七、写法 13：联表统计

例如统计每个用户订单数：

````python
from sqlalchemy import func

stmt = (
    select(User.id, User.username, func.count(Order.id).label("order_count"))
    .outerjoin(User.orders)
    .group_by(User.id, User.username)
)
rows = session.execute(stmt).all()
````

### 老鸟点评
这种场景通常就不是“纯 ORM 对象查询”了，而是 ORM + SQL 表达式混合查询。

---

# 二十八、写法 14：主查询返回 ORM 对象，附带聚合列

````python
stmt = (
    select(User, func.count(Order.id).label("order_count"))
    .outerjoin(User.orders)
    .group_by(User.id)
)
rows = session.execute(stmt).all()

for user, order_count in rows:
    print(user.username, order_count)
````

这在报表页、后台列表页很常见。

---

# 二十九、写法 15：分页列表 + 预加载关系

### 推荐

````python
stmt = (
    select(User)
    .order_by(User.id.desc())
    .offset(0)
    .limit(20)
    .options(selectinload(User.orders))
)

users = session.execute(stmt).scalars().all()
````

### 老鸟建议
分页列表场景下一对多关系，优先 `selectinload`，不要轻易 `joinedload`，否则 join 后分页结果可能很别扭。

---

# 三十、为什么分页 + `joinedload(one-to-many)` 要小心

这是实战大坑。

如果你：

````python
stmt = (
    select(User)
    .options(joinedload(User.orders))
    .limit(20)
)
````

因为 SQL 层 join 会导致一对多行重复，分页可能不符合你直觉：

- 你想分页 20 个用户
- 结果 SQL 实际分页的是 join 后的行

所以：

> **分页主对象 + 一对多关系，优先 `selectinload()`**

这是非常重要的老鸟经验。

---

# 三十一、老鸟对加载策略的经验法则

---

## 1. 一对多 / 多对多

### 默认优先
- `selectinload()`

### 原因
- 稳
- 避免主查询膨胀
- 对分页友好
- 结果更可控

---

## 2. 多对一 / 一对一

### 默认优先考虑
- `joinedload()`

### 原因
- 一次 join 成本低
- 关系对象单个，不会明显膨胀

---

## 3. 要用关联表条件筛选主表

### 用
- `join()`
- `where()`

### 不要误以为
- `joinedload()` 能替代过滤

---

## 4. 你手写了 join，还想把结果塞回关系属性

### 用
- `contains_eager()`

---

## 5. 想查列表页但避免列太多

### 配合
- `load_only()`

---

## 6. 想防止 N+1 偷偷发生

### 用
- `raiseload()`

---

# 三十二、实战中最常见的 6 套模板

下面我给你直接总结成“可背模板”。

---

## 模板 1：列表页，主表 + 一对多关系

````python
stmt = (
    select(User)
    .order_by(User.id.desc())
    .options(selectinload(User.orders))
)
users = session.execute(stmt).scalars().all()
````

---

## 模板 2：详情页，主表 + 若干关系

````python
stmt = (
    select(User)
    .where(User.id == user_id)
    .options(
        joinedload(User.profile),
        selectinload(User.orders),
    )
)
user = session.execute(stmt).scalar_one_or_none()
````

---

## 模板 3：按关联字段过滤

````python
stmt = (
    select(User)
    .join(User.orders)
    .where(Order.status == "paid")
)
users = session.execute(stmt).scalars().unique().all()
````

---

## 模板 4：过滤后直接回填关系

````python
stmt = (
    select(User)
    .join(User.orders)
    .where(Order.status == "paid")
    .options(contains_eager(User.orders))
)
users = session.execute(stmt).scalars().unique().all()
````

---

## 模板 5：存在性过滤

````python
stmt = select(User).where(User.orders.any(Order.status == "paid"))
users = session.execute(stmt).scalars().all()
````

---

## 模板 6：列表页字段裁剪 + 关系预加载

````python
stmt = (
    select(User)
    .options(
        load_only(User.id, User.username),
        selectinload(User.orders),
    )
)
users = session.execute(stmt).scalars().all()
````

---

# 三十三、常见误区总结

---

## 误区 1：`join()` 了就以为关系一定加载好了

不一定。  
你可能还需要 `contains_eager()`，否则访问关系属性仍可能额外发 SQL。

---

## 误区 2：把 `joinedload()` 当成筛选工具

错。  
筛选要用 `join().where(...)`。

---

## 误区 3：一对多全都 `joinedload()`

容易：

- 结果膨胀
- 分页异常
- 重复行增多

通常一对多更推荐 `selectinload()`。

---

## 误区 4：忘了 `.unique()`

只要你是：

- `joinedload()` 一对多
- 或 `join()` 后主对象可能重复

就要警惕 `.unique()`。

---

## 误区 5：列表页查很多对象，还默认懒加载

很容易产生 N+1。

---

# 三十四、FastAPI 里老鸟常见写法风格

如果放在 FastAPI service 层，常会长这样：

````python
def get_user_detail(db: Session, user_id: int) -> User | None:
    stmt = (
        select(User)
        .where(User.id == user_id)
        .options(
            joinedload(User.profile),
            selectinload(User.orders),
        )
    )
    return db.execute(stmt).scalar_one_or_none()
````

列表接口：

````python
def list_users(db: Session, offset: int = 0, limit: int = 20) -> list[User]:
    stmt = (
        select(User)
        .order_by(User.id.desc())
        .offset(offset)
        .limit(limit)
        .options(selectinload(User.orders))
    )
    return list(db.execute(stmt).scalars().all())
````

按关联过滤：

````python
def list_paid_users(db: Session) -> list[User]:
    stmt = (
        select(User)
        .join(User.orders)
        .where(Order.status == "paid")
    )
    return list(db.execute(stmt).scalars().unique().all())
````

---

# 三十五、最后给你一个“老鸟心法”

如果你只想记住 ORM 联表和加载策略的精华，记这几条：

---

## 心法 1

> **查主对象列表 + 一对多关系，先想 `selectinload()`**

---

## 心法 2

> **查单个关联对象（一对一 / 多对一），常想 `joinedload()`**

---

## 心法 3

> **要筛选结果集，用 `join()`；要优化关系加载，用 `joinedload()/selectinload()`**

---

## 心法 4

> **自己写了 join，又想把结果装进关系属性，用 `contains_eager()`**

---

## 心法 5

> **分页场景下，一对多别轻易 `joinedload()`**

---

## 心法 6

> **怀疑 N+1，就上 `raiseload()` 或者打开 SQL 日志看实际发了几条 SQL**
