<template>
  <Html :lang="locale" :class="$colorMode.value">
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
		  <NavBar />
    </Body>
  </Html>
</template>
<script lang="ts" setup>
const locale = 'en'
definePageMeta({
  transition: {
    name: 'page',
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