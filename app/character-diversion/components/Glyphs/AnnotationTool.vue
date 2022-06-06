<template>
	<circle v-for="annotation in allAnnotations" :cx="annotation.x" :cy="annotation.y" :r="radius"
		class="fill-beige-300/10 stroke-beige-400/30 stroke pointer-events-none" :stroke-width="strokeWidth" />
	<circle v-if="show" :cx="pointerPosition.x" :cy="pointerPosition.y" :r="radius / 1.25"
		class="fill-info-500/20 stroke-info-500/70 stroke" :stroke-width="strokeWidth" @click="addAnnotation" />
	<circle v-for="annotation in currentAnnotations" :cx="annotation.x" :cy="annotation.y" :r="radius"
		class="fill-yellow-500/20 stroke-yellow-500/50 stroke hover:fill-alert-500/20 hover:stroke-alert-500/50"
		:class="{ 'pointer-events-none': !edit || $f.utils.arrayContainsObject(allAnnotations, annotation)}"
		:stroke-width="strokeWidth" @click="removeAnnotation(annotation)" @mouseenter="hoverRemove = true"
		@mouseleave="hoverRemove = false" />
</template>
<script lang="ts">
import { SamsaGlyph, Opinion } from "~~/types"
export default {
	props: {
		glyph: {
			type: Object as () => SamsaGlyph
		},
		strokeWidth: {
			type: String,
			default: '1px'
		},
		radius: {
			type: Number,
			default: 150
		},
		pointer: {
			type: Object
		},
		scaling: {
			type: Number
		},
		edit: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			hoverRemove: false,
		}
	},
	methods: {
		removeAnnotation(annotation: object) {
			const annotations = this.$state.opinion.form.attributes.annotations[this.glyph.id]
			annotations.splice(this.$f.utils.arrayContainsObject(annotations, annotation), 1)
			this.hoverRemove = false
		},
		addAnnotation() {
			this.pointerPosition = null
			if (!this.$state.opinion.form.attributes.annotations) {
				this.$state.opinion.form.attributes.annotations = {}
			}
			if (!(this.glyph.id in this.$state.opinion.form.attributes.annotations)) {
				this.$state.opinion.form.attributes.annotations[this.glyph.id] = []
			}
			this.$state.opinion.form.attributes.annotations[this.glyph.id].push({
				x: this.pointerPosition.x,
				y: this.pointerPosition.y,
				// type: 'point'
			})
		},
	},
	computed: {
		currentAnnotations() {
			const currentAnnotations = []
			const formAnnotation = this.$state.opinion.form.attributes.annotations?.[this.glyph.id]
			const activeAnnotation = this.$state.opinion.active.attributes.annotations?.[this.glyph.id]
			if (formAnnotation) {
				currentAnnotations.push(...formAnnotation)
			}
			if (activeAnnotation) {
				currentAnnotations.push(...activeAnnotation)
			}

			return currentAnnotations
		},
		allAnnotations() {
			const annotations = []
			this.$state.discourse.current.attributes.opinions.data.forEach((opinion: Opinion) => opinion.attributes.annotations && opinion.attributes.annotations[this.glyph.id]?.forEach((e) => annotations.push(e)))
			return annotations
		},
		pointerPosition() {
			return this.$state.opinion.annotationTool
		},
		show() {
			return this.edit && this.glyph.id === this.pointerPosition.id && this.pointerPosition.x !== null && this.pointerPosition.y !== null && !this.hoverRemove
		}
	},
	watch: {
		pointer({ x, y }) {
			this.$state.opinion.annotationTool = {
				id: this.glyph.id,
				x: (x * this.scaling) - 1013 | 0,
				y: (y * this.scaling) + (464) - this.scaling * 145 | 0
			}
		}
	}
}
</script>
<style scoped>
svg {
	/* background: rgba(255, 0, 0, 0.1) */
}
</style>