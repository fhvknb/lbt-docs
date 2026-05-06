# 📝 Eclipse + Tomcat + Maven Java Web 项目开发部署笔记 (Mac 环境)

## 📌 核心概念
在 Eclipse 中开发 Java Web 项目，最核心的逻辑是：
1. **Maven** 负责管理依赖和标准目录结构。
2. **Eclipse** 必须通过特定的配置（Facets）才能把普通 Java 项目识别为 Web 项目。
3. **Tomcat** 负责运行最终打包好的资源。

---

## 第一步：建立标准的 Maven Web 目录结构
无论代码怎么写，最终的项目结构必须符合 Maven 的 Web 项目标准：

```text
你的项目名 (例如: ktm-test)
├── pom.xml                 <-- Maven 配置文件
└── src/
    └── main/
        ├── java/           <-- 存放所有的 Java 源代码 (.java)
        │   └── workpackages/
        │       └── xxxServlet.java
        └── webapp/         <-- Web 根目录 (存放页面和静态资源)
            ├── index.jsp
            ├── dashboard.jsp
            ├── assets/     <-- 存放 css, js, 图片等
            └── WEB-INF/    <-- 核心安全目录 (浏览器无法直接访问)
                └── web.xml <-- Web 路由和核心配置文件
```

---

## 第二步：配置 `pom.xml` (关键标识)
要让 Eclipse 和 Maven 知道这是一个 Web 项目，`pom.xml` 中必须包含以下核心要素：

1. **打包方式必须是 war**：
   ```xml
   <packaging>war</packaging>
   ```
2. **引入 Servlet 和 JSP 依赖** (Tomcat 9 及以下使用 `javax` 命名空间)：
   ```xml
   <dependencies>
       <dependency>
           <groupId>javax.servlet</groupId>
           <artifactId>javax.servlet-api</artifactId>
           <version>4.0.1</version>
           <scope>provided</scope> <!-- provided 表示由Tomcat提供，打包时不包含 -->
       </dependency>
       <!-- 其他依赖例如 mysql-connector-java -->
   </dependencies>
   ```

---

## 第三步：Eclipse 核心配置 (解决 Tomcat 找不到项目的问题)

如果你发现项目无法添加到 Tomcat，或者 Tomcat 启动了但访问 404，**必须按顺序检查以下 4 个配置**：

### 1. 刷新 Maven 配置
每次修改 `pom.xml` 后，必须让 Eclipse 重新加载：
* **操作**：右键项目 -> **Maven** -> **Update Project...** (快捷键 `Alt + F5` 或 `Option + F5`) -> 勾选项目 -> 点击 OK。

### 2. 激活 Web 项目特性 (Project Facets)
这是让 Eclipse 识别 Web 项目的“开关”：
* **操作**：右键项目 -> **Properties** -> **Project Facets**。
* 如果有 `Convert to faceted form...` 链接，点击它。
* **必须勾选**：
  * **Dynamic Web Module** (版本选 `4.0` 或 `3.1`)。
  * **Java** (版本选 `1.8` 或你的实际 JDK 版本)。
* 点击 Apply。

### 3. 配置项目访问路径 (Context Root)
决定浏览器通过什么 URL 访问你的项目：
* **操作**：右键项目 -> **Properties** -> **Web Project Settings**。
* 将 **Context root** 设置为你的项目名（例如 `ktm-test`）。
* 点击 Apply。

### 4. 配置文件映射 (Deployment Assembly) —— 【最容易漏掉的一步】
告诉 Eclipse 把哪些代码放到 Tomcat 的哪个目录下：
* **操作**：右键项目 -> **Properties** -> **Deployment Assembly**。
* **必须确保列表中有以下三项**（没有就点 Add 添加）：
  1. `/src/main/java` 映射到 `WEB-INF/classes` (Java 代码)
  2. `/src/main/webapp` 映射到 `/` (Web 资源)
  3. `Maven Dependencies` 映射到 `WEB-INF/lib` (第三方 Jar 包)

---

## 第四步：部署到 Tomcat 并运行

1. **挂载项目**：在底部的 **Servers** 视图，右键 Tomcat -> **Add and Remove...** -> 将项目从左侧移到右侧 **Configured** 列表 -> Finish。
2. **清理缓存**：右键 Tomcat -> **Clean...** (防止旧代码残留)。
3. **启动服务**：右键 Tomcat -> **Start**。
4. **查看日志**：紧盯 **Console (控制台)**，看到 `Server startup in [xxx] milliseconds` 说明启动成功。
5. **浏览器访问**：打开浏览器输入 `http://localhost:8080/ktm-test/index.jsp`。

---

## 💡 常见报错速查手册

| 报错现象                                      | 可能原因                  | 解决办法                                                     |
| :-------------------------------------------- | :------------------------ | :----------------------------------------------------------- |
| **找不到菜单** (没有 Web Project Settings 等) | Eclipse 未识别为 Web 项目 | 执行 Maven Update，并在 Project Facets 中勾选 Dynamic Web Module。 |
| **404 Not Found**                             | 路径错误或未正确部署      | 1. 检查 URL 是否包含 Context Root (`/ktm-test`)。<br>2. 检查 Deployment Assembly 是否将 `webapp` 映射到了 `/`。 |
| **500 Internal Server Error**                 | Java 代码报错             | 查看 Eclipse Console 中的红色异常堆栈，定位具体报错的代码行数。 |
| **ClassNotFoundException**                    | 缺少 Jar 包               | 检查 Deployment Assembly 中是否添加了 `Maven Dependencies` 映射。 |
| **端口被占用**                                | 8080 端口被其他程序占用   | 双击 Servers 视图中的 Tomcat，在配置页把 HTTP 端口改为 8081 等其他端口。 |
| **无法解析 javax.servlet**                    | Tomcat 版本太高           | Tomcat 10+ 废弃了 `javax`，改用 `jakarta`。请降级安装 Tomcat 9 或 8.5。 |

> **开发小贴士**：在修改 Java 代码 (`.java`) 或 `web.xml` 后，通常需要重启 Tomcat 才能生效；但如果只是修改了 `.jsp`、`.html` 或 `.js` 等前端文件，直接刷新浏览器即可生效。