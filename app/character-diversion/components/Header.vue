<template>
  <header class="flex items-center py-5 px-10 border-b border-b-slate-200">
    <NuxtLink to="/" class="flex items-center"
      ><Icon name="characterDiversion" class="w-12 mr-5" :class="iconClass" />
      <h1 class="text-2xl font-display"><slot></slot></h1
    ></NuxtLink>
    <div class="flex items-center gap-5 ml-auto">
      <NuxtLink to="/login" v-if="!$user">Login</NuxtLink>
      <NuxtLink to="/register" v-if="!$user"><ButtonDefault>Sign Up</ButtonDefault></NuxtLink>
    </div>
  </header>
</template>
<script>
export default {
  props: {
    iconClass: {
      type: String,
      default: 'text-blue-500',
    },
  },
}
</script>