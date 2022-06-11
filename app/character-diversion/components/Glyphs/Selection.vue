<template>
	<div
		v-if="$state.opinion.font && $state.opinion.form.attributes"
		class="grid gap-1 p-1"
		:class="`grid-cols-autofill-${gridSize}`"
	>
		<Card
			:hoverable="$state.opinion.formActive"
			class="flex justify-center w-full relative overflow-hidden"
			:class="{
				'opacity-10': dim(glyph.id),
				'cursor-pointer': $state.opinion.formActive,
				[`h-${gridSize}`]: true
			}"
			v-for="(glyph, k) in filteredGlyphs"
			:key="glyph.id"
			@pointerdown="active = toggleGlyph, clickable && $f.glyphMethods.toggleGlyph(glyph.id)"
			@pointerenter="clickable && active && $f.glyphMethods.toggleGlyph(glyph.id)">
			<!-- @pointerdown="active = true, first = k"
          @pointerenter="active && (last = k)" -->
			<GlyphsMiniGlyph
				:class="`text-${fontSize}`"
				:glyph="glyph"
				:tuple="$state.opinion.form.attributes.axes"
				:annotations="annotations"
				:frame="frame"
				:edit="edit"
				:intersection="intersection"
				:watcher="[gridSize]"
				:title="glyph.name"
			/>
			<Input
				v-if="$state.opinion.formActive"
				type="checkbox"
				v-model="$state.opinion.selectedGlyphs"
				:value="glyph.id"
				containerClass="absolute w-fit right-0 p-1"
				class="info z-10"
				@click.prevent
			/>
			<div v-if="$state.opinion.font.glyphMap[glyph.id]"
				class="z-10 absolute bottom-0 right-0 px-1 m-1 rounded-sm bg-beige-200/80"
				:class="{
					'hover:bg-beige-300 cursor-pointer': $state.opinion.formActive,
					'text-xs': gridSize < 30,
					'text-sm': gridSize >= 30,
				}"
				v-html="glyphName(glyph, gridSize < 30)"
				@pointerdown="clickable = false, appendGlyph(glyph)"
				@pointerup="clickable = true"
				:title="$state.opinion.formActive ? $t('insert.into.opinion', { glyph: '/' + glyphName(glyph) }) : ''"
			/>
			<div
				v-if="hasOpinion(glyph.id).length > 0"
				class="z-10 absolute bottom-0 flex items-center justify-center left-0 font-bold px-1 m-1 rounded-full text-white bg-primary-500/80"
				:class="{
					'w-3 h-3 text-[0.5rem] ': gridSize < 30,
					'w-4 h-4 text-xs': gridSize >= 30,
				}"
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
	},
	data() {
		return {
			active: false,
			clickable: true
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
		glyphName(glyph: SamsaGlyph, literal = false) {
			const g = this.$state.opinion.font.glyphMap[glyph.id];
			return literal || g.postScript === '' ? g.literal : g.postScript
		},
		appendGlyph(glyph: SamsaGlyph) {
			if (!this.$state.opinion.formActive) return
			const title = this.$state.opinion.form.attributes.title
			const glyphReference = '/' + this.glyphName(glyph)
			if (!title) return this.$state.opinion.form.attributes.title = glyphReference
			if (title.trim().endsWith(glyphReference)) {
				return this.$state.opinion.form.attributes.title = title.substring(0, title.length - glyphReference.length - 1 )
			}
			this.$state.opinion.form.attributes.title = title.trim() + ' ' + glyphReference
		},
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