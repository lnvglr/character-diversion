<template>
	<div class="grid grid-cols-autofill-16 gap-1 p-1" v-if="$state.configuration.font">
		<div
			class="flex justify-center w-full h-16 bg-white rounded-md relative cursor-pointer border border-beige-100 hover:border-beige-200 hover:bg-neutral-50 overflow-hidden"
			v-for="(glyph, k) in $state.configuration.font.glyphs" :key="glyph.id" :title="glyph.name"
			@mousedown="active = true, $f.glyphMethods.toggleGlyph(glyph.id)"
			@mouseenter="active && $f.glyphMethods.toggleGlyph(glyph.id)">
			<!-- @mousedown="active = true, first = k"
          @mouseenter="active && (last = k)" -->
			<GlyphsMiniGlyph class="text-4xl" :glyph="glyph" :tuple="$state.configuration.axes" :frame="true" />
			<Input type="checkbox" v-model="$state.configuration.glyphs" :value="glyph.id"
				containerClass="absolute w-fit right-0 p-1 pointer-events-none" class="info z-10" />
			<div v-if="glyph.openType?.is"
				class="z-10 absolute bottom-0 right-0 text-xs px-1 m-1 rounded-sm bg-secondary-300/80">{{ glyph.openType.is
				}}
			</div>
			<div
				v-if="hasOpinion(glyph.id).length > 0"
				class="z-10 absolute bottom-0 flex items-center justify-center left-0 text-[0.5rem] font-bold px-1 m-1 rounded-full text-white bg-primary-500/80 w-3 h-3"
				:title="opinionTitles(glyph.id).join(', ')">
				{{ opinionTitles(glyph.id).length
				}}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Opinion } from '~/types'
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
	mounted() {
		window.addEventListener('mouseup', () => this.active = false);
	},
	methods: {
		hasOpinion(id: string) {
			return this.$state.discourse.current.attributes.opinions.data.filter((opinion: Opinion) => opinion.attributes.glyphs.includes(id))
		},
		opinionTitles(id: string) {
			return this.hasOpinion(id).map((opinion: Opinion) => opinion.attributes.title).filter((opinion: Opinion) => opinion)
		},
		select(remove) {
			// select range
			// const selected = [...this.$state.configuration.font.glyphs].slice(this.first, this.last + 1)
			// selected.forEach(e => this.$f.glyphMethods.toggleGlyph(this.$state.configuration.font.glyphs[e.id].id, true))
			// if (remove > this.last) this.$f.glyphMethods.toggleGlyph(remove, false)

		},
	},
}
</script>

<style scoped>
</style>