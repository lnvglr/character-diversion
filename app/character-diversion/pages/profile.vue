<template>
  <NuxtLayout>
    <template #header>Profile</template>
    <div class="flex flex-col items-start gap-5">
      <h1 class="font-bold text-4xl">
        <span v-if="user?.name">Good Morning, {{ user.name.split(' ')[0] }}!</span>
        <span v-else>Login!</span>
      </h1>
      <hr />
      <h3 class="font-bold text-xl">Appearence</h3>
      <ThemeToggle />

      <ButtonDefault @click="logout" class="clear" color="red" v-if="user">Logout</ButtonDefault>
    </div>
  </NuxtLayout>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      name: 'Profile',
      icon: 'user',
      order: 4,
    })
  },
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    this.user = JSON.parse(window.sessionStorage.getItem('userData'))
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('jwt')
      window.sessionStorage.removeItem('userData')
      this.$router.push('/login')
    },
  },
}
</script>

<style>
</style>