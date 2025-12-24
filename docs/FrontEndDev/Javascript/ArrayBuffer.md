---
title: ArrayBuffer
---

# JavaScript 中的 ArrayBuffer 详细使用指南

ArrayBuffer 是 JavaScript 中用于处理二进制数据的核心对象，它代表一段固定长度的连续内存空间。本指南将深入探讨 ArrayBuffer 的概念、用法以及相关的 API。

## 1. ArrayBuffer 基础概念

### 1.1 什么是 ArrayBuffer

ArrayBuffer 是一个表示固定长度的原始二进制数据缓冲区的对象。你可以把它想象成一段连续的内存空间，但不能直接操作其中的内容。

```javascript
// 创建一个 16 字节的 ArrayBuffer
const buffer = new ArrayBuffer(16);
console.log(buffer.byteLength); // 16
```

### 1.2 ArrayBuffer 与视图

ArrayBuffer 本身不提供读写数据的方法，需要通过"视图"对象来访问：

- **TypedArray 视图**：如 Int8Array, Uint8Array, Float32Array 等
- **DataView 视图**：提供更灵活的读写操作，可以控制字节序

## 2. 使用 TypedArray 视图

TypedArray 是一组构造函数，用于创建特定类型的数组视图。

### 2.1 可用的 TypedArray 类型

| 类型 | 元素大小 (字节) | 描述 | 值范围 |
|------|---------------|------|--------|
| Int8Array | 1 | 8 位有符号整数 | -128 到 127 |
| Uint8Array | 1 | 8 位无符号整数 | 0 到 255 |
| Uint8ClampedArray | 1 | 8 位无符号整数 (钳位) | 0 到 255 |
| Int16Array | 2 | 16 位有符号整数 | -32768 到 32767 |
| Uint16Array | 2 | 16 位无符号整数 | 0 到 65535 |
| Int32Array | 4 | 32 位有符号整数 | -2^31 到 2^31-1 |
| Uint32Array | 4 | 32 位无符号整数 | 0 到 2^32-1 |
| Float32Array | 4 | 32 位浮点数 | -3.4e38 到 3.4e38 |
| Float64Array | 8 | 64 位浮点数 | -1.8e308 到 1.8e308 |
| BigInt64Array | 8 | 64 位有符号整数 | -2^63 到 2^63-1 |
| BigUint64Array | 8 | 64 位无符号整数 | 0 到 2^64-1 |

### 2.2 创建 TypedArray 视图

有多种方式可以创建 TypedArray：

```javascript
// 方式 1: 基于 ArrayBuffer 创建视图
const buffer = new ArrayBuffer(16);
const int32View = new Int32Array(buffer);
console.log(int32View.length); // 4 (16字节/4字节每个Int32)

// 方式 2: 直接创建特定长度的 TypedArray
const float64Array = new Float64Array(8); // 创建包含 8 个元素的数组
console.log(float64Array.byteLength); // 64 (8元素 * 8字节每个Float64)

// 方式 3: 从普通数组创建
const uint8Array = new Uint8Array([1, 2, 3, 4]);
console.log(uint8Array); // Uint8Array [1, 2, 3, 4]

// 方式 4: 从另一个 TypedArray 创建
const int16Array = new Int16Array(uint8Array);
console.log(int16Array); // Int16Array [1, 2, 3, 4]

// 方式 5: 使用 TypedArray 的子区间
const originalArray = new Uint8Array([1, 2, 3, 4, 5, 6]);
const subArray = new Uint8Array(originalArray.buffer, 2, 3); // 从索引 2 开始，长度为 3
console.log(subArray); // Uint8Array [3, 4, 5]
```

### 2.3 TypedArray 操作

TypedArray 类似于普通数组，支持许多相同的方法：

```javascript
const array = new Int32Array([1, 2, 3, 4]);

// 读写元素
array[0] = 10;
console.log(array[0]); // 10

// 遍历元素
for (const value of array) {
  console.log(value);
}

// 使用数组方法
const mapped = array.map(x => x * 2);
console.log(mapped); // Int32Array [20, 4, 6, 8]

const filtered = array.filter(x => x > 2);
console.log(filtered); // Int32Array [10, 3, 4]

// 获取信息
console.log(array.length); // 4
console.log(array.byteLength); // 16
console.log(array.buffer); // ArrayBuffer 对象
```

## 3. 使用 DataView

DataView 提供了一个更灵活的接口来读写 ArrayBuffer 中的数据，特别是在处理不同字节序（大端序/小端序）时非常有用。

### 3.1 创建 DataView

```javascript
const buffer = new ArrayBuffer(16);
const dataView = new DataView(buffer);

// 可以指定偏移量和长度
const partialView = new DataView(buffer, 4, 8); // 从偏移量 4 开始，长度为 8
```

