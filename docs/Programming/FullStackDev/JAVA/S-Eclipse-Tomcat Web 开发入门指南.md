### Tomcat Web 开发入门指南

对于刚接触 Java Web 开发的工程师，理解 Tomcat 和 Servlet 的工作原理是核心。以下是一份精简的入门指南：

#### 1. 什么是 Tomcat？

Tomcat 是由 Apache 软件基金会开发的一个开源 **Web 服务器** 和 **Servlet 容器**。

- **Web 服务器**：负责处理 HTTP 请求，返回 HTML、图片等静态资源。
- **Servlet 容器**：负责运行 Java 代码（Servlet/JSP），将动态生成的 HTML 返回给客户端。

#### 2. 核心概念

- **Servlet**：运行在服务器端的 Java 程序。它接收客户端的 HTTP 请求（`HttpServletRequest`），处理业务逻辑（如查数据库），并返回响应（`HttpServletResponse`）。
- **JSP (JavaServer Pages)**：一种允许在 HTML 中嵌入 Java 代码的技术。Tomcat 在运行时会**自动将 JSP 文件编译成 Servlet**。JSP 适合用来写页面展示，Servlet 适合用来写业务逻辑。
- **web.xml**：Web 应用的部署描述符。它告诉 Tomcat 哪个 URL 请求应该交给哪个 Servlet 类去处理。

#### 3. 标准的 Java Web 目录结构

无论你使用什么 IDE，最终打包给 Tomcat 运行的结构（WAR包）都是固定的：

```
复制
/项目根目录 (对应 http://localhost:8080/项目名/)
  ├── index.jsp           (可以直接通过浏览器访问的静态/动态页面)
  ├── css/、js/、images/  (静态资源)
  └── WEB-INF/            (安全目录，浏览器绝对无法直接访问这里面的文件)
      ├── web.xml         (核心配置文件)
      ├── classes/        (编译后的 .class Java 字节码文件)
      └── lib/            (项目依赖的第三方 .jar 包，如 mysql-connector)
```

*注意：Maven 的 `src/main/webapp` 目录在打包时，会被直接映射为上述的根目录。*

#### 4. Servlet 的生命周期

当你在代码里写了一个 `CarsServlet` 继承自 `HttpServlet` 时，Tomcat 会这样管理它：

1. **实例化与初始化 (`init`)**：默认情况下，Tomcat 收到第一次访问该 Servlet 的请求时，才会创建它的实例，并调用 `init()` 方法（只调用一次）。
2. **处理请求 (`service` / `doGet` / `doPost`)**：每次有请求发来，Tomcat 分配一个线程调用 `doGet()` 或 `doPost()` 方法处理。
3. **销毁 (`destroy`)**：当 Tomcat 关闭或重启应用时，调用 `destroy()` 回收资源。

#### 5. 常见错误排查指南

在开发过程中，你最常遇到的错误代码及原因：

- **404 Not Found**：
  - 路径写错了（检查浏览器 URL 是否包含正确的项目名，如 `/ktm-test/api/cars`）。
  - `web.xml` 中的 `<url-pattern>` 映射错误。
  - JSP 文件没有放在 `webapp` 目录下。
- **500 Internal Server Error**：
  - 你的 Java 代码抛出了异常（如空指针 `NullPointerException`、数据库连接失败 `SQLException`）。
  - **解决办法**：立刻去 Eclipse 的 **Console (控制台)** 查看红色的报错堆栈信息，定位到具体的 Java 类和行号。
- **ClassNotFoundException / NoClassDefFoundError**：
  - 缺少 Jar 包依赖。检查 `pom.xml` 是否引入了相关的依赖，并执行 `Maven -> Update Project`。
- **端口被占用 (Port 8080 already in use)**：
  - Mac 上可能有其他程序（或另一个 Tomcat 进程）占用了 8080 端口。
  - **解决办法**：在 Eclipse 的 Servers 视图双击 Tomcat，在打开的配置页面中将 `HTTP/1.1` 的端口改为 `8081` 或其他数字，保存后重启。





**更新pom.xml 中的依赖文件后，Tomcat运行时无法找到新下载的包？**



**原因解释**：
Maven 确实把 jar 包下载到了你的电脑上，你的代码在编写时也不报错（因为 IDE 知道这个包的存在）。但是，当你启动 Tomcat 时，IDE 并没有把这个 jar 包**打包复制到 Web 项目的 `WEB-INF/lib` 目录下**。Tomcat 运行时只认 `WEB-INF/lib` 里面的包，所以报了找不到类的错误。

请根据你使用的 IDE，按照以下步骤将依赖同步到部署包中：

### 如果你使用的是 IntelliJ IDEA：

1. 点击顶部菜单栏的 **`File`** -> **`Project Structure`**（快捷键 `Ctrl + Alt + Shift + S`）。
2. 在弹出的窗口左侧面板，点击 **`Artifacts`**。
3. 在中间的列表中，选中你当前 Tomcat 正在使用的部署包（通常名字叫 `你的项目名:war exploded`）。
4. 看右侧的 **`Output Layout`** 区域，展开 `<output root>` -> **`WEB-INF`**。
   * *注意：如果 `WEB-INF` 下面没有 `lib` 文件夹，请右键 `WEB-INF` -> `Create Directory`，创建一个名为 `lib` 的文件夹。*
5. 看界面**最右侧**的 **`Available Elements`** 面板。
   * 展开 `Maven Dependencies`（或者直接找到 `postgresql-42.x.jar`）。
   * **右键点击**它，选择 **"Put into /WEB-INF/lib"**（或者直接双击它 / 拖拽到左侧的 `lib` 文件夹中）。
6. 此时，你应该能在中间的 `WEB-INF/lib` 目录下看到 PostgreSQL 的 jar 包了。
7. 点击右下角的 **`Apply`**，然后点击 **`OK`**。
8. **重启 Tomcat**，问题即可解决。

---

### 如果你使用的是 Eclipse：

1. 在项目上右键，选择 **`Properties`**（属性）。
2. 在左侧菜单中找到并点击 **`Deployment Assembly`**（部署装配）。
3. 查看右侧的列表中，是否有 `Maven Dependencies` 这一项，并且它的 `Deploy Path` 是 `WEB-INF/lib`。
4. 如果没有，点击右侧的 **`Add...`** 按钮。
5. 选择 **`Java Build Path Entries`**，点击 `Next`。
6. 选中 **`Maven Dependencies`**，点击 `Finish`。
7. 点击 **`Apply and Close`**。
8. 在 `Servers` 面板中，右键你的 Tomcat，选择 **`Clean...`**，然后**重启 Tomcat**。

按照上述步骤把 jar 包“塞”进 Tomcat 的运行目录后，驱动就能被正常加载了。