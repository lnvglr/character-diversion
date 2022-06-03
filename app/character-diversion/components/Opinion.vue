<template>
  <div v-if="opinion" @click="$emit('clicked')">
    <div class="flex items-center p-2 pt-1 hover:bg-beige-100 cursor-pointer border-b border-beige-300"
      :class="active && 'text-primary-500 bg-beige-100'">
      <div class="flex flex-col gap-2 w-full">

        <div class="relative">
          <span class="absolute top-1 right-0 text-xs">
          <Button v-if="active" class=" ml-auto -mr-1 -my-1 clear xs" @click.stop="removeOpinion()"
            color="alert" icon="trash" /></span>
          <p class="text-sm">{{ opinion.attributes.title }}</p>
          <TransitionExpand>
            <p v-if="active"><span class="mt-2 flex flex-wrap gap-1 items-center text-xs"><span
                  class="bg-beige-200 text-beige-500 px-2 rounded-sm" v-for="glyph in glyphs">{{ glyph }}</span><span
                  class="bg-beige-200 text-beige-500 px-2 rounded-sm" v-if="opinion.attributes.axes.length > 0">{{
                      opinion.attributes.axes
                  }}</span></span></p>
          </TransitionExpand>
        </div>
        <span class="flex gap-2 items-center text-slate-400 text-xs">
          <Image class="w-5 h-5 object-cover rounded-full" :source="opinion.attributes.author?.data?.attributes?.avatar"
            size="thumbnail" />
          <span>{{ [opinion.attributes.author?.data?.attributes?.name, publishedAt].filter(e => e).join(' · ') }}</span>
        </span>
      </div>
    </div>
    <TransitionExpand>
      <div v-if="active && opinion.attributes.comments?.data.length > 0">
        <div class="p-5 border-b border-beige-300 bg-white">
          <div v-for="comment in opinion.attributes.comments?.data" :key="comment.id">{{ comment.attributes.content }}
          </div>
        </div>
      </div>
    </TransitionExpand>
  </div>
</template>

<script>
import RelativeTime from '@yaireo/relative-time'

export default {
  props: {
    opinion: {
      type: Object,
    },
  },
  computed: {
    active() {
      return this.$state.opinion.active.id === this.opinion.id
    },
    glyphs() {
      return this.$f.glyphMethods.getGlyphsById(this.opinion.attributes.glyphs)
    },
    publishedAt() {
      return (new RelativeTime()).from(new Date(this.opinion.attributes.publishedAt))
    },
  },
  methods: {
    removeOpinion() {
      this.$strapi.delete("opinions", this.opinion.id).then(({ data }) => {
        const opinions = this.$state.discourse.current.attributes.opinions
        if (opinions?.data) {
          opinions.data = opinions.data.filter((e) => e.id !== data.id)
        }
      });
    },
  }
}
</script>

<style>
</style>