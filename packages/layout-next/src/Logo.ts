import { defineComponent, h, PropType } from "vue";
import { RouterLink } from "vue-router";

export const Logo = defineComponent({
  name: "CharrueLayoutLogo",
  props: {
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
  render() {
    return (
      (this.title || this.logo) &&
      h(
        "div",
        {
          class: "cl-logo-container",
        },
        [
          h(
            RouterLink,
            {
              to: this.homeRoute,
            },
            {
              default: () => [
                this.logo &&
                  h("img", {
                    src: this.logo,
                  }),
                this.title &&
                  h(
                    "h1",
                    {
                      style: this.logo ? "" : "margin-left: 0;",
                    },
                    this.title,
                  ),
              ],
            },
          ),
        ],
      )
    );
  },
});
