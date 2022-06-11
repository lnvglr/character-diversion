<template>
	<div class="flex items-center relative select-none">
		<svg v-if="path || frame" :style="`width: ${fontSize}em; min-width: ${fontSize}em; transform: ${transform}`"
			:viewBox="viewBox.join(' ')" class="pointer-events-none" ref="svgFrame"></svg>
		<svg v-if="path || frame" :style="`width: ${fontSize}em; min-width: ${fontSize}em; transform: ${transform}`"
			:viewBox="viewBox.join(' ')" class="h-full absolute" ref="svg" @pointerleave="$state.opinion.annotationTool.id = null">
			<GlyphsGrid v-if="grid" :width="characterWidth" :strokeWidth="strokeWidth" :scale="scale" />
			<GlyphsFrame v-if="frame" :scale="scale" :end="characterWidth" :strokeWidth="strokeWidth" />
			<GlyphsGlyph v-if="path" :path="path" :scale="scale" :class="{ 'fill-info-500': intersection }"
				:strokeWidth="strokeWidth" />
			<GlyphsGlyph v-if="pathAlt" :path="pathAlt" :scale="scale" :class="'fill-alert-500'" :strokeWidth="strokeWidth" />
			<GlyphsAnnotationTool
				v-if="annotations"
				:edit="edit"
				:glyph="glyph"
				:strokeWidth="strokeWidth"
				:pointer="pointer"
				:height="height"
				:scaling="scaling"
				:offset="offset"
			/>
		</svg>
		<div v-if="!path" class="font-user absolute w-full left-0 text-center pointer-events-none"
			style="padding-bottom: 0.24em;">{{ glyph.value }}</div>
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
		grid: {
			type: Boolean,
			default: false,
		},
		pathClass: {
			type: String,
		},
		intersection: {
			type: Boolean,
			default: false,
		},
		watcher: Array
	},
	data() {
		return {
			baselineOffset: 0,
			decomposed: null,
			decomposedAlt: null,
			strokeWidth: '1px',
			scaling: 1,
			height: 0,
			pointer: {},
		}
	},
	mounted() {
		if (this.$refs.svgFrame && this.$refs.svg) {
			this.setScaling()
			this.$refs.svg.addEventListener('pointermove', ({ offsetX, offsetY }) => { this.pointer = { x: offsetX, y: offsetY } })
		}
	},
	watch: {
		watcher: {
			handler() {
				this.setScaling()
				this.decomposedAlt = this.intersection && this.glyph.decompose(this.$f.glyphMethods.getTupleValue(1))
			},
			deep: true,
		},
		tuple: {
			handler() {
				this.decomposed = this.glyph.decompose(this.$f.glyphMethods.getTupleValue(0))
				this.decomposedAlt = this.intersection && this.glyph.decompose(this.$f.glyphMethods.getTupleValue(1))
			},
			deep: true,
			immediate: true
		},
	},
	computed: {
		path() {
			return this.decomposed?.svgPath()
		},
		pathAlt() {
			return this.intersection && typeof this.decomposedAlt?.svgPath === 'function' && this.decomposedAlt.svgPath()
		},
		points() {
			return this.decomposed?.points
		},
		characterWidth() {
			const [limits] = this.points.slice(-3, -2)
			return limits[0]
		},
		width() {
			this.characterWidth + this.glyph.font.unitsPerEm * 2
		},
		scale() {
			return 1
			// return 1000 / this.glyph.font.unitsPerEm
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
		offset() {
			return {
				x: this.glyph.font.unitsPerEm * 10,
				y: this.glyph.font.unitsPerEm / 4
			}
		},
		viewBox() {
			return [
				this.boundaries[0] - this.offset.x / 2,
				-this.offset.y,
				this.boundaries[1] + this.offset.x,
				this.glyph.font.unitsPerEm + this.offset.y
			]
		},
		fontSize() {
			return (this.characterWidth + this.offset.x) / this.glyph.font.unitsPerEm
		},
		transform() {
			return `scale(${this.scale},-${this.scale})`
		}
	},
	methods: {
		setScaling() {
			if (!window || !this.$refs.svg) return
			const style = window.getComputedStyle(this.$refs.svg)
			this.$nextTick(() => {
				this.scaling = (this.glyph.font.unitsPerEm / parseInt(style.fontSize))
				this.strokeWidth = this.scaling + 'px'
				this.height = (this.$refs.svg.getBoundingClientRect().height - this.$refs.svgFrame.getBoundingClientRect().height) / 2
			})

		}
	}
}
</script>
<style scoped>
svg {
	/* background: rgba(255, 0, 0, 0.1) */
}
</style>