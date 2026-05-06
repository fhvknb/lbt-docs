
# minikube 使用笔记

```bash 
# 查看宿主机ip地址
ip route | grep default
```

```bash
# 带参数启动
minikube start --docker-env HTTP_PROXY=http://192.168.49.1:10808 --docker-env HTTPS_PROXY=http://192.168.49.1:10808 --memory=1870mb --force

minikube start  --memory=1870mb --force


minikube start  --image-mirror-country='cn' --image-repository=registry.cn-hangzhou.aliyuncs.com/google_containers --memory=1870mb --force




minikube config set image-repository registry.cn-hangzhou.aliyuncs.com/google_containers


# 测试代理是否生效
minikube ssh 　# 进入集群docker 
curl -- -i http://www.google.com



alias kubectl="minikube kubectl --"


# 查看失败描述
kubectl get pods -n kubernetes-dashboard
kubectl describe pod <pod-name> -n kubernetes-dashboard


eval $(minikube docker-env)

eval $(minikube docker-env --unset)

```




```bash
sudo nano /etc/systemd/system/docker.service.d/http-proxy.conf

[Service]
Environment="HTTP_PROXY=http://172.27.124.22:10808"
Environment="HTTPS_PROXY=http://172.27.124.22:10808"
Environment="NO_PROXY=localhost,127.0.0.1,192.168.49.0/24"


sudo systemctl daemon-reload
sudo systemctl restart docker
```


```
#查看kubernete集群下的pod
kubectl get pod
#查看集群下所有pod和namespace信息
kubectl get pods --all-namespaces
#删除一个pod -n后跟namespace
kubectl delete deployment dashboard-metrics-scraper -n kubernetes-dashboard
#删除service
kubectl delete services rabbitmq-minikube
#停止minikube集群
minikube stop
#删除minikube集群
minikube delete
#查看service对外暴露详情
minikube service rabbitmq-minikube
这个命令会使用默认l浏览器打开这个地址
#查看pod状态
kubectl describe -n kube-system pod/kubernetes-dashboard-65c76f6c97-htfxt
#查看pod启动日志
kubectl logs -f pods/kubernetes-dashboard-65c76f6c97-htfxt -n kube-system
minikube logs
#为rabbitmq-minikube deployment创建service，并通过Service的80端口转发至容器的8000端口上。
kubectl expose deployment rabbitmq-minikube --port=80 --target-port=8000
```