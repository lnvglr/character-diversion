<template>
  <header class="flex items-center p-4 md:py-5 md:px-7 border-b-beige-200 w-full">
    <NuxtLink to="/" class="flex items-center gap-3"
      ><Icon name="characterDiversion" class="text-2xl" :class="iconClass" />
      <h1 class="text-xl md:text-2xl leading-none font-display"><slot></slot></h1
    ></NuxtLink>
    <div v-if="!$strapi.user" class="flex items-center gap-5 ml-auto">
      <Button to="/login" class="clear lg">Login</Button>
      <Button to="/register" class="lg">Sign Up</Button>
    </div>
  </header>
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
