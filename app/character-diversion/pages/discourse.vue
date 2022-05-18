<template>
  <NuxtLayout>
    <template #header>Discourse</template>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { discourse } from '@/composables/states'
const { find } = useStrapi4()

definePageMeta({
  name: 'Discourse',
  icon: 'bars-progress',
  order: 3,
})
discourse.all = (
  await find('discourses', { populate: ['author', 'opinions.author', 'opinions.comments.author'] })
).data
console.log(await find('discourses', { populate: ['author', 'opinions.author', 'opinions.comments.author'] }))
discourse.current = discourse.current || discourse.all[0]?.id

</script>

<style>
</style>