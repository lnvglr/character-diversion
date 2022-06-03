<template>
	<div class="m-5 border rounded-md bg-beige-50 border-beige-300 w-[360px] min-w-[360px] overflow-scroll outline outline-8 outline-beige-200/90" :class="{ minimized: sidebarMinimized }">
		<Image :source="$state.discourse.current.attributes.featuredImage" />
		<h3 class="text-lg font-bold border-beige-300 p-5 flex w-full hover:bg-white cursor-pointer" :class="{'border-b': !sidebarMinimized}" @click="sidebarMinimized = !sidebarMinimized">Opinions</h3>
		<ListOpinions v-if="!sidebarMinimized" @clicked="selectOpinion" />
		<div class="p-5" v-if="$strapi.user && !sidebarMinimized">
			<FormNewOpinion />
		</div>
		<!-- <Button class="m-5 sm" @click="selectOpinion()">reset</Button> -->
	</div>
</template>

<script lang="ts">
import type { SamsaFontAxes, Opinion } from '@/types'
export default {
	data() {
		return {
			sidebarMinimized: false
		}
	},
	computed: {
		currentDiscourse() {
			return this.$state.discourse.current;
		},
		currentOpinions() {
			return this.currentDiscourse?.attributes.opinions?.data;
		},
		axes() {
			return this.$state.opinion.font?.axes;
		},
	},
	watch: {
		axes: {
			handler() {
				this.setPosition();
			},
			immediate: true,
		},
	},
	methods: {
		setPosition() {
			this.$state.opinion.form.attributes.axes = this.$state.opinion.font?.axes.reduce((acc: Object, curr: SamsaFontAxes) => ({ ...acc, [curr.tag]: [curr.min, curr.max] }), {});
		},
		selectOpinion(opinion: Opinion = null) {
			if (opinion === null || this.$state.opinion.active.id === opinion.id) {
				this.$state.opinion.reset('active')
				this.$state.opinion.reset('form')
				this.setPosition()
				return
			}
			const selected = JSON.parse(JSON.stringify(opinion))
			this.$state.opinion.active = selected
			this.$state.opinion.form.attributes.glyphs = selected.attributes.glyphs
		},
	},
}
</script>

<style scoped>
.minimized {
	position: absolute;
	right: 0;
	z-index: 10;
}
</style>