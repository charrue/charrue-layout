import { ref, computed, defineComponent, h, PropType, watch } from "vue";
import LayoutSidebar from "./Sidebar";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";
import { LayoutMenuItem, ActiveMenuRulesType } from "./helper/types";

const Layout = defineComponent({
  name: "CharrueLayout",
  props: {
    data: {
      type: Array as PropType<LayoutMenuItem[]>,
      default() {
        return [];
      },
    },
    collapse: {
      type: Boolean,
      default: false,
    },
    fixedHeader: {
      type: Boolean,
      default: true,
    },
    showTrigger: {
      type: Boolean,
      default: true,
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
    sidebarWidth: {
      type: Array as PropType<number[]>,
      default() {
        return [54, 200];
      },
    },
    activeMenuRules: {
      type: Object as PropType<ActiveMenuRulesType>,
      default() {
        return {};
      },
    },
  },
  emits: ["update:collapse"],
  setup(props, { emit }) {
    const innerCollapse = ref(props.collapse);
    watch(
      () => props.collapse,
      () => {
        innerCollapse.value = props.collapse;
      },
    );
    const onCollapsedChange = (val: boolean) => {
      innerCollapse.value = val;
      emit("update:collapse", innerCollapse.value);
    };

    const collapseWidth = computed(() => {
      return innerCollapse.value ? props.sidebarWidth[0] : props.sidebarWidth[1];
    });

    const mainWidthStyle = computed(() => {
      return {
        width: `calc(100% - ${collapseWidth.value}px - var(--cl-content-gap-x))`,
      };
    });
    const headerWidthStyle = computed(() => {
      if (props.fixedHeader) {
        return mainWidthStyle.value;
      }
      return { width: "100%" };
    });

    return {
      innerCollapse,
      collapseWidth,
      onCollapsedChange,
      mainWidthStyle,
      headerWidthStyle,
    };
  },
  render() {
    const {
      data,
      fixedHeader,
      showTrigger,
      activeMenuRules,
      homeRoute,
      absolute,
      title,
      logo,

      innerCollapse,
      mainWidthStyle,
      headerWidthStyle,
      collapseWidth,
      onCollapsedChange,

      $slots,
    } = this;

    return h(
      "div",
      {
        class: [
          "charrue-layout",
          innerCollapse ? "charrue-layout--collapse" : "charrue-layout--opened",
        ],
      },
      [
        h(
          LayoutSidebar,
          {
            collapse: innerCollapse,
            data,
            collapseWidth,
            activeMenuRules,
            homeRoute,
            absolute,
            title,
            logo,
          },
          {
            sidebarTop: $slots["sidebar-top"],
            sidebarBottom: $slots["sidebar-bottom"],
          },
        ),
        h(
          "div",
          {
            class: "cl-content-root",
            style: mainWidthStyle,
          },
          [
            h(
              LayoutHeader,
              {
                style: headerWidthStyle,
                showTrigger,
                fixedHeader,
                collapse: innerCollapse,
                "onUpdate:collapse": onCollapsedChange,
              },
              {
                headerLeft: $slots["header-left"],
                headerRight: $slots["header-right"],
              },
            ),
            h(
              LayoutContent,
              {},
              {
                contentHeader: $slots["content-header"],
                content: $slots.default,
                contentFooter: $slots["content-footer"],
              },
            ),
          ],
        ),
      ],
    );
  },
});

export default Layout;
