---
tag:
  - javascript
---



## 实现机制
ReactJS 的可中断渲染通过**调度优先级和任务分片**实现，核心机制依赖：
- **`requestIdleCallback`**（早期版本）
- **`scheduler` 调度器**（当前版本）

在 Fiber 架构中，渲染工作被拆分为多个小任务（称为单元任务），通过循环逐步完成。当 **`shouldYield`** 返回 `true` 时，React 会中断当前循环并保存未完成任务，等待下一个空闲时间点或高优先级任务完成后再恢复执行。

## 中断后的重新执行机制

### 1. 判断中断条件（`shouldYield`）
- 调度器通过 `shouldYield` 方法检测：
  - 当前任务是否超时
  - 是否有更高优先级任务待执行
- 返回 `true` 即触发中断

### 2. 保存执行上下文
- 当前任务状态保存至 Fiber 树：
  - 正在处理的 Fiber 节点
  - 任务队列进度
- 全局对象 `workInProgress` 存储恢复所需的上下文

### 3. 调度后续任务
- 使用调度器将未完成任务重新加入队列
- 通过 `requestAnimationFrame` 或 `MessageChannel` 在浏览器空闲时执行
- 任务分配新的优先级

### 4. 任务恢复执行
- 调度器触发任务恢复时：
  - 从 `workInProgress` 存储的上次中断位置继续执行
  - 任务循环处理剩余工作单元
  - 全部完成后触发 `commitWork`

## 核心代码流程
```javascript
function performWork() {
  while (workInProgress !== null) {
    // 执行当前工作单元
    workInProgress = performUnitOfWork(workInProgress);

    // 检查中断条件
    if (shouldYield()) {
      // 保存任务状态
      saveWorkInProgress(workInProgress);
      // 调度下次执行
      scheduleCallback(performWork);
      return;
    }
  }

  // 提交最终渲染结果
  commitWork();
}
```

## 完整执行流程
1. **任务初始化**
   - `performWork` 开始遍历 Fiber 树
   - `performUnitOfWork` 逐个处理节点

2. **中断触发时机**
   - 用户交互等高优先级事件
   - 单任务执行时间超过阈值
   - 浏览器需要执行重绘/回流

3. **状态保存**
   - 当前处理节点指针
   - 未完成的 DOM 变更
   - 副作用队列状态

4. **优先级调度**
   - 同步任务（用户输入）
   - 默认任务（UI 渲染）
   - 延迟任务（数据获取）

5. **恢复执行**
   - 从断点继续处理子节点
   - 重新计算 props 和 state
   - 生成新的副作用列表

## 关键技术点
1. **时间切片（Time Slicing）**
   - 将 16ms 的帧时间划分为多个执行窗口
   - 通过 `performance.now()` 精确计时

2. **双缓冲技术**
   - 维护两棵 Fiber 树：
     - Current（已提交）
     - WorkInProgress（构建中）
   - 实现无感知的渐进式更新

3. **优先级标记**
   - Immediate（立即执行）
   - UserBlocking（用户交互）
   - Normal（普通更新）
   - Low（数据预加载）
   - Idle（空闲任务）

4. **中断恢复保障**
   - 不可变数据结构
   - 副作用快照
   - 状态版本标记

## 架构优势
1. **响应式交互**
   - 高优先级任务可在 10ms 内响应
   - 保证 FCP（首次内容渲染）时间稳定

2. **增量渲染**
   - 复杂页面分阶段显示内容
   - 避免长时间主线程阻塞

3. **错误隔离**
   - 单个组件错误不影响整体渲染
   - 支持组件级错误边界

4. **并发模式支持**
   - Suspense 数据加载
   - Transition 过渡动画
   - DeferredValue 延迟更新

> 该机制使 React 在保持 60fps 流畅度的同时，能处理超过 10 万节点的复杂应用场景。通过智能的任务调度和精确的中断恢复控制，实现了现代 Web 应用的高性能渲染需求。