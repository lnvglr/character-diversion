<template>
	<div ref="container">
		<Card :hoverable="$state.opinion.formActive" class="card flex justify-center w-full relative overflow-hidden"
			:class="{
				'opacity-10': dim(glyph.id),
				'cursor-pointer': $state.opinion.formActive,
				[`h-${gridSize}`]: true,
			}" @pointerdown="active = toggleGlyph, clickable && $f.glyphMethods.toggleGlyph(glyph.id)"
			@pointerenter="clickable && active && $f.glyphMethods.toggleGlyph(glyph.id)">
			<GlyphsMiniGlyph v-if="inView" :class="`glyph text-${fontSize}`" :glyph="glyph"
				:tuple="$state.opinion.form.attributes.axes" :annotations="annotations" :frame="frame" :edit="edit"
				:intersection="intersection" :watcher="[gridSize, intersection]" :title="glyph.name" />
			<Input v-if="$state.opinion.formActive" type="checkbox" v-model="$state.opinion.selectedGlyphs" :value="glyph.id"
				containerClass="absolute w-fit right-0 p-1" :containerClass="{
					'hide': !$state.opinion.selectedGlyphs.includes(glyph.id)
				}" class="info z-10" @click.prevent />
			<div v-if="$state.opinion.font.glyphMap[glyph.id]"
				class="z-10 absolute bottom-0 right-0 px-1 m-1 rounded-sm bg-beige-200/80" :class="{
					'hover:bg-beige-300 cursor-pointer': $state.opinion.formActive,
					'text-xs': gridSize < 30,
					'text-sm': gridSize >= 30,
				}" v-html="glyphName(glyph, gridSize < 30)" @pointerdown="clickable = false, appendGlyph(glyph)"
				@pointerup="clickable = true"
				:title="$state.opinion.formActive ? $t('insert.into.opinion', { glyph: '/' + glyphName(glyph) }) : ''" />
			<div v-if="hasOpinion(glyph.id).length > 0" class="z-10 absolute bottom-2 left-2">
				<VDropdown :distance="12" :skidding="-8" placement="bottom-start">
					<button class="flex items-center justify-center font-bold rounded-full text-white bg-primary-500/80" :class="{
						'w-3 h-3 text-[0.5rem] ': gridSize < 30,
						'w-5 h-5 text-xs': gridSize >= 30,
					}" @pointerdown="clickable = false, $state.opinion.reset('active')" @pointerup="clickable = true">
						{{ opinionTitles(glyph.id).length }}
					</button>
					<template #popper>
						<ListOpinions v-if="hasOpinion(glyph.id).length > 0" :opinions="hasOpinion(glyph.id)"
							class="w-[360px] min-w-[360px]" />
					</template>
				</VDropdown>
			</div>
		</Card>
	</div>
</template>

<script lang="ts">
import { Opinion, SamsaGlyph } from '~/types'
export default defineComponent({
	props: {
		glyph: {
			type: Object,
		},
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
	mounted() {
		if (this.$refs.container) {
			this.$nextTick(() => this.observer.observe(this.$refs.container))
		}
	},
	data() {
		return {
			active: false,
			clickable: true,
			observer: new IntersectionObserver(e => this.checkView(e[0])),
			inView: false
		}
	},
	computed: {
		selected() {
			return this.$state.opinion.active.id
		}
	},
  watch: {
		selected(value: boolean) {
			if (value && this.$refs.container) {
				this.$refs.container.scrollIntoView({ block: "nearest", behavior: 'smooth' })
			}
		},
	},
	methods: {
		checkView({ isIntersecting }) {
			this.inView = isIntersecting
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
		dim(id: number) {
			return (this.$state.opinion.active.attributes.glyphs.length > 0 && !this.$state.opinion.active.attributes.glyphs.find((g: number) => g === id)) || (this.$state.opinion.form.attributes.glyphs.length > 0 && !this.$state.opinion.form.attributes.glyphs.find((g: number) => g === id))
		},
		hasOpinion(id: number) {
			return this.$state.discourse.current.attributes.opinions.data.filter((opinion: Opinion) => opinion.attributes.glyphs.includes(id))
		},
		opinionTitles(id: number) {
			return this.hasOpinion(id).map((opinion: Opinion) => opinion.attributes.content).filter((opinion: Opinion) => opinion)
		},
	},
})
</script>

<style lang="scss">
.selection-container .card {
	.input-container.hide {
		opacity: 0;
	}

	&:hover .input-container.hide {
		opacity: 1;
	}
}
</style>