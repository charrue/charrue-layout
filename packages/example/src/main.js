import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import VC from "@vue/composition-api";
import Layout from "@charrue/layout";
import "element-ui/lib/theme-chalk/index.css";
import "@charrue/layout/dist/index.css";

Vue.use(VC);
Vue.use(ElementUI);
Vue.use(Layout);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
