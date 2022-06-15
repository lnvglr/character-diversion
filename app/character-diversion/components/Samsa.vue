<template>
  <div class="glyphs" v-if="font">
    <GlyphsGlyph
      v-for="(g, i) in glyphs"
      :key="`${g} ${i}`"
      :glyphName="g"
      :font="font"
      :tuple="tuple"
      :tupleAlt="tupleAlt"
      class="border-b border-r border-beige-200 dark:border-mint-900"
    />
  </div>
</template>

<script lang="ts">
const fonts = import.meta.glob('~/public/fonts/*.{ttf,otf}')
import { SamsaFont, SamsaGlyph } from '~/types'

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
      return [...new Set(this.string.split(''))]
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
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 1fr;
}
/* .glyphs > * {
  border-radius: var(--rounded-lg);
} */
</style>