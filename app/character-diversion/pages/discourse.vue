<template>
  <NuxtLayout class="bg-beige-100 dark:bg-mint-700">
    <Transition :name="animationName" mode="out-in">
      <NuxtPage />
    </Transition>
  </NuxtLayout>
</template>

<script lang="ts">
import { handleError } from "vue"
import { Discourse, SamsaFont } from "~~/types"

export default {

  setup() {
    definePageMeta({
      name: 'Discourse',
      icon: 'bars-progress',
      order: 3,
    })
  },
  data() {
    return {
      animationName: 'slide-left'

    }
  },
  async mounted() {
    const response = await this.$strapi.find('discourses', {
      populate: ['featuredImage', 'author', 'opinions.author', 'opinions.comments.author'],
      sort: ['publishedAt:desc'],
    })
    // const discourses = ([...response.data]).reverse();
    const discourses = response.data;
    this.$state.discourse.id = discourses.reduce((acc: Object, curr: Discourse) => ({ ...acc, [curr.id]: curr }), {})
    this.setCurrentDiscourse(this.$route.params.id)
  },
  methods: {
    setCurrentDiscourse(id: string) {
      const current = this.$state.discourse.id[id as keyof typeof discourse.id]
      if (!current) return
      useSamsaFont(current.attributes.font)
        .then((font: SamsaFont) => {
          this.$state.configuration.font = font
          this.$state.discourse.current = current
        })
        .catch(e => {
          this.$state.discourse.current = current
          console.error(e.errors)
        })
    },
  },
  watch: {
    '$route': {
      handler(to, from) {
        const to_depth = to?.path.split('/').length
        const from_depth = from?.path.split('/').length
        this.animationName = to_depth < from_depth ? 'slide-right' : 'slide-left'
      },
      immediate: true
    },
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