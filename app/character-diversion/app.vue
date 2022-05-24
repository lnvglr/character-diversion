<template>
  <Html :lang="locale" :class="$colorMode.value">

  <Body class="
        antialiased
        duration-300
        transition-colors
        text-gray-800
        dark:text-gray-200
        bg-white
        dark:bg-gray-900
      ">
    <NuxtPage class="page" />
    <NavBar />
  </Body>

  </Html>
</template>
<script lang="ts">
import { discourse } from '@/composables/states'
export default {
  setup() {
    useNuxtApp().provide('strapi', useStrapi4())
    useNuxtApp().provide('state', { discourse: reactive(discourse) })
    definePageMeta({
      transition: {
        name: 'page',
      },
    })
  },
  data() {
    locale: 'en'
  },
  mounted() {
    useNuxtApp().provide('user', JSON.parse(window.sessionStorage.getItem('userData')))
  }
}

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