### 3.2 读写数据

DataView 提供了各种 get/set 方法来读写不同类型的数据：

```javascript
const buffer = new ArrayBuffer(16);
const view = new DataView(buffer);

// 写入数据
view.setInt8(0, 42);                // 在偏移量 0 写入 8 位整数
view.setUint16(1, 65535, true);     // 在偏移量 1 写入 16 位无符号整数，使用小端序
view.setFloat32(4, 3.14159);        // 在偏移量 4 写入 32 位浮点数，默认大端序
view.setFloat64(8, 1.234567890123); // 在偏移量 8 写入 64 位浮点数

// 读取数据
console.log(view.getInt8(0));                // 42
console.log(view.getUint16(1, true));        // 65535
console.log(view.getFloat32(4).toFixed(5));  // 3.14159
console.log(view.getFloat64(8));             // 1.234567890123
```

### 3.3 字节序

DataView 的一个主要优势是可以指定字节序：

- **大端序 (Big-Endian)**：最高有效字节在最低的地址（默认）
- **小端序 (Little-Endian)**：最低有效字节在最低的地址

```javascript
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);

view.setUint16(0, 0x1234); // 大端序 (默认)
console.log(view.getUint8(0)); // 0x12
console.log(view.getUint8(1)); // 0x34

view.setUint16(2, 0x1234, true); // 小端序
console.log(view.getUint8(2)); // 0x34
console.log(view.getUint8(3)); // 0x12
```

## 4. ArrayBuffer 实际应用场景

### 4.1 文件操作

使用 FileReader 读取文件内容到 ArrayBuffer：

```javascript
const fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();
  
  reader.onload = function() {
    const arrayBuffer = this.result;
    // 处理 arrayBuffer 数据
    const view = new Uint8Array(arrayBuffer);
    console.log('文件的前10个字节:', view.slice(0, 10));
  };
  
  reader.readAsArrayBuffer(file);
});
```

### 4.2 网络请求

使用 fetch API 获取二进制数据：

```javascript
fetch('https://example.com/binary-data')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    const view = new Uint8Array(buffer);
    console.log('接收到的数据:', view);
  });
```

### 4.3 图像处理

操作 Canvas 像素数据：

```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const uint8Array = imageData.data;

// 反转颜色
for (let i = 0; i < uint8Array.length; i += 4) {
  uint8Array[i] = 255 - uint8Array[i];       // R
  uint8Array[i + 1] = 255 - uint8Array[i + 1]; // G
  uint8Array[i + 2] = 255 - uint8Array[i + 2]; // B
  // uint8Array[i + 3] 是 alpha 通道，保持不变
}

ctx.putImageData(imageData, 0, 0);
```

### 4.4 WebSocket 二进制通信

```javascript
const socket = new WebSocket('wss://example.com/binary-socket');
socket.binaryType = 'arraybuffer';

socket.onmessage = function(event) {
  if (event.data instanceof ArrayBuffer) {
    const view = new DataView(event.data);
    // 处理二进制数据
  }
};

// 发送二进制数据
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setUint32(0, 42);
socket.send(buffer);
```

### 4.5 音频处理 (Web Audio API)

```javascript
const audioContext = new AudioContext();

fetch('audio.mp3')
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
  .then(audioBuffer => {
    // 获取音频数据
    const channelData = audioBuffer.getChannelData(0); // 第一个声道
    
    // 分析或修改音频数据
    let sum = 0;
    for (let i = 0; i < channelData.length; i++) {
      sum += Math.abs(channelData[i]);
    }
    const average = sum / channelData.length;
    console.log('平均振幅:', average);
  });
```

## 5. 高级技巧与优化

### 5.1 共享内存与原子操作

SharedArrayBuffer 允许在不同的 Web Workers 之间共享内存：

```javascript
// 主线程
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);
worker.postMessage({ buffer: sharedBuffer });

// Worker 线程
self.onmessage = function(event) {
  const sharedArray = new Int32Array(event.data.buffer);
  // 使用 Atomics API 进行线程安全操作
  Atomics.add(sharedArray, 0, 1);
};
```

### 5.2 转换与拷贝

在不同的二进制格式之间转换：

```javascript
// ArrayBuffer 转 Base64
function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Base64 转 ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// 字符串转 ArrayBuffer
function stringToArrayBuffer(str) {
  const encoder = new TextEncoder();
  return encoder.encode(str).buffer;
}

// ArrayBuffer 转字符串
function arrayBufferToString(buffer) {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}
```

### 5.3 性能优化

处理大型 ArrayBuffer 时的一些优化技巧：

