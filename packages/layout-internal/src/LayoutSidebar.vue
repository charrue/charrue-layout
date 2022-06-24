<template>
  <div class="charrue-layout-sidebar-container">
    <div class="charrue-layout-sidebar-placeholder" :style="{ width }"></div>
    <div
      class="charrue-layout-sidebar charrue-layout-sidebar-el-menu-container"
      :style="{ width, position: absolute ? 'absolute' : 'fixed' }"
    >
      <div v-if="logo || title" class="logo-container">
        <router-link :to="homeUrl" class="menu-router-link">
          <img v-if="logo" :src="logo" alt="logo" />
          <h1 v-if="title">{{ title }}</h1>
        </router-link>
      </div>
      <slot name="sidebar-top"></slot>
      <el-menu
        class="charrue-layout-sidebar-el-menu"
        mode="vertical"
        unique-opened
        :collapse="collapsed"
        :default-active="activeRoutePath"
        :default-openeds="openKeys"
      >
        <sidebar-item
          v-for="item in computedMenuData"
          :key="item.path"
          :route="route"
          :menu-item="item"
        ></sidebar-item>
      </el-menu>
      <slot name="sidebar-bottom"></slot>
    </div>
  </div>
</template>

<script>
import {
  urlToList,
  menuDataFormatter,
  getMenuDataPathMapping,
  isFunction,
} from "./utils";
import { pathToRegexp } from "path-to-regexp";
import SidebarItem from "./SidebarItem.vue";

export default {
  name: "GlobalAside",
  components: {
    SidebarItem,
  },
  props: {
    // 导航菜单数据源
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    // 控制菜单的收起和展开
    collapsed: {
      type: Boolean,
      default: false,
    },
    // 侧边栏的左上角的logo的url
    logo: String,
    // 导航菜单标题区域的标题文字
    title: String,
    // 是否启用路由模式
    route: {
      type: Boolean,
      default: true,
    },
    // 是否将侧边栏设置为position: absolute, 使得可以相对于其他容器进行定位
    absolute: {
      type: Boolean,
      default: false,
    },
    // 控制导航菜单的展示
    // ({ menu, index, deep, path, parent }) => AsideMenuData[]
    authorized: Function,
    // 设置导航菜单折叠、展开时的宽度
    sidebarWidth: {
      type: Array,
      default() {
        return [54, 200];
      },
    },
    // 设置多路由对应一个菜单项，匹配模式参考 path-to-regexp
    regexToPath: {
      type: Object,
    },
    homeUrl: {
      type: String,
      default: "/",
    },
  },
  data() {
    return {
      openKeys: [],
      activeRoutePath: "",
      menuData: [],
      menuDataPathMapping: {},
    };
  },
  computed: {
    width() {
      return this.collapsed
        ? `${this.sidebarWidth[0]}px`
        : `${this.sidebarWidth[1]}px`;
    },
    computedMenuData() {
      const menuData = [];
      this.menuData.forEach((menu, index) => {
        const formattedMenu = this.formatMenuData({
          menu,
          index,
          deep: 0,
          path: menu.path,
          parent: null,
        });
        if (formattedMenu) {
          menuData.push(formattedMenu);
        }
      });

      return menuData;
    },
  },
  watch: {
    data: {
      handler() {
        this.filterAsideMenuData();
      },
      immediate: true,
      deep: true,
    },
  },
  created() {
    if (this.route) {
      this.$watch(
        "$route.path",
        (currentRoute) => {
          const matchedRegex = this.regexToPath
            ? Object.keys(this.regexToPath).find((reg) =>
                pathToRegexp(reg).test(currentRoute)
              )
            : null;

          if (matchedRegex) {
            this.activeRoutePath = this.regexToPath[matchedRegex];
          } else {
            this.activeRoutePath = currentRoute;
          }

          // 菜单栏展开项包括当前url，以及由当前url所解析出来的父级url
          const openKeys = urlToList(this.activeRoutePath);
          const currentRouteMenuData =
            this.menuDataPathMapping[this.activeRoutePath];
          if (currentRouteMenuData && currentRouteMenuData.parentPath) {
            // 查找到当前菜单项的父级，将父级的path segments添加到openKeys中
            urlToList(currentRouteMenuData.parentPath).forEach((path) => {
              if (!openKeys.includes(path)) {
                openKeys.push(path);
              }
            });
          }
          this.openKeys = openKeys;
        },
        {
          immediate: true,
        }
      );
    }
  },
  methods: {
    filterAsideMenuData() {
      const _menuData = this.data
        .filter((t) => t.title && !t.hide)
        .map((t) => {
          if (this.authorized && this.authorized(t.authority, t)) {
            return t;
          }
          return t;
        })
        .filter((t) => !!t);

      this.menuData = menuDataFormatter(_menuData);
      this.menuDataPathMapping = getMenuDataPathMapping(this.menuData);
    },
    /**
     * @private
     * 对菜单数据进行格式化
     */
    _formatMenuData({ menu, deep, index, path, parent } = {}) {
      const menuCopy = menu ? { ...menu } : {};
      if (!this.authorized) return menuCopy;
      if (
        isFunction(this.authorized) &&
        !this.authorized({ menu: menuCopy, deep, index, path, parent })
      ) {
        return false;
      }

      menuCopy.children = menuCopy.children || [];
      if (Array.isArray(menuCopy.children) && menuCopy.children.length > 0) {
        menuCopy.children = menuCopy.children
          .map((child) => {
            const currentPath = path.startsWith("/")
              ? child.path
              : `${path}/${child.path}`;
            return this._formatMenuData({
              menu: child,
              deep: deep + 1,
              index,
              path: currentPath,
              parent: menuCopy,
            });
          })
          .filter((t) => t);
      }

      return menuCopy;
    },
    formatMenuData({ menu, deep, index, path, parent } = {}) {
      const menuCopy = menu ? { ...menu } : {};
      if (!this.authorized) return menuCopy;
      if (
        isFunction(this.authorized) &&
        !this.authorized({ menu: menuCopy, deep, index, path, parent })
      ) {
        return false;
      }

      menuCopy.children = menuCopy.children || [];
      if (Array.isArray(menuCopy.children) && menuCopy.children.length > 0) {
        menuCopy.children = menuCopy.children
          .map((child) => {
            const currentPath = path.startsWith("/")
              ? child.path
              : `${path}/${child.path}`;
            return this.formatMenuData({
              menu: child,
              deep: deep + 1,
              index,
              path: currentPath,
              parent: menuCopy,
            });
          })
          .filter((t) => t);
      }

      return menuCopy;
    },
  },
};
</script>
