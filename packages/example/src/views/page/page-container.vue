<template>
  <div>
    <router-view></router-view>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "PageContainer"
};
</script>
