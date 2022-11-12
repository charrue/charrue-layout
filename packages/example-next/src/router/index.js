import { createRouter, createWebHashHistory } from "vue-router";
import PageLayout from "../layout/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/page/page1",
  },
  {
    path: "/page",
    name: "pageRoot",
    component: PageLayout,
    children: [
      {
        path: "page1",
        name: "page1",
        redirect: "/page/page1/page4",
        component: () => import("../views/page/page-container.vue"),
        children: [
          {
            path: "page4",
            name: "page4",
            component: () => import("../views/page/page4.vue"),
          },
          {
            path: "page5",
            name: "page5",
            component: () => import("../views/page/page5.vue"),
          },
        ],
      },
      {
        path: "page2",
        name: "page2",
        component: () => import("../views/page/page2.vue"),
      },
      {
        path: "page3",
        name: "page3",
        component: () => import("../views/page/page3.vue"),
      },
      {
        path: "page3-plus",
        name: "page3-plus",
        component: () => import("../views/page/page3-plus.vue"),
      },
      {
        path: "page6",
        name: "page6",
        component: () => import("../views/page/page6.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
