---
sidebar_position: 4
title: JS Code Snippets
tag: [js, frontend]
---


# 数据文件下载

```javascript
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