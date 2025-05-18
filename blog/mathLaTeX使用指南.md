---
title: Math LaTeX使用指南
slug: Math LaTeX使用指南
authors: shaun
tags: [tool]
date: 2025-05-17 17:39:45
---


# LaTeX 在 Markdown 中的使用指南

Markdown 是一种轻量级标记语言，而 LaTeX 是一种专业的排版系统，特别适合数学公式的编写。将两者结合使用可以创建包含复杂数学表达式的文档。以下是在 Markdown 中使用 LaTeX 的详细指南：

## 基本语法

在 Markdown 中插入 LaTeX 公式通常有两种方式：

1. **行内公式**：使用单个美元符号 `$` 或 `\(` 和 `\)` 包围公式
2. **独立公式**：使用双美元符号 `$$` 或 `\[` 和 `\]` 包围公式

在不同的 Markdown 渲染器中，语法可能略有不同。许多现代编辑器支持 `$` 和 `$$` 语法。

<!-- truncate -->


## 常用数学表达式

### 基本运算

```
加法：\[a + b\]
减法：\[a - b\]
乘法：\[a \times b\] 或 \[a \cdot b\]
除法：\[a \div b\] 或 \[\frac{a}{b}\]
幂运算：\[a^b\]
下标：\[a_i\]
```

### 分数

```
\frac{分子}{分母}
```

### 根式

```
\sqrt{表达式}
\sqrt[n]{表达式}  // n次根
```


### 求和与积分

求和：
```
\sum_{下限}^{上限} 表达式
```


积分：
```
\int_{下限}^{上限} 表达式 \, dx
```

### 极限

```
\lim_{x \to 值} 表达式
```


### 矩阵

```
\begin{matrix}
a & b \\
c & d
\end{matrix}
```

带括号的矩阵：
```
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
```


### 希腊字母

- 小写：\[\alpha\], \[\beta\], \[\gamma\], \[\delta\], \[\epsilon\], \[\zeta\], \[\eta\], \[\theta\]...
- 大写：\[\Gamma\], \[\Delta\], \[\Theta\], \[\Lambda\], \[\Pi\], \[\Sigma\], \[\Phi\], \[\Psi\], \[\Omega\]...

## 常用环境

### 方程组

```
\begin{cases}
方程1 \\
方程2 \\
...
\end{cases}
```

### 对齐方程

```
\begin{align}
表达式1 &= 表达式2 \\
&= 表达式3 \\
&= 表达式4
\end{align}
```


## 实用技巧

1. **空格处理**：LaTeX 中的空格通常被忽略，使用 `\,`、`\;`、`\quad` 和 `\qquad` 添加不同宽度的空格

2. **文本在公式中**：使用 `\text{文本内容}` 在公式中插入普通文本

3. **括号自适应大小**：使用 `\left(` 和 `\right)` 代替普通括号，使括号大小自动适应内容

4. **多行公式**：使用 `\\` 在公式中换行，配合 `align` 或 `aligned` 环境使用

5. **常见错误处理**：
   - 特殊字符需要转义，如 `%`, `&`, `_`, `#`, `$` 等
   - 在 Markdown 中使用 LaTeX 时，可能需要额外的反斜杠进行转义


## 在线工具推荐

1. **Overleaf**：在线 LaTeX 编辑器，可以实时预览
2. **LaTeX 公式编辑器**：如 https://www.latexlive.com/
3. **Mathpix**：可以将图片中的公式转换为 LaTeX 代码
4. **Katex Supported Functions**: https://katex.org/docs/supported
