<template>
	<form>
		<Input type="text" placeholder="Glyphs" v-model="string" />
		<Input type="textarea" placeholder="New opinion..." v-model="newOpinion" v-on:keyup.enter="postOpinion" />

		<Input v-for="axis in axes" :key="axis.tag" type="range" :step="1" :min="axis.min" :max="axis.max"
			v-model="$state.discourse.tuple.current[axis.tag]" :label="axis.name" class="success" />
	</form>
</template>

<script lang="ts">
import type { Discourse, Opinion } from '@/types'
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
		}
	},
	computed: {
		currentOpinions() {
			return this.currentDiscourse?.attributes.opinions?.data
		},
		axes() {
			return this.currentDiscourse?.attributes.SamsaFont.axes
		}
	},
	methods: {
		postOpinion() {
			if (this.newOpinion == '') return
			const opinion = {
				title: this.newOpinion,
				fonts: null,
				glyphs: this.string.split(''),
				tuple: this.$state.discourse.tuple.current, // @todo: only save those that differ from default
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