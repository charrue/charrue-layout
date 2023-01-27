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
    layout: {
      type: String as PropType<"side" | "mix">,
      validator: (val: string) => ["side", "mix"].includes(val),
      default: "side",
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
    const hasSidebar = computed(() => props.data?.length > 0);

    const onCollapsedChange = (val: boolean) => {
      innerCollapse.value = val;
      emit("update:collapse", innerCollapse.value);
    };

    const collapseWidth = computed(() => {
      return innerCollapse.value ? props.sidebarWidth[0] : props.sidebarWidth[1];
    });

    const rootClassName = computed(() => {
      return [
        "charrue-layout",
        innerCollapse.value ? "charrue-layout--collapse" : "charrue-layout--opened",
        props.layout === "mix" ? "charrue-layout--mix" : "charrue-layout--side",
      ];
    });
    const rootStyles = computed(() => {
      return {
        "--cl-sidebar-collapsed-width": hasSidebar.value ? `${props.sidebarWidth[0]}px` : 0,
        "--cl-sidebar-opened-width": hasSidebar.value ? `${props.sidebarWidth[1]}px` : "100%",
        "--cl-sidebar-active-width": hasSidebar.value ? `${collapseWidth.value}px` : "100%",
      };
    });

    const headerWidthStyle = computed(() => {
      if (props.layout === "mix" || !hasSidebar.value) {
        return "100%";
      }
      if (props.fixedHeader) {
        return `calc(100% - var(--cl-sidebar-active-width))`;
      }
      return "100%";
    });

    return {
      innerCollapse,
      collapseWidth,
      onCollapsedChange,
      headerWidthStyle,
      rootClassName,
      rootStyles,
    };
  },
  render() {
    return h(
      "div",
      {
        class: this.rootClassName,
        style: this.rootStyles,
      },
      [
        this.data &&
          this.data.length > 0 &&
          h(
            LayoutSidebar,
            {
              collapse: this.innerCollapse,
              data: this.data,
              collapseWidth: this.collapseWidth,
              activeMenuRules: this.activeMenuRules,
              absolute: this.absolute,
              logo: this.layout === "side" ? this.logo : "",
              title: this.layout === "side" ? this.title : "",
              homeRoute: this.homeRoute,
            },
            {
              sidebarTop: this.$slots["sidebar-top"],
              sidebarBottom: this.$slots["sidebar-bottom"],
            },
          ),
        h(
          "div",
          {
            class: "cl-content-root",
          },
          [
            h(
              LayoutHeader,
              {
                style: {
                  width: this.headerWidthStyle,
                },
                showTrigger: this.showTrigger,
                fixedHeader: this.fixedHeader,
                logo: this.layout === "mix" ? this.logo : "",
                title: this.layout === "mix" ? this.title : "",
                homeRoute: this.homeRoute,
                collapse: this.innerCollapse,
                "onUpdate:collapse": this.onCollapsedChange,
              },
              {
                headerLeft: this.$slots["header-left"],
                headerRight: this.$slots["header-right"],
              },
            ),
            h(
              LayoutContent,
              {},
              {
                contentHeader: this.$slots["content-header"],
                content: this.$slots.default,
                contentFooter: this.$slots["content-footer"],
              },
            ),
          ],
        ),
      ],
    );
  },
});

export default Layout;
