<template>
  <div class="grid grid-cols-3 p-10 gap-5">
    <NuxtLink
      to="/discourse/new"
      key="remove"
      class="
        flex
        items-center
        justify-center
        p-5
        rounded-lg
        text-white
        bg-blue-500
        hover:bg-blue-600
        cursor-pointer
        h-24
      "
    >
      <font-awesome-icon :icon="['fas', 'plus']" class="mr-1"></font-awesome-icon>
      New Discourse
    </NuxtLink>
    <NuxtLink
      v-for="discourseItem in discourse.all"
      :key="discourseItem.id"
      :to="`/discourse/${discourseItem.id}`"
      class="flex items-center justify-center flex-col p-5 bg-slate-100 hover:bg-slate-200 rounded-lg h-24"
      @click="discourse.current = discourseItem.id"
    >
      <h2 class="text-l font-bold">
        {{ discourseItem?.attributes.title
        }}<span v-if="discourseItem?.attributes?.opinions?.data.length > 0">
          ({{ discourseItem?.attributes?.opinions?.data.length }})</span
        >
      </h2>
    </NuxtLink>
  </div>
</template>

<script setup>
import { discourse } from '@/composables/states'
const discourses = reactive(discourse.all)
const { create } = useStrapi4()

const postDiscourse = () => {
  create('discourses', {
    title: (Math.random() + 10).toString(36).substring(2),
  }).then(({ data }) => discourses.push(data))
}
</script>

<style>
</style>