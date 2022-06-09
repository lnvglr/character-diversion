<template>
	<div class="grid grid-cols-autofill-16 gap-1 p-1" v-if="$state.opinion.font && $state.opinion.form.attributes">
		<Card
			class="flex justify-center w-full h-16 relative overflow-hidden"
			:class="{'opacity-10': dim(glyph.id)}"
			v-for="(glyph, k) in filteredGlyphs" :key="glyph.id" :title="glyph.name"
			@pointerdown="active = true, $f.glyphMethods.toggleGlyph(glyph.id)"
			@pointerenter="active && $f.glyphMethods.toggleGlyph(glyph.id)">
			<!-- @pointerdown="active = true, first = k"
          @pointerenter="active && (last = k)" -->
			<GlyphsMiniGlyph class="text-4xl" :glyph="glyph" :tuple="$state.opinion.form.attributes.axes" :annotations="true" />
			<Input type="checkbox" v-model="$state.opinion.form.attributes.glyphs" :value="glyph.id"
				containerClass="absolute w-fit right-0 p-1 pointer-events-none" class="info z-10" />
			<div v-if="glyph.openType?.is"
				class="z-10 absolute bottom-0 right-0 text-xs px-1 m-1 rounded-sm bg-secondary-300/80">{{ glyph.openType.is
				}}
			</div>
			<div v-else-if="glyph.openType?.base"
				class="z-10 absolute bottom-0 right-0 text-xs px-1 m-1 rounded-sm bg-secondary-300/80">{{ $f.glyphMethods.getGlyphsById(glyph.openType?.base)}}
			</div>
			<div
				v-if="hasOpinion(glyph.id).length > 0"
				class="z-10 absolute bottom-0 flex items-center justify-center left-0 text-[0.5rem] font-bold px-1 m-1 rounded-full text-white bg-primary-500/80 w-3 h-3"
				:title="opinionTitles(glyph.id).join(', ')">
				{{ opinionTitles(glyph.id).length
				}}
			</div>
		</Card>
	</div>
</template>

<script lang="ts">
import { Opinion, SamsaGlyph } from '~/types'
export default {
	data() {
		return {
			active: false,
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
			return this.$state.opinion.font.glyphs.filter(
				(glyph: SamsaGlyph) => this.$state.opinion.font.glyphMap[glyph.id].literal
			)
		}
	},
	mounted() {
		window.addEventListener('pointerup', () => this.active = false);
	},
	methods: {
		dim(id: number) {
			return (this.$state.opinion.active.attributes.glyphs.length > 0 && !this.$state.opinion.active.attributes.glyphs.find((g: number) => g === id)) || (this.$state.opinion.form.attributes.glyphs.length > 0 && !this.$state.opinion.form.attributes.glyphs.find((g: number) => g === id))
		},
		hasOpinion(id: string) {
			return this.$state.discourse.current.attributes.opinions.data.filter((opinion: Opinion) => opinion.attributes.glyphs.includes(id))
		},
		opinionTitles(id: string) {
			return this.hasOpinion(id).map((opinion: Opinion) => opinion.attributes.title).filter((opinion: Opinion) => opinion)
		},
		select(remove) {
			// select range
			// const selected = [...this.$state.opinion.font.glyphs].slice(this.first, this.last + 1)
			// selected.forEach(e => this.$f.glyphMethods.toggleGlyph(this.$state.opinion.font.glyphs[e.id].id, true))
			// if (remove > this.last) this.$f.glyphMethods.toggleGlyph(remove, false)

		},
	},
}
</script>

<style scoped>
</style>