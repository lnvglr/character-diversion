<template>
	<div class="" v-if="discourse">
		<Image :source="discourse.attributes.featuredImage" />
		<h1 class="text-3xl font-bold p-5 pb-0">{{ discourse.attributes.title }}</h1>
		<p class="p-5 pt-1">{{ discourse.attributes.content }}</p>
		<h3 class="text-lg font-bold p-5">Opinions ({{ currentOpinions?.length }})</h3>
		<div class="">
			<Opinion v-for="opinion in currentOpinions" :key="opinion" :opinion="opinion" @remove="removeOpinion(opinion.id)"
				@click="showOpinion(opinion)" />
		</div>
		<div class="p-5" v-if="$strapi.user">
			<!-- <FormNewOpinion :discourse="discourse" /> -->
		</div>
	</div>
</template>

<script lang="ts">
import type { SamsaFont, SamsaGlyph, Discourse, Opinion } from '@/types'
export default {
	props: {
		discourse: {
			type: Object as () => Discourse,
		}
	},
	data() {
		return {
			string: 'abc',
			newOpinion: '',
			axisPosition: {},
		}
	},
	computed: {
		currentOpinions() {
			return this.discourse?.attributes.opinions?.data
		},
		axes() {
			return this.discourse?.attributes.SamsaFont.axes
		}
	},
	watch: {
		axes() {
			this.setPosition()
		},
	},
	mounted() {
		this.setPosition()
	},
	methods: {
		setPosition() {
			this.axisPosition = this.currentDiscourse?.attributes.SamsaFont.axes.reduce((acc: Object, curr: SamsaFont['axes']) => ({ ...acc, [curr.tag]: [curr.min, curr.max] }), {})
		},
		removeDiscourse(id: string) {
			this.$strapi.delete('discourses', id).then(({ data }) => delete this.$state.discourse.id[data.id])
		},
		removeOpinion(id: string) {
			this.$strapi.delete('opinions', id).then(({ data }) => {
				this.$state.discourse.current.attributes.opinions.data =
					this.$state.discourse.current.attributes.opinions.data.filter((e) => e.id !== data.id)
			})
		},
		showOpinion(opinion: Opinion) {
			this.string = opinion.attributes.glyphs?.join('') || this.string
			this.curr.position = opinion.attributes.tuple
		},
		postOpinion() {
			if (this.newOpinion == '') return
			const opinion = {
				title: this.newOpinion,
				fonts: null,
				glyphs: this.string.split(''),
				tuple: this.curr.position, // @todo: only save those that differ from default
				discourse: this.$state.discourse.current,
				author: this.$strapi.user
			}
			this.$strapi.create('opinions', opinion).then(({ data }) => {
				if (this.$state.discourse.current.attributes.opinions?.data) {
					this.$state.discourse.current.attributes.opinions.data.push(data)
				} else {
					this.$state.discourse.current.attributes.opinions = {
						data: [data],
					}
				}
				this.newOpinion = ''
			})
		}
	}
}
</script>

<style>
</style>