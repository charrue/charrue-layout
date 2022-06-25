![](https://raw.githubusercontent.com/ckangwen/image-host/main/images/charrue-layout.svg)

## layout
 ![](https://img.shields.io/npm/dt/@charrue/layout.svg)
 ![](https://img.shields.io/npm/v/@charrue/layout.svg)

### 介绍
Charrue Layout 是基于Element UI封装的组件，致力于解决中后台布局的问题，提供自动生成菜单与定制页面布局。

对于Vue3的项目，可以使用`@charrue/layout-next`。Vue3的组件API与`@charrue/layout`完全一致。

### 下载

``` bash
npm install element-ui @charrue/layout
```

### 使用

``` js
import ElementUI from "element-ui";
import Layout from "@charrue/layout";
import "element-ui/lib/theme-chalk/index.css";
import "@charrue/layout/dist/index.css";

Vue.use(ElementUI);
Vue.use(Layout);
```

