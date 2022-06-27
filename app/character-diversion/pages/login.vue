<template>
  <NuxtLayout name="split">
    <template #title>{{$t('login')}}</template>
    <FormLogin />
  </NuxtLayout>
</template>

<script>
export default defineComponent({
  setup() {
    definePageMeta({
      middleware: "auth",
    });
  }
})
</script>

<style>
</style>