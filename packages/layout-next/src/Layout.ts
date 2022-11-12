import { ref, computed, defineComponent, h, PropType, watch, reactive } from "vue";
import { createProvider } from "./hooks/useLayoutContext";
import LayoutSidebar from "./Sidebar";
import LayoutHeader from "./Header";
import LayoutContent from "./Content";
import { LayoutMenuItem, ActiveMenuRulesType } from "./types";

const Layout = defineComponent({
  name: "CharrueLayout",
  props: {
    source: {
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
    createProvider(
      reactive({
        absolute: props.absolute,
        logo: props.logo,
        title: props.title,
        homeRoute: props.homeRoute,
        activeMenuRules: props.activeMenuRules,
      }),
    );

    const innerCollapse = ref(props.collapse);
    watch(
      () => props.collapse,
      () => {
        innerCollapse.value = props.collapse;
      },
    );
    const onCollapsedChange = () => {
      innerCollapse.value = !innerCollapse.value;
      emit("update:collapse", innerCollapse.value);
    };

    const collapseWidth = computed(() => {
      return props.collapse ? props.sidebarWidth[0] : props.sidebarWidth[1];
    });

    const mainWidthStyle = computed(() => {
      return {
        width: `calc(100% - ${collapseWidth.value}px)`,
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
      source,
      fixedHeader,

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
            source,
            collapseWidth,
          },
          {
            sidebarTop: $slots["sidebar-top"],
            sidebarBottom: $slots["sidebar-bottom"],
          },
        ),
        h(
          "div",
          {
            class: "charrue-layout-body",
            style: mainWidthStyle,
          },
          [
            h(
              LayoutHeader,
              {
                style: headerWidthStyle,
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
