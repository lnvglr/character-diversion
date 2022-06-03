<template>
  <div class="">
    <main class="flex justify-center h-screen">
      <div class="w-full max-w-2xl">
        <div class="p-5 mt-10 w-4/5 mx-auto text-left">
          <div class="text-left mb-7">
            <NuxtLink to="/">
              <font-awesome-icon class="mr-5" :icon="['fas', 'arrow-left']" />
            </NuxtLink>
          </div>
          <h1 class="font-bold text-left text-4xl sm:text-6xl mb-10"><slot name="title"></slot></h1>
          <slot></slot>
        </div>
      </div>
    </main>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    background: {
      type: String,
      default: 'mint',
    },
  },
}
</script>
<style lang="scss" scoped>
.background {
  background: var(--background, var(--color-mint-300));
}
</style>