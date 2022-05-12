<template>
  <nav class="fixed bottom-0 w-full bg-slate-100 border-t border-t-slate-200">
    <ul :class="`flex flex-row justify-around p-5 max-w-2xl mx-auto`">
      <li v-for="route in routes" :key="route">
        <NuxtLink
          :to="route.path"
          class="
            flex flex-col
            items-center
            justify-center
            rounded-lg
            hover:bg-slate-200
            active:text-blue-600
            router-link-active:bg-slate-300
            w-16
            h-16
						md:w-24
						md:h-24
          "
        >
          <font-awesome-icon
            :icon="[route.active ? 'fas' : 'fas', route.icon]"
            fixed-width
            class="fa-xl"
          />
          <span class="text-xs mt-2">{{ route.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  computed: {
    routes() {
      return this.$router.options.routes
        .sort((a, b) => a.meta.order - b.meta.order)
        .map(({ name, meta, path }) => {
          return {
            // name,
            // name: this.$t(name).toHeaderCase(),
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
.router-link-active {
  color: var(--color-blue-600);
}
</style>