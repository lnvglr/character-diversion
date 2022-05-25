<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  async setup() {
    definePageMeta({
      name: 'Discourse',
      icon: 'bars-progress',
      order: 3,
    })
  },
  async mounted() {
    const { data: all } = await this.$strapi.find('discourses', { populate: ['featuredImage', 'author', 'opinions.author', 'opinions.comments.author'] })
    this.$state.discourse.all = all
  }
}

</script>

<style>
</style>