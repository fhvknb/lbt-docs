---
title: Sublime Text Shortcuts For Mac
sidebar_position: 4
---


## **1. 基础快捷键**

### **文件操作**

- **新建文件**：`Command+N`  
  
  - 创建一个新的文件。

- **打开文件**：`Command+O`  
  
  - 打开现有文件。

- **保存文件**：`Command+S`  
  
  - 保存当前文件。

- **另存为**：`Command+Shift+S`  
  
  - 将当前文件另存为其他文件。

- **关闭文件**：`Command+W`  
  
  - 关闭当前文件。

- **退出 Sublime Text**：`Command+Q`

---

## **2. 编辑快捷键**

### **文本操作**

- **复制行**：`Command+Shift+D`  
  
  - 复制当前行，并将其粘贴到下一行。

- **删除行**：`Control+Shift+K`  
  
  - 删除当前行。

- **上下移动行**：`Command+Control+Up/Down`  
  
  - 上下移动当前行。

- **合并行**：`Command+J`  
  
  - 将多行合并为一行。

- **注释代码**：
  
  - 单行注释：`Command+/`  
  - 多行注释：`Command+Option+/`

- **选择整行**：`Command+L`  
  
  - 选中当前光标所在的整行。

- **选择相同内容**：`Command+D`  
  
  - 选中光标所在的单词，重复按下可以选中下一个相同的内容。

- **多光标编辑**：按住 `Command`，然后点击需要编辑的位置。  
  
  - 可以同时编辑多个位置。

- **撤销操作**：`Command+Z`  
  
  - 撤销上一步操作。

- **重做操作**：`Command+Shift+Z`  
  
  - 恢复被撤销的操作。

---

### **代码格式化**

- **缩进代码**：`Command+]`  
  
  - 将选中的代码块缩进。

- **取消缩进**：`Command+[`  
  
  - 将选中的代码块取消缩进。

- **自动缩进**：`Command+Control+[`  
  
  - 根据代码结构自动调整缩进。

---

## **3. 查找和替换快捷键**

### **查找**

- **查找**：`Command+F`  
  
  - 在当前文件中查找内容。

- **查找下一个**：`Command+G`  
  
  - 跳转到下一个匹配项。

- **查找上一个**：`Command+Shift+G`  
  
  - 跳转到上一个匹配项。

- **全局查找**：`Command+Shift+F`  
  
  - 在整个项目中查找内容。

### **替换**

- **替换**：`Command+Option+F`  
  - 在当前文件中查找并替换内容。

---

## **4. 多文件和窗口操作**

### **文件切换**

- **切换到下一个标签页**：`Command+Shift+]`  
- **切换到上一个标签页**：`Command+Shift+[`  
- **快速切换文件**：`Command+P`  
  - 输入文件名快速定位并打开。

### **分屏操作**

- **垂直分屏**：`Command+Option+2`  
  
  - 将窗口分为左右两个部分。

- **水平分屏**：`Command+Option+Shift+2`  
  
  - 将窗口分为上下两个部分。

- **切换分屏**：`Control+1/2/3...`  
  
  - 切换到对应的分屏。

---

## **5. 代码导航快捷键**

- **跳转到行**：`Command+L`  
  
  - 输入行号快速跳转。

- **跳转到符号**：`Command+R`  
  
  - 输入方法或函数名快速跳转。

- **跳转到定义**：`Command+Option+Down`  
  
  - 跳转到变量、方法或类的定义处。

- **跳转到匹配括号**：`Control+M`  
  
  - 在匹配的括号之间切换。

---

## **6. 书签操作**

- **添加/删除书签**：`Command+F2`  
  
  - 在当前行添加或删除书签。

- **跳转到下一个书签**：`F2`  
  
  - 跳转到下一个书签。

- **跳转到上一个书签**：`Shift+F2`  
  
  - 跳转到上一个书签。

---

## **7. 调整视图**

- **全屏模式**：`Command+Control+F`  
  
  - 切换全屏模式。

- **Zen 模式（无干扰模式）**：`Command+Option+Shift+F`  
  
  - 进入 Zen 模式，只显示编辑区域。

- **折叠代码块**：
  
  - 折叠：`Command+Option+[`  
  - 展开：`Command+Option+]`

---

## **8. 插件和扩展使用技巧**

Sublime Text 的强大功能依赖于插件，以下是一些常用插件和使用技巧：

### **安装 Package Control**

1. 打开命令面板：`Command+Shift+P`。
2. 输入 `Install Package Control` 并回车。
3. 安装完成后，可以通过 Package Control 安装各种插件。

### **推荐插件**

- **Emmet**  
  
  - 高效编写 HTML 和 CSS，使用 `Tab` 快速生成代码。

- **SublimeLinter**  
  
  - 实时检测代码中的语法错误。

- **BracketHighlighter**  
  
  - 高亮显示匹配的括号。

- **GitGutter**  
  
  - 显示 Git 修改状态（新增、修改、删除）。

- **AutoFileName**  
  
  - 自动补全文件路径。

### **安装插件**

1. 打开命令面板：`Command+Shift+P`。
2. 输入 `Install Package` 并回车。
3. 搜索需要的插件并安装。

---

## **9. 自定义快捷键**

如果你觉得默认快捷键不够顺手，可以通过以下步骤自定义：

1. 打开快捷键配置：`Preferences > Key Bindings`。
2. 在右侧用户配置文件中添加自定义快捷键。例如：
   
   ```json
   [
       { "keys": ["command+e"], "command": "expand_selection", "args": {"to": "line"} }
   ]
   ```

---
