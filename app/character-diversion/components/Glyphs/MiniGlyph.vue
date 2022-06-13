<template>
	<div class="flex items-center relative select-none" ref="container">
		<svg :style="`width: ${fontSize}em; min-width: ${fontSize}em; transform: ${transform}`" :viewBox="viewBox.join(' ')"
			class="pointer-events-none" ref="svgFrame"></svg>
		<svg ref="svg" :style="`width: ${fontSize}em; min-width: ${fontSize}em; transform: ${transform}`"
			class="h-full absolute" @pointerleave="$state.opinion.annotationTool.id = null" :viewBox="viewBox.join(' ')">
			<g v-if="path">
				<GlyphsGrid v-if="grid" :width="characterWidth" :strokeWidth="strokeWidth" />
				<GlyphsFrame v-if="frame" :end="characterWidth" :strokeWidth="strokeWidth" />
				<GlyphsGlyph :path="path" :class="{ 'fill-info-500': intersection }" :strokeWidth="strokeWidth" />
				<GlyphsGlyph v-if="pathAlt" :path="pathAlt" :class="'fill-alert-500'" :strokeWidth="strokeWidth" />
				<GlyphsAnnotationTool v-if="annotations" :edit="edit" :glyph="glyph" :strokeWidth="strokeWidth"
					:pointer="pointer" :height="height" :scaling="scaling" :offset="offset" />
			</g>
		</svg>
		<div v-if="!path" class="font-user absolute w-full left-0 text-center pointer-events-none"
			style="padding-bottom: 0.24em;">{{ glyph.value }}</div>
	</div>
</template>
<script lang="ts">
import { SamsaGlyph } from "@/types"

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
			decomposed: null,
			decomposedAlt: null,
			strokeWidth: '10px',
			transform: 'scale(1,-1)',
			scaling: 1,
			height: 0,
			pointer: {},
			observer: new IntersectionObserver(e => this.checkView(e[0])),
			inView: false,
			pointerListener: null,
		}
	},
	mounted() {
		this.observer.observe(this.$refs.container);
		this.setScaling()
	},
	watch: {
		watcher: {
			handler() {
				this.setScaling()
			},
			deep: true,
		},
		decomposeWatcher: {
			handler() {
				setTimeout(() => {
					if (this.inView) {
						this.decomposed = this.glyph.decompose(this.$f.glyphMethods.getTupleValue(0))
						this.decomposedAlt = this.intersection && this.glyph.decompose(this.$f.glyphMethods.getTupleValue(1))
					}
				}, 0)
			},
			deep: true,
		},
	},
	computed: {
		decomposeWatcher() {
			return [this.tuple, this.inView]
		},
		path() {
			return this.decomposed?.svgPath()
		},
		pathAlt() {
			return this.intersection && typeof this.decomposedAlt?.svgPath === 'function' && this.decomposedAlt.svgPath()
		},
		points() {
			return this.decomposed?.points
		},
		characterWidth(): number {
			return this.$state.opinion.font.widths[this.glyph.id]
		},
		width() {
			this.characterWidth + this.glyph.font.unitsPerEm * 2
		},
		scale() {
			return 1
		},
		boundaries() {
			if (!this.points) return [0, this.characterWidth]
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
		}
	},
	methods: {
		checkView({ isIntersecting }) {
			this.inView = isIntersecting
		},
		setScaling() {
			if (!window || !this.$refs.svg) return
			const style = window.getComputedStyle(this.$refs.svg)
			this.$nextTick(() => {
				this.scaling = (this.glyph.font.unitsPerEm / parseInt(style.fontSize))
				this.strokeWidth = this.scaling + 'px'
				if (!this.pointerListener) this.pointerListener = this.$refs.svg.addEventListener('pointermove', ({ offsetX, offsetY }) => { this.pointer = { x: offsetX, y: offsetY } })

				if (!this.$refs.svgFrame) return
				this.height = (this.$refs.svg.getBoundingClientRect().height - this.$refs.svgFrame.getBoundingClientRect().height) / 2
			})

		}
	}
}
</script>
<style scoped>
</style>