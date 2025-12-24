---
sidebar_position: 4
title: JS Code Snippets
tag: [js, frontend]
---

## Code Snippets

### 数据文件下载

```js
const data_json = {
        name: "Shawn",
        email: "xxx@gmail.com",
    };

const exportFn = () => {
    const json = JSON.stringify(data_json);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    link.click();
    URL.revokeObjectURL(url);
};
```

### 防抖函数
```js
function debounce(fn, duration){
    var timerId;
    return function() {
    if(timerId) {
        clearTimeout(timerId);
    }
    const _this = this;
    const _slice = Array.prototype.slice;
    const args = _slice.call(arguments);
    timerId = setTimeout(() => {
        fn.apply(_this, args);
    }, duration);
    }
}
```