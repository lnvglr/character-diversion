<template>
  <div class="flex items-center p-2 pt-1 hover:bg-slate-100 cursor-pointer border-b" v-if="opinion">
    <div class="flex flex-col gap-2">
      <p class="text-sm font-bold">{{ opinion.attributes.title }}</p>
      <!-- <div class="flex gap-1">
        <small
          class="flex items-center justify-center bg-slate-200 w-5 h-5 rounded-sm"
          v-for="glyph in opinion.attributes.glyphs"
          :key="glyph"
          >{{ glyph }}</small
        >
      </div> -->
      <span class="flex gap-2 items-center text-slate-400 text-xs"><img class="w-5 h-5 object-cover rounded-full" src="/images/IMG_6686.jpg" />{{[opinion.attributes.author?.data?.attributes?.name, publishedAt].filter(e => e).join(' · ')}}</span>
    </div>
    <div
      class="
        flex
        items-center
        justify-center
        w-6
        h-6
        -my-10
        rounded-full
        ml-auto
        hover:bg-red-500 hover:text-white
      "
      @click="$emit('remove')"
    >
      <font-awesome-icon :icon="['fas', 'times']" fixed-width class="fa-xs" />
    </div>
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
    publishedAt() {
      return (new RelativeTime()).from(new Date(this.opinion.attributes.publishedAt))
        // return new Date(this.opinion.attributes.publishedAt).toLocaleString('de', {
        //   year: 'numeric',
        //   month: 'long',
        //   day: 'numeric',
        //   hour: '2-digit',
        //   minute: 'numeric',
        // })
    },
  }
}
</script>

<style>
</style>