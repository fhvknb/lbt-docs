---
tag:
  - github
  - ci/cd
---

# Gitlab CI工作流配置指南

`.gitlab-ci.yml` 是 GitLab CI/CD 的核心配置文件，用于定义持续集成和持续部署的自动化流程。本文将详细介绍该文件的配置方法和关键概念。

## 基本概念

`.gitlab-ci.yml` 是一个 YAML 格式的文件，必须放在项目仓库的根目录下。它定义了 CI/CD 流水线中的各个作业（jobs）及其执行方式。[3]

GitLab 从 7.12 版本开始使用这种方式管理 CI/CD 配置，当 GitLab 检测到仓库中存在该文件时，会使用 GitLab Runner 按照配置执行相应的任务。[4]

## 基本结构

一个典型的 `.gitlab-ci.yml` 文件结构如下：

```yaml
# 定义全局变量
variables:
  VARIABLE_NAME: "value"

# 定义流水线阶段
stages:
  - build
  - test
  - deploy

# 定义作业
job_name:
  stage: build
  script:
    - echo "Building the app"
    - npm install
    - npm run build
```

默认情况下，流水线包含 `build`、`test` 和 `deploy` 三个阶段，未被使用的阶段会被自动忽略。[2]

## 关键组件详解

### 1. stages（阶段）

`stages` 定义了流水线中的各个阶段，这些阶段将按照定义的顺序依次执行：

```yaml
stages:
  - build      # 第一阶段：构建
  - test       # 第二阶段：测试
  - deploy     # 第三阶段：部署
  - cleanup    # 第四阶段：清理
```

同一阶段的作业会并行执行，只有当前阶段的所有作业都成功完成后，才会进入下一个阶段。[1]

### 2. jobs（作业）

作业是 CI/CD 流水线中的基本单元，定义了具体的任务：

```yaml
build_job:      # 作业名称
  stage: build  # 所属阶段
  script:       # 执行的脚本命令
    - echo "Building the application..."
    - make build
  tags:         # 指定运行器标签
    - docker
  only:         # 触发条件
    - main
  artifacts:    # 构建产物
    paths:
      - build/
    expire_in: 1 week
```

每个作业必须包含 `script` 部分，定义要执行的命令。[2]

### 3. script（脚本）

`script` 是作业中最关键的部分，定义了要执行的 shell 命令：

```yaml
test_job:
  script:
    - echo "Running tests..."
    - npm test
    - ./run_integration_tests.sh
```

这些命令会在 GitLab Runner 中按顺序执行，任何命令返回非零退出码都会导致作业失败。[1]

### 4. before_script 和 after_script

这两个指令分别在作业的主脚本之前和之后执行：

```yaml
default:
  before_script:
    - echo "This runs before all jobs"

job:
  before_script:
    - echo "This overrides the default"
  script:
    - echo "Main script"
  after_script:
    - echo "This runs after the job"
```

`before_script` 可以用于准备环境，`after_script` 则常用于清理工作。[4]

### 5. variables（变量）

变量可以在全局或作业级别定义，用于存储配置信息：

```yaml
variables:
  GLOBAL_VAR: "global value"

job:
  variables:
    JOB_VAR: "job specific value"
  script:
    - echo $GLOBAL_VAR
    - echo $JOB_VAR
```

GitLab 还提供了许多预定义变量，如 `CI_COMMIT_SHA`、`CI_JOB_ID` 等。[2]

### 6. only/except 和 rules（触发条件）

这些指令控制何时触发作业：

```yaml
# 旧语法
job:
  only:
    - main
    - /^release-.*$/
  except:
    - develop

# 新语法（更灵活）
job:
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
      when: always
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
      when: manual
    - when: never
```

`rules` 是更新的语法，提供了更复杂的条件控制能力。[1]

### 7. artifacts（构建产物）

`artifacts` 用于指定要保存的文件或目录：

```yaml
build:
  script:
    - npm run build
  artifacts:
    paths:
      - dist/
      - build/*.zip
    expire_in: 1 week
    reports:
      junit: test-results.xml
```

构建产物可以在后续作业中使用，也可以从 GitLab 界面下载。[3]

### 8. dependencies（依赖）

指定作业依赖的其他作业，以获取其构建产物：

```yaml
test:
  stage: test
  dependencies:
    - build
  script:
    - test -f dist/app.js
```

默认情况下，作业会自动获取所有之前阶段的构建产物。[2]

### 9. cache（缓存）

缓存用于在作业之间共享文件，以加速构建：

```yaml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/
    - .npm/
```

与构建产物不同，缓存可以在不同的流水线之间共享。[4]

### 10. image 和 services（容器配置）

当使用 Docker 执行器时，可以指定容器镜像和服务：

```yaml
job:
  image: node:14
  services:
    - postgres:13
    - redis:alpine
  script:
    - npm test
```

