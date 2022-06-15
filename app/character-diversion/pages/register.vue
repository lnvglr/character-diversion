<template>
  <NuxtLayout name="split">
    <template #title v-if="!$strapi.user">Join the Discourse</template>
    <FormSignup  v-if="!$strapi.user" />
    <template #title v-if="$strapi.user">{{$t('already.logged.in')}}</template>
    <ButtonLogout color="alert" v-if="$strapi.user" />
  </NuxtLayout>
</template>

<script>
export default defineComponent({
})
</script>

<style>
</style>