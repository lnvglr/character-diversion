<template>
	<div class="flex items-center relative" :class="{'cursor-none': edit}">
		<svg v-if="path || frame" :style="`width: ${fontSize}em; min-width: ${fontSize}em;`" :viewBox="viewBox"
			:transform="transform" class="h-full" ref="svg"
			@mouseleave="$state.opinion.annotationTool.id = null"
		>
			<!-- <GlyphsGrid v-if="annotations" :width="characterWidth" :strokeWidth="strokeWidth" :scale="scale" /> -->
			<GlyphsFrame v-if="frame" :scale="scale" :end="characterWidth" :strokeWidth="strokeWidth" />
			<GlyphsG class="glyph-default" v-if="path" :path="path" :scale="scale" :class="pathClass" :strokeWidth="strokeWidth" />
			<GlyphsAnnotationTool v-if="annotations" :edit="edit" :glyph="glyph" :strokeWidth="strokeWidth" :pointer="pointer" :scaling="scaling" />
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
		frame: {
			type: Boolean,
			default: false,
		},
		annotations: {
			type: Boolean,
			default: false,
		},
		edit: {
			type: Boolean,
			default: false,
		},
		pathClass: {
			type: String,
		}
	},
	data() {
		return {
			baselineOffset: 0,
			padding: 1000,
			decomposed: null,
			strokePadding: 1000,
			strokeWidth: '1px',
			scaling: 1,
			pointer: {}
		}
	},
	mounted() {
		if (this.$refs.svg) {
			this.$nextTick(() => {
				this.scaling = (1000 / parseInt(window.getComputedStyle(this.$refs.svg).fontSize))
				this.strokeWidth = this.scaling + 'px'
			})
			this.$refs.svg.addEventListener('mousemove', ({ offsetX, offsetY }) => { this.pointer = { x: offsetX, y: offsetY } })
		}
	},
	watch: {
		tuple: {
			handler() {
				this.decomposed = this.glyph.decompose(this.$f.glyphMethods.getTupleValue(0))
			},
			deep: true,
			immediate: true
		},
	},
	computed: {
		path() {
			return this.decomposed?.svgPath()
		},
		points() {
			return this.decomposed?.points
		},
		characterWidth() {
			const [limits] = this.points.slice(-3, -2)
			return limits[0]
		},
		width() {
			this.characterWidth + this.strokePadding * 2
		},
		scale() {
			return 1000 / this.glyph.font.unitsPerEm
		},
		baseline() {
			return this.points
				.map((pt: number[]) => pt[1])
				.reduce((a: number, b: number) => (a >= b ? a : b), 0)
		},
		boundaries() {
			const xValues = this.points.map((pt: number[]) => pt[0])
			return [Math.min(...xValues), Math.max(...xValues)]
		},
		viewBox() {
			const offsetY = 300
			return `${this.boundaries[0] - this.strokePadding} ${-offsetY} ${this.boundaries[1] + this.strokePadding * 2} ${1000 + offsetY}`
		},
		fontSize() {
			return (this.characterWidth + this.strokePadding * 2) / this.glyph.font.unitsPerEm
		},
		transform() {
			return `scale(${this.scale},-${this.scale})`
		}
	},
}
</script>
<style scoped>
svg {
	/* background: rgba(255, 0, 0, 0.1) */
}
</style>