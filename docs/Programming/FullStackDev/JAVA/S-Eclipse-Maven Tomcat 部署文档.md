# 🚀 Java Web 项目打包与部署完整教程 (Maven + Tomcat + PostgreSQL)



## 📦 第一阶段：在本地打包项目 (生成 WAR 包)

Java Web 项目的标准发布格式是 **WAR (Web Application Archive)** 包。我们可以通过 Maven 轻松完成打包。

### ⚠️ 打包前的关键检查
在打包之前，请务必检查你的 `DBUtil.java` 或 `web.xml`：
* **数据库 IP**：如果是部署到远程服务器，请将 `localhost` 改为远程 PostgreSQL 数据库的真实 IP。
* **账号密码**：确保使用的是正式环境的数据库账号和密码。

### 方式一：使用 Eclipse 图形化界面打包
1. 在 Eclipse 左侧的项目列表，**右键点击项目 `ktm-test`**。
2. 选择 **Run As** -> **Maven build...**（注意：选择带省略号的那个）。
3. 在弹出的窗口中，找到 **Goals** 输入框，输入：
   ```text
   clean package
   ```
4. 点击右下角的 **Run**。
5. 紧盯 Eclipse 的 Console (控制台)，当看到绿色的 **`BUILD SUCCESS`** 时，说明打包成功！
6. 在 Eclipse 中，右键点击项目下的 `target` 文件夹 -> **Refresh (刷新)**。
7. 你会看到里面生成了一个类似 `ktm-test-1.0-SNAPSHOT.war` 的文件。**这就是我们要部署的最终产物！**

### 方式二：使用 Mac 终端打包 (推荐，更显专业)
1. 打开 Mac 的 **终端 (Terminal)**。
2. 使用 `cd` 命令进入你的项目根目录（即 `pom.xml` 所在的目录）：
   ```bash
   cd /你的项目路径/ktm-test
   ```
3. 执行打包命令：
   ```bash
   mvn clean package
   ```
4. 看到 `BUILD SUCCESS` 后，进入 `target` 目录即可找到 `.war` 文件。

> **💡 小贴士：重命名 WAR 包**
> * Tomcat 会根据 WAR 包的文件名来决定访问路径（Context Root）。
> * 如果你的包叫 `ktm-test.war`，访问路径就是 `http://IP:8080/ktm-test/`。
> * **如果想直接通过 `http://IP:8080/` 访问**，请将文件重命名为 **`ROOT.war`**（全部大写）。

---

## 🛠️ 第二阶段：准备服务器环境

假设你要将项目部署到一台独立的服务器（Linux 或 Mac），服务器上必须安装以下软件：

1. **Java 环境 (JDK 8)**：必须与你编译时的版本一致。
   * 验证命令：`java -version`
2. **PostgreSQL 数据库**：
   * 确保数据库已启动。
   * 确保你已经在服务器的数据库中执行了 SQL 脚本（建表、插入初始数据）。
3. **独立的 Tomcat 9 服务器**：
   * 去 Tomcat 官网下载 `apache-tomcat-9.x.x.tar.gz`。
   * 解压到服务器的某个目录下，例如 `/usr/local/tomcat9`。

---

## 🚀 第三阶段：部署到 Tomcat

Tomcat 的部署非常简单，核心思想就是**“把包扔进去，启动服务器”**。

1. **上传 WAR 包**：
   将你刚才打包好的 `ktm-test.war`（或 `ROOT.war`）复制到 Tomcat 的 **`webapps`** 目录下。
   ```bash
   # 示例路径
   cp target/ktm-test.war /usr/local/tomcat9/webapps/
   ```

2. **启动 Tomcat**：
   进入 Tomcat 的 `bin` 目录，执行启动脚本。
   ```bash
   cd /usr/local/tomcat9/bin
   ./startup.sh
   ```
   *(如果是 Windows 服务器，则双击运行 `startup.bat`)*

3. **Tomcat 的自动解压机制**：
   Tomcat 启动后，会自动扫描 `webapps` 目录。当它发现 `ktm-test.war` 时，会自动将其解压成一个名为 `ktm-test` 的文件夹。**不需要你手动解压！**

---

## 🔍 第四阶段：验证与日志查看

### 1. 查看运行日志 (非常重要)
部署后第一件事不是打开浏览器，而是看日志，确认有没有报错！
在 Mac/Linux 终端中，进入 Tomcat 的 `logs` 目录，实时查看日志：
```bash
cd /usr/local/tomcat9/logs
tail -f catalina.out
```
* 如果看到 `Deployment of web application archive [...] has finished in [...] ms`，且没有严重的 `Exception` 报错，说明部署完美成功！
* 按 `Ctrl + C` 退出日志查看。

### 2. 浏览器访问测试
打开浏览器，输入：
```text
http://服务器IP:8080/ktm-test/index.jsp
```
*(如果你改成了 `ROOT.war`，则直接访问 `http://服务器IP:8080/index.jsp`)*

---

## 🚑 第五阶段：常见生产环境排查指南

在本地能跑通，部署到服务器却报错，通常是以下几个原因：

### 1. 数据库连接失败 (Connection refused)
* **现象**：日志里报 `org.postgresql.util.PSQLException: Connection to localhost:5432 refused.`
* **原因**：打包前忘记把 `DBUtil.java` 里的 `localhost` 改成服务器的数据库 IP，或者数据库密码不对。
* **解决**：修改代码，重新打包上传。

### 2. 页面能打开，但图表没出来 (Echarts 丢失)
* **现象**：打开 Dashboard，发现图表区域是空白的。
* **原因**：前端 JSP 文件中引用了 `/assets/js/echarts.min.js`，但打包时该文件没有被正确放进 `webapp` 目录下。
* **解决**：检查 Eclipse 项目的 `src/main/webapp/assets/js/` 目录下是否有该文件，确保它被一起打包进了 WAR 中。

### 3. 访问路径 404
* **现象**：输入网址提示 404 Not Found。
* **原因**：URL 路径写错了。
* **解决**：去 Tomcat 的 `webapps` 目录下看看，WAR 包解压出来的文件夹叫什么名字，URL 里的路径就必须和文件夹名字**一模一样**（区分大小写）。

### 4. 停止/重启服务器
如果需要更新版本，建议先停止 Tomcat，替换 WAR 包，再启动：
```bash
cd /usr/local/tomcat9/bin
./shutdown.sh   # 停止
# ... 替换 webapps 下的 war 包 ...
./startup.sh    # 再次启动
```