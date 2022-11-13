import { defineComponent, h, PropType } from "vue";
import { RouterLink } from "vue-router";
import { ElMenu } from "element-plus";
import { useProvider } from "./hooks/useLayoutContext";
import SidebarItem from "./SidebarItem";
import { useLayoutMenuData } from "./hooks/useLayoutMenuData";
import { LayoutMenuItem } from "./types";

const LayoutSidebar = defineComponent({
  name: "CharrueLayoutSidebar",
  props: {
    data: {
      type: Array as PropType<LayoutMenuItem[]>,
      default() {
        return [];
      },
    },
    collapseWidth: {
      type: Number,
    },
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const context = useProvider();
    const { computedMenuData, activeRoutePath, openKeys } = useLayoutMenuData(
      props.data,
      context.activeMenuRules,
    );

    return {
      absolute: context.absolute,
      homeRoute: context.homeRoute,
      logo: context.logo,
      title: context.title,

      activeRoutePath,
      openKeys,
      computedMenuData,
    };
  },
  render() {
    const {
      collapse,
      collapseWidth,

      absolute,
      homeRoute,
      logo,
      title,

      activeRoutePath,
      openKeys,
      computedMenuData,

      $slots,
    } = this;

    return h(
      "div",
      {
        class: "charrue-sidebar-root",
      },
      [
        h("div", {
          class: "charrue-sidebar-placeholder",
          style: {
            width: `${collapseWidth}px`,
          },
        }),
        h(
          "div",
          {
            class: "charrue-sidebar-inner",
            style: {
              width: `${collapseWidth}px`,
              position: absolute ? "absolute" : "fixed",
            },
          },
          [
            (logo || title) &&
              h(
                "div",
                {
                  class: "charrue-logo-container",
                },
                [
                  h(
                    RouterLink,
                    {
                      class: "menu-router-link",
                      to: homeRoute,
                    },
                    {
                      default: () => [
                        logo &&
                          h("img", {
                            src: logo,
                          }),
                        title && h("h1", {}, title),
                      ],
                    },
                  ),
                ],
              ),

            $slots.sidebarTop ? $slots.sidebarTop() : null,

            h(
              ElMenu,
              {
                class: "charrue-sidebar-menu-root",
                mode: "vertical",
                uniqueOpened: true,
                collapse,
                defaultActive: activeRoutePath,
                defaultOpeneds: openKeys,
              },
              {
                default: () =>
                  computedMenuData.map((item, index) => {
                    return h(SidebarItem, {
                      key: `${item.path}-${index}`,
                      menuItem: item,
                    });
                  }),
              },
            ),

            $slots.sidebarBottom ? $slots.sidebarBottom() : null,
          ],
        ),
      ],
    );
  },
});

export default LayoutSidebar;
