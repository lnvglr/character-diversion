<template>
  <div v-if="opinion">
    <div class="flex items-center p-2 pt-1 hover:bg-beige-100 cursor-pointer border-b border-beige-300 max-w-[360px]"
      :class="active && 'text-primary-500 bg-beige-100'">
      <div class="flex flex-col gap-2 w-full">
        <p class="text-sm font-bold">{{ opinion.attributes.title }}</p>
        <span class="flex gap-1 items-center text-xs"><span class="bg-beige-200 text-beige-500 px-2 rounded-sm"
            v-for="glyph in glyphs">{{ glyph }}</span><span class="bg-beige-200 text-beige-500 px-2 rounded-sm">{{
                opinion.attributes.axes
            }}</span></span>
        <span class="flex gap-2 items-center text-slate-400 text-xs"><img class="w-5 h-5 object-cover rounded-full"
            src="/images/IMG_6686.jpg" />
          <span>{{ [opinion.attributes.author?.data?.attributes?.name, publishedAt].filter(e => e).join(' · ') }}</span>
          <Button class="ml-auto clear small" @click="removeOpinion()" color="alert">remove</Button>
        </span>
      </div>
    </div>
    <div v-if="active && opinion.attributes.comments.data.length > 0" class="p-5 border-b border-beige-300 bg-beige-200">
    <div v-for="comment in opinion.attributes.comments.data" :key="comment.id">{{comment.attributes.content}}</div></div>
  </div>
</template>

<script>
import RelativeTime from '@yaireo/relative-time'

export default {
  props: {
    opinion: {
      type: Object,
    },
    active: Boolean
  },
  computed: {
    glyphs() {
      return this.$f.glyphMethods.getGlyphsById(this.opinion.attributes.glyphs, this.$state.opinion.font)
    },
    publishedAt() {
      return (new RelativeTime()).from(new Date(this.opinion.attributes.publishedAt))
    },
  },
  methods: {
    removeOpinion() {
      this.$strapi.delete("opinions", this.opinion.id).then(({ data }) => {
        const opinions = this.$state.discourse.current.attributes.opinions.data
        opinions = opinions.filter((e) => e.id !== data.id);
      });
    },
  }
}
</script>

<style>
</style>