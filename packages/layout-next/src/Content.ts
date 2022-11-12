import { defineComponent, h } from "vue";

const LayoutContent = defineComponent({
  name: "CharrueLayoutContent",
  render() {
    const { $slots } = this;
    return h(
      "div",
      {
        class: "charrue-content",
      },
      [
        h(
          "div",
          {
            class: "charrue-content-header",
          },
          [$slots.contentHeader ? $slots.contentHeader() : null],
        ),
        h(
          "div",
          {
            class: "charrue-content-body",
          },
          [$slots.content ? $slots.content() : null],
        ),
        h(
          "div",
          {
            class: "charrue-content-footer",
          },
          [$slots.contentFooter ? $slots.contentFooter() : null],
        ),
      ],
    );
  },
});

export default LayoutContent;
