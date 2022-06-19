<template>
  <div class="-m-10">
    <Card class="dark:text-white" :hoverable="false">
    <div class="w-full flex items-center justify-between gap-5 p-10">
      <div class="flex flex-col gap-5"><h1 class="lg:text-7xl md:text-5xl sm:text-3xl text-2xl font-bold">{{$t('discover.discourses')}}</h1>
      <p class="max-w-xl">Explore discourses type and discover a new way to delve into the world of typography, one character at a time.</p>
      </div>
      <Button v-if="$strapi.user" to="/discourse/new" key="remove" color="primary" class="
        ml-auto lg" icon="plus">{{$t('new.discourse')}}</Button>
        </div>
    </Card>
    <div class="discourses-container">
      <DiscourseCard v-for="discourseItem in discourses" :key="discourseItem.id" :discourse="discourseItem"
       />
    </div>
  </div>
</template>

<script lang="ts">
import { Discourse } from '~/types'

export default {
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
}
</script>

<style lang="scss">
.discourses-container {
  display: grid;
  // grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); 
  // gap: var(--p-5);
  & > * {
    width: 100%;
    max-width: 100%
  }
}
</style>