<template>
  <div class="-m-10 flex h-screen" v-if="$state.discourse.current">
    <div class="grow overflow-auto">
      <Samsa :tuple="Object.values(axisPosition).map((e, i) => e[0] / axes[i]?.max)"
        :tupleAlt="Object.values(axisPosition).map((e, i) => e[1] / axes[i]?.max)" :string="string"
        :font="$state.discourse.current.attributes.SamsaFont" />
    </div>

    <div class="border-l border-slate-300 min-w-[360px] overflow-scroll">
      <Image :source="$state.discourse.current.attributes.featuredImage" />
      <h1 class="text-3xl font-bold p-5 pb-0">{{ $state.discourse.current.attributes.title }}</h1>
      <p class="p-5 pt-1">{{ $state.discourse.current.attributes.content }}</p>
      <h3 class="text-lg font-bold p-5">Opinions ({{ currentOpinions?.length }})</h3>
      <div class="">
      <Opinion v-for="opinion in currentOpinions" :key="opinion" :opinion="opinion" @remove="removeOpinion(opinion.id)" @click="opinionHover(opinion)" />
      </div>
      <div class="p-5" v-if="$strapi.user">
      <form>
        <Input type="text" placeholder="Glyphs" v-model="string" />
        <Input type="textarea" placeholder="New opinion..." v-model="newOpinion" v-on:keyup.enter="postOpinion" />
        
        <Input v-for="axis in axes" :key="axis.tag" type="range" :step="1" :min="axis.min" :max="axis.max"
          v-model="axisPosition[axis.tag]" :label="axis.name" class="success" />
      </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { SamsaFont, SamsaGlyph, Discourse, Opinion } from '@/types'
export default {
  setup() {
  },
  data() {
    return {
      string: 'abc',
      newOpinion: '',
      axisPosition: {},
    }
  },
  computed: {
    currentDiscourse() {
      return this.$state.discourse.current
    },
    currentOpinions() {
      return this.currentDiscourse?.attributes.opinions?.data
    },
    axes() {
      return this.currentDiscourse?.attributes.SamsaFont.axes
    }
  },
  watch: {
    axes() {
      this.setPosition()
    },
  },
  mounted() {
    this.setPosition()
  },
  methods: {
    setPosition() {
      this.axisPosition = this.currentDiscourse?.attributes.SamsaFont.axes.reduce((acc: Object, curr: SamsaFont['axes']) => ({ ...acc, [curr.tag]: [curr.min, curr.max] }), {})
    },
    removeDiscourse(id: string) {
      this.$strapi.delete('discourses', id).then(({ data }) => delete this.$state.discourse.id[data.id])
    },
    removeOpinion(id: string) {
      this.$strapi.delete('opinions', id).then(({ data }) => {
        this.$state.discourse.current.attributes.opinions.data =
          this.$state.discourse.current.attributes.opinions.data.filter((e) => e.id !== data.id)
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
        discourse: this.$state.discourse.current,
        author: this.$strapi.user
      }
      this.$strapi.create('opinions', opinion).then(({ data }) => {
        if (this.$state.discourse.current.attributes.opinions?.data) {
          this.$state.discourse.current.attributes.opinions.data.push(data)
        } else {
          this.$state.discourse.current.attributes.opinions = {
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