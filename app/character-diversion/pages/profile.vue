<template>
  <NuxtLayout>
    <div class="flex flex-col items-start gap-5">
      <h1 class="font-bold text-4xl" v-if="$strapi.user?.name">
        <span>Good Morning, {{ $strapi.user?.name.split(' ')[0] }}!</span>
      </h1>
      <FormLogin v-else/>
      <hr />
      <h3 class="font-bold text-xl">Appearence</h3>
      <ButtonTheme />

      <ButtonLogout color="alert" />
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
}
</script>

<style>
</style>