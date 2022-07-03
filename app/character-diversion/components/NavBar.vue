<template>
  <!-- bg-beige-100
      border-t border-beige-200
      ltr:sm:border-r rtl:sm:border-l sm:border-0 -->
  <Card tag="nav" class="h-full z-30 relative flex-1">
    <ul
      class="flex flex-row sm:flex-col justify-around items-center p-2 sm:max-w-2xl sm:h-full mx-auto gap-10 sm:gap-5"
    >
      <li
        v-for="(route, index) in routes"
        :key="route.name"
        :class="{ 'sm:mb-auto': index === routes.length - 1 }"
      >
        <NuxtLink
          v-if="route.icon"
          :to="route.path"
          class="flex flex-col items-center justify-center rounded-md duration-100 border-beige-200 hover:bg-beige-100 active:scale-95 active:text-primary-600 w-16 h-16 md:w-16 md:h-16 dark:text-slate-200 dark:hover:bg-neutral-700"
        >
          <ClientOnly>
            <Icon :name="route.icon" class="fa-lg" />
            <span class="text-xs mt-2" v-html="route.name" />
          </ClientOnly>
        </NuxtLink>
      </li>
      <li class="hidden sm:block">
      <Button to="/about" icon="circle-info" color="beige" activeColor="primary" class="active:text-primary-500 text-2xl clear round rounded-full"></Button>
      </li>
      <li>
      <NuxtLink to="/profile" class="sm:mb-3 flex flex-col items-center justify-center w-16 h-16">
          <Image
            :src="$strapi.user.avatar"
            :placeholder="$strapi.user.name[0]"
            size="small"
            class="-mt-1 w-6 h-6 sm:w-8 sm:h-8 text-md border border-beige-200 rounded-full"
          />

          <span class="text-xs mt-2 sm:hidden">{{$t('profile')}}</span>
        </NuxtLink>
        </li>
    </ul>
  </Card>
</template>

<script>
export default defineComponent({
  methods: {
    routerMemory(route, path) {
      if (!route) return;
      this.$router.options.routes.find(
        (e) => e.path == route.matched[0].path
      ).memory = path;
    },
    setMemory(to, from, path = undefined) {
      this.routerMemory(to);
      this.routerMemory(from, path);
    },
  },
  watch: {
    $route: {
      handler(to, from) {
        if (!from?.matched) return;
        const toParent = to.matched[0].path;
        const fromParent = from.matched[0].path;
        this.setMemory(
          to,
          from,
          ![from.path, toParent].includes(fromParent) && from.path
        );
      },
      immediate: true,
    },
  },
  computed: {
    routes() {
      return this.$router.options.routes
        .filter((e) => e.meta?.order)
        .sort((a, b) => a.meta.order - b.meta.order)
        .map(({ name, meta, path, memory }) => {
          path = memory || path;
          if (path === "/profile" && !this.$strapi.user) return {};
          return {
            name: meta?.name || name[0].toUpperCase() + name.slice(1),
            path,
            icon: meta?.icon || name,
            active: this.$route.name === name,
          };
        })
        .filter((e) => e);
    },
  },
});
</script>

<style scoped>
.router-link-active {
  color: var(--color-primary-500);
}
:global(.dark .router-link-active) {
  color: var(--color-primary-400);
}
</style>
