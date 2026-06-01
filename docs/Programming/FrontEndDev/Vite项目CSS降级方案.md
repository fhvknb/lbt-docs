针对 Vite 项目，要兼容旧版本浏览器（例如你提到的 Chrome 87），主要有两个层面的工作：**JS 语法/API 的降级** 和 **CSS 新特性的降级**。

因为 Chrome 87 实际上**已经支持原生 ES Modules (ESM)**，所以根据你的具体兼容需求，有两种方案：

---

### 方案一：轻量级降级（推荐，仅针对 Chrome 87 级别）

如果你的底线是兼容到 Chrome 87，你**不需要**引入笨重的传统兼容插件。只需要利用 Vite 内置的 `esbuild` 来降级 JS 语法，并配合 `PostCSS` 降级 CSS 语法即可。

**1. 修改 `vite.config.js` (或 `.ts`)**

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'; // 如果是 React 则为 react()
// 需要先安装: npm install -D postcss-preset-env
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  plugins: [vue()],
  
  // 1. JS 语法降级
  build: {
    // 告诉 esbuild 将 JS 语法转译到 Chrome 87 支持的程度
    // 这样可以解决 JS 中使用了 ES2021/ES2022 新语法导致的报错
    target: ['chrome87', 'safari14', 'firefox78'],
    // 确保 CSS 也被正确处理
    cssTarget: ['chrome87'], 
  },

  // 2. CSS 语法降级（解决你提到的 style 标签解析问题）
  css: {
    postcss: {
      plugins: [
        // 使用 postcss-preset-env 将现代 CSS（如嵌套、:has 等）编译为旧语法
        postcssPresetEnv({
          stage: 2, // 包含大多数现代 CSS 特性
          features: {
            'nesting-rules': true, // 强制开启 CSS 嵌套的降级编译
          },
          browsers: ['chrome >= 87'], // 目标浏览器
        }),
      ],
    },
  },
});
```

**为什么这个方案能解决你的问题？**
你之前提到 Chrome 87 无法解析 JS 生成的 `<style>`，极大概率是因为你在代码里写了 **CSS 嵌套语法**（例如 `.box { &:hover { ... } }`）。配置了 `postcss-preset-env` 后，Vite 在打包时会自动把这些新语法展开成 Chrome 87 能看懂的普通 CSS。

---

### 方案二：深度兼容方案（需要兼容更老的、不支持 ESM 的浏览器）

如果你不仅要兼容 Chrome 87，还要兼容更老的浏览器（比如 Chrome 60+、旧版内核的国产双核浏览器等），你需要使用 Vite 官方的 `@vitejs/plugin-legacy` 插件。

这个插件会生成两套代码：一套给现代浏览器（原生 ESM），一套给老浏览器（SystemJS + 自动注入 Polyfill）。

**1. 安装依赖**

```bash
npm install -D @vitejs/plugin-legacy terser
# terser 是 legacy 插件压缩旧版代码所必须的
```

**2. 修改 `vite.config.js`**

```javascript
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import postcssPresetEnv from 'postcss-preset-env';

export default defineConfig({
  plugins: [
    vue(),
    // 引入 legacy 插件
    legacy({
      // 指定目标浏览器范围，这里使用 browserslist 语法
      targets: ['chrome >= 64', 'safari >= 12', 'firefox >= 60'],
      // 如果需要，可以强制注入特定的 polyfill
      modernPolyfills: true,
    }),
  ],
  
  // CSS 降级依然需要 PostCSS，因为 legacy 插件主要处理 JS
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          stage: 2,
          browsers: ['chrome >= 64'],
        }),
      ],
    },
  },
});
```

### 💡 总结与建议

1. **先尝试方案一**：既然你的目标是 Chrome 87，方案一打包速度更快、产物更小。重点是安装 `postcss-preset-env` 并配置 `build.target`。
2. **检查第三方依赖**：有时候你的业务代码降级了，但是你引入的 `node_modules` 里的第三方库（比如某些 UI 组件库的最新版）可能直接输出了 Chrome 87 不支持的语法。如果发现是第三方库报错，可能需要降低该第三方库的版本，或者在构建工具中配置将其纳入 Babel/esbuild 的转译范围。