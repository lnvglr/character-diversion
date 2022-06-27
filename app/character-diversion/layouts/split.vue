<template>
  <Card tag="main" class="flex overflow-auto justify-center h-full">
    <div class="w-full max-w-2xl">
      <div class="px-5 py-24 w-4/5 mx-auto text-left">
        <h1 class="font-bold text-left text-4xl sm:text-6xl mb-10">
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