<template>
  <NuxtLayout>
    <div class="flex flex-col items-start gap-5">
      <h1 class="font-bold text-4xl" v-if="$strapi.user?.name">
        <span>{{$t('greeting', { name: $strapi.user?.name.split(' ')[0] })}}</span>
      </h1>
      <FormLogin v-else/>
      <hr />
      <h3 class="font-bold text-xl">{{$t('appearence')}}</h3>
      <ButtonTheme class="mb-5" />
      <h3 class="font-bold text-xl">{{$t('language', $i18n.availableLocales.length)}}</h3>
      <LanguageSwitcher class="mb-5" />

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