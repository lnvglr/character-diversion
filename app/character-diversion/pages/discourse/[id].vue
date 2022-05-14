<template>
  <div class="grid gap-5 p-10">
    <b>{{currentDiscourse.attributes.title}}</b>
    {{currentDiscourse.attributes.content}}<br>
    {{currentDiscourse.attributes?.opinions?.data}}
  </div>
</template>

<script setup>
import { discourse } from '@/composables/states'
const route = useRoute()
const currentDiscourse = computed(() => discourse.all.find(({ id }) => id == route.params.id))

const { delete: remove } = useStrapi4()

const removeDiscourse = (id) => {
  remove('discourses', id).then(({ data }) => {
    discourse.all = discourse.all.filter((e) => e.id !== data.id)
  })
}

</script>

<style>
</style>