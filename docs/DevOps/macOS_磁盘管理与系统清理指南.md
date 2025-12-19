# macOS 磁盘管理与系统清理指南

---

## 一、使用 `du` 命令查看文件夹大小

### **1. 基本用法**
```bash
du [选项] 路径
```
默认情况下，`du` 会递归显示目录中每个子目录的大小以及总大小。

---

### **2. 查看文件夹总大小**
```bash
du -sh 文件夹路径
```
#### 参数说明：
- **`-s`**：仅显示总大小。
- **`-h`**：以人类可读格式显示。

#### 示例：
```bash
du -sh ~/Documents
```
输出：
```
1.2G    /Users/username/Documents
```

---

### **3. 查看文件夹及子目录大小**
```bash
du -h 文件夹路径
```
#### 示例：
```bash
du -h ~/Documents
```
输出：
```
4.0K    /Users/username/Documents/Folder1
2.3M    /Users/username/Documents/Folder2
1.2G    /Users/username/Documents
```

---

### **4. 按大小排序**
结合 `sort` 命令按文件夹大小排序：
```bash
du -h 文件夹路径 | sort -h
```
#### 示例：
```bash
du -h ~/Documents | sort -h
```
输出：
```
4.0K    /Users/username/Documents/Folder1
2.3M    /Users/username/Documents/Folder2
1.2G    /Users/username/Documents
```

---

### **5. 查看指定层级文件夹大小**
#### macOS 专用命令：
```bash
du -h -d 1 ~/Documents
```
#### 示例输出：
```
2.3M    /Users/username/Documents/Folder1
1.0G    /Users/username/Documents/Folder2
1.2G    /Users/username/Documents
```

---

### **6. 查看单个文件大小**
```bash
du -h 文件路径
```
#### 示例：
```bash
du -h ~/Documents/example.pdf
```
输出：
```
4.5M    /Users/username/Documents/example.pdf
```

---

## 二、清理 macOS 系统数据垃圾

### **1. 使用内置工具清理**
#### （1）存储管理工具
1. 点击 **苹果菜单** > **关于本机** > **存储** > **管理**。
2. 使用以下功能：
   - **优化存储**：清理 iTunes/Apple TV 缓存。
   - **清空垃圾桶**：自动删除 30 天前的垃圾文件。
   - **减少杂乱**：查找并删除大文件。

#### （2）清空垃圾桶
右键点击 **垃圾桶** 图标 > **清空垃圾桶**。

---

### **2. 手动清理**
#### （1）清理缓存文件
1. 删除用户缓存：
   ```bash
   ~/Library/Caches
   ```
2. 删除系统缓存：
   ```bash
   /Library/Caches
   ```

#### （2）清理日志文件
- 用户日志路径：`~/Library/Logs`
- 系统日志路径：`/Library/Logs`

#### （3）清理下载文件
前往 **下载** 文件夹删除不需要的文件。

---

### **3. 使用第三方工具**
#### （1）CleanMyMac
- 自动扫描并清理系统垃圾、缓存、日志。
- 支持卸载应用程序和性能优化。

#### （2）DaisyDisk
- 可视化磁盘空间分析工具，快速定位大文件。

#### （3）AppCleaner
- 彻底删除应用程序及其配置文件。

---

### **4. 其他清理方法**
#### （1）清理邮件附件
1. 打开 **邮件** 应用 > **邮箱** > **导出附件**。
2. 删除不需要的附件。

#### （2）清理浏览器缓存（以 Safari 为例）
1. 打开 Safari > **清除历史记录**。
2. 选择时间范围并确认清理。

#### （3）重建 Spotlight 索引
1. 打开 **系统设置** > **Siri 与 Spotlight** > **隐私**。
2. 将磁盘移入并移出隐私列表以重建索引。

---

## 总结
### `du` 命令常用示例
```bash
du -sh 文件夹路径          # 查看总大小
du -h -d 1 文件夹路径      # 查看第一层子目录大小（macOS）
du -h --exclude="*.log" 文件夹路径  # 排除特定文件
```

### 系统清理推荐步骤
1. 使用存储管理工具清理大文件。
2. 手动删除缓存和日志文件。
3. 借助 CleanMyMac 进行深度清理。
4. 定期清理邮件附件和浏览器缓存。