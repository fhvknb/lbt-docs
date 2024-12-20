---
sidebar_position: 4
title: Notes Of React
tag: [frontend]
---

## React渲染过程

1. React.createElement 创建虚拟DOM
2. React.render 渲染虚拟DOM
    1. 通过虚拟DOM创建真实DOM，添加属性、样式、事件等
    2. 把真实DOM挂载到指定的容器中


## react中setState的更新机制（18版本之前）

- 同步更新和异步更新
- 合并更新和不合并更新
- 传入函数不会合并更新

默认：异步合并更新

不在React上下文中，则是同步更新

## setState是微任务还是普通任务？

setState本质上是同步执行，state也是同步更新，表现上面是异步的





## 是否了解过 React 的整体渲染流程？ 里面主要有哪些阶段？
爹考答案：

React 整体的渲染流程可以分为两大阶段，分别是render阶段和commit 阶段。

render 阶段里面会经由调度器和协调器处理，此过程是在内存中运行，是异步可中断的。

commit 阶段会由渲染器进行处理，根据副作用进行 UI的更新，此过程是同步不可中断的，否则会造成 UI和数据显示不一致。


**调度器**

调度器的主要工作就是调度任务，让所有的任务有优先级的概念，这样的话紧急的任务可以优先执行。Scheduler 实际上在浏览器的API 中是有原生实现的，这个 API 叫做 requestidleCallback，但是由于兼容性问题，React 放弃了使用这个 API，而是自己实现了一套这样的机制，并且后期会把 Scheduler 这个包单独的进行发布，变成一个独立的包。这就意味Scheduler 不仅仅是只能在 React中使用，后面如果有其他的项目涉及到了任务调度的需求，都可以使用这个 scheduler。

**协调器**

协调器是 Render 的第二阶段工作。该阶段会采用深度优先的原则遍历井且创建一个一个的 FiberNode，井将其串联在一起，在遍历时分为了"递”与 归”两个阶段，其中在“递”阶段会执行 beginwork 方法，该方法会根据传入的 FiberNode 创建下一级 FiberNode。而“归”阶段则会执行 CompleteWork 方法，做一些副作用的收集

**渲染器**

渲染器的工作主要就是将各种副作用 (flags 表示）commit 到宿主环境的UI中。整个阶段可以分为三个子阶段，分别是
BeforeMutation 阶段、Mutation 阶段和 Layout 阶段。

## 是否了解过 React 的架构？新的Fiber 架构相较于之前的 Stack 架构有什么优势？
参考答案：
React v15及其之前的架枸：
- Reconciler（协调器）：VDOM 的实现，负责根据自变量变化计算出 UI变化
- Renderer （渲染器)：负责将 U 变化渲染到宿主环境中
  
这种架构称之为 Stack 架构，在 Reconciler 中，mount 的組件会调用mountcomponent，update 的组件会调用updateComponent， 这两个方法都会送归更新子组件，更新流程一旦开始，中途无法中断。

但是随看应用规模的逐渐增大，之前的架构模式无法再满足"快速响应"这一需求，主要受限于如下两个方面：
- CPU瓶颈：由于 VDOM 在进行差异比较时，采用的是递归的方式，JS计算会消耗大最的时间，从而导致动画、还有一些需要实时更新的内容产生视觉上的卡顿。
- IO瓶颈：由于各种基于“自变量”变化而产生約更新任务没有优先級的标念，因此在某些更新任务（例如文本框的输入） 有稍微的延迟，对手用户来讲也是非常敏感的，会让用户产生卡顿的愿觉。
  
