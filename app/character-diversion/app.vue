<template>
  <Html :class="`${theme === 'dark' ? 'dark' : ''}`" :lang="locale">
    <Body
      class="
        antialiased
        duration-300
        transition-colors
        text-gray-800
        dark:text-gray-200
        bg-white
        dark:bg-gray-900
      "
    >
      <NuxtPage />
    </Body>
  </Html>
</template>
<script lang="ts" setup>
const theme = ''
const locale = 'en'
definePageMeta({
  name: 'Home',
  icon: 'home',
  order: 1,
  transition: {
    name: 'page',
  },
  keepAlive: {
    exclude: ['modal'],
  },
})
</script>
<style scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>