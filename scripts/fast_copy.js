const rsync = require('rsyncwrapper');
const path = require('path');

/**
 * 使用 rsync 高效同步目录
 * @param {string} src 源目录路径
 * @param {string} dest 目标目录路径
 */
function fastSync(src, dest) {
  // 注意：rsync 对路径末尾的斜杠 / 很敏感
  // 源路径加上 / 表示同步目录下的内容，而不是同步目录本身
  const sourcePath = src.endsWith('/') ? src : `${src}/`;

  rsync({
    src: sourcePath,
    dest: dest,
    recursive: true,
    delete: true,      // 关键：删除目标目录中多余的文件
    args: ['--verbose', '--archive'], // -a 包含权限、时间戳等，-v 显示进度
  }, (error, stdout, stderr, cmd) => {
    if (error) {
      console.error('同步失败:', error.message);
      return;
    }
    
    console.log('执行命令:', cmd);
    if (stdout) console.log('同步日志:\n', stdout);
    console.log('--- 同步成功 ---');
  });
}

// 使用示例
const srcDir = path.resolve(__dirname, './src_data');
const destDir = path.resolve(__dirname, './backup_data');

fastSync(srcDir, destDir);