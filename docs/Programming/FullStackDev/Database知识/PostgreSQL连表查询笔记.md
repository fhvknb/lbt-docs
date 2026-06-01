## PostgreSQL `JOIN` 查询 `SELECT` 语句示例

下面给你几个常见的 `JOIN` 用法示例。

---

# 1. 准备示例表

假设有两张表：

- `employees`：员工表
- `departments`：部门表

```sql
CREATE TABLE departments (
    id SERIAL PRIMARY KEY,
    dept_name VARCHAR(50)
);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    emp_name VARCHAR(50),
    dept_id INT
);
```

示例数据：

```sql
INSERT INTO departments (id, dept_name) VALUES
(1, '技术部'),
(2, '销售部'),
(3, '人事部');

INSERT INTO employees (id, emp_name, dept_id) VALUES
(1, '张三', 1),
(2, '李四', 2),
(3, '王五', 1),
(4, '赵六', NULL);
```

---

# 2. `INNER JOIN` 示例
查询有部门的员工及其部门名称：

```sql
SELECT e.id, e.emp_name, d.dept_name
FROM employees e
INNER JOIN departments d
    ON e.dept_id = d.id;
```

## 结果说明
只会查出 **两边能关联上的数据**：

- 张三 - 技术部
- 李四 - 销售部
- 王五 - 技术部

---

# 3. `LEFT JOIN` 示例
查询所有员工，即使没有部门也显示：

```sql
SELECT e.id, e.emp_name, d.dept_name
FROM employees e
LEFT JOIN departments d
    ON e.dept_id = d.id;
```

## 结果说明
会保留 `employees` 表所有记录：

- 张三 - 技术部
- 李四 - 销售部
- 王五 - 技术部
- 赵六 - `NULL`

---

# 4. `RIGHT JOIN` 示例
查询所有部门，包括没有员工的部门：

```sql
SELECT e.emp_name, d.dept_name
FROM employees e
RIGHT JOIN departments d
    ON e.dept_id = d.id;
```

## 结果说明
会保留 `departments` 表所有记录。  
如果某部门没人，对应员工字段为 `NULL`。

---

# 5. `FULL JOIN` 示例
查询所有员工和所有部门，不管是否匹配：

```sql
SELECT e.emp_name, d.dept_name
FROM employees e
FULL JOIN departments d
    ON e.dept_id = d.id;
```

## 结果说明
两边所有数据都保留，匹配不上就显示 `NULL`。

---

# 6. 多表 JOIN 示例

假设再加一张工资表 `salaries`：

```sql
CREATE TABLE salaries (
    emp_id INT,
    salary NUMERIC(10,2)
);
```

示例数据：

```sql
INSERT INTO salaries (emp_id, salary) VALUES
(1, 12000),
(2, 9000),
(3, 15000);
```

查询员工、部门、工资：

```sql
SELECT e.emp_name, d.dept_name, s.salary
FROM employees e
LEFT JOIN departments d
    ON e.dept_id = d.id
LEFT JOIN salaries s
    ON e.id = s.emp_id;
```

---

# 7. 带条件的 JOIN 查询
查询技术部员工信息：

```sql
SELECT e.emp_name, d.dept_name
FROM employees e
JOIN departments d
    ON e.dept_id = d.id
WHERE d.dept_name = '技术部';
```

---

# 8. 统计每个部门人数
```sql
SELECT d.dept_name, COUNT(e.id) AS emp_count
FROM departments d
LEFT JOIN employees e
    ON d.id = e.dept_id
GROUP BY d.dept_name;
```

---

# 9. 自连接示例
假设员工表中有上级领导字段：

```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    emp_name VARCHAR(50),
    manager_id INT
);
```

查询员工和其领导姓名：

```sql
SELECT e.emp_name AS employee, m.emp_name AS manager
FROM employees e
LEFT JOIN employees m
    ON e.manager_id = m.id;
```

---

# 10. 最常用模板

## 内连接
```sql
SELECT a.col1, b.col2
FROM table_a a
JOIN table_b b
    ON a.id = b.a_id;
```

## 左连接
```sql
SELECT a.col1, b.col2
FROM table_a a
LEFT JOIN table_b b
    ON a.id = b.a_id;
```

## 多表连接
```sql
SELECT a.col1, b.col2, c.col3
FROM table_a a
JOIN table_b b
    ON a.id = b.a_id
JOIN table_c c
    ON b.id = c.b_id;
```

---

# 11. 注意事项

## `ON` 和 `WHERE` 的区别
- `ON`：定义表之间如何关联
- `WHERE`：对关联结果再过滤

例如：

```sql
SELECT e.emp_name, d.dept_name
FROM employees e
LEFT JOIN departments d
    ON e.dept_id = d.id
WHERE d.dept_name = '技术部';
```

这实际上会把 `LEFT JOIN` 过滤得很像 `INNER JOIN`。

如果你想保留所有员工，同时只显示技术部匹配：

```sql
SELECT e.emp_name, d.dept_name
FROM employees e
LEFT JOIN departments d
    ON e.dept_id = d.id
   AND d.dept_name = '技术部';
```

---

如果你愿意，我还可以继续给你补一版：

## **PostgreSQL 三表 `JOIN` 的真实业务 SQL 示例**
比如：
- 用户表
- 订单表
- 商品表

或者我也可以直接给你整理成 **面试常见 `JOIN` 示例大全**。