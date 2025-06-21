# JavaScript 中的 ToPrimitive 抽象操作

## 1. ToPrimitive 的目标

JavaScript 的对象不是原始值，因此在某些情况下需要将对象转换为原始值。`ToPrimitive` 的目标是将对象转换为原始值（字符串、数字或布尔值）。

## 2. ToPrimitive 的算法概述

`ToPrimitive` 的操作遵循以下步骤：

1. **检查是否已是原始值**：
   如果输入值已是原始值（字符串、数字、布尔值、`null` 或 `undefined`），直接返回。
2. **调用对象的内部方法**：

   - **获取提示类型 (`hint`)**：
     - 要求数字时（如算术运算），提示类型为 `"number"`
     - 要求字符串时（如字符串拼接），提示类型为 `"string"`
     - 未明确指定时，默认提示类型为 `"default"`（通常等价于 `"number"`）
   - **尝试调用 `@@toPrimitive` 方法**：
     若对象实现了 `Symbol.toPrimitive` 方法，则调用它并传递 `hint` 参数。若返回原始值则直接返回。
   - **调用 `valueOf` 和 `toString` 方法**：
     - 提示类型为 `"string"` 时顺序调用：
       1. `toString()`
       2. `valueOf()`
     - 提示类型为 `"number"` 或 `"default"` 时顺序调用：
       1. `valueOf()`
       2. `toString()`
          若某方法返回原始值则返回，否则继续尝试。
3. **抛出错误**：
   若所有方法均未返回原始值，抛出 `TypeError`。

## 3. 实现细节

伪代码描述 `ToPrimitive` 逻辑：

```javascript
function ToPrimitive(input, hint) {
  // 如果 input 是原始值，直接返回
  if (typeof input !== object || input === null) {
    return input;
  }

  // 如果存在 Symbol.toPrimitive 方法，优先调用
  if (typeof input[Symbol.toPrimitive] === function) {
    const result = input[Symbol.toPrimitive](hint);
    if (typeof result !== object) {
      return result;
    }
    throw new TypeError(Cannot convert object to primitive value);
  }

  // 根据 hint 决定转换顺序
  if (hint === string) {
    // 按顺序调用 toString 和 valueOf
    if (typeof input.toString === function) {
      const result = input.toString();
      if (typeof result !== object) {
        return result;
      }
    }
    if (typeof input.valueOf === function) {
      const result = input.valueOf();
      if (typeof result !== object) {
        return result;
      }
    }
  } else {
    // 按顺序调用 valueOf 和 toString
    if (typeof input.valueOf === function) {
      const result = input.valueOf();
      if (typeof result !== object) {
        return result;
      }
    }
    if (typeof input.toString === function) {
      const result = input.toString();
      if (typeof result !== object) {
        return result;
      }
    }
  }

  // 如果都未返回原始值，则抛出错误
  throw new TypeError(Cannot convert object to primitive value);
}
```

## 4. 示例代码

### 示例 1：`Symbol.toPrimitive`

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === number) {
      return 42;
    }
    if (hint === string) {
      return hello;
    }
    return null;
  }
};

console.log(+obj); // 42
console.log(`${obj}`); // hello
console.log(obj + ); // null
```

### 示例 2：`valueOf` 和 `toString`

```javascript
const obj = {
  valueOf() {
    return 42;
  },
  toString() {
    return hello;
  }
};

console.log(+obj); // 42 (调用 valueOf)
console.log(`${obj}`); // hello (调用 toString)
console.log(obj + ); // 42 (调用 valueOf)
```

### 示例 3：未实现转换方法

```javascript
const obj = {};

console.log(+obj); // NaN (默认调用 valueOf 返回对象，再转为 NaN)
console.log(`${obj}`); // [object Object] (调用 toString)
```

## 5. 注意事项

1. **`Symbol.toPrimitive` 优先级最高**：
   若对象定义了 `Symbol.toPrimitive`，则始终优先调用它。
2. **默认提示类型**：
   在 `==` 比较等场景中，提示类型为 `"default"`，具体行为依赖上下文。
3. **自定义转换行为**：
   通过定义 `Symbol.toPrimitive`、`valueOf` 和 `toString` 可自定义对象转换行为。

## 6. 总结

`ToPrimitive` 是 JavaScript 中的重要抽象操作，核心思想：

- 优先调用 `Symbol.toPrimitive`
- 根据提示类型调用 `valueOf` 和 `toString`
- 若所有方法均无法返回原始值，抛出错误
