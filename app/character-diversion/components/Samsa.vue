<template>
  <div class="glyphs gap-5" v-if="font">
    <GlyphsGlyph
      v-for="(g, i) in glyphs"
      :key="`${g} ${i}`"
      :glyphName="g"
      :font="font"
      :tuple="tuple"
      :tupleAlt="tupleAlt"
      class="outline outline-black hover:outline-2 duration-100 hover:shadow-[5px_5px_0_0_black]"
    />
  </div>
</template>

<script lang="ts">
const fonts = import.meta.glob('@/public/fonts/*.{ttf,otf}')
import { SamsaFont } from '@/assets/samsa-core.js'

export default {
  name: 'Samsa',
  props: {
    tuple: {
      type: Array,
    },
    tupleAlt: {
      type: Array,
    },
    string: {
      type: String,
      default: 'abcdeftghijklmnopqrstuvwxyz',
    },
    font: {
      type: Object as () => SamsaFont,
    }
  },
  computed: {
    glyphs() {
      return this.string?.split('')
    },
  },
}
</script>

<style>
.double {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1em;
}
.glyphs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-auto-rows: 1fr;
}
.glyphs > * {
  border-radius: var(--rounded-lg);
}
</style>