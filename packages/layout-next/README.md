![](https://raw.githubusercontent.com/ckangwen/image-host/main/images/charrue-layout.svg)

## layout-next
 ![](https://img.shields.io/npm/dt/@charrue/layout-next.svg)
 ![](https://img.shields.io/npm/v/@charrue/layout-next.svg)

### 介绍
Charrue Layout 是基于Element Plus封装的组件，致力于解决中后台布局的问题，提供自动生成菜单与定制页面布局。

对于Vue2的项目，可以使用`@charrue/layout`。Vue2的组件API与`@charrue/layout-next`完全一致。

### 下载

``` bash
npm install element-plus @charrue/layout-next
```

### 使用

``` js
import ElementPlus from "element-plus";
import Layout from "@charrue/layout-next";
import "element-plus/dist/index.css";
import "@charrue/layout-next/dist/index.css";

const app = createApp(App);
app.use(ElementPlus);
app.use(Layout);
```

