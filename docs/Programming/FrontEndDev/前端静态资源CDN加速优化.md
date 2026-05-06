---
tag:
  - webpack
---

# 前后端分离项目的 CDN 加速优化策略

## 一、CDN 基础配置

### 1. 选择合适的 CDN 服务

根据项目需求和预算选择合适的 CDN 服务提供商：

- **国际**: Cloudflare, Akamai, AWS CloudFront, Fastly
- **国内**: 阿里云 CDN, 腾讯云 CDN, 七牛云, 又拍云, 百度云加速

### 2. 配置 CDN 域名

1. 在 CDN 服务商平台创建加速域名（如 `static.yourdomain.com`）
2. 配置源站信息（指向你的源服务器或对象存储）
3. 配置 CNAME 记录，将加速域名指向 CDN 服务商提供的域名
4. 配置 HTTPS 证书（强烈推荐）

## 二、前端构建配置

### 1. Webpack 配置

```js
// webpack.config.js
const isProd = process.env.NODE_ENV === 'production';
const CDN_URL = isProd ? 'https://static.yourdomain.com/' : '/';

module.exports = {
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: CDN_URL, // 关键配置：资源的基础路径
  },
  // 图片、字体等资源配置
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[hash:8][ext]',
        },
      },
    ],
  },
};
```

### 2. Vite 配置

```js
// vite.config.js
export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production';
  const CDN_URL = isProd ? 'https://static.yourdomain.com/' : '/';
  
  return {
    base: CDN_URL, // 公共基础路径
    build: {
      rollupOptions: {
        output: {
          // 自定义构建输出
          chunkFileNames: 'js/[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: ({name}) => {
            if (/\.(gif|jpe?g|png|svg)$/.test(name)) {
              return 'images/[name]-[hash][extname]';
            }
            if (/\.(woff2?|ttf|eot)$/.test(name)) {
              return 'fonts/[name]-[hash][extname]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
    },
  };
});
```

## 三、资源上传到 CDN

### 1. 手动上传

构建完成后，将 `dist` 或 `build` 目录中的文件上传到 CDN 源站（如对象存储）。

### 2. 自动化部署

#### 使用 Webpack 插件

```js
// webpack.config.js
const WebpackCdnUploadPlugin = require('webpack-cdn-upload-plugin');

module.exports = {
  // ... 其他配置
  plugins: [
    new WebpackCdnUploadPlugin({
      uploadOptions: {
        provider: 'aws-s3', // 或其他支持的提供商
        region: 'your-region',
        bucket: 'your-bucket',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        prefix: 'static/', // 可选前缀
      },
      // 可选：上传完成后的回调
      onFinish: (uploadedFiles) => {
        console.log('Files uploaded:', uploadedFiles.length);
      },
    }),
  ],
};
```

#### 使用 Vite 插件

```js
// vite.config.js
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { cdnUpload } from 'vite-plugin-cdn-upload'; // 假设的插件

export default defineConfig({
  // ... 其他配置
  plugins: [
    cdnUpload({
      provider: 'aliyun-oss', // 或其他支持的提供商
      region: 'your-region',
      bucket: 'your-bucket',
      accessKeyId: process.env.OSS_ACCESS_KEY_ID,
      accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
      prefix: 'static/',
    }),
  ],
});
```

#### 使用 CI/CD 流程

```yaml
# .gitlab-ci.yml 示例
stages:
  - build
  - deploy

build:
  stage: build
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - dist/

deploy_to_cdn:
  stage: deploy
  script:
    - pip install awscli
    - aws s3 sync ./dist s3://your-bucket/static/ --delete
  only:
    - master
```

## 四、高级优化策略

### 1. 内容分发优化

#### 资源分组与分域名

将不同类型的资源分配到不同的 CDN 域名，以提高并行下载效率：

```js
// webpack.config.js
module.exports = {
  output: {
    filename: 'js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'https://js.yourdomain.com/',
  },
  // 使用插件为不同资源类型设置不同的 CDN 域名
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IMAGE_CDN': JSON.stringify('https://img.yourdomain.com/'),
      'process.env.FONT_CDN': JSON.stringify('https://font.yourdomain.com/'),
    }),
  ],
};
```

然后在代码中使用：

```js
// 图片路径
const imgUrl = `${process.env.IMAGE_CDN}images/logo.png`;
```

### 2. 缓存策略优化

#### 配置合理的缓存时间

在 CDN 平台配置不同资源类型的缓存时间：

| 资源类型 | 缓存时间 | 说明 |
|---------|---------|------|
| HTML | 短期或不缓存 | 确保内容更新及时可见 |
| JS/CSS (带哈希) | 1年 | 内容变化时文件名会改变 |
| 图片/字体 | 1年 | 静态资源很少变化 |
| 动态API响应 | 按需配置 | 根据API特性决定 |

#### 配置缓存控制头

在 CDN 平台配置适当的 HTTP 头：

```
Cache-Control: max-age=31536000, immutable
```

### 3. 预加载和预连接优化

