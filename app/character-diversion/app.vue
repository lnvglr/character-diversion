<template>
  <Html :lang="$i18n.locale" :class="$colorMode?.value" :dir="direction">

  <Body class="
        antialiased
        duration-300
        transition-colors
        text-neutral-800
        dark:text-neutral-200
        bg-beige-100
        dark:bg-neutral-700
        font-sans
      ">
    <NuxtLayout name="frame">
      <template #header>
        <Transition name="slide">
          <Header class="bg-beige-300 text-black" iconClass="text-black" v-if="showHeader">{{ $route.meta.name }}
          </Header>
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
import { discourse, opinion } from '@/composables/states'
import { glyphMethods, utils } from '@/composables/methods'
export default {
  async setup() {
    const app = useNuxtApp()
    const client = <T>(contentType: string, data?: Partial<T>) => useStrapiClient()(contentType, { method: 'POST', body: data }) as Promise<T>
    const strapi = { ...useStrapi4(), ...useStrapiAuth(), ...useStrapiUser(), client, user: {} }
    strapi.user = await strapi.fetchUser()
    if (!app.$strapi) app.provide('strapi', reactive(strapi))
    if (!app.$state) app.provide('state', reactive({ discourse, opinion }))
    if (!app.$f) app.provide('f', { glyphMethods, utils })

    definePageMeta({
      transition: {
        name: 'page',
      },
    })
  },
  computed: {
    showHeader() {
      return false
      // return !['/discourse', '/', '/profile'].includes(this.$route.matched[0].path)
    },
    direction() {
      return ['he', 'ar'].includes(this.$i18n.locale) ? 'rtl' : 'ltr'
    }
  }
}

</script>
<style>
:where([dir="rtl"] *) {
  text-align: right;
}
:where([lang="he"] *) {
  font-family: var(--font-hebrew);
}
body {
  font-family: var(--font-sans);
}
</style>