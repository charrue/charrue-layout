/* eslint-disable max-statements */
import { computed, ref, watch, getCurrentInstance } from "vue";
import { pathToRegexp } from "path-to-regexp";
import { cleanPath, urlToList, warn } from "./utils";
import { LayoutMenuItem, LayoutMenuItemVO, ActiveMenuRulesType } from "./types";
import type { Router, RouteLocationNormalizedLoaded } from "vue-router";

export const useLayoutMenuData = (
  data: LayoutMenuItem[] = [],
  activeMenuRules: ActiveMenuRulesType = {},
) => {
  const router = (getCurrentInstance()?.proxy as any)?.$router as Router;
  const allRoutes = router.getRoutes();
  const globalRouteNamePathMapping = allRoutes.reduce((acc, cur) => {
    const routeName = String(cur.name) || "";
    acc[routeName] = cur.path;
    acc[cur.path] = routeName;
    return acc;
  }, {} as unknown as Record<string, string>);

  const getRoutePathAndName = (path: string | undefined, name: string | undefined) => {
    if (path && name) {
      return {
        path,
        name,
      };
    }

    if (path && !name) {
      const routeName = globalRouteNamePathMapping[path];
      if (!routeName) {
        warn(`route path: ${path} not found.`);
      }
      return {
        path,
        name: routeName || "",
      };
    }

    if (!path && name) {
      const routePath = globalRouteNamePathMapping[name];
      if (!routePath) {
        warn(`route name: ${name} not found.`);
      }
      return {
        path: routePath || "",
        name,
      };
    }

    return {
      path: "",
      name: "",
    };
  };

  const navPathToMenuConfig = ref<Record<string, LayoutMenuItemVO>>({});
  const formatMenuData = (
    menuData: LayoutMenuItem,
    parent?: LayoutMenuItemVO,
  ): LayoutMenuItemVO => {
    const currentPath = menuData.path
      ? menuData.path.startsWith("/")
        ? menuData.path
        : `${parent?.path || ""}/${menuData.path}`
      : "";

    const { path, name } = getRoutePathAndName(cleanPath(currentPath), menuData.name);
    const parentPathStack = parent?.pathStack || [];
    const menu = {
      title: menuData.title,
      path,
      pathStack: [...parentPathStack, path],
      name,
      icon: menuData.icon || "",
      children: [] as LayoutMenuItemVO[],
    };
    menu.children = Array.isArray(menuData.children)
      ? menuData.children.map((child) => {
          return formatMenuData(child, menu);
        })
      : [];

    if (path && name) {
      navPathToMenuConfig.value[path] = menu;
    }
    return menu;
  };

  const computedMenuData = computed(() => {
    return data.map((item) => {
      return formatMenuData(item);
    });
  });

  const route = (getCurrentInstance()?.proxy as any)?.$route as RouteLocationNormalizedLoaded;
  const activeRoutePath = ref("");
  const openKeys = ref<string[]>([]);
  const activeMenuRuleKeys = computed(() => Object.keys(activeMenuRules));

  watch(
    () => route.path,
    (currentRoutePath: string) => {
      const activeMenuRuleKey = activeMenuRuleKeys.value.find((reg) => {
        return pathToRegexp(reg).test(currentRoutePath);
      });

      let activeMenuKey = currentRoutePath;
      if (activeMenuRuleKey) {
        const matchedRoute = activeMenuRules[activeMenuRuleKey];
        if (typeof matchedRoute === "string") {
          activeMenuKey = matchedRoute;
        } else if (typeof matchedRoute.name === "string") {
          activeMenuKey = globalRouteNamePathMapping[matchedRoute.name];
        }
      }

      let activeUrlSegments: string[] = [];
      const activeMenuConfig = navPathToMenuConfig.value[activeMenuKey];

      if (activeMenuConfig) {
        const { pathStack } = activeMenuConfig;
        pathStack.forEach((itemPath) => {
          activeUrlSegments = activeUrlSegments.concat(urlToList(itemPath));
        });
      } else {
        activeUrlSegments = urlToList(currentRoutePath);
      }

      activeRoutePath.value = activeMenuKey;
      openKeys.value = activeUrlSegments;
    },
    {
      immediate: true,
    },
  );

  return {
    computedMenuData,
    navPathToMenuConfig,
    activeRoutePath,
    openKeys,
  };
};
