#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');
const util = require('util');

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
printHeader('Pandoc 批量文件转换工具 (增量更新版)');

// 获取命令行参数
const args = process.argv.slice(2);
let srcDir = args[0] || '';
const destDir = args[1] || '';
const targetFormat = args[2] || '';

// 移除末尾斜杠以规范化路径
if (srcDir.endsWith('/') || srcDir.endsWith('\\')) {
  srcDir = srcDir.slice(0, -1);
}

// 检查参数是否正确
if (!srcDir || !destDir || !targetFormat) {
  printError('参数不足');
  console.log(`${colors.bold}用法:${colors.reset} node ${path.basename(__filename)} <源目录> <目标目录> <目标格式>`);
  console.log(`${colors.bold}示例:${colors.reset} node ${path.basename(__filename)} ./source ./output pdf`);
  process.exit(1);
}

printInfo(`源目录: ${srcDir}`);
printInfo(`目标目录: ${destDir}`);
printInfo(`目标格式: ${targetFormat}`);

// 检查源目录是否存在
if (!fs.existsSync(srcDir) || !fs.statSync(srcDir).isDirectory()) {
  printError(`源目录 ${srcDir} 不存在！`);
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

// 状态目录和文件
const statusDir = path.join(destDir, '.pandoc_status');
if (!fs.existsSync(statusDir)) {
  fs.mkdirSync(statusDir, { recursive: true });
}
const manifestFile = path.join(statusDir, 'manifest.txt');

printHeader('开始增量转换文件');

// 计数器
let totalFiles = 0;
let successCount = 0;
let failedCount = 0;
let skippedCount = 0;
let deletedCount = 0;

// 计算文件的MD5哈希值
function calculateMD5(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('md5');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

// 获取所有支持的文件及其哈希值
function getAllFiles(directory, baseDir) {
  const files = new Map();
  
  function processDirectory(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        processDirectory(fullPath);
      } else if (entry.isFile() && supportedTypes.test(entry.name)) {
        const relPath = path.relative(baseDir, fullPath);
        const hash = calculateMD5(fullPath);
        files.set(relPath, hash);
      }
    }
  }
  
  processDirectory(directory);
  return files;
}

// 读取清单文件
function readManifest(filePath) {
  const manifest = new Map();
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    
    for (const line of lines) {
      if (line.trim()) {
        const [relPath, hash] = line.split('|');
        manifest.set(relPath, hash);
      }
    }
  }
  return manifest;
}

// 写入清单文件
function writeManifest(filePath, manifest) {
  const content = Array.from(manifest.entries())
    .map(([relPath, hash]) => `${relPath}|${hash}`)
    .join('\n');
  fs.writeFileSync(filePath, content);
}

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

// 主要处理逻辑
async function main() {
  // 获取当前文件列表和哈希值
  const currentFiles = getAllFiles(srcDir, srcDir);
  totalFiles = currentFiles.size;
  printInfo(`找到 ${totalFiles} 个文件`);
  
  // 读取旧的清单文件
  const oldManifest = readManifest(manifestFile);
  
  // 创建新的清单（初始复制旧的清单）
  const newManifest = new Map(oldManifest);
  
  // 确定需要处理的文件和需要删除的文件
  const filesToProcess = [];
  const filesToDelete = [];
  
  // 找出新增或修改的文件
  for (const [relPath, hash] of currentFiles.entries()) {
    const oldHash = oldManifest.get(relPath);
    if (!oldHash || oldHash !== hash) {
      filesToProcess.push(relPath);
    }
  }
  
  // 找出已删除的文件
  for (const [relPath] of oldManifest.entries()) {
    if (!currentFiles.has(relPath)) {
      filesToDelete.push(relPath);
      newManifest.delete(relPath);
    }
  }
  
  printInfo(`需要转换 ${filesToProcess.length} 个文件`);
  printInfo(`需要删除 ${filesToDelete.length} 个文件`);
  
  // 处理需要转换的文件
  if (filesToProcess.length > 0) {
    for (const relPath of filesToProcess) {
      const srcFile = path.join(srcDir, relPath);
      const fileExt = path.extname(relPath);
      const baseName = path.basename(relPath, fileExt);
      const relDir = path.dirname(relPath);
      const outputFile = path.join(destDir, relDir, `${baseName}.${targetFormat}`);
      
      // 创建目标文件的父目录
      ensureDirectoryExists(path.dirname(outputFile));
      
      printProgress(`正在转换: ${srcFile} -> ${outputFile}`);
      
      try {
        // 使用 pandoc 进行格式转换
        execSync(`pandoc "${srcFile}" --reference-links -o "${outputFile}"`, { stdio: 'pipe' });
        
        printSuccess(`成功转换: ${srcFile} -> ${outputFile}`);
        successCount++;
        
        // 更新清单
        newManifest.set(relPath, currentFiles.get(relPath));
      } catch (error) {
        printError(`转换失败: ${srcFile}，错误: ${error.message}`);
        failedCount++;
        
        // 从清单中删除失败的文件记录
        newManifest.delete(relPath);
      }
    }
  } else {
    printInfo('没有文件需要转换');
  }
  
  // 处理需要删除的文件
  if (filesToDelete.length > 0) {
    for (const relPath of filesToDelete) {
      const fileExt = path.extname(relPath);
      const baseName = path.basename(relPath, fileExt);
      const relDir = path.dirname(relPath);
      const outputFile = path.join(destDir, relDir, `${baseName}.${targetFormat}`);
      
      if (fs.existsSync(outputFile)) {
        printProgress(`正在删除: ${outputFile}`);
        
        try {
          fs.unlinkSync(outputFile);
          printSuccess(`成功删除: ${outputFile}`);
          deletedCount++;
          
          // 检查并删除空目录
          removeEmptyDirectories(path.dirname(outputFile), destDir);
        } catch (error) {
          printError(`删除失败: ${outputFile}，错误: ${error.message}`);
        }
      }
    }
  } else {
    printInfo('没有文件需要删除');
  }
  
  // 更新清单文件
  writeManifest(manifestFile, newManifest);
  
  // 计算跳过的文件数
  skippedCount = totalFiles - successCount - failedCount;
  
  // 显示统计信息
  printHeader('转换完成统计');
  console.log(`${colors.bold}总文件数:${colors.reset} ${totalFiles}`);
  console.log(`${colors.green}${colors.bold}成功转换:${colors.reset} ${successCount}`);
  console.log(`${colors.cyan}${colors.bold}无需转换:${colors.reset} ${skippedCount}`);
  
  if (deletedCount > 0) {
    console.log(`${colors.yellow}${colors.bold}已删除:${colors.reset} ${deletedCount}`);
  }
  
  if (failedCount > 0) {
    console.log(`${colors.red}${colors.bold}失败:${colors.reset} ${failedCount}`);
  } else {
    console.log(`${colors.bold}失败:${colors.reset} ${failedCount}`);
  }
  
  printHeader('转换任务完成');
}

// 执行主函数
main().catch(error => {
  printError(`执行过程中出错: ${error.message}`);
  process.exit(1);
});