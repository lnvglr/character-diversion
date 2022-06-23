<template>
  <path class="glyph-default" v-if="path" :d="path" :stroke-width="strokeWidth" :class="{outlineActive: glyph}" v-bind="$attrs"></path>
	<g v-if="glyph" class="points">
	<circle v-for="({ cx, cy, r }, i) in circles" :key="i" :cy="cy" :cx="cx" :r="r" class="fill-primary-500"></circle>
	<rect v-for="({ x, y, width, height }, i) in rects" :key="i" :x="x" :y="y" :width="width" :height="height" class="fill-info-500"></rect>
	</g>
</template>
<script lang="ts">
import { SamsaGlyph } from "~/types";

export default defineComponent({
  props: {
    path: {
      type: String,
    },
    strokeWidth: {
      type: String,
      default: "1px",
    },
    glyph: {
      type: [Boolean, Object as () => SamsaGlyph],
      default: false,
    },
    tuple: {
      type: [Boolean, Object as () => any],
      default: false,
    },
  },
	mounted() {
		this.points
	},
	computed: {
		circles() {
			return this.points.filter(({ r }) => r);
		},
		rects() {
			return this.points.filter(({ r }) => !r);
		},
		points() {
			if (!(this.glyph instanceof SamsaGlyph)) return
			const points = this.glyph?.decompose(this.$f.glyphMethods.getTupleValue(1)).points
			const transformed = [] as SVGElement[]
			points.forEach((pt: number[]) => {
				let svgEl = this.getSVGForShape(
					pt,
					pt[2] ? "■" : "●",
					1 * 20);
				if (svgEl) points.push(svgEl);
			})
			console.log(points)
			return points;
		}
	},
  methods: {
    // SVG(tag: string): SVGElement {
    //   return document.createElementNS("http://www.w3.org/2000/svg", tag);
    // },
    getSVGForShape(point: number[], shape: string, size: number): any {
      let svgEl;
      switch (shape) {
        // "■●▲+x"
        case "■":
          svgEl = {
            x: point[0] - size / 2,
            y: point[1] - size / 2,
            width: size,
            height: size,
          }
          break;

        case "●":
					svgEl = {
            cx: point[0],
            cy: point[1],
            r: size / 2,
          }
          break;

        case "▲":
					svgEl = {
            d: `M${point[0]} ${point[1] + size / 2}L${
              point[0] + (size / 2) * 0.86602540378
            } ${point[1] - (size / 2) * 0.5}L${point[0] - (size / 2) * 0.86602540378} ${
              point[1] - (size / 2) * 0.5
            }Z`,
          }
          break;

        case "+":
					svgEl = {
            d: `M${point[0] - size / 2} ${point[1]}L${point[0] + size / 2} ${point[1]}M${
              point[0]
            } ${point[1] - size / 2}L${point[0]} ${point[1] + size / 2}`,
          }
          break;

        case "x":
          svgEl = {
            d: `M${point[0] - size / 2} ${point[1] - size / 2}L${point[0] + size / 2} ${
              point[1] + size / 2
            }M${point[0] - size / 2} ${point[1] + size / 2}L${point[0] + size / 2} ${
              point[1] - size / 2
            }`,
          }
          break;
      }

      return svgEl; // undefined if no shape was set
    },
  },
})
</script>
<style scoped>
:global(:where(.glyph-default)) {
  fill: currentColor;
  mix-blend-mode: multiply;
}
:global(:where(.glyph-default.outlineActive)) {
  fill: var(--color-beige-200);
	stroke: var(--color-black);
}
:global(:where(.dark .glyph-default)) {
  mix-blend-mode: color-dodge;
}
</style>
