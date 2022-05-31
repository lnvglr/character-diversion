<template>
	<div class="flex items-center relative">
	<svg
		v-if="path"
		:style="`width: ${fontSize}em; min-width: ${fontSize}em;`"
		:viewBox="viewBox"
		:transform="transform"
		class="h-full"
		>
		<GlyphsG :path="path" :scale="scale" class="fill-black" />
	</svg>
	</div>
</template>
<script lang="ts">
import { SamsaGlyph } from "~~/types"

export default {
	props: {
		glyph: {
			type: Object as () => SamsaGlyph
		},
		tuple: {
			type: Object
		},
		size: {
			type: Number,
			default: 1
		},
		frame: Boolean
	},
	data() {
		return {
			baselineOffset: 0,
			padding: 1000,
		}
	},
	computed: {
		decomposed() {
			return this.glyph.decompose(this.tuple)
		},
		path() {
			return this.decomposed.svgPath()
		},
		points() {
			return this.decomposed.points
		},
		width() {
			const [limits] = this.points.slice(-3, -2)
			return limits[0]
		},
		scale() {
			return 1000 / this.glyph.font.unitsPerEm
		},
		baseline() {
			return this.glyph.points
				.map((pt: number[]) => pt[1])
				.reduce((a: number, b: number) => (a >= b ? a : b), 0)
		},
		viewBox() {
			const offsetY = 0.5
			return `0 ${ + this.baseline * -offsetY} ${this.width} ${1000 + this.baseline * offsetY}`
		},
		fontSize() {
			return this.width / this.glyph.font.unitsPerEm
		},
		transform() {
			return `scale(${this.scale},-${this.scale})`
		}
	}
}
</script>
<style scoped>
svg {
	/* background: rgba(255,0,0,0.1) */
}
</style>