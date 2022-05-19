<template>
  <div v-if="glyph">
    <svg
      :style="`--width: ${(limits[0]?.[0] + baselineOffset * 2 * size) / 5}px;`"
      :viewBox="`${-baselineOffset} ${baseline * -0.5} ${limits[0]?.[0] + baselineOffset * 2} ${
        baseline + padding + 400
      }`"
      transform="scale(1,-1)"
    >
      <line
        :x1="-baselineOffset"
        :y1="0"
        x2="100%"
        :y2="0"
        stroke="lightgrey"
        :stroke-width="6 / size"
      />
      <line
        v-if="limits[0]"
        :x1="limits[0]?.[0]"
        :y1="-2000"
        :x2="limits[0]?.[0]"
        :y2="2000"
        stroke="lightgrey"
        :stroke-width="6 / size"
      />
      <line
        v-if="limits[1]"
        :x1="limits[1]?.[0]"
        :y1="-2000"
        :x2="limits[1]?.[0]"
        :y2="2000"
        stroke="lightgrey"
        :stroke-width="6 / size"
      />
      <g v-if="glyphAlt" class="ring"><path :stroke-width="6 / size" :d="glyphAlt" class="stroke-yellow-500 fill-yellow-300/5 hover:fill-yellow-500/50"></path></g>
      <g v-if="glyph"><path :d="glyph" :stroke-width="6 / size"  class="stroke-emerald-500 fill-emerald-500/10 hover:fill-emerald-500/50"></path></g>
      <!-- <g v-if="glyph" class="tangents"><path :d="tangents"></path></g> -->
      <!-- <g v-if="points" v-html="points.join('')"></g> -->
    </svg>
    <!-- <span>{{ points.length }}</span> -->
  </div>
</template>

<script lang="ts">
import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core.js'
import { discourse } from '@/composables/states'

export default {
  name: 'default',
  props: {
    glyphName: {
      type: String,
      default: 'a',
      validator: (value: String) => value.length === 1,
    },
    font: {
      type: String,
    },
    tuple: {
      type: Array,
      default: () => [0.5, 0],
    },
    tupleAlt: {
      type: Array,
      default: () => [0.5, 0],
    },
  },
  data() {
    return {
      size: 1,
      handleSize: 10,
      glyph: null,
      glyphAlt: null,
      tangents: null,
      baseline: 0,
      baselineOffset: 10000,
      points: null,
      limits: [],
      w: 0,
      h: 0,
      padding: 100,
      SamsaFont: null,
      SamsaGlyph: null,
      SamsaGlyphInstance: null,
      throttle: false,
    }
  },
  mounted() {
    this.setup()

    // get input and listen to change
  },
  methods: {
    setup() {
      this.SamsaFont = new SamsaFont({
        url: this.fontUrl,
        callback: (e: SamsaFont) => {
          this.assignGlyph(e.glyphs, this.glyphName)
          // @ts-ignore
          // this.size /= (1000 / e.unitsPerEm)
          // console.log(e)
        },
      })
    },
    updateGlyph() {
      const glyph = this.SamsaGlyph
      if (!glyph) return
      if (!('decompose' in glyph)) return
      if (typeof glyph.decompose !== 'function') return

      // Glyph
      // const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
      // svgPath.setAttribute("d", glyph.decompose(this.tuple).svgPath());
      // this.glyph = svgPath.outerHTML;
      const decomposed = glyph.decompose(this.tuple)
      const decomposedAlt = glyph.decompose(this.tupleAlt)
      this.glyph = decomposed.svgPath()
      this.glyphAlt = decomposedAlt.svgPath()

      // Points
      // const points = glyph.instantiate(this.tuple).points;
      const points = decomposed.points
      this.points = points
        .map((pt: number) => this.getSVGForShape(pt, pt[2] ? '■' : '●', this.handleSize))
        .slice(0, -4)
      this.limits = points.slice(-3, -1)

      // Tangents

      this.tangents = points
        .slice(0, -6)
        .map((t: number[], k: number) => {
          if (points[k + 1]?.[2] !== 0 && t[2] !== 0) return ''
          const l = points[k + 1] ? `l${points[k + 1][0] - t[0]} ${points[k + 1][1] - t[1]}` : ''
          return `M${t[0]} ${t[1]} ${l}`
        })
        .join(' ')
      // console.log(points.map((t: number[]) => `M${t[0]} ${t[1]}`).join(' '))
      // // Baseline
      this.baseline = glyph.points
        .map((pt: number[]) => pt[1])
        .reduce((a: number, b: number) => (a >= b ? a : b), 0)
    },
    assignGlyph(glyphs: SamsaGlyph[], glyph: String) {
      const g = glyphs.map((e) => e.name).includes(glyph) ? glyph : this.toUnicode(glyph)
      // console.log(g)
      if (glyph.length === 1) {
        this.SamsaGlyph = glyphs.find((e) => e.name === g)
        this.SamsaGlyphInstance =
          this.SamsaGlyph?.numContours < 0
            ? this.SamsaGlyph?.decompose(this.tuple)
            : this.SamsaGlyph?.instantiate(this.tuple)
      }
    },
    toUnicode(string: string, prefix: string = 'uni'): string {
      return string
        .split('')
        .map((e) => prefix + `000${e.charCodeAt(0).toString(16).toUpperCase()}`.slice(-4))
        .join('')
    },
    SVG(tag: string) {
      return document.createElementNS('http://www.w3.org/2000/svg', tag)
    },
    setAttributes(el: HTMLElement, attrs: object) {
      Object.keys(attrs).forEach((key) => el.setAttribute(key, attrs[key]))
    },
    getSVGForShape(point: number[], shape: string, size: number) {
      let svgEl
      switch (shape) {
        // "■●▲+x"
        case '■':
          svgEl = this.SVG('rect')
          this.setAttributes(svgEl, {
            x: point[0] - size / 2,
            y: point[1] - size / 2,
            width: size,
            height: size,
            fill: 'burlywood',
          })
          break

        case '●':
          svgEl = this.SVG('circle')
          this.setAttributes(svgEl, {
            cx: point[0],
            cy: point[1],
            r: size / 2,
            fill: 'lightcoral',
          })
          break

        case '▲':
          svgEl = this.SVG('path')
          this.setAttributes(svgEl, {
            d: `M${point[0]} ${point[1] + size / 2}L${point[0] + (size / 2) * 0.86602540378} ${
              point[1] - (size / 2) * 0.5
            }L${point[0] - (size / 2) * 0.86602540378} ${point[1] - (size / 2) * 0.5}Z`,
          })
          break

        case '+':
          svgEl = this.SVG('path')
          this.setAttributes(svgEl, {
            d: `M${point[0] - size / 2} ${point[1]}L${point[0] + size / 2} ${point[1]}M${
              point[0]
            } ${point[1] - size / 2}L${point[0]} ${point[1] + size / 2}`,
          })
          break

        case 'x':
          svgEl = this.SVG('path')
          this.setAttributes(svgEl, {
            d: `M${point[0] - size / 2} ${point[1] - size / 2}L${point[0] + size / 2} ${
              point[1] + size / 2
            }M${point[0] - size / 2} ${point[1] + size / 2}L${point[0] + size / 2} ${
              point[1] - size / 2
            }`,
          })
          break
      }

      return svgEl.outerHTML // undefined if no shape was set
    },
  },
  computed: {
    fontUrl() {
      return '/public/fonts/' + this.font
    },
  },
  watch: {
    font() {
      this.setup()
    },
    glyphName(g: String) {
      this.assignGlyph(this.SamsaFont?.glyphs, g)
    },
    SamsaGlyph() {
      this.updateGlyph()
    },
    tuple() {
      this.updateGlyph()
    },
  },
}
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
}
span {
  font-family: sans-serif;
  position: absolute;
}
div > * {
  width: var(--width);
  min-width: var(--width);
}
svg:deep() path {
  /* color: burlywood; */
  /* fill: rgb(230, 249, 255); */
  /* stroke: black; */
  stroke-width: 2;
}
svg:deep() .tangents path {
  stroke: lightslategray;
}
</style>