<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { discourse } from '@/composables/states'
export default {
  setup() {

    definePageMeta({
      name: 'Discourse',
      icon: 'bars-progress',
      order: 3,
    })
  },
  async mounted() {
    const { data: all } = await this.$strapi.find('discourses', { populate: ['featuredImage', 'author', 'opinions.author', 'opinions.comments.author'] })
    this.$state.discourse.all = all
    this.$state.discourse.current = discourse.current || discourse.all[0]
  }
}

</script>

<style>
</style>