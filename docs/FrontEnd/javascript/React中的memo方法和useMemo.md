在 React 中，`memo` 和 `useMemo` 都是用于优化性能的工具，目的是避免不必要的重新渲染或重复计算。但它们的实现方式和使用场景有所不同。

---

## **1. `React.memo`**
### **用途**
`React.memo` 是一个 **高阶组件**，用于优化 **函数组件** 的渲染。当组件的 props 没有变化时，`React.memo` 会跳过重新渲染该组件。

### **实现原理**
- React.memo 通过 **浅比较**（shallow comparison）比较前后两次的 props。
- 如果 props 没有变化，React.memo 会返回上一次的渲染结果，而不是重新渲染组件。

### **使用场景**
- 优化组件：适用于那些 **纯函数组件**，并且组件的渲染依赖于 props。
- 防止子组件在父组件重新渲染时不必要地重复渲染。

### **代码示例**
```javascript
import React from 'react';

// 定义一个函数组件
const MyComponent = ({ value }) => {
  console.log('组件渲染');
  return <div>{value}</div>;
};

// 使用 React.memo 包裹组件
const MemoizedComponent = React.memo(MyComponent);

const App = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>点击更新 count</button>
      {/* MemoizedComponent 只有 value 变化时才会重新渲染 */}
      <MemoizedComponent value="Hello, React.memo!" />
    </div>
  );
};

export default App;
```

### **特点**
- **浅比较**：默认情况下，`React.memo` 会对 props 进行浅比较。如果 props 是复杂对象，需要通过第二个参数自定义比较函数。
  ```javascript
  const MemoizedComponent = React.memo(MyComponent, (prevProps, nextProps) => {
    return prevProps.value === nextProps.value;
  });
  ```

---

## **2. `useMemo`**
### **用途**
`useMemo` 是一个 **React Hook**，用于缓存计算结果。它会在依赖项发生变化时重新计算值，避免每次渲染都重复计算。

### **实现原理**
- `useMemo` 在组件渲染时会检查依赖项是否发生变化。
- 如果依赖项没有变化，`useMemo` 会返回缓存的值，而不是重新计算。

### **使用场景**
- 优化计算：适用于那些 **耗时的计算逻辑**，例如复杂的数学运算或过滤操作。
- 避免重复创建对象或函数：可以防止子组件因属性变化而重新渲染。

### **代码示例**
```javascript
import React, { useState, useMemo } from 'react';

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 使用 useMemo 缓存计算结果
  const expensiveCalculation = useMemo(() => {
    console.log('进行耗时计算');
    return count * 100;
  }, [count]); // 依赖 count，只有 count 变化时才重新计算

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加 count</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <p>计算结果: {expensiveCalculation}</p>
    </div>
  );
};

export default App;
```

### **特点**
- **依赖项控制**：`useMemo` 的计算逻辑完全由依赖项数组控制，只有依赖项变化时才会重新计算。
- **适用于值的缓存**：`useMemo` 返回的是一个值，可以是任何类型（例如数组、对象、字符串）。

---

## **3. 区别总结**

| **特性**                  | **React.memo**                         | **useMemo**                          |
|---------------------------|-----------------------------------------|---------------------------------------|
| **类型**                  | 高阶组件（HOC）                        | React Hook                            |
| **作用对象**              | 整个组件（控制组件是否重新渲染）        | 单个计算逻辑或值（控制值是否重新计算）|
| **缓存内容**              | 组件的渲染结果                         | 计算结果                              |
| **触发条件**              | props 的变化（浅比较或自定义比较函数）  | 依赖项的变化                          |
| **使用场景**              | 优化组件渲染                           | 优化复杂计算或避免重复创建对象        |
| **返回值**                | 一个组件（经过优化的）                  | 计算结果（任何类型的值）              |
| **依赖控制**              | 默认浅比较 props，支持自定义比较函数    | 完全由依赖项数组控制                  |

---

## **4. 使用建议**
### **React.memo**
- 如果组件的渲染依赖于 props，且组件比较复杂，可以使用 `React.memo` 来避免不必要的重新渲染。
- 如果 props 是复杂对象（如数组或对象），需要提供自定义比较函数以避免错误的重新渲染。

### **useMemo**
- 如果某些计算逻辑非常耗时（例如过滤、排序、大量计算），可以使用 `useMemo` 来缓存结果。
- 如果需要缓存某些对象或函数（例如传递给子组件的 props），可以使用 `useMemo` 防止子组件重复渲染。

---

## **5. 综合示例**
结合 `React.memo` 和 `useMemo`，优化子组件渲染和复杂计算：
```javascript
import React, { useState, useMemo } from 'react';

const ChildComponent = React.memo(({ data }) => {
  console.log('子组件渲染');
  return <div>数据: {data.join(', ')}</div>;
});

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // 使用 useMemo 缓存数据
  const data = useMemo(() => {
    console.log('数据重新计算');
    return Array.from({ length: count }, (_, i) => i + 1);
  }, [count]);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加 count</button>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      {/* 子组件使用 React.memo，避免 data 未变化时重复渲染 */}
      <ChildComponent data={data} />
    </div>
  );
};

export default App;
```

---

通过以上对比和示例，`React.memo` 和 `useMemo` 各有其适用场景。合理使用它们可以显著提升 React 应用的性能。