<template>
  <div class="example-container" :class="[`theme-${theme}`]">
    <charrue-layout
      :collapsed="collapsed"
      :data="menuData"
      title="Vue3 Admin"
      logo="https://seeklogo.com/images/E/element-ui-logo-A640D7E503-seeklogo.com.png"
      :regex-to-path="regexToPath"
      @update:collapsed="(val) => (collapsed = val)"
    >
      <template #sidebar-top>
        <div class="side-top-title">主题切换</div>
        <el-radio-group
          v-model="theme"
          class="radio-container"
          @change="onThemeChange"
        >
          <el-radio label="normal">normal</el-radio>
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

<script>
import { defineComponent, ref } from "vue";
const TOTAL_MENUS = [
  {
    title: "page",
    path: "/page",
    icon: "iconfont c-mobile",
    children: [
      {
        path: "page1",
        title: "page1",
        icon: "iconfont c-desktop",
        redirect: "/page/page1/page5",
        children: [
          {
            path: "page4",
            title: "page4",
            icon: "iconfont c-button",
          },
          {
            path: "page5",
            title: "page5",
            icon: "iconfont c-cell",
          },
        ],
      },
      {
        path: "page2",
        title: "page2",
        icon: "iconfont c-empty",
      },
      {
        path: "page3",
        title: "page3",
        icon: "el-icon-document",
      },
    ],
  },
  {
    title: "schema-table",
    path: "/schema-table",
    icon: "iconfont c-mobile",
  },
];
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

    const theme = ref("dark");
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
      "/page/page3(.*)": "/page/page3",
    });

    return {
      collapsed,
      routeParams,
      menuData,
      theme,
      onThemeChange,
      regexToPath,
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
.theme-light {
  --layout-aside-content-bg-color: #ebf1f6;
  --layout-aside-active-text-color: #2f9afd;
  --layout-aside-active-bg-color: #f5f8fb;
  --layout-aside-normal-text-color: #606266;

  --layout-aside-hover-text-color: #2f9afd;
  --layout-aside-hover-bg-color: #f5f8fb;

  --layout-aside-active-submenu-bg-color: #ebf1f6;
}
:root {
  --charrue-sidebar-bg-color: #2c3643;
  --charrue-sidebar-hover-bg-color: #c16394;
  --charrue-sidebar-hover-bg-color: #e6a54e;
  --charrue-sidebar-active-bg-color: #222a34;
  --charrue-sidebar-text-color: #41b883;
  --charrue-sidebar-active-text-color: #fff;
  --charrue-sidebar-submenu-active-bg-color: #2a2d2e;
}
</style>
