import { h, defineComponent, computed } from "vue";
import { ElMenuItem, ElSubMenu } from "element-plus";
import { RouterLink } from "vue-router";

const SidebarItem = defineComponent({
  name: "SidebarItem",
  props: {
    menuItem: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const menuChildren = computed<any[]>(() => {
      const children = props.menuItem && props.menuItem.children;
      return Array.isArray(children) ? children : [];
    });
    return {
      menuChildren,
    };
  },
  render() {
    const { menuItem, menuChildren } = this;
    const Icon = h("i", {
      class: ["cl-sidebar__menu-icon", menuItem.icon],
    });
    const MenuTitle = h(
      "span",
      {
        class: "cl-sidebar__menu-title",
      },
      menuItem.title,
    );

    return h(
      "div",
      {
        class: "cl-sidebar__menu-children",
      },
      [
        menuChildren.length > 0
          ? h(
              ElSubMenu,
              {
                index: menuItem.path,
                popperAppendToBody: true,
                "popper-class": "cl-sidebar__submenu-popper",
              },
              {
                title: () =>
                  h(
                    "div",
                    {
                      class: [
                        "cl-sidebar__submenu-title",
                        menuItem.icon ? "cl-sidebar__submenu-icon-title" : "",
                      ],
                    },
                    [Icon, MenuTitle],
                  ),
                default: () =>
                  menuChildren.map((child: any, index: number) => {
                    return h(SidebarItem, {
                      key: `menu-item-${child.path}-${index}`,
                      menuItem: child,
                    });
                  }),
              },
            )
          : h(
              RouterLink,
              {
                to: menuItem.path,
                class: "cl-sidebar__menu-link",
              },
              {
                default: () =>
                  h(
                    ElMenuItem,
                    {
                      index: menuItem.path,
                    },
                    {
                      default: () => Icon,
                      title: () => MenuTitle,
                    },
                  ),
              },
            ),
      ],
    );
  },
});
export default SidebarItem;
