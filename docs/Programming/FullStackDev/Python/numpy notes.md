# numpy notes

## `np.argsort`

`np.argsort` 是 NumPy 库中的一个非常有用的方法，用于对数组进行排序并返回排序后元素的索引。下面是对 `np.argsort` 方法的详细解释，包括其用法和示例。

### 方法概述

- **函数原型**：
  ```python
  numpy.argsort(a, axis=-1, kind='quicksort', order=None)
  ```
  
- **参数**：
  - `a`：待排序的数组。
  - `axis`：指定排序的轴，默认是最后一个轴（-1）。如果是多维数组，可以指定某一维度进行排序。
  - `kind`：排序算法的类型，可以是 `'quicksort'`（默认）、`'mergesort'`、`'heapsort'` 等。
  - `order`：在结构化数组中指定排序的字段。

- **返回值**：
  - 返回一个数组，包含原数组中元素的索引，索引按排序后的顺序排列。

### 使用示例

以下是一些使用 `np.argsort` 的示例：

#### 示例 1：基本用法

```python
import numpy as np

# 创建一个 NumPy 数组
arr = np.array([3, 1, 2])

# 获取排序后的索引
sorted_indices = np.argsort(arr)

print("原数组:", arr)
print("排序后的索引:", sorted_indices)
print("排序后的数组:", arr[sorted_indices])
```

**输出**：
```
原数组: [3 1 2]
排序后的索引: [1 2 0]
排序后的数组: [1 2 3]
```

#### 示例 2：对多维数组进行排序

```python
import numpy as np

# 创建一个 2D 数组
arr = np.array([[3, 1, 2],
                [6, 5, 4]])

# 对每一行进行排序，获取索引
sorted_indices = np.argsort(arr, axis=1)

print("原数组:\n", arr)
print("每行排序后的索引:\n", sorted_indices)
```

**输出**：
```
原数组:
 [[3 1 2]
 [6 5 4]]
每行排序后的索引:
 [[1 2 0]
 [2 1 0]]
```

#### 示例 3：使用不同的排序算法

```python
import numpy as np

arr = np.array([3, 1, 2])

# 使用 mergesort 进行排序
sorted_indices = np.argsort(arr, kind='mergesort')

print("排序后的索引:", sorted_indices)
print("排序后的数组:", arr[sorted_indices])
```

### 总结

- `np.argsort` 是一个强大的工具，可以方便地获取数组排序后的索引。
- 通过指定 `axis` 参数，可以对多维数组的特定维度进行排序。
- 可以选择不同的排序算法，以满足不同的性能需求。



在多维数组操作（如 NumPy 或 PyTorch）中，

`axis` 参数决定了操作沿哪个**维度**进行。

1. 核心对应规则

`axis` 的数值对应数组形状（`shape`）的索引：

- **axis 0**：对应 `shape` 的第 1 个数字（通常是**行**或**最外层**）。
- **axis 1**：对应 `shape` 的第 2 个数字（通常是**列**）。
- **axis 2**：对应 `shape` 的第 3 个数字（通常是**深度**）。
- **axis -1**：指代**最后一个**维度。

2. 直观理解方法

理解 `axis` 最简单的方法是：**“沿着哪个维度，就跨过那个维度”**。

- **以二维数组 (3, 4) 为例：**- `axis=0`：跨越“行”进行操作。你会把每一行垂直地压缩/对比，最终结果的长度等于列数。
- `axis=1`：跨越“列”进行操作。你会把每一列水平地压缩/对比，最终结果的长度等于行数。


- **以三维数组 (Batch, Row, Col) 为例：**- `axis=0`：在不同的 Batch 之间进行操作。
- `axis=1`：在同一个 Batch 内，跨行操作（纵向）。
- `axis=2`：在同一个 Batch 内，跨列操作（横向）。



3. 操作后的形状变化

当你对某个 `axis` 执行聚合操作（如 `sum`, `mean`, `max`）时，该维度会消失：

- 若数组 `shape` 为 `(5, 10, 3)`：- `sum(axis=0)` → 结果 `shape` 为 `(10, 3)`。
- `sum(axis=1)` → 结果 `shape` 为 `(5, 3)`。
- `sum(axis=2)` → 结果 `shape` 为 `(5, 10)`。



4. 常见函数中的应用

- **np.sum / np.mean**：沿着指定的 axis 坍缩。
- **np.concatenate**：沿着指定的 axis 拼接。- `axis=0`：纵向堆叠（增加行数）。
- `axis=1`：横向拼接（增加列数）。


- **np.sort**：沿着指定的 axis 进行排序。

你可以通过 NumPy 官方文档 或使用 Google Colab 运行 `np.arange(24).reshape(2,3,4)` 并尝试不同的 `axis` 参数来实时观察结果。















