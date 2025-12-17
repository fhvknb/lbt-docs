#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

// 定义颜色和样式
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
  reset: '\x1b[0m' // No Color
};

// 输出样式函数
function printHeader(text) {
  console.log(`\n${colors.bold}${colors.blue}=== ${text} ===${colors.reset}\n`);
}

function printSuccess(text) {
  console.log(`${colors.green}✓ ${text}${colors.reset}`);
}

function printError(text) {
  console.log(`${colors.red}✗ ${text}${colors.reset}`);
}

function printWarning(text) {
  console.log(`${colors.yellow}⚠ ${text}${colors.reset}`);
}

function printInfo(text) {
  console.log(`${colors.cyan}ℹ ${text}${colors.reset}`);
}

function printProgress(text) {
  console.log(`${colors.purple}➤ ${text}${colors.reset}`);
}

// 显示脚本标题
printHeader('Git 增量更新工具');

// 获取命令行参数
const args = process.argv.slice(2);
let srcDir = args[0] || '';
const destDir = args[1] || '';
const targetFormat = args[2] || '';

// 规范化路径
const normalizedSrcDir = path.resolve(srcDir);

// 检查参数是否正确
if (!srcDir || !destDir || !targetFormat) {
  printError('参数不足');
  console.log(`${colors.bold}用法:${colors.reset} node ${path.basename(__filename)} <源目录> <目标目录> <目标格式>`);
  console.log(`${colors.bold}示例:${colors.reset} node ${path.basename(__filename)} ./source ./output pdf`);
  process.exit(1);
}

printInfo(`源目录: ${normalizedSrcDir}`);
printInfo(`目标目录: ${destDir}`);
printInfo(`目标格式: ${targetFormat}`);

// 检查源目录是否存在
if (!fs.existsSync(normalizedSrcDir) || !fs.statSync(normalizedSrcDir).isDirectory()) {
  printError(`源目录 ${normalizedSrcDir} 不存在！`);
  process.exit(1);
}

// 检查源目录是否在 Git 仓库中
try {
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
} catch (error) {
  printError('当前目录不是 Git 仓库。请在 Git 仓库中运行此脚本。');
  process.exit(1);
}

// 检查 pandoc 是否安装
try {
  execSync('pandoc --version', { stdio: 'ignore' });
} catch (error) {
  printError('未找到 pandoc 命令。请先安装 pandoc。');
  process.exit(1);
}

// 创建目标目录（如果不存在）
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// 支持的文件类型（可根据需要调整）
const supportedTypes = /\.(md|txt|docx|html)$/;

printHeader('开始基于 Git 状态的增量转换');

// 计数器
let addedCount = 0;
let modifiedCount = 0;
let deletedCount = 0;
let failedCount = 0;

// 确保目录存在
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 删除空目录
function removeEmptyDirectories(dirPath, baseDir) {
  if (dirPath === baseDir) return;

  try {
    const files = fs.readdirSync(dirPath);
    if (files.length === 0) {
      fs.rmdirSync(dirPath);
      removeEmptyDirectories(path.dirname(dirPath), baseDir);
    }
  } catch (error) {
    printError(`删除目录时出错: ${error.message}`);
  }
}

// 处理 Git 返回的文件路径，去除引号并正确解码
function normalizeGitPath(gitPath) {
  // 去除路径两端的引号
  let cleanPath = gitPath.trim();
  if ((cleanPath.startsWith('"') && cleanPath.endsWith('"')) || 
      (cleanPath.startsWith("'") && cleanPath.endsWith("'"))) {
    cleanPath = cleanPath.substring(1, cleanPath.length - 1);
  }
  
  // 处理 Git 可能返回的转义字符
  try {
    // 尝试解码可能的 Git 转义
    return cleanPath;
  } catch (error) {
    printWarning(`无法解码路径: ${gitPath}`);
    return cleanPath;
  }
}

