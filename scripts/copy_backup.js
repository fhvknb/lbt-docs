const fs = require('fs-extra');
const path = require('path');

/**
 * 核心同步函数
 * @param {string} src 源目录
 * @param {string} dest 目标目录
 */
async function syncDirectories(src, dest) {
  try {
    // 1. 确保源目录存在
    if (!(await fs.pathExists(src))) {
      console.error(`源目录不存在: ${src}`);
      return;
    }

    // 2. 如果目标目录不存在，直接复制整个文件夹
    if (!(await fs.pathExists(dest))) {
      await fs.copy(src, dest);
      console.log('目标目录已创建并完成初始化同步。');
      return;
    }

    // 3. 处理“删除”逻辑：遍历目标目录，如果文件在源目录中不存在，则删除
    const destItems = await fs.readdir(dest);
    for (const item of destItems) {
      const srcPath = path.join(src, item);
      const destPath = path.join(dest, item);

      if (!(await fs.pathExists(srcPath))) {
        await fs.remove(destPath);
        console.log(`已删除冗余文件/目录: ${item}`);
      }
    }

    // 4. 处理“新增和更新”逻辑：将源目录内容覆盖到目标目录
    // overwrite: true 会确保旧文件被新版本替换
    await fs.copy(src, dest, { overwrite: true });
    
    console.log('同步完成：目标目录已与源目录保持一致。');
  } catch (err) {
    console.error('同步过程中出错:', err);
  }
}

// 使用示例
const sourceDir = path.join(__dirname, 'source_folder');
const targetDir = path.join(__dirname, 'target_folder');

syncDirectories(sourceDir, targetDir);