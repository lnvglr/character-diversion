<template>
  <div class="-m-10 flex h-screen" v-if="$state.discourse.current">
    <div class="grow overflow-auto">
      <div class="p-5 flex flex-col gap-5">
        <h1 class="text-6xl font-bold font-user">{{ $state.discourse.current.attributes.title }}</h1>
        <p class="text-sm text-beige-500">{{ [$state.discourse.current.attributes.author?.data?.attributes.name,
          $f.utils.relativeTime($state.discourse.current.attributes.createdAt)].filter(e => e).join(' · ')
        }}</p>
        <p class="text-md">{{ $state.discourse.current.attributes.content }}</p>
      </div>
      <div class="flex px-5 mb-10 ">
        <div class="button-group">
          <Button @click="view = 'selection'" :class="{ active: view === 'selection' }" icon="border-all"
            color="info" />
          <Button @click="view = 'detail'" :class="{ active: view === 'detail' }" icon="eye" color="info" />
          <Button @click="view = 'intersect'" :class="{ active: view === 'intersect' }" icon="diagram-venn"
            color="info" />
        </div>
        <Button @click="edit = !edit" :class="{ active: edit }" class="ml-auto" icon="pen" color="info" />
      </div>

      <div class="px-5" v-if="$state.opinion.font" v-for="axis in $state.opinion.font.axes" :key="axis.tag">
        <Input v-if="$state.opinion.form.attributes.axes && axis.tag in $state.opinion.form.attributes.axes"
          type="range" :step="1" :min="axis.min" :max="axis.max" v-model="$state.opinion.form.attributes.axes[axis.tag]"
          :label="axis.name" class="success" />
      </div>
      <GlyphsSelection v-if="view === 'selection'" />
      <div class="grid grid-cols-autofill-96 gap-1 p-1" v-else-if="view === 'intersect'">
        <Card class="flex justify-center w-full h-96 relative overflow-hidden" v-for="glyph in previewGlyphs"
          :key="glyph.id" :title="glyph.name">
          <GlyphsMiniGlyph class="text-16xl" pathClass="fill-neutral-800 stroke-neutral-900" :glyph="glyph"
            :tuple="$state.opinion.form.attributes.axes" :frame="true" :title="glyph.name" :edit="edit"
            :annotations="true" :intersection="true" />
        </Card>
      </div>
      <div class="grid grid-cols-autofill-64 gap-1 p-1" v-else>
        <Card class="flex justify-center w-full h-64 relative overflow-hidden" v-for="glyph in previewGlyphs"
          :key="glyph.id" :title="glyph.name">
          <GlyphsMiniGlyph class="text-10xl" pathClass="fill-neutral-800 stroke-neutral-900" :glyph="glyph"
            :tuple="$state.opinion.form.attributes.axes" :frame="true" :title="glyph.name" :edit="edit"
            :annotations="true" />
        </Card>
      </div>
      <!-- <div class="grid grid-cols-autofill-64 gap-1 p-1" v-else>
        <Card class="flex justify-center w-full h-64 relative overflow-hidden" v-for="glyph in previewGlyphs"
          :key="glyph.id" :title="glyph.name">
          <GlyphsMiniGlyph class="text-10xl" pathClass="fill-neutral-800 stroke-neutral-900" :glyph="glyph"
            :tuple="$state.opinion.form.attributes.axes" :frame="true" :title="glyph.name" :edit="edit"
            :annotations="true" />
        </Card>
      </div> -->
    </div>

    <DiscourseSidebar />
  </div>
</template>

<script lang="ts">
import { SamsaGlyph } from '@/types'
export default {
  data() {
    return {
      view: 'selection',
      edit: false
    }
  },
  computed: {
    previewGlyphs() {
      const allGlyphs = this.$state.opinion.font.glyphs
      const formGlyphs = this.$state.opinion.form.attributes.glyphs
      const activeGlyphs = this.$state.opinion.active.attributes.glyphs
      if (formGlyphs.length === 0 && activeGlyphs.length === 0) {
        return allGlyphs
      }
      return allGlyphs.filter((e: SamsaGlyph) => formGlyphs.includes(e.id) || activeGlyphs.includes(e.id))
    },
  },
  mounted() {
  },
  methods: {
    removeDiscourse(id: string) {
      this.$strapi.delete("discourses", id).then(({ data }) => delete this.$state.discourse.id[data.id]);
    },
  },
}
</script>

<style lang="scss">
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