新的架构称之为 Fiber 架构：
- scheduler （调度器）：调度任务的优先級，高优先級任务会优先进入到 Reconciler
- Reconciler(协调器）：VDOM 的实现，负责根据自变量变化计算出UI变化
- Renderer（渲染器）：负责将UI变化渲染到宿主环境中

首先引入了 Fiber的概念，通过一个对象来描述一个 DOM 节点，但是和之前方案不同的地方在于，每个Fiber 对象之问通过链表的方式来进行串联。通过 child 来指向子元素，通过 sibling 指向兄弟元素，通过 return 来指向父元素。

在新架构中，Reconciler中的更新流程从递归变为了“可中断的储环过程”。每次循环都会调用 shouldYield 判断当前的 Timeslice 是否有剩余时间，没有剩余时间则暂停更新流程，将主线程还给渲染流水线，等待下一个宏任务再继续执行。这样就解决了 CPU 的瓶颈问题。

另外在新架构中还 入了 Scheduler 调度器，用来调度任务的优先级，从而解洪了 I/O 的瓶颈问题。

## 谈一谈你对 React 中 Fiber 的理解以及什么是Fiber 双缓冲？
参考答案：
Fiber 可以从三个方面去理解:
- FiberNode 作为一种架构：在React v15 以及之前的版本中，Reconceiler 采用的是递归的方式，因此被称之为 StackReconciler，到了 React v16 版本之后，引入了 Fiber, Reconceiler 也从 Stack Reconciler 变为了 Fiber Reconceiler, 各个FiberNode 之间通过链表的形式串联了起来。
- FiberNode 作为一种数据类型：Fiber 本质上也是一个对象，是之前虛拟 DOM 对象(React 元素，createElement 的返回值)的一种升级版本，每个Fiber 对象里面会包含 React 元素的类型，周围链接的 FiberNode，DOM 相关信息。
- FiberNode 作为动态的工作单元：在每个 FiberNode 中，保存了“本次更新中该 React 元素变化的数据、要执行的工作（增、删、改、更新Ref、副作用等）"等信息。
  
所谓 Fiber 双缓冲树，指的是在内存中构建两颗树，井直接在内存中进行替换的技术。在React 中使用 Wip　Fiber　Tree 和 Current　Fiber Tree 这两颗树来实现更新的逻铜。Wip　Fiber　Tree 在内存中完成更新，而 Current　Fiber　Tree 是最终要渲染的树，两颗树通过alternate 指针相互指向，这样在下一次渲染的时候，直接复用 Wip　Fiber Tree 作为下一次的渲染树，而上一次的渲染树又作为新的Wip Fiber Tree， 这样可以加快 DOM 节点的替换与更新。


## React diff 算法有没有了解过？为什么不使用Vue中的双端比较算法？

diff 计算发生在更新阶段，当第一次渲染完成后，就会产生 Fiber 树，再次渲染的时候 （更新），就会拿新的JSX 对象(vdom)和旧的 FiberNode 节点进行一个对比，再决定如何来产生新的 FiberNode，它的目标是尽可能的复用己有的Fiber 节点。这个就是diff 算法。

在React 中整个 diff 分为单节点diff 和多节点diff。

所谓单节点是指新的节点为单一节产，但是旧节点的数量是不一定的。

单节点 diff 是否能够复用遵循如下的顺序
1. 判断key 是否相同
- 如果更新前后均未设置 key，则key 均为 null，也属于相同的情况
- 如果key 相同，进入步骤二
- 如果 key 不同，则无需判断 type，结果为不能复用（有兄弟节点还会去遍历兄弟节点)
2. 如果 key 相同，再判断type 是否相同
- 如果 type 相同，那么就复用
- 如果 type 不同，则无法复用(并且兄弟节点也一并标记为删除）

多节点diff 会分为两轮遍历

第一轮遍历会从前往后进行遍历，存在以下三种情况：

1. 如果新旧子节点的key 和type 都相同，说明可以复用
2. 如果新旧子节点的key 相同，但是type不相同，这个时候就会根据 ReactElement 来生成一个全新的fiber，旧的fiber 被放入到 deletions 数组里面，回头统一删除。但是注意，此时遍历井不会终止。
3. 如果新1日子节点的key 和type 都不相同，结束遍历如果第一轮遍历被提前终止了，那么意味着还有新的JSX 元素或者1日的 FiberNode 没有被遍历，因此会采用第二轮遍历去处理。
   
第二轮遍历会遇到三种情况：
1. 只剩下旧子节点：将旧的子节点添加到 deletions 数组里面直接删除掉（刪除的情況）
2. 只剩下新的JSX 元素：根据 ReactElement 元素来创建 FiberNode 节点(新增的情况）
3. 新旧子节点都有剩余：会将剩余的 FiberNode 节点放入一个map 里面，遍历剩余的新的J5X 元素，然后从 map 中去寻找能够复用的 FiberNode 节点，如果能够找到，就拿来复用。（移动的情况）如果不能找到，就新增呗。然后如果剩余的JSX 元素都遍历完了，map结构中还有剩余的 Fiber 节点，就将这些 Fiber 节点添加到 deletions 数组里面，之后统一做删除操作

整个 diff 算法最最核心的就是两个宇"复用”。

- React 不使用双端 diff 的原因：
 由于双端dit需要向前查找节点，但每个 FibenNode 节点上都没有反向指针，即前-一个FiberNode 通过 sibing属性指向后一个FiberNode，只能从前往后遍历，而不能反过来，因此该算法无法通过双端搜索来进行优化。

React想看下现在用这种方式能走多远，如果这种方式不理想，以后再考虑实现双端 diff。 React 认为对于列表反转和需要进行双端搜素的场景是少见的，所以在这一版的实现中，先不对bad case 做额外的优化。

## 是否了解过 React 中的lane 模型？为什么要从之前的 expirationTime 模型转换为 lane 模型？
在React 中有一套独立的粒度更细的优先级算法，这就是lane 模型。

这是一个基于位运算的算法，每一个lane 是一个32bit Integer ，不同的优先级对应了不同的lane，越低的位代表越高的优先级。

早期的 React 并没有使用lane 横型，而是采用的的基于 expirationTime 桢型的算法，但是这种算法賴合了“优先级”和”批"这两个機念，限制了模型的表达能力。优先级算法的本质是"为update 排序”，但 expiration Time 模型在完成排序的同时还默认的划定了
"批”。

使用lane 模型就不存在这个问题，因为是基于位运算，所以在批的划分上会更加的灵活。


## 简述一下 React 中的事件是如何处理的？
在React 中，有一套自己的事件系统，如果说React 用 FiberTree 这一数据结构是用来描述 UI的话，那么事件系统则是基于FiberTree 来描述和UI之问的交互。
对于 ReactDoM 宿主环境，这套事件系统由两个部分组成：
1. SyntheticEvent（合成事件对象）
SyntheticEvent 是对浏览群原生事件对家的一层封装，兼容主流汉览器，同时拥有与浏览器原生事件相同的 APl，例如stopPropagation 和 preventDefault。 SyntheticEvent 存在的目的是为了消除不同浏览器在“事件对家“问的差异。
2.　模拟实现事件传播机制
利用事件委托的原理，React 基于FiberTree 实现了事件的捕获、目标、昌泡的流程（类似于原生事件在 DOM 元素中传递的流程)，井且在这套事件传插机制中加入了许多新的特性，例如：
- 不同事件对应了不同的优先级
- 定制事件名
- 例如事件统一采用如“onxox 的验峰写法了
- 定制事件行为
- 例如 onChange 的默认行为与原生 oninput 相同

## Hook是如何保存函数组件狀态的？ 为什么不能在循环，条件或嵌套函数中调用 Hook?
首先 Hook 是一个对家，大致有如下的结构：
```js
const hook = {
memoizedstate: null, 
baseState: null, 
baseQueue: null, 
queue: null, 
next: null
```
不同类型的hook 的memoizedstate 中保存了不同的值，例如：
- useState：对于 const [state. updateState] =useState(initialState)，memoizedState 保存的是 state 的值
- useEffect：对于 useEffectt callback, [...deps])，memoizedstate 保存的是 callback、 [...deps]等数据
一个组件中的hook 会以链表的形式串起来，FiberNode 的memoizedstate 中保存了 Hooks 锥表中的第一个 Hook

