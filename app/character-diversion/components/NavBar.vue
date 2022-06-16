<template>
  <nav class="
      h-full
      md:mr-3
      bg-beige-100
      border-t border-beige-200
      ltr:sm:border-r rtl:sm:border-l sm:border-0
      dark:bg-neutral-700 dark:border-neutral-900
    ">
    <ul :class="`flex flex-row sm:flex-col justify-around items-center p-4 sm:max-w-2xl sm:h-full mx-auto gap-5`">
      <li v-for="(route, index) in routes" :key="route" :class="{'mb-auto': index === routes.length - 1}" >
        <NuxtLink v-if="route.icon" :to="route.path" class="
            flex flex-col
            items-center
            justify-center
            rounded-md
            duration-100
            border-beige-200
            hover:bg-white
            hover:border
            active:scale-95
            active:text-primary-600
            w-16
            h-16

            md:w-16 md:h-16
            dark:text-slate-200 dark:hover:bg-slate-600
          "
          >
          <Icon :name="route.icon" class="fa-lg" />
          <span class="text-xs mt-2">{{ route.name }}</span>
        </NuxtLink>

      </li>

      <!-- <LanguageSwitcher class="flex-col w-11 mt-auto" :short="true" />
      <ButtonTheme class="hidden sm:block " :icon="true" :label="false" /> -->
      <Button v-if="!$strapi.user" to="/login" class="hidden sm:block" icon="arrow-right-to-bracket" :label="false" />
      <ButtonLogout v-else class="clear hidden sm:block" color="alert" :icon="true" :label="false" />
    </ul>
  </nav>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$route)
    // console.log(this.$router.options.routes)
  },
  methods: {
    routerMemory(route, path) {
      if (!route) return
      this.$router.options.routes.find(e => e.path == route.matched[0].path).memory = path
    },
    setMemory(to, from, path = undefined) {
      this.routerMemory(to)
      this.routerMemory(from, path)
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        if (!from?.matched) return
        const toParent = to.matched[0].path
        const fromParent = from.matched[0].path
        this.setMemory(to, from, (![from.path, toParent].includes(fromParent)) && from.path)
      },
      immediate: true,
    },
  },
  computed: {
    routes() {
      return this.$router.options.routes
        .filter(e => e.meta?.order)
        .sort((a, b) => a.meta.order - b.meta.order)
        .map(({ name, meta, path, memory }) => {
          path = memory || path
          if (path === '/profile' && !this.$strapi.user) path = '/login'
          return {
            name: meta?.name || name[0].toUpperCase() + name.slice(1),
            path,
            icon: meta?.icon || name,
            active: this.$route.name === name,
          }
        })
    },
  },
}
</script>

<style scoped>
li a:hover {
  /* transform: translate(-2px,-2px); */
}
.router-link-active {
  color: var(--color-primary-500);
}
:global(.dark .router-link-active) {
  color: var(--color-primary-400);
}
</style>