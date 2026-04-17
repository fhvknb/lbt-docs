在不使用 Docker 容器化部署的情况下，可以利用 GitLab 和 Jenkins 构建一套 CI/CD 流程来实现 Java Spring Boot 微服务项目的自动化构建、测试和部署。以下是详细的步骤：

---

## **一、环境准备**
1. **安装 GitLab**：
   - 在服务器上安装 GitLab，用于代码托管和版本控制。
   - 创建一个新的 GitLab 仓库，并将 Spring Boot 项目代码推送到该仓库。

2. **安装 Jenkins**：
   - 在服务器上安装 Jenkins。
   - 配置 Jenkins 的基本设置，包括安装必要的插件（如 Git 插件、Pipeline 插件、Maven 插件等）。

3. **安装 JDK 和 Maven**：
   - 确保 Jenkins 所在的服务器已经安装了 JDK 和 Maven，以便构建 Spring Boot 项目。

---

## **二、GitLab 配置**
1. **创建 GitLab 仓库**：
   - 将 Spring Boot 项目代码推送到 GitLab 仓库。

2. **生成 GitLab Token**：
   - 在 GitLab 中生成一个 Access Token，用于 Jenkins 拉取代码。
   - 进入 GitLab 用户设置 -> Access Tokens，生成一个带有 `read_repository` 权限的 Token。

---

## **三、Jenkins 配置**
1. **安装必要插件**：
   - 在 Jenkins 中安装以下插件：
     - Git Plugin（用于拉取代码）
     - Pipeline Plugin（用于定义 CI/CD 流程）
     - Maven Integration Plugin（用于构建 Java 项目）

2. **配置全局工具**：
   - 在 Jenkins 的「Global Tool Configuration」中配置：
     - JDK：添加项目所需的 JDK 版本。
     - Maven：添加项目所需的 Maven 版本。

3. **配置 GitLab Webhook**：
   - 在 GitLab 仓库的「Settings -> Webhooks」中添加一个 Webhook，指向 Jenkins 的触发地址，例如：
     ```
     http://<jenkins-server-ip>:8080/project/<job-name>
     ```
   - 确保 Webhook 的触发事件设置为「Push Events」，当代码发生变化时自动触发 Jenkins 构建。

4. **创建 Jenkins Job**：
   - 在 Jenkins 中创建一个新任务，选择「Pipeline」类型。
   - 配置 Git 仓库：
     - 在任务配置中，填写 GitLab 仓库的地址。
     - 在「Credentials」中添加之前生成的 GitLab Access Token。
   - 配置构建触发器：
     - 选择「GitLab hook trigger for GITScm polling」，以监听 GitLab 的 Webhook。

---

## **四、CI/CD Pipeline 配置**
在 Jenkins 中定义 Pipeline 脚本，具体步骤如下：

### **1. Pipeline 脚本**
以下是一个典型的 Pipeline 配置，用于拉取代码、编译、测试和部署：

````artifact
id: springboot-cicd-pipeline
name: Spring Boot CI/CD Pipeline
type: code.groovy
content: |-
  pipeline {
      agent any
      environment {
          JAVA_HOME = tool 'JDK'
          MAVEN_HOME = tool 'Maven'
          PATH = "${JAVA_HOME}/bin:${MAVEN_HOME}/bin:${env.PATH}"
      }
      stages {
          stage('Checkout Code') {
              steps {
                  git branch: 'main', url: 'https://gitlab.com/your-repo.git'
              }
          }
          stage('Build') {
              steps {
                  sh 'mvn clean package -DskipTests'
              }
          }
          stage('Test') {
              steps {
                  sh 'mvn test'
              }
          }
          stage('Deploy') {
              steps {
                  sshagent(['your-ssh-credentials-id']) {
                      sh '''
                      scp target/*.jar user@your-server:/path/to/deployment/
                      ssh user@your-server "nohup java -jar /path/to/deployment/your-app.jar > /path/to/deployment/app.log 2>&1 &"
                      '''
                  }
              }
          }
      }
      post {
          success {
              echo 'Build and Deployment Successful!'
          }
          failure {
              echo 'Build or Deployment Failed!'
          }
      }
  }
````

### **2. 关键点说明**
- **环境变量**：
  - `JAVA_HOME` 和 `MAVEN_HOME` 是 Jenkins 的全局工具配置，用于设置 JDK 和 Maven 的路径。
- **代码拉取**：
  - 使用 `git` 指令从 GitLab 仓库拉取代码。
- **构建**：
  - 使用 Maven 的 `clean package` 命令进行项目编译和打包，跳过测试阶段。
- **测试**：
  - 执行单元测试，确保代码质量。
- **部署**：
  - 通过 SSH 将打包后的 `.jar` 文件上传到目标服务器。
  - 在目标服务器上通过 `java -jar` 命令运行 Spring Boot 应用。
- **SSH 配置**：
  - 在 Jenkins 中添加目标服务器的 SSH 凭据，并在 Pipeline 中使用 `sshagent` 插件进行远程操作。

---

## **五、部署服务器配置**
1. **安装 JDK**：
   - 确保目标服务器安装了与项目兼容的 JDK。

2. **配置部署目录**：
   - 在目标服务器上创建一个专门的目录，用于存放 Spring Boot 应用的 `.jar` 文件和日志文件。

3. **开放端口**：
   - 确保目标服务器开放了 Spring Boot 应用所需的端口（默认 8080），并配置防火墙规则。

---

## **六、流程演示**
1. **开发人员提交代码到 GitLab**。
2. **GitLab Webhook 触发 Jenkins 构建任务**：
   - Jenkins 拉取代码。
   - 执行 Maven 构建和测试。
   - 将生成的 `.jar` 文件上传到目标服务器。
3. **目标服务器自动启动服务**：
   - 通过 SSH 执行 `java -jar` 命令启动 Spring Boot 应用。

---

## **七、优势**
- **自动化**：通过 GitLab 和 Jenkins 实现代码提交后的自动构建、测试和部署。
- **高效**：减少手动操作时间，提高开发和运维效率。
- **灵活性**：支持非容器化部署，适用于传统服务器环境。

