<template>
  <div class="example-container">
    <charrue-layout
      :collapse="collapsed"
      :data="menuData"
      title="Vue3 Admin"
      logo="https://seeklogo.com/images/E/element-ui-logo-A640D7E503-seeklogo.com.png"
      :active-menu-rules="regexToPath"
      layout="mix"
      @update:collapse="onChange"
    >
      <template #sidebar-top>
        <div class="side-top-title">主题切换</div>
        <el-radio-group v-model="theme" class="radio-container" @change="onThemeChange">
          <el-radio label="default">default</el-radio>
          <el-radio label="light">light</el-radio>
          <el-radio label="dark">dark</el-radio>
        </el-radio-group>
      </template>
      <template #header-left>
        <div>LEFT</div>
      </template>
      <template #header-right>
        <div>RIGHT</div>
      </template>
      <template #content-header>
        <div style="padding: 20px">
          <el-breadcrumb>
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动列表</el-breadcrumb-item>
            <el-breadcrumb-item>活动详情</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </template>
      <router-view></router-view>
    </charrue-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { defineLayoutConfig } from "@charrue/layout-next";

const TOTAL_MENUS = defineLayoutConfig([
  {
    title: "PAGE",
    path: "/page",
    icon: "iconfont c-mobile",
    children: [
      {
        path: "page1",
        title: "#PAGE1",
        icon: "iconfont c-desktop",
        children: [
          {
            title: "#PAGE4",
            path: "page4",
            icon: "iconfont c-button",
          },
          {
            title: "#PAGE5",
            path: "page5",
            icon: "iconfont c-cell",
          },
        ],
      },
      {
        title: "#PAGE2",
        path: "page2",
        icon: "iconfont c-empty",
      },
      {
        title: "#PAGE3",
        path: "page3",
        icon: "el-icon-document",
      },
    ],
  },
  {
    title: "#PAGE6",
    path: "/page/page6",
    icon: "iconfont c-mobile",
  },
]);

export default defineComponent({
  name: "PageLayout",
  setup() {
    const menuData = ref(TOTAL_MENUS);

    const collapsed = ref(false);

    const routeParams = (item) => {
      return {
        query: {
          path: item.path,
        },
      };
    };

    const theme = ref("default");
    const onThemeChange = (value) => {
      const cls = Array.from(document.body.classList);
      const idx = cls.findIndex((t) => t.startsWith("theme-"));
      if (idx > -1) {
        cls.splice(idx, 1);
      }
      cls.push(`theme-${value}`);
      document.body.className = cls.join(" ");
    };

    const regexToPath = ref({
      // "/page/page3(.*)": "/page/page3",
      "/page/page3-plus": "/page/page3",
    });

    const onChange = (val) => {
      console.log(val);
    };

    return {
      collapsed,
      routeParams,
      menuData,
      theme,
      onThemeChange,
      regexToPath,

      onChange,
    };
  },
});
</script>

<style lang="scss">
.menu-header-extra {
  height: 20px;
  width: 100%;
  background: #fff;
}

.progress-bar-wrapper {
  width: 90%;
  margin: 0 auto;
}

.progress-bar {
  width: 100%;
  background-color: #e0e0e0;
  padding: 2px;
  border-radius: 5px;
}

.progress-bar-fill {
  display: block;
  height: 20px;
  border-radius: 5px;
  background-color: #84bf96;
  transition: width 1s ease;
  animation: fill 5s infinite linear;
}

.radio-container.el-radio-group {
  display: flex;
  flex-direction: column;

  .el-radio {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
    box-sizing: border-box;
  }
  .el-radio:last-child {
    margin-right: 32px;
  }
}
.side-top-title {
  margin-bottom: 10px;
  color: var(--layout-aside-active-text-color, #1cd17a);
}

@keyframes fill {
  0% {
    width: 0%;
  }

  25% {
    width: 30%;
    background-color: #45b97c;
  }
  50% {
    width: 50%;
    background-color: #007d65;
  }
  75% {
    width: 70%;
    background-color: #1d953f;
  }
  100% {
    width: 100%;
    background-color: #007947;
  }
}
</style>

<style>
.theme-dark {
  --cl-sidebar-bg: #001529;
  --cl-sidebar-text-color: #99a1a9;

  --cl-sidebar-hover-bg: #1890ff;
  --cl-sidebar-hover-text-color: #fff;

  --cl-sidebar-active-bg: #1890ff;
  --cl-sidebar-active-text-color: #fff;
  --cl-sidebar-submenu-active-bg: #000c17;

  --cl-sidebar-submenu-hover-text-color: var(--cl-sidebar-hover-text-color);
  --cl-sidebar-submenu-text-color: #99a1a9;
  --cl-sidebar-submenu-hover-bg: var(--cl-sidebar-hover-bg);

  --cl-header-bg: var(--cl-sidebar-bg);
  --cl-header-text-color: #fff;
  --cl-title-color: var(--cl-header-text-color);

  --cl-collapse-trigger-active-bg: #000c17;
}
</style>
