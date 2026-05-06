# Rust 包管理指南：Cargo 核心使用详解

## 1. Package（包）的概念
在 Rust 生态中：
- **Package** 是包含一个或多个 **crate**（库/可执行程序）的集合
- 每个包必须包含主 crate（`lib.rs` 或 `main.rs`）
- 包的核心元数据存储在 `Cargo.toml` 文件中

## 2. 创建新包
```bash
# 创建二进制项目
cargo new my_project

# 创建库项目
cargo new my_library --lib
```

典型目录结构：
```
my_project/
├── Cargo.toml
└── src/
    └── main.rs
```

## 3. Cargo.toml 配置文件解析
### 基础配置
```toml
[package]
name = "my_project"
version = "0.1.0"
edition = "2021"
authors = ["Your Name"]
description = "A Rust project"
license = "MIT"
```

### 依赖管理
```toml
[dependencies]
# 指定版本
serde = "1.0"
# Git 仓库依赖
my_crate = { git = "https://github.com/owner/repo.git" }
# 本地路径依赖
my_crate = { path = "../my_local_crate" }
```

## 4. 依赖操作命令
```bash
# 添加最新版本依赖
cargo add serde

# 添加指定版本
cargo add serde@1.0.156

# 查看依赖树
cargo tree

# 更新依赖
cargo update
```

## 5. 构建与运行
```bash
# 调试构建
cargo build

# 发布构建
cargo build --release

# 快速检查
cargo check

# 运行项目
cargo run
```

## 6. 版本管理策略
- **语义化版本控制**（SemVer）：
  - `^1.0.0`：匹配 `>=1.0.0, <2.0.0`
  - `~1.0.0`：匹配 `>=1.0.0, <1.1.0`
  - `1.0`：匹配 `1.0.x`

## 7. 发布到 Crates.io
1. 注册并登录：
```bash
cargo login
```

2. 检查发布状态：
```bash
cargo publish --dry-run
```

3. 正式发布：
```bash
cargo publish
```

## 8. 工作区管理（Workspace）
```toml
# 根目录 Cargo.toml
[workspace]
members = ["crate1", "crate2"]
```

目录结构：
```
my_workspace/
├── Cargo.toml
├── crate1/
│   ├── Cargo.toml
│   └── src/
└── crate2/
    ├── Cargo.toml
    └── src/
```

## 9. 常用 Cargo 命令速查表
| 命令 | 功能 |
|------|------|
| `cargo test` | 运行测试 |
| `cargo clean` | 清理构建产物 |
| `cargo doc` | 生成文档 |
| `cargo fmt` | 代码格式化 |
| `cargo clippy` | 代码静态检查 |

## 10. 最佳实践建议
1. 使用 `cargo check` 快速验证语法
2. 优先选择语义化版本声明
3. 复杂项目推荐使用工作区管理
4. 发布前务必进行 `--dry-run` 检查
5. 定期使用 `cargo update` 保持依赖更新

> 通过合理利用 Cargo 的包管理能力，可以显著提升 Rust 项目的开发效率和维护质量。掌握这些核心功能是成为 Rust 开发者的重要基础。