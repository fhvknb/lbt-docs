### 内容笔记总结

#### 核心主题

- **Memory 工具**：LangChain 提供了多种记忆工具，用于实现短期、长期记忆，以及对话历史的管理。
- **Agent 核心**：LangChain 中的 Agent 是围绕 Plan、Action、Tools 和 Memory 构建的工具集，能够自主完成复杂任务。

---

### 一、Memory 工具

#### 1. **短时记忆**

- **ConversationBufferMemory**：保存完整的对话历史。
- **ConversationBufferWindowMemory**：仅保存最近的 k 条对话记录。

**代码示例**：

```python
from langchain.memory import ConversationBufferMemory, ConversationBufferWindowMemory

memory = ConversationBufferMemory()
memory.chat_memory.add_user_message('你好，我是人类')
memory.chat_memory.add_ai_message('你好，我是AI，有什么可以帮到你的吗？')
content = memory.load_memory_variables({})
print(content)

# 带窗口条数限制的 memory
memory = ConversationBufferWindowMemory(k=1)
memory.save_context({'input': '你好，我是人类'}, {'output': '你好，我是AI，有什么可以帮到你的吗？'})
memory.save_context({'input': '我想吃鸡肉'}, {'output': '好的，我帮你找找鸡肉的做法'})
content = memory.load_memory_variables({})
print(content)
```

---

#### 2. **实体记忆**

- **ConversationEntityMemory**：通过对话提取实体并保存。

**代码示例**：

```python
from langchain.memory import ConversationEntityMemory

memory = ConversationEntityMemory(llm=llm)
_input = {'input': '胡八一和王胖子、雪莉杨经常在一起冒险，合称盗墓铁三角'}
memory.save_context(
    _input,
    {'output': '听起来很刺激，我也想加入他们'}
)
content = memory.load_memory_variables({'input': '盗墓铁三角是谁？'})
print(content)
```

---

#### 3. **知识图谱记忆**

- **ConversationKGMemory**：提取实体和三元组（主谓宾）构建知识图谱。

**代码示例**：

```
from langchain.memory import ConversationKGMemory

memory = ConversationKGMemory(llm=llm)
memory.save_context({'input': 'Tomie是一个培训讲师'}, {'output': '好的，我知道了'})
entity = memory.get_current_entities('Tomie最喜欢做什么事？')
triple = memory.get_knowledge_triplets('Tomie最喜欢打游戏')
print(entity, triple)
```

---

#### 4. **对话摘要**

- **ConversationSummaryMemory**：对长对话内容进行摘要。
- **ConversationSummaryBufferMemory**：根据 token 数量自动判断是否需要进行摘要。

**代码示例**：

```
from langchain.memory import ConversationSummaryMemory

memory = ConversationSummaryMemory(llm=llm)
memory.save_context({'input': '帮我找一下Tomie'}, {'output': '对不起，请问什么是Tomie？'})
content = memory.load_memory_variables({})
print(content)
```

---

#### 5. **向量数据库实现长时记忆**

- 使用向量数据库（如 FAISS）存储对话历史，通过语义搜索检索相关内容。

**代码示例**：

```
from langchain.vectorstores import FAISS

memory = ConversationBufferMemory()
memory.save_context({'input': '帮我找一下Tomie'}, {'output': '对不起，请问什么是Tomie？'})
embeddings = ZhipuAIEmbeddings()
vectorstore = FAISS.from_texts(memory.buffer.split('\n'), embeddings)
data_local = FAISS.load_local('test_faiss', embeddings).similarity_search('Tomie是什么职业？')
print(data_local)
```

---

### 二、Agent 核心

#### 1. **Agent 的工作流程**

1. 提出需求或问题。
2. 将问题与 Prompt 组合。
3. ReAct Loop：查找 Memory 和工具，执行工具并观察结果。
4. 重复上述过程，直到得到最终结果。

---

#### 2. **Agent 示例：在线搜索**

目标：

- 能进行数学计算。
- 不知道答案时可以搜索。

**代码示例**：

```
from langchain.agents import load_tools, initialize_agent, AgentType

tools = load_tools(['serpapi', 'llm-math'], llm=llm)
agent = initialize_agent(
    tools,
    llm,
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    verbose=True
)
res = agent.run('请问现任的美国总统是谁？他的年龄的平方是多少？')
print(res)
```

---

#### 3. **主要 Agent 类型**


| 类型                                        | 描述                     |
| ------------------------------------------- | ------------------------ |
| OPENAI_FUNCTIONS                            | OpenAI 函数调用型        |
| ZERO_SHOT_REACT_DESCRIPTION                 | 零样本增强生成型         |
| CHAT_ZERO_SHOT_REACT_DESCRIPTION            | 零样本增强生成型（对话） |
| CONVERSATIONAL_REACT_DESCRIPTION            | 对话增强生成型           |
| STRUCTURED_CHAT_ZERO_SHOT_REACT_DESCRIPTION | 结构化对话增强型         |

---

### 总结

- **Memory 工具**：支持短期记忆、长期记忆、实体记忆、知识图谱、对话摘要等功能，适用于不同场景。
- **Agent 核心**：通过 Memory、Tools 和 ReAct Loop，Agent 能够自主完成复杂任务。
- LangChain 提供了灵活的工具和框架，适合构建强大的对话系统和智能体。
