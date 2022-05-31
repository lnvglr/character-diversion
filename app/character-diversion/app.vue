<template>
  <Html :lang="locale" :class="$colorMode?.value">

  <Body class="
        antialiased
        duration-300
        transition-colors
        text-gray-800
        dark:text-gray-200
        bg-white
        dark:bg-gray-900
      ">
    <NuxtLayout name="frame">
      <template #header>
        <Transition name="slide">
          <Header class="bg-mint-300 text-black" iconClass="text-black" v-if="showHeader">{{ $route.meta.name }}</Header>
        </Transition>
      </template>
      <template #body>
        <!-- <pre>{{$route}}</pre> -->
        <NuxtPage class="page" />
      </template>
      <template #navigation>
        <NavBar />
      </template>
    </NuxtLayout>
  </Body>

  </Html>
</template>
<script lang="ts">
import { discourse, configuration } from '@/composables/states'
import { glyphMethods, utils } from '@/composables/methods'
export default {
  async setup() {
    const app = useNuxtApp()
    const strapi = { ...useStrapi4(), ...useStrapiAuth(), ...useStrapiUser(), ...useStrapiClient(), user: {} }
    strapi.user = await strapi.fetchUser()
    if (!app.$strapi) app.provide('strapi', reactive(strapi))
    if (!app.$state) app.provide('state', reactive({ discourse, configuration }))
    if (!app.$f) app.provide('f', { glyphMethods, utils })

    definePageMeta({
      transition: {
        name: 'page',
      },
    })
  },
  data() {
    return {
      locale: 'en'
    }
  },
  computed: {
    showHeader() {
      return !['/discourse', '/'].includes(this.$route.matched[0].path)
    }
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