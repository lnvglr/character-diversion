<template>
	<!-- pointer -->
	<circle
		v-if="show"
		:cx="pointerPosition.x"
		:cy="pointerPosition.y"
		:r="annotationRadius / 1.25"
		class="fill-success-500/20 stroke-success-500/70 stroke"
		:class="{ 'cursor-none': show }"
		:stroke-width="strokeWidth"
		@click="addAnnotation()"
	/>
	<!-- all annotations -->
	<circle
		v-for="annotation in allAnnotations"
		:cx="annotation.x"
		:cy="annotation.y"
		:r="annotationRadius"
		class="fill-beige-300/10 stroke-beige-400/30 stroke"
		:class="{
			// 'pointer-events-none': edit,
			// 'hover:fill-primary-500/20 hover:stroke-primary-500/70 cursor-pointer': !edit
			'hover:fill-primary-500/20 hover:stroke-primary-500/70 cursor-pointer': true
		}"
		:stroke-width="strokeWidth"
		@click="edit ? addAnnotation(annotation) : activateOpinion(annotation.opinionId)"
		@pointerenter="hoverRemove = true"
		@pointerleave="hoverRemove = false"
	/>


	<!-- newly added annotations -->
	<circle
		v-for="annotation in currentAnnotations"
		:cx="annotation.x"
		:cy="annotation.y"
		:r="annotationRadius"
		class="
			stroke
			fill-primary-500/20
			stroke-primary-500/50
			hover:fill-alert-500/20
			hover:stroke-alert-500/50
		"
		:class="{ 'pointer-events-none': $f.utils.arrayContainsObject(allAnnotations, annotation)}"
		:stroke-width="strokeWidth"
		@click="removeAnnotation(annotation)"
		@pointerenter="hoverRemove = true"
		@pointerleave="hoverRemove = false"
	/>
</template>
<script lang="ts">
import { SamsaGlyph, Opinion, Annotation } from "~/types"
export default defineComponent({
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
			default: 200
		},
		pointer: {
			type: Object
		},
		scaling: {
			type: Number
		},
		height: {
			type: Number,
		},
		edit: {
			type: Boolean,
			default: false
		},
		offset: {
			type: Object
		}
	},
	data() {
		return {
			hoverRemove: false,
		}
	},
	methods: {
		activateOpinion(id: string) {
			const opinions = this.$state.discourse.current.attributes.opinions.data
			const opinion = opinions.find((opinion: Opinion) => opinion.id === id)
			const selected = JSON.parse(JSON.stringify(opinion))
			this.$state.opinion.active = selected
		},
		removeAnnotation(annotation: Annotation) {
			if (this.$state.opinion.active.id, annotation.opinionId) {
				return this.$state.opinion.reset('active')
			}
			const annotations = this.$state.opinion.form.attributes.annotations[this.glyph.id]
			annotations.splice(this.$f.utils.arrayContainsObject(annotations, annotation), 1)
			this.hoverRemove = false
		},
		addAnnotation(annotation = null) {
			// this.$state.opinion.annotationTool = null
			if (!this.$state.opinion.form.attributes.annotations) {
				this.$state.opinion.form.attributes.annotations = {}
			}
			if (!(this.glyph.id in this.$state.opinion.form.attributes.annotations)) {
				this.$state.opinion.form.attributes.annotations[this.glyph.id] = []
			}
			const { x, y } = annotation || this.pointerPosition
			this.$state.opinion.form.attributes.annotations[this.glyph.id].push({ x, y })
			this.$state.opinion.selectedGlyphs = [...new Set([...this.$state.opinion.selectedGlyphs, this.glyph.id])]
		},
		addOpinionId( annotation: Annotation, opinion: Opinion) {
			return { ...annotation, opinionId: opinion.id }
		},
	},
	computed: {
		annotationRadius() {
			const scale = (1 / this.scaling) * 15
			return this.radius / scale
		},
		currentAnnotations() {
			const currentAnnotations = []
			const formAnnotation = this.$state.opinion.form.attributes.annotations?.[this.glyph.id]
			const activeAnnotation = this.$state.opinion.active.attributes.annotations?.[this.glyph.id]
			const add = (a: Annotation, o: Opinion) => this.addOpinionId(a, o)
			if (formAnnotation) {
				currentAnnotations.push(...formAnnotation.map((a: Annotation) => add(a, this.$state.opinion.form)))
			}
			if (activeAnnotation) {
				currentAnnotations.push(...activeAnnotation.map((a: Annotation) => add(a, this.$state.opinion.active)))
			}
			return currentAnnotations
		},
		allAnnotations() {
			const allAnnotations = []
			const opinions = this.$state.discourse.current.attributes.opinions.data
			opinions.forEach((opinion: Opinion) => {
				const annotations = opinion.attributes.annotations
				if (!annotations) return
				annotations?.[this.glyph.id]?.forEach((annotation: Annotation) => {
					if (this.currentAnnotations.some((a: Annotation) => a.opinionId === opinion.id)) return
					const newAnnotation = this.addOpinionId(annotation, opinion)
					const existingReference = allAnnotations.find(({x, y}) => annotation.x === x && annotation.y === y)
					if (existingReference) return
					allAnnotations.push(this.addOpinionId(annotation, opinion))
				})
			})
			return allAnnotations
		},
		pointerPosition() {
			return this.$state.opinion.annotationTool
		},
		show() {
			return (
				this.edit &&
				this.glyph.id === this.pointerPosition.id &&
				this.pointerPosition.x !== null &&
				this.pointerPosition.y !== null &&
				!this.hoverRemove
			)
		}
	},
	watch: {
		pointer({ x, y }) {
			this.$state.opinion.annotationTool = {
				id: this.glyph.id,
				x: (x * this.scaling) - this.offset.x / 2 | 0,
				y: (y * this.scaling) - this.height * this.scaling - this.offset.y | 0
			}
		}
	}
})
</script>
<style scoped>
svg {
	/* background: rgba(255, 0, 0, 0.1) */
}
</style>