<template>
  <div class="grid grid-cols-3 -m-10 h-screen">
    <div class="p-10 col-span-2">
      <div class="mb-10">
        <h1 class="text-3xl font-bold">{{ currentDiscourse.attributes.title }}</h1>
        <!-- <pre>{{currentDiscourse}}</pre> -->
      </div>

		  <FormKit type="text" placeholder="Glyphs" v-model="string" />
      <Samsa :tuple="[tuple0[0], tuple1[0]]" :tupleAlt="[tuple0[1], tuple1[1]]" :string="string" />
    </div>

    <div class="border-l">
      <h3 class="text-lg font-bold p-5">Opinions ({{ currentOpinions?.length }})</h3>
      <p class="text-sm font-bold p-5 border-b">Discourse: {{ currentDiscourse?.id }}</p>
      <Opinion
        v-for="opinion in currentOpinions"
        :key="opinion"
        :opinion="opinion"
        @remove="removeOpinion(opinion.id)"
        @click="opinionHover(opinion)"
      />
      <div class="p-5">
        <Input
          type="text"
          placeholder="New opinion..."
          v-model="newOpinion"
          v-on:keyup.enter="postOpinion"
        />
        <Input
          type="range"
          step="0.01"
          min="0"
          max="1"
          v-model="tuple0"
          label="PSYA"
        />
        <Input
          type="range"
          step="0.01"
          min="0"
          max="1"
          label="SHLD"
          v-model="tuple1"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { discourse } from '@/composables/states'
import type { Strapi4Response } from '@nuxtjs/strapi/dist/runtime/types'
import type { Opinion } from '@/types'

const route = useRoute()
const currentDiscourse = computed(() => discourse.all.find(({ id }) => id == route.params.id))

const { find, create, delete: remove } = useStrapi4()

const removeDiscourse = (id) => {
  remove('discourses', id).then(({ data }) => {
    discourse.all = discourse.all.filter((e) => e.id !== data.id)
  })
}


const currentOpinions = computed(() => currentDiscourse.value?.attributes.opinions?.data)
const newOpinion = ref('')
const tuple0 = ref([0,1])
const tuple1 = ref([0,1])
const string = ref('jתm')

const removeOpinion = (id) => {
  remove<Strapi4Response<Opinion>>('opinions', id).then(({ data }) => {
    currentDiscourse.value.attributes.opinions.data =
      currentDiscourse.value.attributes.opinions.data.filter((e) => e.id !== data.id)
  })
}
const opinionHover = (opinion: Opinion) => {
  string.value = opinion.attributes.glyphs?.join('') || string.value
  console.log(tuple0.value)
  tuple0.value = opinion.attributes.tuple?.[0]
  tuple1.value = opinion.attributes.tuple?.[1]
  console.log(tuple0.value)
}
const postOpinion = () => {
  if (newOpinion.value == '') return
  const opinion = {
    title: newOpinion.value,
    fonts: null,
    glyphs: string.value.split(''),
    tuple: [tuple0.value, tuple1.value],
    discourse: currentDiscourse.value
  }
  create<Strapi4Response<Opinion>>('opinions', opinion).then(({data}) => {
    if (currentDiscourse.value.attributes.opinions?.data) {
      currentDiscourse.value.attributes.opinions.data.push(data)
    } else {
      currentDiscourse.value.attributes.opinions = {
        data: [data]
      }
    }
    newOpinion.value = ''
  })
}
</script>

<style>
</style>