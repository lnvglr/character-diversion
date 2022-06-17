<template>
	<div
		v-if="$state.opinion.font && $state.opinion.form.attributes"
		class="selection-container grid gap-1 p-1"
		:class="`grid-cols-autofill-${gridSize}`"
	>
		<GlyphContanier
			v-for="glyph in filteredGlyphs"
			:key="glyph.id"
			:glyph="glyph"
			:gridSize="gridSize"
			:fontSize="fontSize"
			:edit="edit"
			:annotations="annotations"
			:intersection="intersection"
			:frame="frame"
			:outline="outline"
		/>
	</div>
	<div class="w-full p-20 flex flex-col items-center justify-center gap-5">
		<span>{{$t('glyphs.shown', { n: filteredGlyphs.length })}}</span>
		<div class="flex items-center justify-center gap-2">
			<Button @click="limit = limit - 100" class="clear lg" v-if="100 < filteredGlyphs.length" icon="minus">Show fewer</Button>
			<Button @click="limit = limit + 100" class="lg" v-if="$state.opinion.font.glyphs.length > limit" icon="plus">Show more</Button>
		</div>
	</div>
</template>

<script lang="ts">
import { Opinion, SamsaGlyph } from '~/types'
import GlyphContanier from '~/components/Glyphs/GlyphContainer.vue'
export default {
	components: { GlyphContanier },
	props: {
		gridSize: {
			type: String,
			default: '16',
		},
		fontSize: {
			type: String,
			default: '2xl',
		},
		frame: {
			type: Boolean,
			default: false,
		},
		annotations: {
			type: Boolean,
			default: true,
		},
		edit: {
			type: Boolean,
			default: false,
		},
		intersection: {
			type: Boolean,
			default: false,
		},
		outline: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			active: false,
			clickable: true,
			opinionFilter: false,
			limit: 100,
			// first: null,
			// last: null
		}
	},
	watch: {
		// first() {
		//   this.select()
		// },
		// last(a, b) {
		//   this.select(b)
		// }
	},
	computed: {
		filteredGlyphs() {
			const glyphs = (
				this.$state.opinion.font.glyphs
				.filter(
					(glyph: SamsaGlyph) => {
						if (
							this.removeEmpty(glyph.id) &&
							// this.$state.opinion.font.glyphMap[glyph.id].literal
							this.filterByVariability(glyph) &&
							this.filterByActive(glyph.id) &&
							this.filterByOpinions(glyph.id) &&
							this.matchGlyphs(glyph.id)
						) {
							return glyph
						}
					}
				)
			)
			return glyphs.slice(0, this.limit)
		}
	},
	mounted() {
		// window.addEventListener('pointerup', () => this.active = false);
	},
	methods: {
		removeEmpty(id: number) {
			const name = this.$state.opinion.font.glyphMap[id].name
			return !['.notdef', '.null', 'space', 'nonmarkingreturn'].includes(name)
		},
		filterByVariability(glyph: SamsaGlyph) {
			if (this.intersection) return glyph.tvts.length > 0
			return true
		},
		filterByOpinions(id: number) {
			if (this.$state.discourse.filter.opinion) return this.hasOpinion(id).length > 0
			return true
		},
		filterByActive(id: number) {
			const active = this.$state.opinion.active.attributes.glyphs
			return active.length === 0 || active.includes(id)
		},
		matchGlyphs(id: number) {
			const q = this.$state.discourse.search?.trim()
			const content = this.$state.opinion.form.attributes.content?.trim()
			let references = content
			if (content === undefined && q !== undefined && q !== '') {
				references = q.split(/(\,|\s)/).filter((e: string) => e !== ' ').map((e: string) => '/' + e).join('')
			}
			const matchedGlyphs = this.$f.glyphMethods.match(references)
			const selectedGlyphs = this.$state.opinion.selectedGlyphs
			return matchedGlyphs.length === 0 || (matchedGlyphs.includes(id) || selectedGlyphs.includes(id))
		},
		glyphName(glyph: SamsaGlyph, literal = false) {
			const g = this.$state.opinion.font.glyphMap[glyph.id];
			return literal || g.postScript === '' ? g.literal : g.postScript
		},
		appendGlyph(glyph: SamsaGlyph) {
			if (!this.$state.opinion.formActive) return
			const content = this.$state.opinion.form.attributes.content
			const glyphReference = '/' + this.glyphName(glyph)
			if (!content) return this.$state.opinion.form.attributes.content = glyphReference
			if (content.trim().endsWith(glyphReference)) {
				return this.$state.opinion.form.attributes.content = content.substring(0, content.length - glyphReference.length - 1)
			}
			this.$state.opinion.form.attributes.content = content.trim() + ' ' + glyphReference
		},
		hasOpinion(id: number) {
			return this.$state.discourse.current.attributes.opinions.data.filter((opinion: Opinion) => opinion.attributes.glyphs.includes(id))
		},
		opinionTitles(id: string) {
			return this.hasOpinion(id).map((opinion: Opinion) => opinion.attributes.content).filter((opinion: Opinion) => opinion)
		},
		// select(remove) {
		// select range
		// const selected = [...this.$state.opinion.font.glyphs].slice(this.first, this.last + 1)
		// selected.forEach(e => this.$f.glyphMethods.toggleGlyph(this.$state.opinion.font.glyphs[e.id].id, true))
		// if (remove > this.last) this.$f.glyphMethods.toggleGlyph(remove, false)
		// },
	},
}
</script>

<style lang="scss">
</style>