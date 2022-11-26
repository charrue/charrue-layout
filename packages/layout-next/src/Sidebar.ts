import { defineComponent, h, PropType } from "vue";
import { RouterLink } from "vue-router";
import { ElMenu } from "element-plus";
import SidebarItem from "./SidebarItem";
import { useLayoutMenuData } from "./helper/useLayoutMenuData";
import { LayoutMenuItem } from "./helper/types";

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
    logo: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    homeRoute: {
      type: [String, Object] as PropType<string | { name: string }>,
      default: "/",
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    activeMenuRules: {
      type: Object,
    },
  },
  setup(props, { slots }) {
    const { computedMenuData, activeRoutePath, openKeys } = useLayoutMenuData(
      props.data,
      props.activeMenuRules,
    );

    return () =>
      h(
        "div",
        {
          class: "charrue-sidebar-root",
        },
        [
          h("div", {
            class: "charrue-sidebar-placeholder",
            style: {
              width: `${props.collapseWidth}px`,
            },
          }),
          h(
            "div",
            {
              class: "charrue-sidebar-inner",
              style: {
                width: `${props.collapseWidth}px`,
                position: props.absolute ? "absolute" : "fixed",
              },
            },
            [
              (props.logo || props.title) &&
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
                        to: props.homeRoute,
                      },
                      {
                        default: () => [
                          props.logo &&
                            h("img", {
                              src: props.logo,
                            }),
                          props.title && h("h1", {}, props.title),
                        ],
                      },
                    ),
                  ],
                ),

              slots.sidebarTop ? slots.sidebarTop() : null,

              h(
                ElMenu,
                {
                  class: "charrue-sidebar-menu-root",
                  mode: "vertical",
                  uniqueOpened: true,
                  collapse: props.collapse,
                  defaultActive: activeRoutePath.value,
                  defaultOpeneds: openKeys.value,
                },
                {
                  default: () =>
                    computedMenuData.value.map((item, index) => {
                      return h(SidebarItem, {
                        key: `${item.path}-${index}`,
                        menuItem: item,
                      });
                    }),
                },
              ),

              slots.sidebarBottom ? slots.sidebarBottom() : null,
            ],
          ),
        ],
      );
  },
});

export default LayoutSidebar;
