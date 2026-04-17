
 📚 一、整车开发流程（Vehicle Development Process）

 ### 1.1 V 模型开发流程

 ```
   需求定义 → 系统设计 → 软件设计 → 编码实现
       ↑                              ↓
   验收测试 ← 系统集成 ← 软件集成 ← 单元测试
 ```

 关键阶段：

| 阶段    | 名称   | 产出物          | 你的关注点      |
| ----- | ---- | ------------ | ---------- |
| V 左1  | 需求分析 | 用户需求文档 (URD) | 需求是否清晰、可验证 |
| V 左 2 | 系统设计 | 系统架构文档       | 接口定义、依赖关系  |
| V 左 3 | 软件设计 | 软件设计文档 (SDD) | 模块划分、算法选型  |
| V 左 4 | 编码实现 | 源代码、单元测试报告   | 代码规范、覆盖率   |
| V 右 4 | 单元测试 | 测试报告         | 用例覆盖率≥95%  |
| V 右 3 | 软件集成 | 集成测试报告       | 接口兼容性      |
| V 右 2 | 系统集成 | 系统测试报告       | 功能完整性      |
| V 右 1 | 验收测试 | 验收报告         | 需求追溯矩阵     |

 ### 1.2 整车开发里程碑（典型 18-24 个月周期）

| 阶段缩写 | 全称                             | 主要目标                                |
|----------|----------------------------------|-----------------------------------------|
| **FKO**  | Feasibility Kick-Off            | 确定项目的可行性，定义初步目标和范围    |
| **KO**   | Kick-Off                        | 项目正式启动，明确计划和职责            |
| **PTC**  | Prototype Confirmation          | 确认原型是否符合需求，优化设计          |
| **PA**   | Production Approval             | 确认产品通过测试，获得发布批准          |
| **DR**   | Design Review                   | 审核设计方案，确保符合需求和技术要求    |
| **PLR**  | Production Launch Readiness     | 确保产品部署和发布的所有准备工作就绪    |
| **LS**   | Launch and Support              | 产品上线，提供支持并持续优化            |

 📚 二、供应链惯例（Supply Chain Practices）

 ### 2.1 供应链层级

 ```
   主机厂 (OEM)
       ↓ 直接供应商
   Tier 1 (一级供应商：博世、大陆、采埃孚等)
       ↓ 子系统供应商
   Tier 2 (二级供应商：芯片、传感器、基础软件)
       ↓ 原材料/元件
   Tier 3 (元器件厂商)
 ```

 你的位置： 代表 OEM 管理 Tier 1/2 的软件交付

 ### 2.2 核心流程术语

| 术语   | 全称                                | 含义       | 你的检查点           |
| ---- | --------------------------------- | -------- | --------------- |
| APQP | Advanced Product Quality Planning | 产品质量先期策划 | 5 个阶段评审是否完成     |
| PPAP | Production Part Approval Process  | 生产件批准程序  | 18 项提交文件是否齐全    |
| FMEA | Failure Mode and Effects Analysis | 失效模式分析   | 风险优先级 RPN 是否可控  |
| MSA  | Measurement System Analysis       | 测量系统分析   | 测试数据是否可信        |
| SPC  | Statistical Process Control       | 统计过程控制   | 过程能力指数 Cpk≥1.33 |

 ### 2.3 软件交付物清单（PPAP 软件包）

 ```
   □ 软件需求规格书 (SRS)
   □ 软件设计文档 (SDD)
   □ 源代码 (含版本标签)
   □ 单元测试报告 (覆盖率证明)
   □ 集成测试报告
   □ 系统测试报告
   □ 问题追踪清单 (所有 Critical/Major 问题闭环)
   □ 版本发布说明 (Release Notes)
   □ 配置管理计划
   □ 网络安全测试报告 (ISO/SAE 21434)
   □ 功能安全包 (ISO 26262 ASIL 等级对应文档)
 ```

 ────────────────────────────────────────────────────────────────────────────────

 📚 三、行业术语速查（Industry Terminology）

 ### 3.1 电子电气架构

| 术语      | 含义                                  | 应用场景                |
| ------- | ----------------------------------- | ------------------- |
| EEA     | Electronic Electrical Architecture  | 整车电子电气架构            |
| 域控制器    | Domain Controller                   | 动力域、底盘域、座舱域、智驾域     |
| 中央计算    | Central Compute                     | 新一代架构，减少 ECU 数量     |
| SOA     | Service-Oriented Architecture       | 服务化架构，软件解耦          |
| AUTOSAR | Automotive Open System Architecture | 汽车软件标准架构            |
| CP      | Classic Platform                    | 传统 AUTOSAR，用于实时控制   |
| AP      | Adaptive Platform                   | 高性能 AUTOSAR，用于智驾/座舱 |

 ### 3.2 通信协议

| 术语       | 速率             | 用途                 |
| -------- | -------------- | ------------------ |
| CAN      | ≤1Mbps         | 传统车身控制             |
| CAN FD   | ≤8Mbps         | 新一代车身/动力           |
| LIN      | ≤20Kbps        | 低成本传感器             |
| FlexRay  | 10Mbps         | 底盘/安全关键            |
| Ethernet | 100Mbps-10Gbps | 智驾/座舱大数据           |
| Some/IP  | -              | 车载服务发现协议           |
| DoIP     | -              | Diagnostic over IP |

 ### 3.3 安全标准

| 标准            | 领域   | 关键概念                         |
| ------------- | ---- | ---------------------------- |
| ISO 26262     | 功能安全 | ASIL A/B/C/D 等级、HARA 分析、安全目标 |
| ISO/SAE 21434 | 网络安全 | TARA 分析、安全需求、渗透测试            |
| ASPICE        | 软件过程 | L1-L5 能力等级、双向追溯性             |
| GB/T 自动驾驶     | 中国法规 | L2/L2+/L3 分级、数据合规            |


 ### 3.4 项目管理术语

| 术语           | 含义                                            |
| ------------ | --------------------------------------------- |
| SOP          | Start of Production 量产启动                      |
| Job#1        | 第一辆整车下线                                       |
| PV           | Product Validation 产品验证                       |
| DV           | Design Validation 设计验证                        |
| ET/PT/TT     | Engineering/Production/Trial Trial 工程/生产/工装试制 |
| Change Point | 变更点管理                                         |
| 8D Report    | 8  Disciplines 问题解决报告                         |
 
 📚 四、你的工作检查清单（Practical Checklist）

 ### 4.1 需求对接阶段

 ```
   □ 需求是否量化可验证？(避免"响应快"→"响应时间<100ms")
   □ 接口协议是否冻结？(API 文档、通信矩阵)
   □ 需求追溯矩阵是否建立？(每条需求→测试用例)
   □ 变更管理流程是否明确？(ECR/ECO 流程)
 ```

 ### 4.2 开发过程监控

 ```
   □ 每周进度报告 (实际 vs 计划)
   □ 问题追踪清单 (Open/Closed 状态)
   □ 代码提交频率/质量趋势
   □ 测试覆盖率趋势
   □ 风险升级机制 (红黄绿灯)
 ```

 ### 4.3 交付验收阶段

 ```
   □ 所有测试用例执行率 100%
   □ Critical/Major 问题 100% 闭环
   □ Minor 问题有明确解决计划
   □ 版本标签与发布说明一致
   □ 配置管理审计通过
 ```


