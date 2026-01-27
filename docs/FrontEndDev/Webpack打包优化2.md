## 处理 webpack 中不变的第三方包，最佳实现方案

**`DllPlugin` & [DllReferencePlugin](https://www.google.com/search?q=DllReferencePlugin&oq=wepack+%E6%89%93%E5%8C%85%E3%80%80%E6%9C%80%E4%BD%B3%E5%A4%84%E7%90%86%E5%BC%95%E5%85%A5%E4%B8%89%E6%96%B9%E4%B8%8D%E5%8F%98%E7%9A%84package&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgcIAhAhGI8CMgcIAxAhGI8C0gEJMzM3MTNqMGoxqAIIsAIB8QVeD3kPjNIGMg&sourceid=chrome&ie=UTF-8&mstk=AUtExfDnm0MVEPqD1JU3pq7P6wyvMTvCNQwaNT20OUtn7I92DFIwk4s5kEMh5seE0J8g_1pU803ec5Jxyu5Nv1S8C1qr7EJ71iT6Azz8rE48eUanR3yG6DYhKvVQMqLX_jG1GVSFK4fWH3B_UlkY8nK-gu6oTUrXPHirMO5RsUTS2cKLiKg&csui=3&ved=2ahUKEwitpKGz-fuRAxUBlWoFHT2AGJwQgK4QegQIARAB)** 实现**预编译**，或使用 **`externals`** 配置从外部 CDN 加载，或在生产环境通过**分包优化**（`SplitChunksPlugin`）和**按需加载**减少主包体积，并配合 Tree Shaking 和 Scope Hoisting 减少无效代码。核心是**分离**这些稳定包，让它们独立打包或不打包进主应用，减少重复构建时间。    

### 最佳策略详解

1. **[DllPlugin](https://www.google.com/search?q=DllPlugin&oq=wepack+%E6%89%93%E5%8C%85%E3%80%80%E6%9C%80%E4%BD%B3%E5%A4%84%E7%90%86%E5%BC%95%E5%85%A5%E4%B8%89%E6%96%B9%E4%B8%8D%E5%8F%98%E7%9A%84package&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgcIAhAhGI8CMgcIAxAhGI8C0gEJMzM3MTNqMGoxqAIIsAIB8QVeD3kPjNIGMg&sourceid=chrome&ie=UTF-8&mstk=AUtExfDnm0MVEPqD1JU3pq7P6wyvMTvCNQwaNT20OUtn7I92DFIwk4s5kEMh5seE0J8g_1pU803ec5Jxyu5Nv1S8C1qr7EJ71iT6Azz8rE48eUanR3yG6DYhKvVQMqLX_jG1GVSFK4fWH3B_UlkY8nK-gu6oTUrXPHirMO5RsUTS2cKLiKg&csui=3&ved=2ahUKEwitpKGz-fuRAxUBlWoFHT2AGJwQgK4QegQIAxAB) & [DllReferencePlugin](https://www.google.com/search?q=DllReferencePlugin&oq=wepack+%E6%89%93%E5%8C%85%E3%80%80%E6%9C%80%E4%BD%B3%E5%A4%84%E7%90%86%E5%BC%95%E5%85%A5%E4%B8%89%E6%96%B9%E4%B8%8D%E5%8F%98%E7%9A%84package&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgcIAhAhGI8CMgcIAxAhGI8C0gEJMzM3MTNqMGoxqAIIsAIB8QVeD3kPjNIGMg&sourceid=chrome&ie=UTF-8&mstk=AUtExfDnm0MVEPqD1JU3pq7P6wyvMTvCNQwaNT20OUtn7I92DFIwk4s5kEMh5seE0J8g_1pU803ec5Jxyu5Nv1S8C1qr7EJ71iT6Azz8rE48eUanR3yG6DYhKvVQMqLX_jG1GVSFK4fWH3B_UlkY8nK-gu6oTUrXPHirMO5RsUTS2cKLiKg&csui=3&ved=2ahUKEwitpKGz-fuRAxUBlWoFHT2AGJwQgK4QegQIAxAC) (推荐)**- **原理**: 预先将大型不变的库（如 React, Vue, Lodash）打包成一个独立的 DLL (Dynamic Link Library) 文件。
- **好处**: 构建时跳过对这些库的编译，大幅提升构建速度，尤其是在开发环境。
- **实现**:- `webpack.config.js` (基础配置):javascript

```
// dll.config.js (单独配置)
const webpack = require('webpack');
module.exports = {
    entry: {
        vendor: ['react', 'react-dom', 'lodash'] // 你的不变包
    },
    output: {
        path: path.join(__dirname, 'dist', 'dll'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist', 'dll', '[name]-manifest.json'),
            name: '[name]'
        })
    ]
};

```

- 主配置文件 (配置 `DllReferencePlugin`):javascript

```
// webpack.config.js (主配置)
new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./dist/dll/vendor-manifest.json')
})

```


2. **`externals` (外部引用)**- **原理**:告诉 Webpack 这些库不应被打包，而是从全局变量或 CDN 加载。
- **好处**: 适用于已通过 `<script>` 标签引入的库，或希望用户直接从 CDN 获取的库。
- **实现**:javascript

```
module.exports = {
  // ...
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM'
  }
};

```


3. **[SplitChunksPlugin](https://www.google.com/search?q=SplitChunksPlugin&oq=wepack+%E6%89%93%E5%8C%85%E3%80%80%E6%9C%80%E4%BD%B3%E5%A4%84%E7%90%86%E5%BC%95%E5%85%A5%E4%B8%89%E6%96%B9%E4%B8%8D%E5%8F%98%E7%9A%84package&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIJCAEQIRgKGKABMgcIAhAhGI8CMgcIAxAhGI8C0gEJMzM3MTNqMGoxqAIIsAIB8QVeD3kPjNIGMg&sourceid=chrome&ie=UTF-8&mstk=AUtExfDnm0MVEPqD1JU3pq7P6wyvMTvCNQwaNT20OUtn7I92DFIwk4s5kEMh5seE0J8g_1pU803ec5Jxyu5Nv1S8C1qr7EJ71iT6Azz8rE48eUanR3yG6DYhKvVQMqLX_jG1GVSFK4fWH3B_UlkY8nK-gu6oTUrXPHirMO5RsUTS2cKLiKg&csui=3&ved=2ahUKEwitpKGz-fuRAxUBlWoFHT2AGJwQgK4QegQIAxAT) (代码分割)**- **原理**: 自动将公共模块和第三方库拆分到单独的 `chunk` 中，可配置缓存策略。
- **好处**: 适合大型项目，将不变的包放到一个 `chunk`，与业务代码分离，利用浏览器缓存。
- **实现**:javascript

```
module.exports = {
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors', // chunk 名
          chunks: 'all',
        },
      },
    },
  },
};

```


4. **按需加载 & Tree Shaking & Scope Hoisting**- **按需加载**: 使用 `import()` 动态导入，只在需要时加载模块。
- **Tree Shaking**: 移除未使用的代码。
- **Scope Hoisting** (Webpack 3+): 将模块代码合并到同一个作用域，减少函数调用开销。
- **一起使用**: 优化了代码体积和运行效率。    



### 总结与建议

- **开发环境**: 优先使用 `DllPlugin` 提升构建速度。
- **生产环境**: 结合 `SplitChunksPlugin` 和 `externals`/按需加载，实现分包和缓存，同时配合 Tree Shaking，达到体积和性能最佳平衡。    







