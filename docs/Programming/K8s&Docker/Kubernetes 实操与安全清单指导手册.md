

  ## **1. 安装 Kubernetes 集群**
  使用 Minikube 快速搭建本地 Kubernetes 集群：
  ```bash
  minikube start --driver=virtualbox
  ```

  验证 Minikube 是否启动成功：
  ```bash
  kubectl get nodes
  ```

  ## **2. 部署一个简单的 Nginx 应用**
  创建一个 Deployment：
  ```yaml
  apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: nginx-deployment
  spec:
    replicas: 3
    selector:
      matchLabels:
        app: nginx
    template:
      metadata:
        labels:
          app: nginx
      spec:
        containers:
        - name: nginx
          image: nginx:1.21
          ports:
          - containerPort: 80
  ```

  应用配置：
  ```bash
  kubectl apply -f nginx-deployment.yaml
  ```

  验证 Deployment 和 Pod：
  ```bash
  kubectl get deployments
  kubectl get pods
  ```

  ## **3. 暴露服务**
  暴露 Deployment 为 NodePort 服务：
  ```bash
  kubectl expose deployment nginx-deployment --type=NodePort --port=80
  ```

  获取服务的访问地址：
  ```bash
  minikube service nginx-deployment --url
  ```

  在浏览器中访问输出的 URL。

  ## **4. 配置 Liveness 和 Readiness Probes**
  更新 Deployment，添加健康检查：
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

  更新 Deployment：
  ```bash
  kubectl apply -f nginx-deployment.yaml
  ```

  ## **5. 配置 RBAC**
  创建一个只允许读取 Pods 的角色：
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
  ```

  创建 RoleBinding：
  ```yaml
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

  应用 RBAC 配置：
  ```bash
  kubectl apply -f role.yaml
  kubectl apply -f rolebinding.yaml
  ```

  ## **6. 配置 NetworkPolicy**
  限制 Pod 的网络访问：
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

  应用 NetworkPolicy：
  ```bash
  kubectl apply -f networkpolicy.yaml
  ```