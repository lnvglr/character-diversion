<template>
  <header class="flex items-center py-5 px-10 border-b border-b-beige-200">
    <NuxtLink to="/" class="flex items-center"
      ><Icon name="characterDiversion" class="text-2xl" :class="iconClass" />
      <h1 class="text-2xl font-display"><slot></slot></h1
    ></NuxtLink>
    <div v-if="!$strapi.user" class="flex items-center gap-5 ml-auto">
      <Button to="/login" class="clear">Login</Button>
      <Button to="/register">Sign Up</Button>
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
