![](https://raw.githubusercontent.com/ckangwen/image-host/main/images/charrue-layout.svg)

## layout-next
 ![](https://img.shields.io/npm/dt/@charrue/layout-next.svg)
 ![](https://img.shields.io/npm/v/@charrue/layout-next.svg)

## 介绍

Charrue Layout 是基于Element Plus封装的组件，致力于解决中后台布局的问题，提供自动生成菜单与定制页面布局。

### 下载

``` bash
npm install element-plus @charrue/layout-next
```

### 使用

1. 全局注册
``` js
import ElementPlus from "element-plus";
import Layout from "@charrue/layout-next";
import "element-plus/dist/index.css";
import "@charrue/layout-next/dist/index.css"; // 引入样式

const app = createApp(App);
app.use(Layout);
```

2. 局部注册
``` vue
<script setup>
import { CharrueLayout } from "@charrue/layout-next";
</script>

<template>
  <CharrueLayout>
    <router-view></router-view>
  </CharrueLayout>
</template>

<style>
@import "@charrue/layout-next/dist/index.css";
</style>

```





## Props

| 属性名          | 类型                        | 默认值      | 说明                                                       |
| --------------- | --------------------------- | ----------- | ---------------------------------------------------------- |
| data            | `LayoutMenuItem[]`          | `[]`        | 控制侧边栏数据展示<br />如果为空数组，则不展示侧栏         |
| collapse        | `boolean`                   | `false`     | 控制菜单的收起和展开                                       |
| fixedHeader     | `boolean`                   | `true`      | 是否固定 header 到顶部                                     |
| showTrigger     | `boolean`                   | `true`      | 是否显示菜单折叠触发器                                     |
| logo            | `string`                    | `''`        | layout 的左上角 的 logo                                    |
| title           | `string`                    | `''`        | layout 的左上角 的 title                                   |
| layout          | `side | mix`                | `side`      | layout 的菜单模式,side：右侧导航，mix：混合模式            |
| homeRoute       | `string | { name: string }` | `/`         | 首页的路由                                                 |
| absolute        | `boolean`                   | `false`     | 是否设置为`position:absolute`，默认设置为`position: fixed` |
| sidebarWidth    | `[number, number]`          | `[54, 200]` | 侧边菜单收起和展开的宽度                                   |
| activeMenuRules | `ActiveMenuRulesType`       | `{}`        | 自定义侧栏菜单高亮规则                                     |





## 插槽

| 插槽名         | 说明       |
| -------------- | ---------- |
| header-left    | 顶栏左侧   |
| header-right   | 顶栏右侧   |
| sidebar-top    | 侧栏顶部   |
| sidebar-bottom | 侧栏底部   |
| content-header | 内容区顶部 |
| default        | 内容区主体 |
| content-footer | 内容区底部 |





## 事件

| 事件            | 说明             |
| --------------- | ---------------- |
| update:collapse | 侧栏折叠状态更新 |





## 辅助函数

- defineLayoutConfig

```ts
declare const defineLayoutConfig: (config: LayoutMenuItem[]) => LayoutMenuItem[];
```

在定义`data`prop时提供类型提示


## 类型

``` ts
interface LayoutMenuItem {
    title: string;
    path?: string;
    name?: string;
    icon?: string;
    children?: LayoutMenuItem[];
}

declare type ActiveMenuRulesType = Record<string, string | {
    name: string;
}>;
```
