<template>
  <nav class="
      h-full
      bg-beige-100
      border-t border-beige-200
      sm:border-r sm:border-0
      dark:bg-mint-700 dark:border-mint-900
    ">
    <ul :class="`flex flex-row sm:flex-col justify-around items-center p-4 sm:max-w-2xl sm:h-full mx-auto gap-5`">
      <li v-for="(route, index) in routes" :key="route" :class="{'mb-auto': index === routes.length - 1}" >
        <NuxtLink :to="route.path" class="
            flex flex-col
            items-center
            justify-center
            rounded-lg
            shadow-[0_0_0_0_black]
            duration-100
            border-black
            hover:bg-white
            hover:border-2
            hover:shadow-[5px_5px_0_0_black]
            active:text-primary-600
            w-16
            h-16
            md:w-16 md:h-16
            dark:text-slate-200 dark:hover:bg-slate-600
          ">
          <font-awesome-icon :icon="[route.active ? 'fas' : 'fas', route.icon]" fixed-width class="fa-lg" />
          <span class="text-xs mt-2">{{ route.name }}</span>
        </NuxtLink>

      </li>
      <ButtonTheme class="hidden sm:block mt-auto" :icon="true" :label="false" />
      <Button v-if="!$strapi.user" to="/login" class="hidden sm:block" icon="arrow-right-to-bracket" :label="false" />
      <ButtonLogout v-else class="hidden sm:block hover:bg-alert-500 hover:text-white hover:shadow-none" :icon="true" :label="false" />
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
      console.log(this.$router.options.routes)
      return this.$router.options.routes
        .filter(e => e.meta?.order)
        .sort((a, b) => a.meta.order - b.meta.order)
        .map(({ name, meta, path, memory }) => {
          // console.log(active)
          return {
            // name,
            // name: this.$t(name).toHeaderCase(),
            name: meta?.name || name[0].toUpperCase() + name.slice(1),
            path: memory || path,
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
  color: var(--color-primary-600);
}
:global(.dark .router-link-active) {
  color: var(--color-primary-400);
}
</style>