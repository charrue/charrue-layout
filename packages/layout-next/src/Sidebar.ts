import { defineComponent, h, PropType } from "vue";
import { ElMenu } from "element-plus";
import SidebarItem from "./SidebarItem";
import { useLayoutMenuData } from "./helper/useLayoutMenuData";
import { LayoutMenuItem } from "./helper/types";
import { Logo } from "./Logo";

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
  setup(props) {
    const { computedMenuData, activeRoutePath, openKeys } = useLayoutMenuData(
      props.data,
      props.activeMenuRules,
    );

    return {
      activeRoutePath,
      openKeys,
      computedMenuData,
    };
  },
  render() {
    return h(
      "div",
      {
        class: "cl-sidebar-root",
      },
      [
        h("div", {
          class: "cl-sidebar-placeholder",
          style: {
            width: `${this.collapseWidth}px`,
          },
        }),
        h(
          "div",
          {
            class: "cl-sidebar-body",
            style: {
              width: `${this.collapseWidth}px`,
              position: this.absolute ? "absolute" : "fixed",
            },
          },
          [
            h(Logo, {
              logo: this.logo,
              title: this.title,
              homeRoute: this.homeRoute,
            }),

            this.$slots.sidebarTop ? this.$slots.sidebarTop() : null,

            h(
              ElMenu,
              {
                class: "cl-sidebar-menu-root",
                mode: "vertical",
                uniqueOpened: true,
                collapse: this.collapse,
                defaultActive: this.activeRoutePath,
                defaultOpeneds: this.openKeys,
              },
              {
                default: () =>
                  this.computedMenuData.map((item, index) => {
                    return h(SidebarItem, {
                      key: `${item.path}-${index}`,
                      menuItem: item,
                    });
                  }),
              },
            ),

            this.$slots.sidebarBottom ? this.$slots.sidebarBottom() : null,
          ],
        ),
      ],
    );
  },
});

export default LayoutSidebar;