在更新时，会复用之前的Hook，如果通过 并条件语句，增加或者删除 hooks，在复用 hooks 过程中，会产生复用 hooks 状态和当前hooks 不一致的问题。


## useState 和 useReducer 有什么样的区别？
usestate 本质上就是一个简易版的 useReducer 。

在mount 阶段，两者之间的区别在于：
- useState 的lastRenderedReducer为basicStateReducer
- useReducer 的lastRenderedReducer 为传入的 reducer 参数
  
所以，useState 可以视为reducer 参数为 basicStateReducer 的 useReducer。

在 update 阶段，updateState 内部直接调用的就是 updateReducer，传入的reducer 仍然是basicStateReducer。



## 说一说 useEfTect 和 useLayoutEffect 的区别？
在Reaet 中，更手定义有副作用因变量的Hook有
- useEffect：回调函数会在 commit 阶段完成后异步执行，所以不会阻塞视園渲染
- uselayoutEffect：回调函数会在 commit 阶段的Layout 子阶段同步执行，一般用于执行 DOM 相关的操作
- 
每一个effect 会与当前 FC 其他的effect 形成环状链表，连接方式为单向环状链表。
其中 useEffect 工作流程可以分为：
- 声明阶段
- 训度阶段
- 执行阶段
  
uselayoutEffeat 的工作流程可以分为：
- 声明阶設
- 执行阶段
  
之所以useEffect 会比 uselayoutEtfect 多一个阶段，就是因为useEftect的回调函数会在commit 阶段完成后异步执行，因此需要经历调度阶段。


## 题目：useCallback 和 useMemo 的区别是什么？
在useCallback 内部。会将函数和依赖项一起缓存到hook对象上的的 memolzedstate 属性上，在组件更新阶段，首先会拿到之前的hook 对象，从之前的hook 对象的 memoitedstate 属性上获取到之前的依赖项目，对比依赖项目是否相同，如果相同返回之前的callback，否则就重新缓存存，然后返回新的 callback。

在 useMemo 内部，会将传入的函效执行井得到计算值，将计算值和依赖项目存储到hook 对象的memoizedstate 上面，最后向外部返回计算得到的值。更新的时候首先是从 updateWorkinProgressHook 上拿到之前的 hook 对象，从而获取到之前的依赖值，和新传入的依赖进行一个对比，如果相同，就返回上一次的计算值，否则就重新调用传入的两数得到新的计算值井缓存，最后向外部返回新的计算值。


