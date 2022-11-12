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
    const { fixedHeader, toggleSideBar, $attrs, $slots } = this;
    return h(
      "div",
      {
        class: ["charrue-header", fixedHeader ? "fixed-header" : ""],
        style: $attrs.style,
      },
      [
        h(
          "div",
          {
            class: "charrue-header-inner",
          },
          [
            h(
              "div",
              {
                class: "charrue-header-left",
              },
              [
                $slots.headerLeft
                  ? $slots.headerLeft()
                  : h(Hamburger, {
                      onChange: toggleSideBar,
                    }),
              ],
            ),
            h(
              "div",
              {
                class: "charrue-header-right",
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
