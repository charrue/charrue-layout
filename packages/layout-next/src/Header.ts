import { defineComponent, h, PropType } from "vue";
import Hamburger from "./Hamburger";
import { Logo } from "./Logo";

const Header = defineComponent({
  name: "CharrueLayoutHeader",
  props: {
    fixedHeader: {
      type: Boolean,
      default: true,
    },
    collapse: {
      type: Boolean,
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
  },
  emits: ["update:collapse"],
  setup(props, { emit }) {
    const toggleSideBar = () => {
      emit("update:collapse", !props.collapse);
    };

    return {
      toggleSideBar,
    };
  },
  render() {
    return h(
      "div",
      {
        class: ["cl-header-root", this.fixedHeader ? "cl-header-root--fixed" : ""],
        style: this.$attrs.style,
      },
      [
        h(
          "div",
          {
            class: "cl-header-body",
          },
          [
            h(
              "div",
              {
                class: "cl-header__left",
              },
              [
                h(Logo, {
                  logo: this.logo,
                  title: this.title,
                  homeRoute: this.homeRoute,
                }),
                this.showTrigger &&
                  h(Hamburger, {
                    isActive: this.collapse === false,
                    onChange: this.toggleSideBar,
                  }),
                this.$slots.headerLeft && this.$slots.headerLeft(),
              ],
            ),
            h(
              "div",
              {
                class: "cl-header__right",
              },
              [this.$slots.headerRight ? this.$slots.headerRight() : null],
            ),
          ],
        ),
      ],
    );
  },
});

export default Header;
