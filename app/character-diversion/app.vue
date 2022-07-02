<template>
  <Html :lang="$i18n.locale" :class="$colorMode?.value" :dir="direction">
    <Body
      class="antialiased duration-300 transition-colors text-neutral-800 dark:text-neutral-200 bg-beige-100 dark:bg-neutral-900 overflow-x-hidden font-sans"
    >
      <Transition name="page">
      <img
        v-if="$route.matched[0].path === '/'"
        src="/images/plastic-c.jpg"
        class="w-screen h-screen absolute z-40 top-0 left-0 object-cover pointer-events-none mix-blend-screen dark:opacity-10"
        :class="{ 'rotate-180': Math.random() < 0.5 }"
      />
      </Transition>
      <NuxtLayout name="frame">
        <template #body>
          <NuxtPage class="page w-full h-full" />
        </template>
      </NuxtLayout>
    </Body>
  </Html>
</template>
<script lang="ts">
import { User } from "~/types";
import { discourse, opinion, presentation } from "~/composables/states";
import { glyphMethods, utils, strapiHelpers } from "~/composables/methods";
export default defineComponent({
  async setup() {
    const app = useNuxtApp();
    const strapi = {
      ...useStrapi4(),
      ...useStrapiAuth(),
      ...useStrapiUser(),
      ...strapiHelpers,
      api: useRuntimeConfig().public.strapi,
      media: useRuntimeConfig().public.media,
      user: {} as User,
    };
    strapi.user = await strapi.fetchUser();
    if (!app.$strapi) app.provide("strapi", reactive(strapi));
    if (!app.$state) app.provide("state", reactive({ discourse, opinion, presentation }));
    if (!app.$f) app.provide("f", { glyphMethods, utils });
    if (app.$strapi.user?.id)
      strapi
        .findOne("users", app.$strapi.user.id, { populate: ["avatar"] })
        .then(({ avatar }) => {
          app.$strapi.user.avatar = avatar;
        })
        .catch((err) => console.error(err));

    definePageMeta({
      pageTransition: {
        name: "page",
      },
    });
  },
  computed: {
    direction(): string {
      return ["he", "ar"].includes(this.$i18n.locale) ? "rtl" : "ltr";
    },
  },
})
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
