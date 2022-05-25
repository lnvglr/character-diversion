<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts">
import { Discourse, SamsaFont } from "~~/types"

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
    this.$state.discourse.id = all.reduce((acc: Object, curr: Discourse) => ({ ...acc, [curr.id]: curr }), {})
    this.setCurrentDiscourse(this.$route.params.id)
  },
  methods: {
    setCurrentDiscourse(id: string) {
      const current = this.$state.discourse.id[id as keyof typeof discourse.id]
      if (!current) return
      useSamsaFont(current.attributes.font).then((font: SamsaFont) => {
        current.attributes.SamsaFont = font
        console.log(current)
        this.$state.discourse.current = current
      })
    }
  },
  watch: {
    '$route.params.id': {
      handler(id: string) {
        this.setCurrentDiscourse(id)
      },
      deep: true,
      immediate: true
    },
  }
}

</script>

<style>
</style>