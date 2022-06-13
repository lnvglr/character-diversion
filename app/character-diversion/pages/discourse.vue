<template>
  <NuxtLayout class="">
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { Discourse, SamsaFont } from "~~/types"

export default {
  setup() {
    definePageMeta({
      name: 'Discourse',
      icon: 'bars-progress',
      order: 3,
      layoutTransition: {
        name: 'page',
      }
    })
  },
  async mounted() {
    this.$state.discourse.fetch()
  },
  watch: {
    '$route': {
      handler() {
        this.$state.discourse.setCurrent(this.$route.params.id)
      },
      immediate: true
    },
    '$state.discourse.current': {
      handler(current: Discourse) {
        if (!current) {
          this.$state.opinion.reset('active')
          return
        }
        const dicourseFont = document.createElement('style');
        dicourseFont.appendChild(document.createTextNode(`@font-face {
          font-family: 'dicourseFont';
          src: url("http://localhost:1337${current.attributes.font.data.attributes.url}");
        }`));
        document.head.appendChild(dicourseFont);
      },
      deep: true
    },
  }
}

</script>

<style>
:where(.font-user) {
  font-family: dicourseFont, var(--font-sans);
}
</style>