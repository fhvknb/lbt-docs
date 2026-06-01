数据库重构后的存量数据迁移（Data Migration）是软件工程中风险较高但又必须面对的环节。你提出**“通过 CSV 文件整理需要处理的数据”**，这是一个非常好的思路！CSV 作为中间态，既方便人工审查（Review），又可以作为数据快照（Snapshot）进行版本控制。

要做到**“安全且优雅”**，核心原则是：**解耦、幂等、可回滚、可测试**。

以下是一套基于 CSV 的优雅数据迁移方案，分为 4 个阶段：

### 阶段一：架构设计（ETL 思想）

不要试图写一个直接从旧表 `INSERT INTO` 新表的超级 SQL，这极易出错且难以调试。建议采用经典的 **ETL（提取-转换-加载）** 模式：

1. **E (Extract) 提取**：将旧表数据原封不动导出为 `old_data.csv`。
2. **T (Transform) 转换**：写一个 Python 脚本（推荐使用 `pandas`），读取 `old_data.csv`，在内存中进行数据清洗、拆分、字段映射，生成符合新表结构的 `new_table_A.csv`, `new_table_B.csv`。
3. **L (Load) 加载**：写一个专门的导入脚本，将生成好的新 CSV 安全地写入新数据库。

---

### 阶段二：数据转换（Transform）—— 优雅的核心

在这个阶段，你完全脱离了数据库，只对 CSV 文件进行操作。

**优势**：
* **安全**：怎么折腾都不会弄坏数据库。
* **可追溯**：你可以把生成的 `new_table_A.csv` 发给业务方确认，或者自己用 Excel 打开检查外键映射对不对。

**示例代码思路 (Python + Pandas)**：
```python
import pandas as pd
import uuid

# 1. 读取旧数据
df_old = pd.read_csv('old_users.csv')

# 2. 数据清洗与拆分（假设旧的 user 表被拆分成了 users 和 employees 两张表）
df_users = pd.DataFrame()
df_users['id'] = df_old['id']
df_users['username'] = df_old['login_name']
df_users['password'] = df_old['pwd']

df_employees = pd.DataFrame()
df_employees['no'] = df_old['id'].apply(lambda x: f"EMP{x:04d}") # 生成新工号
df_employees['user_id'] = df_old['id']
df_employees['name'] = df_old['real_name']
df_employees['department_id'] = df_old['dept_id'].fillna(1) # 处理空值

# 3. 导出为新的 CSV（准备导入）
df_users.to_csv('import_users.csv', index=False)
df_employees.to_csv('import_employees.csv', index=False)
```

---

### 阶段三：数据加载（Load）—— 安全的保障

将清洗好的 CSV 导入新表时，必须保证脚本的**幂等性**（Idempotence）和**事务性**。

#### 1. 保证入库顺序（拓扑排序）
新表之间肯定有外键依赖（比如先有 `users` 才能有 `employees`）。必须严格按照依赖顺序读取 CSV 并入库。

#### 2. 幂等性设计（Idempotency）
**这是最重要的一点！** 迁移脚本可能会因为网络波动或脏数据在中途崩溃。你的脚本必须支持**“重复运行无数次，结果都一样”**。

* **方案 A：基于主键的 `UPSERT`**（推荐）
  如果数据已存在则更新（或跳过），不存在则插入。在 SQLAlchemy 中可以使用 `ON CONFLICT DO NOTHING` (PostgreSQL) 或 `INSERT IGNORE` (MySQL)。
* **方案 B：先查后插**
  插入前先查一下 ID 是否存在。

#### 3. 事务与分批提交（Batch & Transaction）
不要一次性把 100 万条数据放在一个事务里，内存会爆掉，锁表时间也会太长。

**优雅的入库脚本示例 (SQLAlchemy 2.0)**：
```python
import csv
from sqlalchemy.orm import Session
from models import User # 你的新模型

def load_users_from_csv(db: Session, csv_path: str):
    batch_size = 1000
    batch_data = []
    
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for i, row in enumerate(reader):
            # 1. 检查是否已存在 (实现幂等)
            exists = db.query(User).filter(User.id == row['id']).first()
            if exists:
                continue # 或者做更新操作
                
            # 2. 构建新对象
            new_user = User(
                id=row['id'],
                username=row['username'],
                password=row['password']
            )
            batch_data.append(new_user)
            
            # 3. 分批提交
            if len(batch_data) >= batch_size:
                try:
                    db.bulk_save_objects(batch_data)
                    db.commit() # 提交这 1000 条
                    batch_data = []
                    print(f"已成功导入 {i+1} 条数据...")
                except Exception as e:
                    db.rollback() # 发生错误，回滚这 1000 条
                    print(f"导入失败，错误行数附近: {i}")
                    raise e
                    
        # 提交剩余的尾部数据
        if batch_data:
            db.bulk_save_objects(batch_data)
            db.commit()
```

---

### 阶段四：执行策略（如何平滑过渡）

为了安全，千万不要直接在生产环境跑脚本。遵循以下步骤：

1. **Dry Run（空跑测试）**：在本地/测试环境，拉取一份生产环境的脱敏备份数据库。运行你的 ETL 脚本，观察是否有报错。
2. **数据校验（Validation）**：写一个简单的校验脚本。比如：`旧表总人数 == 新表 users 总数 == 新表 employees 总数`。
3. **停机迁移（Downtime Migration）**：
   * 如果数据量不大（百万级以内），最安全的方式是**发布系统停机公告**（比如凌晨 2 点到 4 点）。
   * 停机 -> 导出旧数据 -> 运行 Python 转换生成 CSV -> 运行入库脚本 -> 切换新代码 -> 启动服务。
4. **双写/灰度（如果不能停机）**：
   如果你的系统要求 7x24 小时高可用，那就需要复杂的“双写策略”（新老代码同时写新老两套表），这会极大增加系统复杂度，除非绝对必要，否则首选停机迁移。

### 总结
你选择 **CSV 作为数据中转站** 是非常明智的。它将复杂的“数据库重构”解耦成了两个简单的问题：
1. **旧数据 -> 新 CSV**（纯逻辑处理，无副作用，随便测）。
2. **新 CSV -> 新数据库**（纯 I/O 操作，做好幂等和分批即可）。

