<template>
  <component
    :is="tag || 'div'"
    class="relative card rounded-lg bg-beige-50 dark:bg-neutral-800 dark:text-white flex flex-1 duration-75"
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
