import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { pathToRegexp } from "path-to-regexp";
import { cleanPath, urlToList, warn } from "../utils";
import { LayoutMenuItem, LayoutMenuItemVO, ActiveMenuRulesType } from "../types";

export const useLayoutMenuData = (data: LayoutMenuItem[], activeMenuRules: ActiveMenuRulesType) => {
  const router = useRouter();
  const allRoutes = router.getRoutes();
  const namePathMapping = allRoutes.reduce((acc, cur) => {
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
      const routeName = namePathMapping[path];
      if (!routeName) {
        warn(`route path: ${path} not found.`);
      }
      return {
        path,
        name: routeName || "",
      };
    }

    if (!path && name) {
      const routePath = namePathMapping[name];
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

  const pathToMenu = ref<Record<string, LayoutMenuItemVO>>({});
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
      pathToMenu.value[path] = menu;
    }
    return menu;
  };

  const computedMenuData = computed(() => {
    return data.map((item) => {
      return formatMenuData(item);
    });
  });

  const route = useRoute();
  const activeRoutePath = ref("");
  const openKeys = ref<string[]>([]);

  watch(
    () => route.path,
    (currentRoutePath: string) => {
      const matchedRouteReg = Object.keys(activeMenuRules).find((reg) => {
        const targetRoute = activeMenuRules[reg];
        if (typeof targetRoute === "string") {
          return pathToRegexp(reg).test(targetRoute);
        }
        if (typeof targetRoute.name === "string") {
          return pathToRegexp(reg).test(namePathMapping[targetRoute.name]);
        }
        return false;
      });

      let activeRoute = currentRoutePath;
      if (matchedRouteReg) {
        const matchedRoute = activeMenuRules[matchedRouteReg];
        if (typeof matchedRoute === "string") {
          activeRoute = matchedRoute;
        } else if (typeof matchedRoute.name === "string") {
          activeRoute = namePathMapping[matchedRoute.name];
        }
      }

      let activeUrlSegments: string[] = [];
      const currentRouteMenu = pathToMenu.value[activeRoute];
      if (currentRouteMenu) {
        const { pathStack } = currentRouteMenu;
        pathStack.forEach((itemPath) => {
          activeUrlSegments = activeUrlSegments.concat(urlToList(itemPath));
        });
      } else {
        activeUrlSegments = urlToList(currentRoutePath);
      }

      activeRoutePath.value = activeRoute;
      openKeys.value = activeUrlSegments;
    },
    {
      immediate: true,
    },
  );

  return {
    computedMenuData,
    pathToMenu,
    activeRoutePath,
    openKeys,
  };
};
