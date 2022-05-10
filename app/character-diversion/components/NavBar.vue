<template>
  <nav class="fixed bottom-0 w-full">
    <ul :class="`flex flex-row justify-center gap-5 bg-slate-100 border-t border-t-slate-200 p-5`">
      <li v-for="route in routes" :key="route">
        <NuxtLink
          :to="route.path"
          class="
            flex flex-col
            items-center
            justify-center
            p-5
            rounded-lg
            hover:bg-slate-200
            router-link-active:bg-slate-300
          "
        >
          <font-awesome-icon :icon="[route.active ? 'fas' : 'fas', route.icon]" fixed-width class="fa-xl" />
          <span class="text-xs mt-2">{{ route.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    routes() {
      return this.$router.options.routes
        .sort((a, b) => a.meta.order - b.meta.order)
        .map(({ name, meta, path }) => {
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
.router-link-active {
  color: var(--color-blue-600);
}
</style>