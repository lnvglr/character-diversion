<template>
  <Card>
    <header class="flex items-center p-4 md:py-5 md:px-7 gap-2 w-full">
      <NuxtLink to="/" class="flex items-center gap-3 mr-1 sm:mr-3 md:mr-12"
        ><Icon name="characterDiversion" class="text-2xl" :class="iconClass" />
        <h1 class="text-xl md:text-2xl leading-none font-display">Character Diversion</h1
      ></NuxtLink>
      <Button to="/discourse" class="lg clear hidden sm:block" :class="{active: $route.name === 'discourse'}"
        >{{$t('discourse', 2)}}</Button>
      <Button to="/about" class="lg clear hidden sm:block" :class="{active: $route.name === 'about'}"
        >{{$t('about')}}</Button>
      <div v-if="!$strapi.user" class="flex items-center gap-5 ml-auto">
        <Button to="/login" class="clear lg">Login</Button>
        <Button to="/register" class="lg">Sign Up</Button>
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
});
</script>
