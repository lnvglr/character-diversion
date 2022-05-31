<template>
  <div class="-m-10 flex h-screen" v-if="$state.discourse.current">
    <div class="grow overflow-auto">
      <div class="p-5 flex flex-col gap-5">
        <h1 class="text-6xl font-bold">{{ $state.discourse.current.attributes.title }}</h1>
        <p class="text-sm text-beige-500">{{ [$state.discourse.current.attributes.author?.data?.attributes.name,
          $f.utils.relativeTime($state.discourse.current.attributes.createdAt)].filter(e => e).join(' · ')
        }}</p>
        <p class="text-md">{{ $state.discourse.current.attributes.content }}</p>
        <!-- <p class="text-md">{{$f.utils.relativeTime($state.discourse.current.attributes.createdAt)}}</p> -->
      </div>
      <div class="button-group mx-5 mb-10">
        <Button @click="view = 'selection'" :class="{ active: view === 'selection' }" icon="border-all" color="info" />
        <Button @click="view = 'detail'" :class="{ active: view === 'detail' }" icon="eye" color="info" />
      </div>
      <GlyphsSelection v-if="view === 'selection'" />
      <div class="grid grid-cols-autofill-32 gap-1 p-1" v-else>
        <div
          class="flex justify-center w-full h-32 bg-white rounded-md relative cursor-pointer border border-beige-100 overflow-hidden"
          v-for="(glyph, k) in $state.opinion.font.glyphs.filter((e: SamsaGlyph) => $state.opinion.form.attributes.glyphs.includes(e.id))"
          :key="glyph.id" :title="glyph.name">
          <GlyphsMiniGlyph class="text-8xl" :glyph="glyph" :tuple="$state.opinion.form.attributes.axes" :frame="true"
            :title="glyph.name" />
        </div>
      </div>
    </div>

    <DiscourseSidebar />
  </div>
</template>

<script lang="ts">
import { SamsaGlyph } from '@/types'
export default {
  data() {
    return {
      view: 'selection'
    }
  },
  methods: {
    removeDiscourse(id: string) {
      this.$strapi.delete("discourses", id).then(({ data }) => delete this.$state.discourse.id[data.id]);
    },
  },
}
</script>

<style>
.button-group {
  display: flex;
  gap: var(--border-default);

  .button {
    --border-radius: 0;

    &:first-child {
      --border-radius: var(--rounded-md) 0 0 var(--rounded-md);
    }

    &:last-child {
      --border-radius: 0 var(--rounded-md) var(--rounded-md) 0;
    }
  }
}
</style>