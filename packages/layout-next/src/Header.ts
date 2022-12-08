import { defineComponent, h } from "vue";
import Hamburger from "./Hamburger";

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
    const { collapse, fixedHeader, showTrigger, toggleSideBar, $attrs, $slots } = this;
    return h(
      "div",
      {
        class: ["cl-header-root", fixedHeader ? "cl-header-root--fixed" : ""],
        style: $attrs.style,
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
                showTrigger &&
                  h(Hamburger, {
                    isActive: collapse === false,
                    onChange: toggleSideBar,
                  }),
                $slots.headerLeft && $slots.headerLeft(),
              ],
            ),
            h(
              "div",
              {
                class: "cl-header__right",
              },
              [$slots.headerRight ? $slots.headerRight() : null],
            ),
          ],
        ),
      ],
    );
  },
});

export default Header;
