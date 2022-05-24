<template>
  <nav class="
      fixed
      bottom-0
      w-full
      bg-slate-100
      h-30
      border-t border-t-slate-200
      dark:bg-slate-800 dark:border-t-slate-600
    ">
    <ul :class="`flex flex-row justify-around p-5 max-w-2xl mx-auto`">
      <li v-for="route in routes" :key="route">
        <NuxtLink :to="route.path" class="
            flex flex-col
            items-center
            justify-center
            rounded-lg
            shadow-[0_0_0_0_black]
            duration-100
            hover:bg-white
            hover:border-2
            hover:border-black
            hover:shadow-[5px_5px_0_0_black]
            active:text-orange-600
            w-16
            h-16
            md:w-24 md:h-24
            dark:text-slate-200 dark:hover:bg-slate-600
          ">
          <font-awesome-icon :icon="[route.active ? 'fas' : 'fas', route.icon]" fixed-width class="fa-xl" />
          <span class="text-xs mt-2">{{ route.name }}</span>
        </NuxtLink>
      </li>
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
.router-link-active {
  color: var(--color-orange-600);
}

:global(.dark .router-link-active) {
  color: var(--color-orange-400);
}
</style>