在 HTML 中添加资源提示：

```html
<!-- DNS 预解析 -->
<link rel="dns-prefetch" href="https://static.yourdomain.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://static.yourdomain.com" crossorigin>

<!-- 预加载关键资源 -->
<link rel="preload" href="https://static.yourdomain.com/js/main.123456.js" as="script">
<link rel="preload" href="https://static.yourdomain.com/css/main.123456.css" as="style">
```

### 4. 图片优化

#### 响应式图片

```html
<picture>
  <source media="(max-width: 768px)" srcset="https://img.yourdomain.com/small.jpg">
  <source media="(min-width: 769px)" srcset="https://img.yourdomain.com/large.jpg">
  <img src="https://img.yourdomain.com/fallback.jpg" alt="描述">
</picture>
```

#### 图片格式优化

使用 WebP 或 AVIF 格式，并提供回退方案：

```html
<picture>
  <source type="image/avif" srcset="https://img.yourdomain.com/image.avif">
  <source type="image/webp" srcset="https://img.yourdomain.com/image.webp">
  <img src="https://img.yourdomain.com/image.jpg" alt="描述">
</picture>
```

### 5. 第三方库优化

#### 使用公共 CDN

对于常用库，可以考虑使用公共 CDN：

```html
<!-- 使用公共 CDN -->
<script src="https://cdn.jsdelivr.net/npm/vue@3.2.31/dist/vue.global.prod.js"></script>
```

在 Webpack 中配置外部依赖：

```js
// webpack.config.js
module.exports = {
  // ... 其他配置
  externals: {
    'vue': 'Vue',
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
};
```

## 五、监控与分析

### 1. CDN 性能监控

- 配置 CDN 平台提供的监控功能
- 监控关键指标：缓存命中率、响应时间、错误率
- 设置告警机制

### 2. 前端性能监控

```js
// 使用 Performance API 监控资源加载性能
window.addEventListener('load', () => {
  setTimeout(() => {
    const perfData = window.performance.getEntriesByType('resource');
    const cdnResources = perfData.filter(res => 
      res.name.includes('static.yourdomain.com')
    );
    
    // 分析并上报性能数据
    const metrics = cdnResources.map(res => ({
      url: res.name,
      duration: res.duration,
      size: res.transferSize,
      timing: {
        dns: res.domainLookupEnd - res.domainLookupStart,
        tcp: res.connectEnd - res.connectStart,
        ttfb: res.responseStart - res.requestStart,
        download: res.responseEnd - res.responseStart,
      }
    }));
    
    // 发送到分析服务器
    navigator.sendBeacon('/analytics', JSON.stringify(metrics));
  }, 0);
});
```

## 六、常见问题与解决方案

### 1. 跨域问题

确保 CDN 配置了正确的 CORS 头：

```
Access-Control-Allow-Origin: https://yourdomain.com
Access-Control-Allow-Methods: GET, OPTIONS
Access-Control-Max-Age: 86400
```

### 2. 缓存更新问题

- 使用内容哈希命名文件，确保内容变更时文件名也变更
- 对于 HTML 文件，设置较短的缓存时间或不缓存
- 实现紧急缓存清除机制

### 3. 部署同步问题

- 先部署静态资源到 CDN，再部署引用这些资源的 HTML
- 实现原子化部署流程，避免资源不一致

## 七、完整实施流程示例

### 1. 项目配置示例

```js
// vue.config.js (Vue CLI 项目)
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? 'https://static.yourdomain.com/'
    : '/',
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 优化图片
      config.module
        .rule('images')
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          mozjpeg: { quality: 75 },
          optipng: { enabled: true },
          pngquant: { quality: [0.65, 0.9], speed: 4 },
          gifsicle: { interlaced: false },
        });
    }
  },
  configureWebpack: {
    output: {
      // 添加内容哈希到文件名
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].js'
    }
  }
};
```

### 2. 部署脚本示例

```bash
#!/bin/bash
# 构建项目
npm run build

# 上传到 CDN (使用 AWS S3 示例)
aws s3 sync ./dist s3://your-bucket/static/ \
  --exclude "*.html" \
  --cache-control "public, max-age=31536000, immutable"

# HTML 文件使用不同的缓存策略
aws s3 sync ./dist s3://your-bucket/static/ \
  --include "*.html" \
  --cache-control "public, max-age=3600"

# 刷新 CDN 缓存 (如果需要)
aws cloudfront create-invalidation --distribution-id YOUR_CF_DISTRIBUTION_ID --paths "/*"

# 部署后端应用
# ...
```

### 3. 前端引用示例

```jsx
// React 组件示例
import React from 'react';

// 使用环境变量中的 CDN 地址
const CDN_URL = process.env.REACT_APP_CDN_URL || '/';

function MyComponent() {
  return (
    <div>
      <img 
        src={`${CDN_URL}images/hero-banner.jpg`} 
        alt="Hero Banner" 
        loading="lazy"
      />
      {/* 其他内容 */}
    </div>
  );
}
```
