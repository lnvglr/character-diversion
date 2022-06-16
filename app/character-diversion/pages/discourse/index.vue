<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex items-center justify-between gap-5 w-full mb-10 dark:text-white">
      <h1 class="lg:text-8xl md:text-6xl sm:text-4xl text-2xl font-bold">{{$t('discover.discourses')}}</h1>
      <Button v-if="$strapi.user" to="/discourse/new" key="remove" color="primary" class="
        ml-auto lg
      " icon="plus">{{$t('new.discourse')}}</Button>
    </div>
    <div class="discourses-container">
      <DiscourseCard v-for="discourseItem in discourses" :key="discourseItem.id" :discourse="discourseItem"
       />
    </div>
  </div>
</template>

<script lang="ts">
import { Discourse } from '~/types'

export default defineComponent({
  computed: {
    discourses() {
      return Object
        .values(this.$state.discourse.all)
        .sort((a: Discourse, b: Discourse) => {
          return Number(new Date(b.attributes.publishedAt)) - Number(new Date(a.attributes.publishedAt))
        })
    },
  },
  methods: {
  }
})
</script>

<style lang="scss">
.discourses-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  /* grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); */
  gap: var(--p-5);
  & > * {
    width: 100%;
    max-width: 100%
  }
}
</style>