// 获取 Git 状态中的文件变化
function getGitChanges() {
  // 获取已跟踪的修改文件（包括未暂存的更改）
  const trackedChanges = execSync('git diff --name-status HEAD', { encoding: 'utf8' }).trim();

  // 获取未暂存的修改文件
  const untrackedChanges = execSync('git diff --name-status', { encoding: 'utf8' }).trim();

  // 获取未跟踪的新文件，使用 -z 选项以 NUL 字符分隔，避免引号和转义问题
  const untrackedFiles = execSync('git ls-files --others --exclude-standard -z', { encoding: 'utf8' }).trim();

  const changes = {
    added: [],
    modified: [],
    deleted: []
  };

  // 处理已跟踪的变化（与最近一次提交相比）
  if (trackedChanges) {
    trackedChanges.split('\n').forEach(line => {
      if (!line) return;

      const parts = line.split(/\s+/);
      const status = parts[0];
      const filePath = normalizeGitPath(parts.slice(1).join(' ')); // 处理文件名中可能包含空格的情况

      // 规范化文件路径
      const normalizedPath = path.resolve(filePath);

      // 检查文件是否在源目录下
      if (!normalizedPath.startsWith(normalizedSrcDir) || !supportedTypes.test(normalizedPath)) return;

      const relativePath = path.relative(normalizedSrcDir, normalizedPath);

      if (status === 'A') {
        changes.added.push(relativePath);
      } else if (status === 'M') {
        changes.modified.push(relativePath);
      } else if (status === 'D') {
        changes.deleted.push(relativePath);
      }
    });
  }

  // 处理未暂存的变化
  if (untrackedChanges) {
    untrackedChanges.split('\n').forEach(line => {
      if (!line) return;

      const parts = line.split(/\s+/);
      const status = parts[0];
      const filePath = normalizeGitPath(parts.slice(1).join(' '));

      // 规范化文件路径
      const normalizedPath = path.resolve(filePath);

      // 检查文件是否在源目录下
      if (!normalizedPath.startsWith(normalizedSrcDir) || !supportedTypes.test(normalizedPath)) return;

      const relativePath = path.relative(normalizedSrcDir, normalizedPath);

      if (status === 'M' && !changes.modified.includes(relativePath) && !changes.added.includes(relativePath)) {
        changes.modified.push(relativePath);
      } else if (status === 'D' && !changes.deleted.includes(relativePath)) {
        changes.deleted.push(relativePath);
      }
    });
  }

  // 处理未跟踪的新文件，使用 NUL 字符分隔
  if (untrackedFiles) {
    // 使用 NUL 字符 (\0) 分割，这样可以正确处理包含特殊字符的文件名
    untrackedFiles.split('\0').forEach(filePath => {
      if (!filePath) return;

      // 规范化文件路径，不需要额外处理引号，因为使用了 -z 选项
      const normalizedPath = path.resolve(filePath);

      // 检查文件是否在源目录下并且是支持的文件类型
      if (!normalizedPath.startsWith(normalizedSrcDir) || !supportedTypes.test(normalizedPath)) return;

      const relativePath = path.relative(normalizedSrcDir, normalizedPath);

      if (!changes.added.includes(relativePath)) {
        changes.added.push(relativePath);
      }
    });
  }

  // 去重
  changes.added = [...new Set(changes.added)];
  changes.modified = [...new Set(changes.modified)];
  changes.deleted = [...new Set(changes.deleted)];

  return changes;
}

// 处理文件转换
function processFile(relPath, action) {
  const srcFile = path.join(normalizedSrcDir, relPath);
  const fileExt = path.extname(relPath);
  const baseName = path.basename(relPath, fileExt);
  const relDir = path.dirname(relPath);
  const outputFile = path.join(destDir, relDir, `${baseName}.${targetFormat}`);

  if (action === 'delete') {
    if (fs.existsSync(outputFile)) {
      printProgress(`正在删除: ${outputFile}`);

      try {
        fs.unlinkSync(outputFile);
        printSuccess(`成功删除: ${outputFile}`);
        deletedCount++;

        // 检查并删除空目录
        removeEmptyDirectories(path.dirname(outputFile), destDir);
        return true;
      } catch (error) {
        printError(`删除失败: ${outputFile}，错误: ${error.message}`);
        failedCount++;
        return false;
      }
    }
    return true;
  } else {
    // 检查源文件是否存在
    if (!fs.existsSync(srcFile)) {
      printError(`源文件不存在: ${srcFile}`);
      failedCount++;
      return false;
    }

    // 创建目标文件的父目录
    ensureDirectoryExists(path.dirname(outputFile));

    printProgress(`正在${action === 'add' ? '添加' : '更新'}: ${srcFile} -> ${outputFile}`);

    try {
      // 使用 pandoc 进行格式转换
      execSync(`pandoc "${srcFile}" -o "${outputFile}"`, { stdio: 'pipe' });

      printSuccess(`成功${action === 'add' ? '添加' : '更新'}: ${srcFile} -> ${outputFile}`);
      if (action === 'add') {
        addedCount++;
      } else {
        modifiedCount++;
      }
      return true;
    } catch (error) {
      printError(`转换失败: ${srcFile}，错误: ${error.message}`);
      failedCount++;
      return false;
    }
  }
}

// 主要处理逻辑
function main() {
  try {
    // 获取 Git 变更状态
    const changes = getGitChanges();

    printInfo(`发现 ${changes.added.length} 个新增文件`);
    printInfo(`发现 ${changes.modified.length} 个修改文件`);
    printInfo(`发现 ${changes.deleted.length} 个删除文件`);

    // 处理新增文件
    if (changes.added.length > 0) {
      printHeader('处理新增文件');
      for (const relPath of changes.added) {
        processFile(relPath, 'add');
      }
    }

    // 处理修改文件
    if (changes.modified.length > 0) {
      printHeader('处理修改文件');
      for (const relPath of changes.modified) {
        processFile(relPath, 'modify');
      }
    }

    // 处理删除文件
    if (changes.deleted.length > 0) {
      printHeader('处理删除文件');
      for (const relPath of changes.deleted) {
        processFile(relPath, 'delete');
      }
    }

    // 显示统计信息
    printHeader('转换完成统计');
    console.log(`${colors.green}${colors.bold}新增文件:${colors.reset} ${addedCount}`);
    console.log(`${colors.cyan}${colors.bold}更新文件:${colors.reset} ${modifiedCount}`);
    console.log(`${colors.yellow}${colors.bold}删除文件:${colors.reset} ${deletedCount}`);

    if (failedCount > 0) {
      console.log(`${colors.red}${colors.bold}失败:${colors.reset} ${failedCount}`);
    } else {
      console.log(`${colors.bold}失败:${colors.reset} ${failedCount}`);
    }

    printHeader('转换任务完成');
  } catch (error) {
    printError(`执行过程中出错: ${error.message}`);
    process.exit(1);
  }
}

// 执行主函数
main();