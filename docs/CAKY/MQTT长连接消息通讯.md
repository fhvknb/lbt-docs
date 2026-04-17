### 步骤说明
1. 服务端：通过 Mosquitto 或其他 MQTT Broker（如 EMQX）运行一个 MQTT 服务端。
2. 客户端：编写 Python 客户端代码，连接到 MQTT 服务端并订阅/发布消息。

---

### 服务端
MQTT 服务端通常使用现成的 Broker，比如 Mosquitto。可以通过以下方式安装并运行：

#### 安装 Mosquitto（MQTT Broker）
```bash
# 在 Linux 上安装 Mosquitto
sudo apt update
sudo apt install mosquitto mosquitto-clients

# 启动 Mosquitto 服务
sudo systemctl start mosquitto
sudo systemctl enable mosquitto
```

默认情况下，Mosquitto 会在本地的 `1883` 端口上运行。

---

### 客户端代码

#### 1. 安装依赖
首先安装 `paho-mqtt` 库：
```bash
pip install paho-mqtt
```

#### 2. 编写 MQTT 客户端代码

以下是一个完整的示例，包含一个发布者和一个订阅者：

```python
import paho.mqtt.client as mqtt
import time

# MQTT 服务端地址和端口
BROKER = "127.0.0.1"  # 替换为你的 MQTT Broker 地址
PORT = 1883           # 默认 MQTT 端口
TOPIC = "test/topic"  # 订阅和发布的主题

# ==========================
# MQTT 客户端 - 订阅者
# ==========================
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("订阅者成功连接到 MQTT Broker")
        client.subscribe(TOPIC)
    else:
        print("订阅者连接失败，返回码：", rc)

def on_message(client, userdata, msg):
    print(f"收到消息：主题={msg.topic}, 内容={msg.payload.decode()}")

def start_subscriber():
    subscriber = mqtt.Client("Subscriber")
    subscriber.on_connect = on_connect
    subscriber.on_message = on_message

    subscriber.connect(BROKER, PORT, keepalive=60)
    subscriber.loop_start()  # 开启非阻塞循环

# ==========================
# MQTT 客户端 - 发布者
# ==========================
def start_publisher():
    publisher = mqtt.Client("Publisher")
    publisher.connect(BROKER, PORT, keepalive=60)

    for i in range(10):  # 发布 10 条消息
        message = f"消息 {i + 1}"
        publisher.publish(TOPIC, message)
        print(f"发布消息：{message}")
        time.sleep(1)  # 每隔 1 秒发布一条消息

    publisher.disconnect()

# ==========================
# 主程序
# ==========================
if __name__ == "__main__":
    # 启动订阅者
    start_subscriber()

    # 等待订阅者连接
    time.sleep(2)

    # 启动发布者
    start_publisher()

    # 保持程序运行，等待消息接收
    time.sleep(10)
```

---

### 运行示例

1. 启动 Mosquitto 服务端（或其他 MQTT Broker）。
2. 运行上述代码，程序会启动一个订阅者并订阅主题 `test/topic`。
3. 发布者每隔 1 秒向主题 `test/topic` 发布一条消息。
4. 订阅者会实时接收到发布者的消息，并在终端打印。

---

### 输出示例

运行代码后，终端会输出类似以下内容：

**订阅者输出：**
```
订阅者成功连接到 MQTT Broker
收到消息：主题=test/topic, 内容=消息 1
收到消息：主题=test/topic, 内容=消息 2
收到消息：主题=test/topic, 内容=消息 3
...
```

**发布者输出：**
```
发布消息：消息 1
发布消息：消息 2
发布消息：消息 3
...
```

---

### 注意事项
1. 如果需要在不同设备之间通信，请确保服务端的 IP 地址是可访问的，并且防火墙允许 `1883` 端口通信。
2. 如果需要更高的安全性，可以启用 MQTT 的 TLS/SSL 和用户认证功能。
3. 如果没有本地 Broker，可以使用公共的 MQTT Broker（如 mqtt.eclipseprojects.io）。

