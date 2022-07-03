<template>
  <Card class="flex-1">
    <header class="flex items-center p-4 h-16 py-2 sm:py-4 md:py-5 md:px-7 gap-2 w-full">
      <NuxtLink :to="backTo" class="flex items-center gap-3 mr-1 sm:mr-3 md:mr-12"
        >
        <div class="w-6 items-center hidden sm:flex">
          <Icon name="characterDiversion" class="text-2xl" style="--padding: 0" :class="iconClass" />
        </div>
        <div class="w-6 flex items-center sm:hidden">
          <Icon v-if="$route.matched[0].path !== '/'" name="arrow-left" class="clear" style="--padding: 0" />
          <Icon v-else name="characterDiversion" class="text-2xl" :class="iconClass" />
        </div>
        <h1 class="text-xl md:text-2xl leading-none">Character Diversion</h1
      ></NuxtLink>
      <Button to="/discourse" class="lg clear hidden sm:block" :class="{active: $route.name === 'discourse'}"
        >{{$t('discourse', 2)}}</Button>
      <Button to="/about" class="lg clear hidden sm:block" :class="{active: $route.name === 'about'}"
        >{{$t('about')}}</Button>
      <div v-if="!$strapi.user" class="flex items-center gap-5 ml-auto">
        <Button to="/login" v-if="$route.name !== 'login'" class="clear lg">Login</Button>
        <Button to="/register" v-if="$route.name !== 'register'" class="lg hidden sm:block">Sign Up</Button>
      </div>
    </header>
  </Card>
</template>
<script lang="ts">
export default defineComponent({
  props: {
    iconClass: {
      type: String,
      default: "text-primary-500",
    },
  },
  computed: {
    backTo() {
      if (this.breadcrumbs.length > 2) {
        this.breadcrumbs.pop()
        return this.breadcrumbs.join('/')
      } else {
        return '/'
      }
    },
    breadcrumbs() {
      return this.$route.path.split("/")
    }
  },
  methods: {
  }
});
</script>
