# WebGL 常用 API 文档

本文档从 [OpenGL GLSL 文档](https://registry.khronos.org/OpenGL-Refpages/gl4/) 中挑选出 WebGL 开发中常用的 API，并提供了简单的使用说明和示例代码。

## 1. 数学函数

### 1.1 `vec2`, `vec3`, `vec4`

- **描述**: 用于创建向量。
- **示例**:
  
  ```glsl
  vec2 v2 = vec2(1.0, 2.0); // 创建一个二维向量
  vec3 v3 = vec3(1.0, 2.0, 3.0); // 创建一个三维向量
  vec4 v4 = vec4(1.0, 2.0, 3.0, 4.0); // 创建一个四维向量
  ```

### 1.2 `mat2`, `mat3`, `mat4`

- **描述**: 用于创建矩阵。
- **示例**:
  
  ```glsl
  mat4 matrix = mat4(1.0); // 创建一个 4x4 单位矩阵
  ```

### 1.3 `dot(x, y)`

- **描述**: 计算两个向量的点积。
- **示例**:
  
  ```glsl
  float result = dot(vec3(1.0, 2.0, 3.0), vec3(4.0, 5.0, 6.0)); // 结果为 32.0
  ```

### 1.4 `cross(x, y)`

- **描述**: 计算两个三维向量的叉积。
- **示例**:
  
  ```glsl
  vec3 result = cross(vec3(1.0, 0.0, 0.0), vec3(0.0, 1.0, 0.0)); // 结果为 vec3(0.0, 0.0, 1.0)
  ```

### 1.5 `normalize(x)`

- **描述**: 将向量标准化（长度为 1）。
- **示例**:
  
  ```glsl
  vec3 normalized = normalize(vec3(3.0, 4.0, 0.0)); // 结果为 vec3(0.6, 0.8, 0.0)
  ```

### 1.6 `length(x)`

- **描述**: 计算向量的长度。
- **示例**:
  
  ```glsl
  float len = length(vec3(3.0, 4.0, 0.0)); // 结果为 5.0
  ```

### 1.7 `mix(x, y, a)`

- **描述**: 线性插值函数，返回 `x` 和 `y` 按比例 `a` 混合的结果。
- **示例**:
  
  ```glsl
  vec3 result = mix(vec3(1.0, 2.0, 3.0), vec3(4.0, 5.0, 6.0), 0.5); // 结果为 vec3(2.5, 3.5, 4.5)
  ```

## 2. 几何函数

### 2.1 `reflect(I, N)`

- **描述**: 计算向量 `I` 关于法线 `N` 的反射向量。
- **示例**:
  
  ```glsl
  vec3 reflected = reflect(vec3(1.0, -1.0, 0.0), vec3(0.0, 1.0, 0.0)); // 结果为 vec3(1.0, 1.0, 0.0)
  ```

### 2.2 `refract(I, N, eta)`

- **描述**: 计算向量 `I` 在法线 `N` 上的折射向量，`eta` 是折射率。
- **示例**:
  
  ```glsl
  vec3 refracted = refract(vec3(1.0, -1.0, 0.0), vec3(0.0, 1.0, 0.0), 0.5); // 结果为 vec3(0.5, -0.866, 0.0)
  ```

## 3. 纹理采样

### 3.1 `texture(sampler, coord)`

- **描述**: 从纹理中采样颜色。
- **示例**:
  
  ```glsl
  uniform sampler2D u_texture;
  vec4 color = texture(u_texture, vec2(0.5, 0.5)); // 从纹理的中心采样颜色
  ```

## 4. 条件与循环

### 4.1 `if`, `else`

- **描述**: 条件语句。
- **示例**:
  
  ```glsl
  if (length(vec3(1.0, 2.0, 3.0)) > 2.0) {
    // 执行某些操作
  } else {
    // 执行其他操作
  }
  ```

### 4.2 `for`

- **描述**: 循环语句。
- **示例**:
  
  ```glsl
  for (int i = 0; i < 10; i++) {
    // 执行某些操作
  }
  ```

## 5. 常用内置变量

### 5.1 `gl_Position`

- **描述**: 顶点着色器中设置的当前顶点的最终位置。
- **示例**:
  
  ```glsl
  gl_Position = vec4(1.0, 1.0, 0.0, 1.0);
  ```

### 5.2 `gl_FragColor`

- **描述**: 片段着色器中设置的当前片段的颜色（WebGL 1.0 使用）。
- **示例**:
  
  ```glsl
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // 设置为红色
  ```

### 5.3 `gl_FragCoord`

- **描述**: 当前片段的窗口坐标。
- **示例**:
  
  ```glsl
  vec2 fragCoord = gl_FragCoord.xy;
  ```

## 6. 其他常用函数

### 6.1 `clamp(x, minVal, maxVal)`

- **描述**: 将值 `x` 限制在 `[minVal, maxVal]` 范围内。
- **示例**:
  
  ```glsl
  float clamped = clamp(2.5, 0.0, 1.0); // 结果为 1.0
  ```

### 6.2 `step(edge, x)`

- **描述**: 如果 `x` 大于等于 `edge`，返回 1.0，否则返回 0.0。
- **示例**:
  
  ```glsl
  float result = step(0.5, 0.8); // 结果为 1.0
  ```

### 6.3 `smoothstep(edge0, edge1, x)`

- **描述**: 平滑插值函数，返回值在 `[0.0, 1.0]` 范围内。
- **示例**:
  
  ```glsl
  float result = smoothstep(0.0, 1.0, 0.5); // 结果为 0.5
  ```

## 7. 参考链接

- [OpenGL GLSL 文档](https://registry.khronos.org/OpenGL-Refpages/gl4/)
- [WebGL 官方文档](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API)