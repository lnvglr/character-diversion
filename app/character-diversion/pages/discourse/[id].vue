<template>
  <div class="grid grid-cols-3 -m-10 h-screen">
    <div class="p-10 col-span-2">
      <div class="mb-10">
        <h1 class="text-3xl font-bold">{{ currentDiscourse.attributes.title }}</h1>
        <!-- <pre>{{currentDiscourse}}</pre> -->
      </div>

		  <FormKit type="text" placeholder="Glyphs" v-model="string" />
      <Samsa :tuple="Object.values(curr.position).map((e, i) => e[0] / curr.axes[i].max)" :tupleAlt="Object.values(curr.position).map((e, i) => e[1] / curr.axes[i].max)" :string="string" :font="currentDiscourse.attributes.font" />
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
          v-for="axis in curr.axes"
          :key="axis.tag"
          type="range"
          :step="1"
          :min="axis.min"
          :max="axis.max"
          v-model="curr.position[axis.name]"
          :label="axis.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core.js'
import { discourse } from '@/composables/states'
import type { Strapi4Response } from '@nuxtjs/strapi/dist/runtime/types'
import type { Opinion } from '@/types'

const route = useRoute()
const currentDiscourse = computed(() => discourse.all.find(({ id }) => id == route.params.id))

const { find, create, delete: remove } = useStrapi4()

const removeDiscourse = (id: string) => {
  remove('discourses', id).then(({ data }) => {
    discourse.all = discourse.all.filter((e) => e.id !== data.id)
  })
}
const curr = reactive({
  axes: null,
  position: {}
})
new SamsaFont({
  url: '/fonts/' + currentDiscourse.value.attributes.font,
  callback: (font: SamsaFont) => {
    curr.axes = font.axes
    font.axes.forEach(e => {
      curr.position[e.name] = [0, e.max]
    })
    console.log(curr)
    // currentDiscourse.value.attributes.SamsaFont = font
  },
})


const currentOpinions = computed(() => currentDiscourse.value?.attributes.opinions?.data)
const newOpinion = ref('')
const string = ref('jתm')

const removeOpinion = (id) => {
  remove<Strapi4Response<Opinion>>('opinions', id).then(({ data }) => {
    currentDiscourse.value.attributes.opinions.data =
      currentDiscourse.value.attributes.opinions.data.filter((e) => e.id !== data.id)
  })
}
const opinionHover = (opinion: Opinion) => {
  string.value = opinion.attributes.glyphs?.join('') || string.value
  // console.log(tuple0.value)
  // tuple0.value = opinion.attributes.tuple?.[0]
  // tuple1.value = opinion.attributes.tuple?.[1]
  // console.log(tuple0.value)
}
const postOpinion = () => {
  if (newOpinion.value == '') return
  const opinion = {
    title: newOpinion.value,
    fonts: null,
    glyphs: string.value.split(''),
    // tuple: [tuple0.value, tuple1.value],
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