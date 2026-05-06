在 JSP 项目中，引入资源通常分为两大类：**引入服务器端的动态/静态文件（如公共的头部、尾部 JSP）**，以及**引入客户端的静态资源（如 CSS、JS、图片）**。

为了符合最佳实践，以下是 JSP 中引入资源的几种主流方式及其适用场景：

---

### 一、 引入 JSP 片段或 HTML 文件（服务器端组装）

如果你想把页面拆分成多个模块（比如 `header.jsp`、`footer.jsp`、`menu.jsp`），有以下三种方式：

#### 1. 静态引入 (JSP 指令) —— **最常用、性能最高**
在 JSP 编译成 Servlet 的阶段（翻译期），直接把目标文件的源代码“复制粘贴”到当前位置，合并成一个完整的 Servlet 类。
```jsp
<%@ include file="/WEB-INF/jsp/common/header.jsp" %>
```
*   **适用场景**：引入纯静态的 HTML 片段，或者包含全局变量声明的 JSP 文件。
*   **优点**：性能好（只编译一次）。
*   **缺点**：如果修改了被引入的文件（如 `header.jsp`），有时需要清理 Tomcat 缓存才能生效；不能向目标文件传递参数。

#### 2. 动态引入 (JSP 动作标签)
在用户发起请求时（运行期），服务器会分别执行主页面和被引入的页面，然后把被引入页面的**输出结果**合并到主页面中。
```jsp
<jsp:include page="/WEB-INF/jsp/common/menu.jsp">
    <!-- 还可以向被引入的页面传递参数 -->
    <jsp:param name="activeTab" value="dashboard" />
</jsp:include>
```
*   **适用场景**：引入包含独立业务逻辑的动态 JSP 页面，或者需要传递参数的模块。
*   **优点**：修改被引入文件后立即生效；模块独立性强。
*   **缺点**：性能略低于静态引入（因为要执行多个 Servlet 的 `service` 方法）。

#### 3. JSTL 引入 (`<c:import>`)
如果你在项目中引入了 JSTL 标签库，可以使用它。它不仅能引入项目内的资源，还能引入**外部网络资源**。
```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!-- 引入内部资源 -->
<c:import url="/common/footer.jsp" />

<!-- 引入外部资源 -->
<c:import url="http://www.example.com/api/data" />
```
*   **适用场景**：需要跨域抓取其他服务器的页面内容时。

---

### 二、 引入前端静态资源（CSS、JS、图片）

引入前端资源使用的是标准的 HTML 标签（`<link>`、`<script>`、`<img>`）。但在 JSP 中，**最核心的痛点是“路径问题”**（极易导致 404）。

#### 最佳实践：使用动态上下文路径 (Context Path)
永远不要使用相对路径（如 `src="../js/app.js"`）或硬编码的绝对路径（如 `src="/myproject/js/app.js"`），因为一旦项目部署的上下文路径改变，资源就会全部失效。

**推荐方式 1：使用 EL 表达式（最优雅，推荐）**
```html
<!-- 引入 CSS -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/style.css">

<!-- 引入 JS -->
<script src="${pageContext.request.contextPath}/assets/js/main.js"></script>

<!-- 引入图片 -->
<img src="${pageContext.request.contextPath}/assets/images/logo.png" alt="Logo">
```

**推荐方式 2：使用 JSP 脚本（老项目常见）**
```html
<script src="<%=request.getContextPath()%>/assets/js/main.js"></script>
```

**推荐方式 3：使用 HTML `<base>` 标签（全局控制）**
如果你不想在每个资源前都写一长串前缀，可以在 `<head>` 标签内设置基准路径：
```jsp
<%
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + request.getContextPath() + "/";
%>
<head>
    <!-- 设置基准路径 -->
    <base href="<%=basePath%>">
    
    <!-- 之后所有的相对路径都会自动加上 basePath -->
    <link rel="stylesheet" href="assets/css/style.css">
    <script src="assets/js/main.js"></script>
</head>
```

---

### 总结与重构建议

结合你正在重构的项目，建议采用以下策略：

1.  **对于公共布局**：将 `<header>`、导航栏提取为 `header.jsp`，使用 `<%@ include file="header.jsp" %>` 引入，减少 `dashboard.jsp` 的代码量。
2.  **对于前端资源**：全面采用 `${pageContext.request.contextPath}` 来引入 CSS 和 JS，确保在任何 Tomcat 环境下都不会报 404。
3.  **对于模块化 JS**：就像上一个问题提到的，你可以使用 `<script type="module" src="${pageContext.request.contextPath}/assets/js/main.js"></script>` 来引入你的现代 ES6 模块。