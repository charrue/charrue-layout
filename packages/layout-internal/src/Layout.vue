<template>
  <div
    class="charrue-layout"
    :class="[collapsed ? 'hideSidebar' : 'openSidebar']"
  >
    <layout-sidebar
      :collapsed="innerCollapse"
      :data="data"
      :logo="logo"
      :title="title"
      :route="route"
      :absolute="absolute"
      :authorized="authorized"
      :sidebar-width="sidebarWidth"
      :home-url="homeUrl"
      :regex-to-path="regexToPath"
    >
      <template #sidebar-top>
        <slot name="sidebar-top"></slot>
      </template>
      <template #sidebar-bottom>
        <slot name="sidebar-bottom"></slot>
      </template>
    </layout-sidebar>

    <div class="charrue-layout-main" :style="mainWidthStyle">
      <div
        class="charrue-layout-header-container"
        :class="{ 'fixed-header': fixedHeader }"
        :style="headerWidthStyle"
      >
        <div class="charrue-layout-header-main">
          <div class="charrue-layout-header-left">
            <slot name="header-left">
              <hamburger @toggle-click="toggleSideBar" />
            </slot>
          </div>
          <div class="charrue-layout-header-right">
            <slot name="header-right"></slot>
          </div>
        </div>
      </div>

      <layout-content :animation="animation">
        <template #content-header>
          <slot name="content-header"></slot>
        </template>
        <template #content>
          <slot></slot>
        </template>
        <template #content-footer>
          <slot name="content-footer"></slot>
        </template>
      </layout-content>
    </div>
  </div>
</template>

<script>
import LayoutSidebar from "./LayoutSidebar.vue";
import LayoutContent from "./LayoutContent.vue";
import Hamburger from "./Hamburger.vue";

export default {
  name: "CharrueLayout",
  components: {
    LayoutSidebar,
    LayoutContent,
    Hamburger,
  },
  props: {
    collapsed: {
      type: Boolean,
      default: false,
    },
    fixedHeader: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
    logo: String,
    title: String,
    sidebarWidth: {
      type: Array,
      default() {
        return [54, 200];
      },
    },
    animation: {
      type: Boolean,
      default: true,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    route: {
      type: Boolean,
      default: true,
    },
    authorized: Function,
    homeUrl: {
      type: String,
      default: "/",
    },
    // 设置多路由对应一个菜单项，匹配模式参考 path-to-regexp
    regexToPath: {
      type: Object,
    },
  },
  emits: ["update:collapsed"],
  data() {
    return {
      innerCollapse: false,
    };
  },
  computed: {
    mainWidthStyle() {
      return {
        width: `calc(100% - ${
          this.collapsed ? this.sidebarWidth[0] : this.sidebarWidth[1]
        }px)`,
      };
    },
    headerWidthStyle() {
      let width = "100%";
      if (this.fixedHeader) {
        width = `calc(100% - ${
          this.collapsed ? this.sidebarWidth[0] : this.sidebarWidth[1]
        }px)`;
      }

      return {
        width,
      };
    },
  },
  watch: {
    collapsed: {
      handler(val) {
        this.innerCollapse = val;
      },
      immediate: true,
    },
    innerCollapse(val) {
      this.$emit("update:collapsed", val);
    },
  },
  methods: {
    toggleSideBar() {
      this.innerCollapse = !this.innerCollapse;
    },
  },
};
</script>
