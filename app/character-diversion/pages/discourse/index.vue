<template>
<div class="">
  <div class="flex w-full p-10">
    <h1 class="text-4xl font-bold">Discover Discourses</h1>
    <NuxtLink to="/discourse/new" key="remove" class="
        ml-auto
      ">
      <Button icon="plus">New Discourse</Button>
    </NuxtLink>
  </div>
  <div class="grid grid-cols-3 gap-5 p-10">
    <NuxtLink v-for="(discourseItem, id) in $state.discourse.id" :key="discourseItem.id" :to="`/discourse/${discourseItem.id}`"
      class="flex flex-col justify-start p-5 rounded-md border border-beige-300 bg-beige-50 hover:bg-white h-24 shadow-[5px_5px_0_0_black] hover:shadow-[10px_10px_0_0_black] duration-100">
      <h2 class="text-xl font-bold">
        {{ discourseItem?.attributes.title }}
      </h2>
      <span> {{ discourseItem?.attributes.author.data?.attributes.name }}</span>
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