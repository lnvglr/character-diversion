<template>
  <NuxtLayout class="bg-beige-100 dark:bg-mint-700">
    <Transition :name="animationName" mode="out-in">
      <NuxtPage />
    </Transition>
  </NuxtLayout>
</template>

<script lang="ts">
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
      populate: ['featuredImage', 'font', 'author', 'opinions.author', 'opinions.comments.author'],
      sort: ['publishedAt:desc'],
    })
    // const discourses = ([...response.data]).reverse();
    const discourses = response.data;
    console.log(discourses)
    this.$state.discourse.id = discourses.reduce((acc: Object, curr: Discourse) => ({ ...acc, [curr.id]: curr }), {})
    this.setCurrentDiscourse(this.$route.params.id)
  },
  methods: {
    setCurrentDiscourse(id: string) {
      const current = this.$state.discourse.id[id as keyof typeof discourse.id]
      if (!current) return
      useSamsaFont(current.attributes.font?.data?.attributes.url)
        .then((font: SamsaFont) => {
          this.$state.opinion.font = font
          this.$state.discourse.current = current
        })
        .catch(e => {
          this.$state.discourse.current = current
        })
    },
  },
  watch: {
    '$route': {
      handler() {
        this.setCurrentDiscourse(this.$route.params.id)
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