在使用 **PM2** 运行服务时，可以通过多种方式添加环境变量。以下是详细说明和推荐的几种方法：

---

### **1. 在启动命令中直接添加环境变量**
当通过 `pm2 start` 启动服务时，可以在命令中直接添加环境变量。例如：
```bash
NODE_ENV=production API_KEY=your_api_key pm2 start app.js
```
这样，环境变量会在启动时传递给服务。

---

### **2. 使用 `--env` 参数指定环境变量**
PM2 支持通过 `--env` 参数来指定环境变量。例如：
```bash
pm2 start app.js --name "my-app" --env NODE_ENV=production
```

---

### **3. 使用 `ecosystem.config.js` 文件配置环境变量**
这是最推荐的方法，特别是当需要管理多个服务时。通过 PM2 的 **配置文件**，可以集中管理多个服务的环境变量。

#### **步骤**
1. 创建 `ecosystem.config.js` 文件：
   ```bash
   touch ecosystem.config.js
   ```

2. 编辑 `ecosystem.config.js` 文件，并添加如下内容：
   ````javascript
   module.exports = {
     apps: [
       {
         name: "my-app", // 应用名称
         script: "./app.js", // 启动脚本
         env: {
           NODE_ENV: "development", // 开发环境变量
           API_KEY: "dev_api_key",
         },
         env_production: {
           NODE_ENV: "production", // 生产环境变量
           API_KEY: "prod_api_key",
         },
       },
     ],
   };
   ````

3. 使用 PM2 启动服务：
   - 启动开发环境：
     ```bash
     pm2 start ecosystem.config.js --env development
     ```
   - 启动生产环境：
     ```bash
     pm2 start ecosystem.config.js --env production
     ```

4. 查看服务状态：
   ```bash
   pm2 status
   ```

---

### **4. 使用 `.env` 文件加载环境变量**
如果你习惯使用 `.env` 文件管理环境变量，可以结合 **dotenv** 模块使用。

#### **步骤**
1. 安装 `dotenv`：
   ```bash
   npm install dotenv
   ```

2. 创建 `.env` 文件：
   ```bash
   touch .env
   ```
   编辑 `.env` 文件，添加环境变量：
   ```env
   NODE_ENV=production
   API_KEY=your_api_key
   ```

3. 在代码中加载 `.env` 文件：
   在 `app.js` 的开头添加以下代码：
   ```javascript
   require('dotenv').config();
   console.log(process.env.NODE_ENV); // 输出环境变量
   console.log(process.env.API_KEY);
   ```

4. 启动服务：
   ```bash
   pm2 start app.js
   ```

---

### **5. 修改已经运行的服务的环境变量**
如果服务已经运行，可以通过 PM2 的 `restart` 命令来修改环境变量：

#### **方法一：直接修改环境变量**
```bash
pm2 restart my-app --update-env
```
此时需要确保环境变量已经存在于系统中，例如通过 `export` 命令设置：
```bash
export NODE_ENV=production
export API_KEY=your_api_key
```

#### **方法二：通过 PM2 配置文件修改**
1. 编辑 `ecosystem.config.js` 文件，更新环境变量。
2. 使用以下命令重启服务：
   ```bash
   pm2 restart ecosystem.config.js --env production
   ```

---

### **6. 查看服务的环境变量**
使用以下命令可以查看 PM2 中服务的环境变量：
```bash
pm2 env [app-name]
```

---

### **总结**
- 如果是简单的服务，可以直接在 `pm2 start` 命令中添加环境变量。
- 如果需要管理多个服务或切换环境，推荐使用 `ecosystem.config.js` 文件。
- 对于复杂的环境变量管理，可以结合 `.env` 文件和 `dotenv` 模块。

