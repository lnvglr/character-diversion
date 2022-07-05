<template>
  <div class="overflow-auto gap-0.5 flex flex-col">
    <Card class="dark:text-white">
    <div class="w-full flex flex-col gap-5 p-5 sm:p-10">
    <div class="w-full flex sm:items-center justify-between gap-5">
      <div class="flex flex-col gap-5"><h1 class="lg:text-7xl md:text-5xl sm:text-3xl text-2xl font-bold leading-none">{{$t('discover.discourses')}}</h1>
      <p class="max-w-xl">Explore discourses type and discover a new way to delve into the world of typography, one character at a time.</p>
      </div>
      <Button v-if="$strapi.user" to="/discourse/new" key="remove" color="primary" class="
        sm:ml-auto lg w-16 sm:w-auto" icon="plus" ><span class="hidden sm:block">{{$t('new.discourse')}}</span></Button>
      </div>
      <Input class="lg" v-model="filterQuery" :placeholder="$t('search.discourses')" />
      </div>
    </Card>

    <transition-group name="list" tag="div" class="discourses-container gap-0.5" :style="{ '--total': discourses.length }">
      <DiscourseCard
        v-for="(item, i) in discourses"
        :key="item.id"
        :discourse="item"
        :style="{'--i': i}" 
      ></DiscourseCard>
    </transition-group>
  </div>
</template>

<script lang="ts">
import { Discourse } from '~/types'

export default defineComponent({
  computed: {
    discourses() {
      const discourses = Object
        .values(this.$state.discourse.all)
        .sort((a: Discourse, b: Discourse) => {
          return Number(new Date(b.attributes.publishedAt)) - Number(new Date(a.attributes.publishedAt))
        }).filter(item => !this.filterQuery || [item.attributes.title, item.attributes.content, item.attributes.author?.data?.attributes.name].join(' ').toLowerCase().indexOf(this.filterQuery) > -1);
      return discourses
    },
  },
  data() {
    return {
      filterQuery: ""
    }
  }
})
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
    max-width: 100%;
    // transition-duration: 1000ms;
  }
}
</style>