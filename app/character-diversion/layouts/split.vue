<template>
  <Card tag="main" class="flex overflow-y-auto justify-center h-full">
    <div class="w-full max-w-4xl">
      <div class="p-5 sm:px-5 sm:py-24 sm:w-4/5 mx-auto text-left">
        <h1 v-if="$slots.title" class="font-bold text-left text-4xl sm:text-6xl mb-10">
          <slot name="title"></slot>
        </h1>
        <slot></slot>
      </div>
    </div>
  </Card>
</template>
<script lang="ts">
export default {
  props: {
    background: {
      type: String,
    },
    back: {
      type: String,
      default: '/',
    },
  },
}
</script>
<style lang="scss" scoped>
.background {
  background: var(--background, var(--color-beige-200));
}
</style>