`image` 指定运行作业的容器，`services` 指定辅助服务容器。[1]

## 高级配置

### 1. include（包含外部文件）

可以引入其他 YAML 文件，实现配置复用：

```yaml
include:
  - local: '/templates/build.yml'
  - project: 'group/project'
    file: '/templates/test.yml'
  - template: 'Jobs/Deploy.gitlab-ci.yml'
```

支持本地文件、远程项目文件和模板文件三种引入方式。[3]

### 2. extends（继承）

允许作业继承其他作业的配置：

```yaml
.base_job:
  script:
    - echo "Base script"
  tags:
    - docker

job1:
  extends: .base_job
  script:
    - echo "Overridden script"
    - echo "Additional command"
```

以点开头的作业名称（如 `.base_job`）被视为模板，不会直接执行。[2]

### 3. workflow（工作流）

控制整个流水线的行为：

```yaml
workflow:
  rules:
    - if: $CI_COMMIT_BRANCH == "main"
    - if: $CI_PIPELINE_SOURCE == "merge_request_event"
    - if: $CI_COMMIT_TAG
```

这可以用来控制何时触发流水线，避免不必要的执行。[4]

### 4. needs（需求）

指定作业的直接依赖，可以打破阶段顺序限制：

```yaml
stages:
  - build
  - test
  - deploy

build:
  stage: build
  script: echo "Building"

test1:
  stage: test
  needs: [build]
  script: echo "Testing 1"

test2:
  stage: test
  script: echo "Testing 2"

deploy:
  stage: deploy
  needs: [test1, test2]
  script: echo "Deploying"
```

使用 `needs` 可以创建更复杂的依赖关系图。[1]

## 完整示例

下面是一个综合性的 `.gitlab-ci.yml` 示例，涵盖了多种常见配置：

```yaml
# 定义流水线阶段
stages:
  - build
  - test
  - deploy
  - cleanup

# 全局变量
variables:
  NODE_ENV: "production"
  DOCKER_HOST: tcp://docker:2375

# 全局默认配置
default:
  image: node:16
  before_script:
    - echo "Started job at $(date)"
  after_script:
    - echo "Finished job at $(date)"

# 缓存配置
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - node_modules/

# 构建作业
build_app:
  stage: build
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 week

# 测试作业
unit_tests:
  stage: test
  script:
    - npm run test:unit
  coverage: '/Coverage: (\d+\.\d+)%/'

integration_tests:
  stage: test
  services:
    - name: postgres:13
      alias: db
  variables:
    DATABASE_URL: "postgres://postgres:postgres@db:5432/test_db"
  script:
    - npm run test:integration

# 部署作业
deploy_staging:
  stage: deploy
  image: alpine:latest
  before_script:
    - apk add --no-cache openssh-client
    - eval $(ssh-agent -s)
    - echo "$SSH_PRIVATE_KEY" | tr -d '\r' | ssh-add -
  script:
    - ssh user@staging-server "cd /app && ./deploy.sh"
  environment:
    name: staging
  only:
    - develop

deploy_production:
  stage: deploy
  script:
    - echo "Deploying to production..."
    - ./deploy_to_production.sh
  environment:
    name: production
  when: manual
  only:
    - main

# 清理作业
cleanup:
  stage: cleanup
  script:
    - echo "Cleaning up temporary files..."
    - rm -rf tmp/
  when: always
```

这个示例展示了多阶段流水线、环境变量、缓存、构建产物、服务容器、环境配置等多种功能的使用。[3] [4]

## 最佳实践

1. **保持简洁**：将复杂逻辑移至脚本文件，保持 `.gitlab-ci.yml` 清晰可读。[1]

2. **使用模板和继承**：利用 `include` 和 `extends` 实现配置复用，避免重复代码。[2]

3. **合理使用缓存**：正确配置缓存可以显著提高构建速度，特别是对于依赖安装。[3]

4. **设置超时限制**：为作业设置合理的超时时间，避免异常情况下长时间占用资源。[4]

5. **使用规则而非条件**：优先使用 `rules` 而非 `only/except`，前者提供更灵活的控制。[1]

6. **环境变量安全**：敏感信息应使用 GitLab 的受保护变量功能，而非直接写入配置文件。[2]

通过合理配置 `.gitlab-ci.yml`，可以构建高效、可靠的 CI/CD 流水线，实现开发流程的自动化。[3]

## 参考资料

[1]: https://ssoor.github.io/2020/03/25/gitlab-ci-config-file/
[2]: https://meigit.readthedocs.io/en/latest/gitlab_ci_.gitlab-ci.yml_detail.html
[3]: https://www.cnblogs.com/hnzhengfy/p/18827391/gitlab_ci_config
[4]: https://blog.csdn.net/a460550542/article/details/127717445