<template>
  <section class="charrue-content">
    <div class="charrue-content-header">
      <slot name="content-header"></slot>
    </div>
    <div class="charrue-content-body">
      <template v-if="animation">
        <transition name="fade-transform" mode="out-in">
          <slot name="content"></slot>
        </transition>
      </template>
      <template v-else>
        <slot name="content"></slot>
      </template>
    </div>
    <div class="charrue-content-footer">
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
