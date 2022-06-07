<template>
  <NuxtLayout name="split">
    <div class="flex flex-col items-start gap-5">
      <div v-if="$strapi.user?.name" class="w-full">
        <h1 class="font-bold text-4xl inline">
          {{ $t('greeting', { name: $strapi.user?.name.split(' ')[0] }) }}
        </h1>
        <div class="flex gap-5 mt-10 mb-5 items-center justify-between">
          <h3 class="font-bold text-2xl ">{{ $t('profile') }}</h3><Button class=" clear">{{ $t('edit')
          }}</Button>
        </div>
        <div class="flex gap-5 items-center">
          <Image :src="$strapi.user?.avatar" size="small" class="w-20 border border-beige-200 rounded-full" />
          <div class="flex flex-col">
            <span class="font-bold">{{ $strapi.user.name }}</span>
            <span class="text-neutral-500">{{ $strapi.user.email }}</span>
          </div>
        </div>
        <div class="flex flex-col">
          <!-- <span class="font-bold">{{ $strapi.user.name }}</span> -->
        </div>
        <h3 class="font-bold text-2xl mt-10 mb-5">{{ $t('appearence') }}</h3>
        <ButtonTheme class="mb-5" />
        <h3 class="font-bold text-2xl mt-10 mb-5">{{ $t('language', $i18n.availableLocales.length) }}</h3>
        <LanguageSwitcher class="mb-5" />
        <hr />
        <ButtonLogout color="alert" />
      </div>
      <FormLogin v-else />
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
  async mounted() {

    this.$strapi.user = await this.$strapi.findOne('users', this.$strapi.user.id, { populate: ['avatar'] })
    // console.log(await this.$strapi.findOne('users', this.$strapi.user.id, { populate: ['avatar'] }))
  }
}
</script>

<style>
hr {
  border-top: 1px solid #eaeaea;
  margin: 1.5rem 0;
}

</style>