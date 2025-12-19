### 内容笔记总结

#### 核心主题

- **RAG（检索增强生成）**：结合检索与生成技术，为大语言模型（LLM）提供外部知识支持，解决传统问答系统知识库覆盖不足的问题。
- **LangChain 中 RAG 的实现**：通过数据加载、向量化、存储与检索等模块，支持多种数据格式和知识库构建流程。

---

### 一、RAG 的定义与设计

#### 1. **RAG 概念**

- **检索（Retrieval）**：从知识库中找到与问题相关的信息。
- **生成（Generation）**：利用检索到的信息生成准确、有上下文的答案。
- **优势**：
  - 减少幻觉问题，提高回答质量。
  - 不需要重新预训练模型，降低成本。

#### 2. **RAG 流程**

- 用户提出问题。
- 在知识库中检索相关信息。
- 将检索结果嵌入到 LLM 的输入提示中。
- LLM 生成详细准确的回答。

---

### 二、LangChain 中 RAG 的实现

#### 1. **整体架构**

- **Loader**：加载外部数据源。
- **Transform**：将数据转化为向量。
- **Embed**：嵌入向量空间。
- **Store**：存储到向量数据库。
- **Retrieve**：从数据库中检索数据。

#### 2. **支持的数据格式**

LangChain 支持多种数据格式的加载与处理，包括：

- **Markdown 文件**：

```python
from langchain.document_loaders import TextLoader

loader = TextLoader('loader.md')
print(loader.load())
```

- **CSV 文件**：

```python
from langchain.document_loaders import CSVLoader

loader = CSVLoader('loader.csv')
print(loader.load())
```

- **Excel 文件**：

```python
from langchain.document_loaders import UnstructuredExcelLoader

loader = UnstructuredExcelLoader('loader.xlsx')
print(loader.load())
```

- **HTML 文件**：

```python
from langchain.document_loaders import UnstructuredHTMLLoader

loader = UnstructuredHTMLLoader('loader.html')
print(loader.load())
```

- **JSON 文件**：

```python
from langchain.document_loaders import JSONLoader

loader = JSONLoader('loader.json', jq_schema='.template', text_content=False)
print(loader.load())
```

- **PDF 文件**：

```python
from langchain.document_loaders import PyPDFLoader

loader = PyPDFLoader('loader.pdf')
print(loader.load())
```

---

#### 3. **文档切割与处理**

- **文档切割器**：将文档分割成小块，保持上下文关联。
- **切割方式**：
  - 按字符分割。
  - 按 token 分割。

**代码示例**：

```python
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

loader = PyPDFLoader('loader.pdf')
docs = loader.load()
content = [doc.page_content for doc in docs]

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=50,  # 切分的文本块大小
    chunk_overlap=20, # 切分文本块重叠大小
    length_function=len, # 长度函数
    add_start_index=True, # 是否添加开始索引
)
text = text_splitter.create_documents(content)
print(text)
```

---

### 三、RAG 的优势与应用场景

#### 1. **优势**

- **灵活性**：无需重新训练模型，可以实时更新知识库。
- **高效性**：通过检索减少幻觉问题，生成准确答案。
- **成本低**：不需要复杂的特征工程。

#### 2. **应用场景**

- 开放问答（Open-domain QA）。
- 摘要式问答（Abstractive QA）。
- 开放问题生成（Jeopardy Question Generation）。
- 事实验证（Fact Verification）。

---

### 总结

- **RAG 技术**：通过检索与生成结合，解决传统问答系统知识库覆盖不足的问题。
- **LangChain 实现**：提供强大的数据加载、向量化、存储与检索功能，支持多种数据格式。
- **文档处理**：通过灵活的切割方式，确保内容的上下文关联性。
- **应用价值**：RAG 技术在知识密集型任务中具有广泛应用潜力，为 LLM 提供更强大的知识支持。
