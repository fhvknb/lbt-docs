---
tag:
  - webpack
---

# Webpack/Vite 打包优化策略全指南

## Webpack 打包优化

### 1. 代码分割 (Code Splitting)

```js
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'common',
        },
      },
    },
  },
};
```

### 2. 树摇 (Tree Shaking)

```js
// package.json
{
  "sideEffects": false, // 或指定有副作用的文件 ["*.css"]
}

// webpack.config.js
module.exports = {
  mode: 'production', // 生产模式自动启用树摇
  optimization: {
    usedExports: true,
  },
};
```

### 3. 懒加载 (Lazy Loading)

```js
// 在代码中使用动态导入
const loadComponent = () => import(/* webpackChunkName: "my-chunk" */ './component');

button.addEventListener('click', async () => {
  const module = await loadComponent();
  module.default();
});
```

### 4. 缓存优化

```js
module.exports = {
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
  },
};
```

### 5. 压缩优化

```js
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
        parallel: true,
      }),
      new CssMinimizerPlugin(),
    ],
  },
};
```

### 6. 图片优化

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 8kb以下转为base64
          },
        },
      },
    ],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizer: {
        implementation: ImageMinimizerPlugin.imageminMinify,
        options: {
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['mozjpeg', { quality: 75 }],
            ['pngquant', { quality: [0.6, 0.8] }],
            ['svgo', { plugins: [{ removeViewBox: false }] }],
          ],
        },
      },
    }),
  ],
};
```

### 7. 分析和监控打包结果

```bash
# 安装分析工具
npm install --save-dev webpack-bundle-analyzer

# 配置
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
};
```

### 8. 多线程/多进程构建

```js
const ThreadsPlugin = require('threads-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 4,
            },
          },
          'babel-loader',
        ],
      },
    ],
  },
  plugins: [new ThreadsPlugin()],
};
```

### 9. 外部化依赖 (Externals)

```js
module.exports = {
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    lodash: '_',
  },
};
```

### 10. 优化 resolve 配置

```js
module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 限制扩展名数量
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    symlinks: false,
    cacheWithContext: false,
  },
};
```

## Vite 打包优化

Vite 本身已经针对开发和构建进行了优化，但仍有一些策略可以进一步提升性能：

### 1. 依赖预构建优化

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: ['lodash-es', 'vue'], // 强制预构建这些依赖
    exclude: ['your-local-package'], // 排除某些依赖
  },
};
```

### 2. 按需加载和代码分割

```js
// 在代码中使用动态导入
const Component = () => import('./Component.vue');
```

### 3. 资源压缩配置

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    minify: 'terser', // 'terser' 或 'esbuild'
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
```

### 4. 静态资源处理

```js
// vite.config.js
export default {
  build: {
    assetsInlineLimit: 4096, // 小于此大小的资源将被转为base64
    rollupOptions: {
      output: {
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: '[ext]/[name]-[hash].[ext]',
      },
    },
  },
};
```

### 5. 分块策略优化

```js
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vuex'],
          ui: ['element-plus'],
          utils: ['lodash-es', 'axios'],
        },
        // 或使用函数形式更灵活地控制
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },
};
```

### 6. CSS 优化

```js
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/styles/variables.scss";`,
      },
    },
    postcss: {
      plugins: [
        require('autoprefixer'),
        require('cssnano')({
          preset: 'default',
        }),
      ],
    },
  },
});
```

### 7. 预加载和预获取

```js
// vite.config.js
import { defineConfig } from 'vite';
import preload from 'vite-plugin-preload';

export default defineConfig({
  plugins: [
    preload({
      // 配置预加载策略
    }),
  ],
});
```

### 8. 使用构建分析工具

```js
// vite.config.js
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
});
```

### 9. 启用 gzip/brotli 压缩

```js
// vite.config.js
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    viteCompression({
      algorithm: 'gzip', // 或 'brotliCompress'
      threshold: 10240, // 大于10kb的文件才会被压缩
    }),
  ],
});
```

### 10. SSR 优化 (如果适用)

```js
// vite.config.js
export default {
  ssr: {
    noExternal: ['some-package'], // 强制某些依赖进行打包
    external: ['react', 'react-dom'], // 将某些依赖标记为外部依赖
  },
};
```

## 通用优化策略

无论使用 Webpack 还是 Vite，以下策略都适用：

### 1. 减少依赖大小
- 使用 `import { Button } from 'ui-lib'` 代替 `import UI from 'ui-lib'`
- 选择体积更小的替代库
- 使用 [bundlephobia](https://bundlephobia.com/) 分析依赖大小

### 2. 代码优化
- 移除未使用的代码和依赖
- 使用现代 JavaScript 特性
- 避免重复代码

### 3. 缓存策略
- 合理设置长期缓存
- 使用内容哈希命名文件

### 4. CI/CD 优化
- 使用缓存加速构建
- 考虑增量构建

### 5. 监控与分析
- 定期分析打包结果
- 设置性能预算
- 监控关键性能指标

## 性能对比和选择建议

| 场景 | 推荐选择 | 原因 |
|------|----------|------|
| 大型项目 | Webpack | 更成熟的生态和更多的优化插件 |
| 小到中型项目 | Vite | 更快的开发体验和足够好的构建性能 |
| 需要复杂自定义配置 | Webpack | 更灵活的配置系统 |
| 新项目快速启动 | Vite | 几乎零配置，开箱即用 |
| 遗留项目 | 保持现状 | 迁移成本可能高于收益 |