## useRef 是干什么的？ref 的工作流程是怎样的？什么叫做ref 的失控？
useRef 的主要作用就是用來创建 ref保存对 DoM 元素的引用。在React 发展过程中，出现过三种 ref 相关的引用模式：
- String 类型（己不推荐使用）
- 函数炎型
- { current: T}
  
目前最为推荐的是在类组件中使用 createRef， 函数组件中使用 useRef 来创建 Ref。

当开发者调用 useRef 来创建 ref 时，在mount 阶段，会创建一个hook对象，该hook 对家的 memoizedstate 存储的是`{current: initialValue}`对象，之后向外部返回了这个对象。在update 阶段就是从 hook对象的 memoizedState 享到 `{ current:
initialValue }` 对象。

ref 内部的工作流程整体上可以分为两个阶段：
- render 阶段：标记 Ref flag，对应的内部函敛为 markRef
- commit 阶段：根据 Ref 11ag，执行 ref相关的操作，对应的相关西数有 commitDetachRef. commitAttachRef
  
所谓ref的失控，本质是由于开发者通过 ref操作了 DOM，而这一行为本身是应该由 React 来进行接管的，所以两者之间发生了冲突导致的。

ref 失控的防治主要体现在两个方面：
- 防：控制ref 失控影像的范围，使ref 失控造成的影响更容易被定位，例如使用 forwardRef
- 治：从ref 引用的数据结构入手，尽力避免可能引起失控的探作，例如使用 uselmperativeHandle



## 说一说React中的　updateQueue



## 谈一谈 React 中的eagerstate 策略是什么？
在React 内部，性能优化策路可以分为：
- eagerState 策略
- bailout 策略
- 
eagerState 的核心逻辑是如果某个状态更新前后没有变化，则可以跳过后续的更新流程。该策路将状态的计算提前到了 schedule 阶段之前。当有FiberNode 命中 eagerState 策略后，就不会再进入schedule 阶段，直接使用上一次的状态。

该策路有一个前提条件，那就是当前的 FiberNode 不存在待执行的更新，因为如果不存在待执行的更新，当前的更新就是第一个更新，计算出来的 state 即便不能命中 eagerstate，也能够在后面作为基础 state 来使用，这就是为什么FC 所使用的 Update 数据中有hasEagerState 以及 eagerState 宇段的原因。


## 谈一谈React 中的 bailout 策略
在beginwork 中，会根据 wip FiberNode 生成对应的子 FiberNode， 此时会有两次“是否命中 bailout策路”的相关判断。
- 第一次判断
  - oldProps 全等于 newProps
  - Legacy Context没有变化
  - FiberNode.type 没有变化
  - 当前 FiberNode 没有更新发生
  
当以上条件都满足时会命中 bailout 策略，之后会执行 bailoutOnAlreadyFinishedWork 方法，该方法会进一步判断能够优化到
何种程度。

通过 wip.childLanes 可以快速排查”当前 FiberNode 的整颗子树中是否存在更新”，如果不存在，则可以跳过整个子树的beginWork。这其实也是为什么React 每次更新都要生成一棵完整的 Fiebr Tree 但是性能井不差的原因

- 第二次判断
 - 开发者使用了性能优化 AP， 此时要求当前的 FiberNode 要同时满足：
   - 不存在更新
   - 经过比较（默认浅比较）后 props 未变化
   - ref 不变
 - 虽然有更新，但是state 没有变化


## 为什么要重构 ContextAPl，1日版的ContextAP1 有什么问题？
旧版的 Context　API 存在一些缺陷。
context 中的的据是保存在栈里面的。在beginWork中，context 会不断的人樓，所以 context consumer可以通过 context楼向上找到对应的contextvalue，在completework 中，context 会不断出栈。

这种入栈出栈的模式刚好可以用来应对reconcile 流程以及一般的bailout 策略。但是，对于“跳过整颗子树的 beginWork”这种程度的 bailout 策路，被跳过的子树就不会再经历 context 的入栈和出栈过程，因此在使用旧的ContextAPI时，即使context里面的数据发生了变化，但只要子树命中了bailout策略被跳过了，那么子树中的 Consumer就不会响应更新。

新版的 ContextAPI 当context value 发生变化时，beginWork 会人 Provider立刻向下开启一次深度优先遍历，目的是寻找 ContextConsumer。 Context Consumer 找到后，会为其对应的 FiberNode.lanes 附加renderLanes，再从ContextConsumer，即使子树的根往上深度遍历，为祖先的FiberNode.childLanes标记一个renderLanes。因此如果子树深处存在 ContextConsumer，即使子树的根 FiberNode 命中 bailout 策略，也不会完全跳过子树的beginwork 流程。


:::note
React 中的hooks都分为Mount阶段和Update阶段，

render阶段标记，commit阶段进行删除和更新

:::