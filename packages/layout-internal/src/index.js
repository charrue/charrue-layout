import _Layout from "./Layout.vue";

export default {
  install(Vue) {
    const version = Vue.version.charAt(0);
    if (version === "2") {
      Vue.prototype.charrueLayoutConfig = {
        subMenu: "el-submenu",
      };
      Vue.component(_Layout.name, _Layout);
    } else {
      Vue.config.globalProperties.charrueLayoutConfig = {
        subMenu: "el-sub-menu",
      };
      Vue.component(_Layout.name, _Layout);
    }
  },
};

export const Layout = _Layout;
