<template>
  <component
    :is="tag || 'div'"
    class="bg-black dark:bg-white p-[1px]"
    :class="hoverable ? `hover:p-[3px] duration-100` : ''"
  >
    <div
      class="rounded-lg bg-white dark:bg-neutral-900 dark:text-white flex flex-1 w-full h-full overflow-hidden"
    >
      <slot></slot>
    </div>
  </component>
  <!-- <div class="
		rounded-md
		border
		bg-white
		border-beige-200
		dark:bg-neutral-900
		dark:border-neutral-700
		dark:text-white
		"
		:class="hoverable ? `hover:bg-beige-50 hover:border-beige-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600` : ''"
		>
		<slot></slot>
	</div> -->
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
      default: true,
    },
  },
};
</script>
<style></style>
