<template>
  <component
    :is="tag || 'div'"
    class="bg-beige-600 dark:bg-black p-[1px]"
    :class="hoverable ? `hover:p-[3px] duration-100` : ''"
  >
    <div
      class="rounded-lg bg-beige-50 dark:bg-neutral-800 dark:text-white flex flex-1 w-full h-full overflow-hidden"
    >
      <slot></slot>
    </div>
  </component>
</template>

<script lang="ts">
export default {
  props: {
    tag: {
      type: String,
      default: "div",
    },
    hoverable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style></style>
