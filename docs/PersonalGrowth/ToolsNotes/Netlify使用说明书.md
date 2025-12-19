Netlify 是一个流行的静态网站托管平台，支持持续集成和部署。以下是 Netlify 使用说明书，涵盖从注册到部署的全过程。

---

## **目录**

1. [Netlify 简介](#netlify-简介)
2. [注册与登录](#注册与登录)
3. [部署网站](#部署网站)
4. [域名绑定](#域名绑定)
5. [环境变量配置](#环境变量配置)
6. [持续集成与自动部署](#持续集成与自动部署)
7. [功能扩展](#功能扩展)
8. [常见问题](#常见问题)

---

### **Netlify 简介**

Netlify 是一个功能强大的静态网站托管平台，支持：

- 持续集成与自动化部署
- 自定义域名绑定
- HTTPS 自动配置
- Serverless Functions（无服务器函数）
- 表单处理和身份验证功能

---

### **注册与登录**

1. **注册**：

   - 打开 [Netlify 官网](https://www.netlify.com/)。
   - 点击“Sign Up”，使用 GitHub、GitLab、Bitbucket 或邮箱注册。
2. **登录**：

   - 使用注册时的账户信息登录。

---

### **部署网站**

Netlify 支持以下三种部署方式：

#### **1. 通过 Git 仓库部署**

1. 登录 Netlify 后，点击“Add new site” > “Import an existing project”。
2. 选择你的 Git 仓库（支持 GitHub、GitLab、Bitbucket 等）。
3. 配置分支和构建命令：
   - **分支**：选择要部署的分支（如 `main` 或 `master`）。
   - **构建命令**：输入构建命令（如 `npm run build`）。
   - **发布目录**：设置构建输出目录（如 `dist` 或 `build`）。
4. 点击“Deploy site”，Netlify 会自动拉取代码并部署。

#### **2. 直接上传文件**

1. 在 Netlify 控制台中，点击“Add new site” > “Deploy manually”。
2. 将静态文件（HTML、CSS、JS 等）拖放到上传区域。
3. 上传完成后即可部署。

#### **3. 使用 Netlify CLI**

1. 安装 Netlify CLI：
   ```bash
   npm install -g netlify-cli
   ```
2. 运行以下命令登录：
   ```bash
   netlify login
   ```
3. 部署项目：
   ```bash
   netlify deploy
   ```

   - 按提示选择项目目录和发布配置。

---

### **域名绑定**

1. **使用 Netlify 默认域名**：

   - 部署成功后，Netlify 会分配一个默认域名（如 `example.netlify.app`）。
2. **绑定自定义域名**：

   - 在 Netlify 控制台中，进入网站设置 > “Domain settings”。
   - 点击“Add custom domain”，输入自定义域名。
   - 根据提示配置 DNS（添加 CNAME 或 A 记录）。
   - 等待 DNS 生效后，Netlify 会自动启用 HTTPS。

---

### **环境变量配置**

1. 在 Netlify 控制台中，进入网站设置 > “Site settings” > “Environment variables”。
2. 点击“Add variable”，输入变量名和值。
3. 部署时，Netlify 会自动加载这些环境变量。

---

### **持续集成与自动部署**

Netlify 支持自动部署，流程如下：

1. 在 Git 仓库中提交代码。
2. Netlify 会自动检测到代码变更，触发构建和部署。
3. 部署完成后，网站会自动更新。

---

### **功能扩展**

Netlify 提供以下扩展功能：

1. **Serverless Functions**：

   - 在 `netlify/functions` 目录中编写无服务器函数。
   - 支持 Node.js 和 Go。
   - 部署后可通过 API 访问。
2. **表单处理**：

   - 在 HTML 中添加 `<form>` 元素，Netlify 会自动处理表单提交。
3. **身份验证**：

   - 配置身份验证功能，支持用户登录和权限管理。
4. **插件（Build Plugins）**：

   - 在构建过程中添加插件以扩展功能。

---

### **常见问题**

#### **1. 部署失败怎么办？**

- 检查构建命令是否正确。
- 确认发布目录是否设置正确。
- 查看部署日志以获取详细信息。

#### **2. 如何启用 HTTPS？**

- Netlify 默认启用 HTTPS，无需额外配置。

#### **3. 网站访问速度慢？**

- 使用 Netlify 的全球 CDN 加速。
- 确保静态资源经过压缩和优化。

---

以上就是 Netlify 的使用说明书，希望对你有所帮助！如果有其他问题，可以随时询问。
