以下是从熟悉 Kubernetes (K8s) 到精通其各个功能的实操安全清单，分为基础、中级和高级三个阶段。每个阶段包含关键的学习内容、实操任务和安全注意事项。随后，我将提供一个详细的操作案例和指导手册。

---

## **Kubernetes 学习与实操清单**

### **阶段 1：基础入门**
目标：熟悉 Kubernetes 的基本概念和核心组件，掌握基本命令和资源操作。

#### **学习内容**
1. Kubernetes 基础架构和组件：
   - Master 节点（API Server、Controller Manager、Scheduler、etcd）
   - Worker 节点（kubelet、kube-proxy、容器运行时）
2. 核心概念：
   - Pod、Deployment、Service、Namespace、ConfigMap、Secret
3. 基本命令：
   - `kubectl get`
   - `kubectl describe`
   - `kubectl create`
   - `kubectl delete`
4. 配置文件 (YAML) 的基本结构和语法。

#### **实操任务**
1. **安装 Kubernetes 集群**：
   - 使用 Minikube 或 Kind（Kubernetes in Docker）搭建本地开发环境。
   - 在云平台（如 GKE、EKS、ACK）或使用 kubeadm 搭建多节点集群。

2. **创建和管理 Pod**：
   - 创建一个简单的 Pod：
     ```yaml
     apiVersion: v1
     kind: Pod
     metadata:
       name: my-pod
     spec:
       containers:
       - name: my-container
         image: nginx
         ports:
         - containerPort: 80
     ```
     ```bash
     kubectl apply -f pod.yaml
     kubectl get pods
     kubectl describe pod my-pod
     ```

3. **部署应用程序**：
   - 使用 Deployment 部署一个多副本应用：
     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: my-deployment
     spec:
       replicas: 3
       selector:
         matchLabels:
           app: my-app
       template:
         metadata:
           labels:
             app: my-app
         spec:
           containers:
           - name: my-container
             image: nginx
             ports:
             - containerPort: 80
     ```
     ```bash
     kubectl apply -f deployment.yaml
     kubectl get deployments
     kubectl get pods -l app=my-app
     ```

4. **创建 Service**：
   - 暴露一个 Deployment：
     ```bash
     kubectl expose deployment my-deployment --type=NodePort --port=80
     kubectl get svc
     ```

#### **安全清单**
- 确保 Kubernetes 集群使用安全的 API 访问配置（如启用 RBAC）。
- 避免将敏感信息硬编码到 YAML 文件中，使用 **Secret** 存储敏感数据。
- 定期更新 Kubernetes 版本，以修复安全漏洞。

---

### **阶段 2：进阶操作**
目标：掌握 Kubernetes 的高级功能和常见场景。

#### **学习内容**
1. 工作负载类型：
   - DaemonSet、StatefulSet、Job、CronJob
2. 高级配置：
   - Probes（Liveness、Readiness、Startup）
   - Resource Requests 和 Limits
3. 网络：
   - Ingress
   - NetworkPolicy
4. 存储：
   - PersistentVolume (PV) 和 PersistentVolumeClaim (PVC)
   - StorageClass 和动态存储

#### **实操任务**
1. **配置 Liveness 和 Readiness Probes**：
   - 在 Deployment 中添加健康检查：
     ```yaml
     readinessProbe:
       httpGet:
         path: /
         port: 80
       initialDelaySeconds: 5
       periodSeconds: 10
     livenessProbe:
       httpGet:
         path: /
         port: 80
       initialDelaySeconds: 15
       periodSeconds: 20
     ```

2. **创建 Ingress 资源**：
   - 安装 Ingress 控制器（如 NGINX Ingress Controller）。
   - 配置一个简单的 Ingress：
     ```yaml
     apiVersion: networking.k8s.io/v1
     kind: Ingress
     metadata:
       name: my-ingress
     spec:
       rules:
       - host: my-app.local
         http:
           paths:
           - path: /
             pathType: Prefix
             backend:
               service:
                 name: my-service
                 port:
                   number: 80
     ```

3. **使用 PersistentVolume 和 PersistentVolumeClaim**：
   - 创建一个 PV 和 PVC：
     ```yaml
     apiVersion: v1
     kind: PersistentVolume
     metadata:
       name: my-pv
     spec:
       capacity:
         storage: 1Gi
       accessModes:
       - ReadWriteOnce
       hostPath:
         path: /mnt/data
     ---
     apiVersion: v1
     kind: PersistentVolumeClaim
     metadata:
       name: my-pvc
     spec:
       accessModes:
       - ReadWriteOnce
       resources:
         requests:
           storage: 500Mi
     ```

#### **安全清单**
- 配置 NetworkPolicy 限制 Pod 间的网络访问。
- 使用 RBAC 限制用户对 Kubernetes 资源的权限。
- 定期清理未使用的资源（Pod、PVC、ConfigMap 等）。

---

### **3. 高级实操与安全**
目标：掌握 Kubernetes 的安全、监控、日志收集和自动化运维能力。

#### **学习内容**
1. Kubernetes 安全：
   - RBAC（Role-Based Access Control）
   - Pod 安全策略（PodSecurityPolicy 或 PodSecurity Admission）
   - 网络策略（NetworkPolicy）
2. 日志与监控：
   - 集成 Prometheus 和 Grafana。
   - 使用 Fluentd 收集日志。
3. 自动化和扩展：
   - 使用 Horizontal Pod Autoscaler (HPA) 自动扩展。
   - 配置 Cluster Autoscaler。
4. CI/CD 集成：
   - 使用 ArgoCD 或 Flux 实现 GitOps。
   - 使用 Jenkins 或 GitHub Actions 部署应用。

#### **实操任务**
1. **配置 RBAC**：
   - 创建一个只允许读取 Pods 的角色：
     ```yaml
     apiVersion: rbac.authorization.k8s.io/v1
     kind: Role
     metadata:
       namespace: default
       name: pod-reader
     rules:
     - apiGroups: [""]
       resources: ["pods"]
       verbs: ["get", "watch", "list"]
     ---
     apiVersion: rbac.authorization.k8s.io/v1
     kind: RoleBinding
     metadata:
       name: read-pods
       namespace: default
     subjects:
     - kind: User
       name: testuser
       apiGroup: rbac.authorization.k8s.io
     roleRef:
       kind: Role
       name: pod-reader
       apiGroup: rbac.authorization.k8s.io
     ```

2. **设置 NetworkPolicy**：
   - 限制某些 Pod 的网络访问：
     ```yaml
     apiVersion: networking.k8s.io/v1
     kind: NetworkPolicy
     metadata:
       name: deny-all
       namespace: default
     spec:
       podSelector: {}
       policyTypes:
       - Ingress
       - Egress
     ```

3. **配置 HPA**：
   - 自动扩展 Pod 副本：
     ```bash
     kubectl autoscale deployment my-deployment --cpu-percent=50 --min=1 --max=10
     ```

4. **集成监控和日志**：
   - 安装 Prometheus 和 Grafana 监控集群。
   - 配置 Fluentd 收集日志并存储到 Elasticsearch。

#### **安全清单**
- 定期检查 RBAC 配置，确保最小权限原则。
- 开启审计日志功能，监控集群中的操作行为。
- 为集群启用网络隔离（NetworkPolicy）。
- 避免使用默认的 Kubernetes ServiceAccount，使用自定义的 ServiceAccount。

