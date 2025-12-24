---
tag:
  - github
  - ci/cd
---

# GitHub CI 配置编写指南

GitHub Actions 是 GitHub 提供的持续集成和持续部署 (CI/CD) 服务，通过编写工作流配置文件 (.github/workflows/*.yml) 来自动化软件开发流程。本指南将详细介绍如何编写 GitHub Actions 的工作流配置文件。

## 基本概念

GitHub Actions 工作流是一个可配置的自动化过程，由 YAML 格式的配置文件定义。这些文件必须保存在仓库的 `.github/workflows` 目录中，扩展名为 `.yml` 或 `.yaml`。一个仓库可以包含多个工作流文件，每个文件定义不同的自动化流程。[3] [4]

工作流可以在仓库中的事件触发时运行，也可以手动触发或按照预定的时间表运行。每个工作流由一个或多个作业组成，作业可以并行或顺序执行。[4]

## 工作流文件结构

一个典型的 GitHub Actions 工作流文件结构如下：

```yaml
name: CI Workflow

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm ci
      - name: Run tests
        run: npm test
```

这个简单的工作流在推送到 main 分支或创建针对 main 分支的 pull request 时触发，在 Ubuntu 最新版本上运行一系列步骤，包括检出代码、设置 Node.js 环境、安装依赖和运行测试。[1] [2]

## 工作流组件详解

### 1. name（工作流名称）

可选字段，用于在 GitHub 仓库的 Actions 页面上显示工作流的名称：

```yaml
name: Build and Test
```

如果省略此字段，GitHub 将使用工作流文件的相对路径作为名称。[1]

### 2. on（触发器）

指定触发工作流的事件：

```yaml
# 简单配置
on: push

# 多个事件触发
on: [push, pull_request]

# 详细配置
on:
  # 推送到特定分支时触发
  push:
    branches: [ main, develop ]
    paths-ignore: [ 'docs/**', '**.md' ]
  
  # 创建 PR 时触发
  pull_request:
    branches: [ main ]
    
  # 手动触发
  workflow_dispatch:
    inputs:
      environment:
        description: '部署环境'
        required: true
        default: 'staging'
        
  # 定时触发
  schedule:
    - cron: '0 0 * * *'  # 每天午夜运行
```

GitHub Actions 支持多种触发事件类型，包括代码推送、pull request、定时任务、手动触发等。[1] [4]

### 3. jobs（作业）

工作流由一个或多个作业组成，默认情况下作业并行运行：

```yaml
jobs:
  build:
    name: Build Application
    runs-on: ubuntu-latest
    steps:
      # 构建步骤...
      
  test:
    name: Run Tests
    runs-on: windows-latest
    steps:
      # 测试步骤...
```

每个作业必须有一个 ID（如上例中的 `build` 和 `test`），并且可以包含以下属性：

- `name`：作业的显示名称
- `runs-on`：运行作业的环境（如 ubuntu-latest, windows-latest, macos-latest）
- `needs`：指定依赖的其他作业，用于创建顺序执行的作业
- `if`：条件表达式，决定是否执行此作业
- `steps`：定义作业中的步骤序列
- `strategy`：定义构建矩阵，用于在多种配置下运行作业
- `environment`：指定部署环境

[1] [3]

### 4. steps（步骤）

步骤是作业中执行的任务序列，可以运行命令、设置环境、使用 Actions 等：

```yaml
steps:
  # 检出代码
  - name: Checkout code
    uses: actions/checkout@v3
    
  # 设置 Java 环境
  - name: Set up JDK 17
    uses: actions/setup-java@v3
    with:
      java-version: '17'
      distribution: 'temurin'
      
  # 运行命令
  - name: Build with Maven
    run: mvn -B package --file pom.xml
    
  # 使用环境变量
  - name: Deploy to staging
    run: ./deploy.sh
    env:
      SERVER_URL: ${{ secrets.STAGING_URL }}
      API_TOKEN: ${{ secrets.API_TOKEN }}
```

每个步骤可以包含以下主要属性：

- `name`：步骤的显示名称
- `uses`：指定要使用的 Action
- `run`：运行的命令行命令
- `with`：Action 的输入参数
- `env`：设置步骤的环境变量
- `if`：条件表达式，决定是否执行此步骤
- `continue-on-error`：指定步骤失败时是否继续执行后续步骤

[1] [3]

### 5. strategy（策略）

使用策略可以创建构建矩阵，在多种配置下运行同一作业：

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [14.x, 16.x, 18.x]
        include:
          - os: ubuntu-latest
            node-version: 18.x
            npm-cache: true
        exclude:
          - os: windows-latest
            node-version: 14.x
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm ci
      - run: npm test
```

上面的配置会创建一个 3×3 的矩阵，在三种操作系统上分别测试三个 Node.js 版本，同时添加了一个特殊配置并排除了一个组合。[1]

### 6. 环境与密钥

GitHub Actions 可以使用仓库中设置的密钥和变量：

```yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: ./deploy.sh
        env:
          API_TOKEN: ${{ secrets.API_TOKEN }}
          CONFIG_FILE: ${{ vars.CONFIG_FILE }}
```

使用 `secrets` 上下文访问密钥，使用 `vars` 上下文访问变量。通过指定 `environment`，可以使用特定环境的密钥和变量。[1] [4]

## 高级特性

### 1. 作业依赖和条件执行

使用 `needs` 和 `if` 可以创建复杂的工作流：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Building..."
      
  test:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Testing..."
      
  deploy:
    needs: [build, test]
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploying..."
```

上例中，`test` 作业会在 `build` 作业成功后运行，而 `deploy` 作业需要 `build` 和 `test` 都成功，并且只在推送到 main 分支时执行。[1] [3]

### 2. 复用工作流

可以使用 `workflow_call` 事件创建可复用的工作流：

```yaml
# 可复用工作流：.github/workflows/reusable.yml
name: Reusable Workflow

on:
  workflow_call:
    inputs:
      environment:
        required: true
        type: string
    secrets:
      api-token:
        required: true

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment: ${{ inputs.environment }}
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        run: ./deploy.sh
        env:
          API_TOKEN: ${{ secrets.api-token }}
```

然后在其他工作流中调用：

```yaml
# 调用工作流：.github/workflows/main.yml
name: Main Workflow

on:
  push:
    branches: [ main ]

jobs:
  call-workflow:
    uses: ./.github/workflows/reusable.yml
    with:
      environment: production
    secrets:
      api-token: ${{ secrets.API_TOKEN }}
```

这种方式可以避免重复编写相同的工作流逻辑。[1] [4]

### 3. 工作流中的上下文和表达式

GitHub Actions 提供了丰富的上下文和表达式系统：

```yaml
jobs:
  example:
    runs-on: ubuntu-latest
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
        
      - name: Conditional step
        if: ${{ github.event_name == 'pull_request' && github.event.action == 'opened' }}
        run: echo "This is a new pull request"
        
      - name: Use expressions
        run: echo "Repository has ${{ github.event.repository.stargazers_count }} stars"
```

常用的上下文包括：
- `github`：GitHub 相关信息
- `env`：环境变量
- `job`：当前作业信息
- `steps`：当前作业的步骤信息
- `runner`：运行器信息
- `secrets`：密钥
- `vars`：变量

[1] [3]

### 4. 缓存依赖

使用缓存可以加速工作流执行：

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Cache Node modules
        uses: actions/cache@v3
        with:
          path: ~/.npm
          key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
          restore-keys: |
            ${{ runner.os }}-node-
            
      - name: Install dependencies
        run: npm ci
```

这将缓存 npm 依赖，显著减少后续工作流运行的安装时间。[1] [2]

### 5. 构建矩阵与并行执行

构建矩阵允许在多种配置下并行测试：

```yaml
jobs:
  test:
    runs-on: ${{ matrix.os }}
    strategy:
      fail-fast: false
      max-parallel: 4
      matrix:
        os: [ubuntu-latest, windows-latest]
        python-version: [3.8, 3.9, 3.10]
        exclude:
          - os: windows-latest
            python-version: 3.10
    steps:
      - uses: actions/checkout@v3
      - name: Set up Python ${{ matrix.python-version }}
        uses: actions/setup-python@v4
        with:
          python-version: ${{ matrix.python-version }}
      - name: Run tests
        run: pytest
```

`fail-fast: false` 确保一个配置失败不会立即停止其他配置的执行，`max-parallel` 限制并行执行的作业数量。[1] [3]

## 完整示例

以下是一个综合性的 GitHub Actions 工作流示例，包含构建、测试和部署阶段：

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]
  workflow_dispatch:
    inputs:
      deploy_environment:
        description: '部署环境'
        required: true
        default: 'staging'
        type: choice
        options:
          - staging
          - production

env:
  NODE_VERSION: '16'

jobs:
  lint:
    name: 代码检查
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - name: 安装依赖
        run: npm ci
      - name: 运行 ESLint
        run: npm run lint

  test:
    name: 单元测试
    needs: lint
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest]
        node-version: [14, 16, 18]
        exclude:
          - os: windows-latest
            node-version: 14
    steps:
      - uses: actions/checkout@v3
      - name: 使用 Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: 'npm'
      - name: 安装依赖
        run: npm ci
      - name: 运行测试
        run: npm test
      - name: 上传测试覆盖率
        if: matrix.os == 'ubuntu-latest' && matrix.node-version == 16
        uses: actions/upload-artifact@v3
        with:
          name: coverage-report
          path: coverage/

  build:
    name: 构建应用
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'
      - name: 安装依赖
        run: npm ci
      - name: 构建
        run: npm run build
      - name: 上传构建产物
        uses: actions/upload-artifact@v3
        with:
          name: build-files
          path: dist/
          retention-days: 7

  deploy-staging:
    name: 部署到测试环境
    if: github.event_name == 'push' && github.ref == 'refs/heads/develop' || (github.event_name == 'workflow_dispatch' && github.event.inputs.deploy_environment == 'staging')
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: staging
      url: https://staging.example.com
    steps:
      - uses: actions/checkout@v3
      - name: 下载构建产物
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: dist
      - name: 部署到测试服务器
        run: |
          echo "Deploying to staging..."
          ./deploy.sh staging
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
          SERVER_URL: ${{ vars.STAGING_SERVER }}

  deploy-production:
    name: 部署到生产环境
    if: github.event_name == 'push' && github.ref == 'refs/heads/main' || (github.event_name == 'workflow_dispatch' && github.event.inputs.deploy_environment == 'production')
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: production
      url: https://example.com
    steps:
      - uses: actions/checkout@v3
      - name: 下载构建产物
        uses: actions/download-artifact@v3
        with:
          name: build-files
          path: dist
      - name: 部署到生产服务器
        run: |
          echo "Deploying to production..."
          ./deploy.sh production
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
          SERVER_URL: ${{ vars.PRODUCTION_SERVER }}
```

这个工作流包含代码检查、多环境测试、构建和根据不同条件部署到测试或生产环境。[1] [2] [3] [4]

## 最佳实践

1. **保持工作流文件简洁**：将复杂逻辑移至脚本文件，保持工作流配置清晰可读。[3]

2. **使用可复用工作流**：对于常见任务，创建可复用的工作流以避免重复代码。[1]

3. **合理使用缓存**：缓存依赖项可以显著提高构建速度，特别是对于大型项目。[2]

4. **设置超时限制**：为作业设置合理的超时时间，避免异常情况下长时间占用资源。[1]

5. **使用环境保护规则**：为生产环境配置审批流程，确保部署安全。[4]

6. **密钥管理**：敏感信息应使用 GitHub 的密钥功能存储，而非直接写入工作流文件。[3]

7. **使用官方 Actions**：优先使用 GitHub 官方维护的 Actions，它们通常更安全、更可靠。[2]

8. **限制权限**：使用 `permissions` 字段限制工作流的权限，遵循最小权限原则。[1]

通过遵循这些最佳实践，可以创建高效、安全、可维护的 GitHub Actions 工作流。[4]

## 参考资料

[1]: https://docs.github.com/zh/actions/writing-workflows/workflow-syntax-for-github-actions
[2]: https://docs.github.com/zh/actions/writing-workflows/quickstart
[3]: https://blog.csdn.net/i89211/article/details/144881603
[4]: https://docs.github.com/zh/actions/writing-workflows/about-workflows