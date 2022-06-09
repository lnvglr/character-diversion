<template>
  <NuxtLayout class="">
    <NuxtPage />
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
      layoutTransition: {
        name: 'page',
      }
    })
  },
  async mounted() {
    const response = await this.$strapi.find('discourses', {
      populate: ['featuredImage', 'font', 'author', 'author.avatar', 'opinions.author', 'opinions.author.avatar', 'opinions.comments.author', 'opinions.comments.author.avatar'],
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
      if (!current) return this.$state.discourse.current = null
      useSamsaFont(current.attributes.font?.data?.attributes.url)
        .then((font: SamsaFont) => {
          this.$state.opinion.font = font
        })
        .catch(e => console.error(e))
        .finally(() => {
          this.$state.discourse.current = current
          // this.animationName = 'slide'
        })
    },
  },
  watch: {
    '$route': {
      handler() {
        this.setCurrentDiscourse(this.$route.params.id)
        // this.animationName === 'page-back'
      },
      immediate: true
    },
    '$state.discourse.current': {
      handler(current: Discourse) {
        if (!current) {
          this.$state.opinion.reset('active')
          return
        }
        const dicourseFont = document.createElement('style');
        dicourseFont.appendChild(document.createTextNode(`@font-face {
          font-family: 'dicourseFont';
          src: url("http://localhost:1337${current.attributes.font.data.attributes.url}");
        }`));
        document.head.appendChild(dicourseFont);
      },
      deep: true
    },
  }
}

</script>

<style>
:where(.font-user) {
  font-family: dicourseFont, var(--font-sans);
}
</style>