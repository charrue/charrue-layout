<template>
  <div style="position: relative;">
    <layout
      :data="menuData"
      :route="false"
      :fixed-header="false"
      :absolute="true"
      :collapsed.sync="collapsed"
      :aside-widths="[60, 300]"
    ></layout>
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
