<template>
  <div class="grid grid-cols-3 gap-5">
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
      class="flex items-center justify-center p-5 bg-slate-100 hover:bg-slate-200 rounded-lg h-24"
      @click="discourse.current = discourseItem.id"
    >
      <h2 class="text-l font-bold">
        {{ discourseItem?.attributes.title
        }}<span v-if="discourseItem?.attributes?.opinions?.data.length > 0">
          ({{ discourseItem?.attributes?.opinions?.data.length }})</span
        >
      </h2>
      <div
        class="
          flex
          items-center
          justify-center
          w-6
          h-6
          -my-10
          rounded-full
          ml-auto
          hover:bg-red-500 hover:text-white
        "
        @click.prevent="removeDiscourse(discourseItem.id)"
      >
        <font-awesome-icon :icon="['fas', 'times']" fixed-width class="fa-xs" />
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
import { discourse } from '@/composables/states'
const discourses = reactive(discourse.all)
const { delete: remove } = useStrapi4()

const removeDiscourse = (id) => {
  remove('discourses', id).then(
    ({ data }) => (discourse.all = discourse.all.filter((e) => e.id !== data.id))
  )
}
</script>

<style>
</style>