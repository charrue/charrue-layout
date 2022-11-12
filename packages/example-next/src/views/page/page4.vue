<template>
  <div style="position: relative">
    <charrue-layout
      v-model:collapse="collapsed"
      :source="menuData"
      :route="false"
      :fixed-header="false"
      :absolute="true"
      :aside-widths="[60, 300]"
    ></charrue-layout>
  </div>
</template>

<script>
export default {
  name: "PageFour",
  data() {
    return {
      collapsed: false,
      menuData: [
        {
          path: "标题1",
          title: "标题1",
        },
        {
          path: "标题2",
          title: "标题2",
        },
      ],
    };
  },
};
</script>
