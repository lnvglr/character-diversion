<template>
  <NuxtLayout name="grid">
    <template #header>Discourse</template>
    <template #sidebar>
      <h3 class="text-lg font-bold p-5">Opinions ({{ currentOpinions?.length }})</h3>
      <p class="text-sm font-bold p-5 border-b">Discourse: {{ currentDiscourse.id }}</p>
      <Opinion
        v-for="opinion in currentOpinions"
        :key="opinion"
        :opinion="opinion"
        @remove="removeOpinion(opinion.id)"
      />
      <div class="p-5">
        <FormKit
          type="text"
          placeholder="New opinion..."
          v-model="newOpinion"
          v-on:keyup.enter="postOpinion"
        />
      </div>
    </template>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type { Opinion } from '@/types'
import { discourse } from '@/composables/states'

const { find, create, delete: remove } = useStrapi4()

definePageMeta({
  name: 'Discourse',
  icon: 'bars-progress',
  order: 3,
})
discourse.all = (
  await find('discourses', { populate: ['author', 'opinions.author', 'opinions.comments.author'] })
).data
discourse.current = discourse.current || discourse.all[0]?.id
const currentDiscourse = computed(() => discourse.all.find(({ id }) => id === discourse.current))
const currentOpinions = computed(() => currentDiscourse.value?.attributes.opinions?.data)
const newOpinion = ref('')

const removeOpinion = (id) => {
  remove('opinions', id).then(({ data }) => {
    currentDiscourse.value.attributes.opinions.data =
      currentDiscourse.value.attributes.opinions.data.filter((e) => e.id !== data.id)
  })
}
const postOpinion = () => {
  if (newOpinion.value == '') return
  console.log(newOpinion.value)
  const opinion: Opinion = {
    attributes: {
      name: newOpinion.value,
      title: newOpinion.value,
      fonts: null,
      glyphs: null,
      spectrum: null,
    },
  }
  create('opinions', opinion).then((res) => {
    console.log(res)
    // currentDiscourse.value.attributes.opinions.data.push(res)
    newOpinion.value = ''
  })
}
</script>

<style>
</style>