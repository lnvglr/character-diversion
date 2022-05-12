<template>
  <NuxtLayout name="grid">
    <template #header>Discourse: {{discourse.current}}</template>
    <template #sidebar>
      <h3 class="text-l font-bold p-5 border-b">Opinions ({{currentOpinions?.length}})</h3>
      <Opinion v-for="opinion in currentOpinions" :key="opinion" :opinion="opinion" @remove="removeOpinion(opinion.id)"/>
      <div class="p-5"><FormKit type="text" placeholder="New opinion..." v-model="newOpinion" v-on:keyup.enter="postOpinion" /></div>
    </template>
    <div class="flex flex-col p-5">
      <h2 class="text-xl font-bold">{{currentDiscourse.attributes.title}}</h2>
      <p class="text-xl font-bold">{{currentOpinions.map(({id}) => id)}}</p>

      <pre>{{t}}</pre>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { discourse } from '@/composables/states'
definePageMeta({
  name: 'Discourse',
	icon: 'wand-magic-sparkles',
	order: 3
})
const { find, create, delete: remove } = useStrapi4()
const discoursesRaw = (await find('discourses', { populate: ['author', 'opinions.author', 'opinions.comments.author'] })).data
discourse.all = discoursesRaw
discourse.current = discoursesRaw[0].id
// const t = discoursesRaw.reduce((acc, { id, attributes }) => {
//   acc[id] = attributes
//   return acc
// }, {})
const currentDiscourse = computed(() => discourse.all.find(({ id }) => id === discourse.current))
const currentOpinions = computed(() => currentDiscourse.value.attributes.opinions.data)
const newOpinion = ref('')
const removeOpinion = (id) => {
  remove('opinions', id).then(({ data }) => {
    currentDiscourse.value.attributes.opinions.data = currentDiscourse.value.attributes.opinions.data.filter(e => e.id !== data.id);
  })
}
const postOpinion = () => {
  create('opinions', {
    title: newOpinion.value,
    content: newOpinion.value,
    discourse: currentDiscourse.value
  }).then(({data}) => {
    currentDiscourse.value.attributes.opinions.data.push(data)
    newOpinion.value = ''
  })
}
</script>

<style>

</style>