```javascript
// 1. 重用 ArrayBuffer 而不是频繁创建新的
const buffer = new ArrayBuffer(1024 * 1024); // 1MB 缓冲区
function processData(data) {
  const view = new Uint8Array(buffer);
  // 将数据复制到缓冲区并处理
}

// 2. 使用适当的视图类型
// 对于大型数值计算，Float64Array 可能比 Float32Array 慢
const float32Array = new Float32Array(10000000);
// 比使用 Float64Array 更高效

// 3. 批量处理而不是逐字节处理
function optimizedSum(array) {
  let sum = 0;
  // 每次处理 4 个元素而不是 1 个
  for (let i = 0; i < array.length; i += 4) {
    sum += array[i] + array[i + 1] + array[i + 2] + array[i + 3];
  }
  return sum;
}
```

## 6. 常见问题与解决方案

### 6.1 内存管理

ArrayBuffer 不会自动释放，需要确保不再需要时删除引用，让垃圾回收器回收：

```javascript
let buffer = new ArrayBuffer(1024 * 1024 * 100); // 100MB
// 使用完毕后
buffer = null; // 允许垃圾回收
```

### 6.2 字节序问题

不同系统可能使用不同的字节序，使用 DataView 可以解决这个问题：

```javascript
const buffer = new ArrayBuffer(4);
const view = new DataView(buffer);
view.setInt32(0, 0x12345678);

// 检测系统字节序
const systemIsLittleEndian = new Uint8Array(new Uint32Array([0x12345678]).buffer)[0] === 0x78;
console.log('系统是小端序:', systemIsLittleEndian);

// 总是使用指定的字节序读取
const value = view.getInt32(0, systemIsLittleEndian);
```

### 6.3 溢出处理

TypedArray 会自动处理溢出：

```javascript
const uint8Array = new Uint8Array(1);
uint8Array[0] = 256; // 超出范围 (0-255)
console.log(uint8Array[0]); // 0 (256 % 256)

uint8Array[0] = -1;
console.log(uint8Array[0]); // 255 (溢出处理)

// Uint8ClampedArray 会钳位而不是环绕
const clampedArray = new Uint8ClampedArray(1);
clampedArray[0] = 256;
console.log(clampedArray[0]); // 255 (钳位到最大值)

clampedArray[0] = -10;
console.log(clampedArray[0]); // 0 (钳位到最小值)
```

## 7. 与其他 API 的集成

### 7.1 Blob 和 File

在 ArrayBuffer 和 Blob/File 之间转换：

```javascript
// Blob 转 ArrayBuffer
async function blobToArrayBuffer(blob) {
  return await blob.arrayBuffer();
}

// ArrayBuffer 转 Blob
function arrayBufferToBlob(buffer, type = 'application/octet-stream') {
  return new Blob([buffer], { type });
}

// 示例
const buffer = new ArrayBuffer(4);
const view = new Uint32Array(buffer);
view[0] = 0x12345678;

const blob = arrayBufferToBlob(buffer, 'application/custom');
blobToArrayBuffer(blob).then(newBuffer => {
  const newView = new Uint32Array(newBuffer);
  console.log(newView[0].toString(16)); // "12345678"
});
```

### 7.2 Stream API

与流式 API 集成：

```javascript
// 从 ReadableStream 读取到 ArrayBuffer
async function streamToArrayBuffer(stream) {
  const reader = stream.getReader();
  const chunks = [];
  
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }
  
  // 合并所有 chunks
  const totalLength = chunks.reduce((acc, val) => acc + val.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  
  return result.buffer;
}

// 示例
fetch('https://example.com/large-file')
  .then(response => streamToArrayBuffer(response.body))
  .then(buffer => {
    console.log('文件大小:', buffer.byteLength);
  });
```

## 8. 总结

ArrayBuffer 是 JavaScript 中处理二进制数据的强大工具，通过 TypedArray 和 DataView 视图，可以高效地读写各种类型的二进制数据。主要优势包括：

1. **性能**：直接操作内存，避免了 JavaScript 对象的开销
2. **兼容性**：与许多 Web API 无缝集成，如文件操作、网络请求、WebGL 等
3. **精确控制**：可以精确控制内存布局和字节序

掌握 ArrayBuffer 及其相关 API 对于处理图像处理、音频分析、网络协议实现、文件解析等涉及二进制数据的应用至关重要。

## 9. 兼容性

ArrayBuffer 及其相关 API 在所有现代浏览器中都得到了良好支持：

- Chrome 7+
- Firefox 4+
- Safari 5.1+
- Edge 12+
- IE 10+

SharedArrayBuffer 的支持较为有限，并且受到跨源隔离策略的限制，使用前需要确认目标环境的兼容性。