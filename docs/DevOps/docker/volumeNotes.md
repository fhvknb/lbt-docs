---
tag:
  - docker
---

# Docker中的Volumes详解

Volumes（卷）是 Docker Compose 中非常重要的概念，用于持久化数据和在容器间共享数据。下面是 Docker Compose 中 volumes 配置的详细说明和示例。

## Volumes 基本语法

在 `docker-compose.yml` 文件中，volumes 可以在两个级别定义：

1. **顶级 volumes**：定义可被多个服务使用的命名卷
2. **服务级 volumes**：定义特定服务的挂载点

## 顶级 Volumes 配置

```yaml
version: "3.9"

volumes:
  my_data:          # 使用默认驱动和选项的命名卷
  db_data:
    driver: local   # 指定卷驱动
    driver_opts:    # 驱动特定选项
      type: none
      device: /path/on/host
      o: bind
  cached_data:
    external: true  # 使用外部已创建的卷
  backup_data:
    name: "backup-$(date +%Y%m%d)" # 动态命名（在创建时展开）
```

## 服务级 Volumes 配置

在服务定义中使用 volumes 有多种语法：

### 短语法

```yaml
services:
  web:
    image: nginx
    volumes:
      - my_data:/usr/share/nginx/html           # 命名卷
      - ./config:/etc/nginx/conf.d              # 绑定挂载（相对路径）
      - /var/log/nginx:/var/log/nginx           # 绑定挂载（绝对路径）
      - /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro  # 只读挂载
      - cache:/tmp/cache                        # 命名卷
      - /tmp                                    # 匿名卷
```

### 长语法

```yaml
services:
  web:
    image: nginx
    volumes:
      - type: volume
        source: my_data
        target: /usr/share/nginx/html
        volume:
          nocopy: true  # 不从容器复制数据到卷
      - type: bind
        source: ./config
        target: /etc/nginx/conf.d
      - type: tmpfs
        target: /tmp
        tmpfs:
          size: 100M    # 限制 tmpfs 大小
      - type: bind
        source: ./nginx.conf
        target: /etc/nginx/nginx.conf
        read_only: true # 只读模式
```

## 完整示例

下面是一个包含多种卷配置的完整 Docker Compose 示例：

```yaml
version: "3.9"

services:
  web:
    image: nginx:alpine
    volumes:
      - web_data:/usr/share/nginx/html
      - ./nginx/conf.d:/etc/nginx/conf.d
      - ./logs:/var/log/nginx
    ports:
      - "80:80"

  db:
    image: postgres:13
    volumes:
      - db_data:/var/lib/postgresql/data
      - ./db/init:/docker-entrypoint-initdb.d
    environment:
      POSTGRES_PASSWORD: example
      POSTGRES_USER: user
      POSTGRES_DB: mydb

  redis:
    image: redis:6
    volumes:
      - redis_data:/data
      - type: tmpfs
        target: /tmp
        tmpfs:
          size: 50M

volumes:
  web_data:
    driver: local
  db_data:
    driver: local
    driver_opts:
      type: none
      device: ${DB_DATA_PATH:-/var/lib/docker-data/postgres}
      o: bind
  redis_data:
    # 使用默认配置
```

## 卷类型详解

### 1. 命名卷 (Named Volumes)

- 由 Docker 管理的持久化存储
- 数据在容器删除后仍然保留
- 适合数据库、应用数据等需要持久化的数据

```yaml
volumes:
  - my_volume:/path/in/container
```

### 2. 绑定挂载 (Bind Mounts)

- 将主机上的文件或目录挂载到容器中
- 适合配置文件、源代码等需要从主机访问的文件

```yaml
volumes:
  - /host/path:/container/path
  - ./relative/path:/container/path
```

### 3. 临时文件系统 (tmpfs)

- 仅存储在主机内存中的临时文件系统
- 容器停止后数据丢失
- 适合敏感数据或临时数据

```yaml
volumes:
  - type: tmpfs
    target: /container/path
```

## 常用选项

- **read_only**: 将卷挂载为只读
- **nocopy**: 创建卷时不从容器复制数据
- **consistency**: 设置卷的一致性级别（delegated, cached, consistent）
- **volume.nocopy**: 防止从容器复制数据到卷
- **bind.propagation**: 设置绑定传播模式（rprivate, private, rshared, shared, rslave, slave）

## 实用技巧

1. **使用环境变量**：
   ```yaml
   volumes:
     - ${DATA_DIR:-./data}:/app/data
   ```

2. **用户权限映射**：
   ```yaml
   volumes:
     - type: bind
       source: ./data
       target: /app/data
       user: "1000:1000"  # 指定 UID:GID
   ```

3. **卷标签**：
   ```yaml
   volumes:
     db_data:
       labels:
         com.example.project: "my-project"
         com.example.environment: "production"
   ```

4. **备份卷**：
   ```yaml
   services:
     backup:
       image: alpine
       volumes:
         - db_data:/data:ro
         - ./backups:/backups
       command: tar czf /backups/backup-$(date +%Y%m%d).tar.gz /data
   ```
