# Node Alpine 打包优化


1. 多阶段构建
```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

# 安装构建依赖
RUN apk add --no-cache python3 make g++

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 运行阶段
FROM node:18-alpine

WORKDIR /app
# 只复制生产环境需要的文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./

# 使用非 root 用户运行
USER node

CMD ["node", "dist/index.js"]

```
2. 缓存优化
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 分离依赖安装和应用代码
COPY package*.json ./
RUN npm ci --only=production

# 复制应用代码
COPY . .

CMD ["node", "index.js"]

```
3. 减小镜像体积
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 合并命令减少层数
COPY package*.json ./
RUN npm ci --only=production && \
    npm cache clean --force

# 删除不必要的文件
RUN rm -rf /tmp/* && \
    rm -rf ~/.npm && \
    find /usr/local/lib/node_modules -type f -name "*.md" -delete && \
    find /usr/local/lib/node_modules -type f -name "*.ts" -delete

COPY . .
CMD ["node", "index.js"]

```