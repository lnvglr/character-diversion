<template>
  <div class="-m-10 flex h-screen" v-if="currentDiscourse">
    <div class="p-10 grow overflow-auto">
      <Samsa :tuple="Object.values(curr.position).map((e, i) => e[0] / curr.axes[i]?.max || 1)"
        :tupleAlt="Object.values(curr.position).map((e, i) => e[1] / curr.axes[i]?.max || 1)" :string="string"
        :font="currentDiscourse.attributes.font" />
    </div>

    <div class="border-l min-w-[360px] overflow-scroll">
      <Image :source="currentDiscourse.attributes.featuredImage" />
      <h1 class="text-3xl font-bold p-5 pb-0">{{ currentDiscourse.attributes.title }}</h1>
      <p class="p-5 pt-1">{{ currentDiscourse.attributes.content }}</p>
      <h3 class="text-lg font-bold p-5">Opinions ({{ currentOpinions?.length }})</h3>
      <Opinion v-for="opinion in currentOpinions" :key="opinion" :opinion="opinion" @remove="removeOpinion(opinion.id)"
        @click="opinionHover(opinion)" />
      <div class="p-5" v-if="$strapi.user">
        <Input type="text" placeholder="Glyphs" v-model="string" />
        <Input type="textarea" placeholder="New opinion..." v-model="newOpinion" v-on:keyup.enter="postOpinion" />
        <Input v-for="axis in curr.axes" :key="axis.tag" type="range" :step="1" :min="axis.min" :max="axis.max"
          v-model="curr.position[axis.tag]" :label="axis.name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core.js'
import type { Opinion } from '@/types'
export default {
  setup() {
    const { find, create, delete: remove } = useStrapi4()
    const curr = reactive({
      axes: null,
      position: {},
    })
    return {
      find, create, remove,
      curr,
      newOpinion: ref(''),
      string: ref('abc')
    }

  },
  mounted() {
    new SamsaFont({
      url: '/fonts/' + this.currentDiscourse?.attributes.font,
      callback: (font: SamsaFont) => {
        this.curr.axes = font.axes
        font.axes.forEach((e) => {
          this.curr.position[e.tag] = [e.min, e.max]
        })
      },
    })
  },
  computed: {
    currentDiscourse() {
      return this.$state.discourse.all.find(({ id }) => id == this.$route.params.id)
    },
    currentOpinions() {
      return this.currentDiscourse?.attributes.opinions?.data
    },
  },
  methods: {
    removeDiscourse(id: string) {
      this.$strapi.delete('discourses', id).then(({ data }) => {
        this.$state.discourse.all = this.$state.discourse.all.filter((e) => e.id !== data.id)
      })
    },
    removeOpinion(id: string) {
      this.$strapi.delete('opinions', id).then(({ data }) => {
        this.currentDiscourse.attributes.opinions.data =
          this.currentDiscourse.attributes.opinions.data.filter((e) => e.id !== data.id)
      })
    },
    opinionHover(opinion: Opinion) {
      this.string = opinion.attributes.glyphs?.join('') || this.string
      this.curr.position = opinion.attributes.tuple
    },
    postOpinion() {
      if (this.newOpinion == '') return
      const opinion = {
        title: this.newOpinion,
        fonts: null,
        glyphs: this.string.split(''),
        tuple: this.curr.position, // @todo: only save those that differ from default
        discourse: this.currentDiscourse,
        author: this.$strapi.user
      }
      this.$strapi.create('opinions', opinion).then(({ data }) => {
          if (this.currentDiscourse.attributes.opinions?.data) {
            this.currentDiscourse.attributes.opinions.data.push(data)
          } else {
            this.currentDiscourse.attributes.opinions = {
              data: [data],
            }
          }
          this.newOpinion = ''
        })
    }
  }
}
</script>

<style>
</style>