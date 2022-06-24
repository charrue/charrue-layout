<template>
  <section class="charrue-layout-content-container">
    <div class="charrue-layout-content-header">
      <slot name="content-header"></slot>
    </div>
    <div class="charrue-layout-content-main">
      <template v-if="animation">
        <transition name="fade-transform" mode="out-in">
          <slot name="content"></slot>
        </transition>
      </template>
      <template v-else>
        <slot name="content"></slot>
      </template>
    </div>
    <div class="charrue-layout-content-footer">
      <slot name="content-footer"></slot>
    </div>
  </section>
</template>

<script>
export default {
  name: "LayoutContent",
  props: {
    animation: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
