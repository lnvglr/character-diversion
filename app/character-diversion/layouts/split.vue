<template>
  <main class="flex justify-center h-screen">
    <div class="w-full max-w-2xl">
      <div class="p-5 mt-10 w-4/5 mx-auto text-left">
        <Button :to="back" class="clear mb-5 block" icon="arrow-left" style="width: var(--size)" />
        <h1 class="font-bold text-left text-4xl sm:text-6xl mb-10">
          <slot name="title"></slot>
        </h1>
        <slot></slot>
      </div>
    </div>
  </main>
</template>
<script lang="ts">
export default {
  props: {
    background: {
      type: String,
      default: 'mint',
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
  background: var(--background, var(--color-mint-300));
}
</style>