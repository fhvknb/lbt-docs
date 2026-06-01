
在使用 `AsyncSession` 时，请记住以下规则：

1. `db.add()` 不需要 `await`（因为它只是在内存中标记对象）。
2. `db.flush()`、`db.commit()`、`db.rollback()` **必须加 `await`**。
3. `db.execute()`、`db.scalars()` 等查询操作 **必须加 `await`**。
4. `db.refresh(obj)` **必须加 `await`**。