<template>
  <component
    :is="tag || 'div'"
    class="relative card rounded-sm bg-beige-50 dark:bg-neutral-800 dark:text-white flex duration-75"
  >
      <slot></slot>
  </component>
</template>

<script lang="ts">
export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },
  },
};
</script>
<style>
</style>
