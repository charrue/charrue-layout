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


### 通过 CSS 变量设置主题
我们对Layout组件中经常改动的样式属性使用了CSS 变量功能。

```
--charrue-header-height: 顶栏`.charrue-header`的高度
--charrue-title-font-size: 顶部标题的字体大小
--charrue-header-text-color：顶栏的文字颜色
--charrue-header-bg-color: 顶栏的背景颜色
--charrue-sidebar-border-color： 侧栏的右边框颜色
--charrue-sidebar-text-color: 侧栏导航菜单文字颜色
--charrue-sidebar-bg-color: 侧栏导航菜单文字背景颜色
--charrue-sidebar-hover-text-color: 侧栏导航菜单文字处于悬浮状态时的颜色
--charrue-sidebar-hover-bg-color: 侧栏导航菜单处于悬浮状态时的背景颜色
--charrue-sidebar-active-text-color: 侧栏导航菜单处于选中状态时的文字颜色，默认与charrue-sidebar-hover-text-color颜色一致
--charrue-sidebar-active-bg-color: 侧栏导航菜单处于选中状态时的文字颜色，默认与charrue-sidebar-hover-bg-color颜色一致
--charrue-sidebar-submenu-active-bg-color: 侧栏subMenu处于选中状态时的背景颜色
```
详细信息可见[`var.scss`](https://github.com/charrue/charrue-layout/blob/master/packages/layout-internal/styles/var.scss)

你可以像这样对上述变量进行自定义：
``` css
:root {
  --charrue-sidebar-bg-color: #2c3643;
  --charrue-sidebar-hover-bg-color: #c16394;
  --charrue-sidebar-hover-bg-color: #e6a54e;
  --charrue-sidebar-active-bg-color: #222a34;
  --charrue-sidebar-text-color: #41b883;
  --charrue-sidebar-active-text-color: #fff;
  --charrue-sidebar-submenu-active-bg-color: #2a2d2e;
}
```
> 因为`el-menu`处于折叠状态时的DOM是在`body`下面的，如果想要将CSS的修改影响到它，则必须将自定义变量放置到`html`或`body`下。
