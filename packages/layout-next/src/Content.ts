import { defineComponent, h } from "vue";

const LayoutContent = defineComponent({
  name: "CharrueLayoutContent",
  render() {
    const { $slots } = this;
    return h(
      "div",
      {
        class: "cl-content__body",
      },
      [
        h(
          "div",
          {
            class: "cl-content__header",
          },
          [$slots.contentHeader ? $slots.contentHeader() : null],
        ),
        h(
          "div",
          {
            class: "cl-content__main",
          },
          [$slots.content ? $slots.content() : null],
        ),
        h(
          "div",
          {
            class: "cl-content__footer",
          },
          [$slots.contentFooter ? $slots.contentFooter() : null],
        ),
      ],
    );
  },
});

export default LayoutContent;
