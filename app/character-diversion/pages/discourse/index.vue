<template>
<div>
  <div class="flex w-full p-10"><h1 class="text-4xl font-bold">Discover Discourses</h1>
    <NuxtLink to="/discourse/new" key="remove" class="
        ml-auto
      ">
      <ButtonDefault icon="plus">New Discourse</ButtonDefault>
    </NuxtLink>
  </div>
  <div class="grid grid-cols-3 gap-5 p-10">
    <NuxtLink v-for="(discourseItem, id) in $state.discourse.id" :key="discourseItem.id" :to="`/discourse/${discourseItem.id}`"
      class="flex items-center justify-center p-5 bg-slate-100 hover:bg-slate-200 rounded-lg h-24">
      <h2 class="text-l font-bold">
        {{ discourseItem?.attributes.title
        }}<span v-if="discourseItem?.attributes?.opinions?.data.length > 0">
          ({{ discourseItem?.attributes?.opinions?.data.length }})</span>
      </h2>
      <div class="
          flex
          items-center
          justify-center
          w-6
          h-6
          -my-10
          rounded-full
          ml-auto
          hover:bg-red-500 hover:text-white
        " @click.prevent="removeDiscourse(discourseItem.id)">
        <font-awesome-icon :icon="['fas', 'times']" fixed-width class="fa-xs" />
      </div>
    </NuxtLink>
  </div>
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    removeDiscourse(id: string) {
      this.$strapi.delete('discourses', id).then(({ data }) => (delete discourse.id[data.id]))
    }

  }
}
</script>

<style>
</style>