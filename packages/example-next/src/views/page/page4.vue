<template>
  <div style="position: relative">
    <charrue-layout v-model:collapse="collapsed" :data="menuData" :absolute="true"></charrue-layout>
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
          path: "/foo",
          title: "标题1",
        },
        {
          path: "/bar",
          title: "标题2",
        },
      ],
    };
  },
};
</script>
