<template>
	<div class="m-5 border rounded-md bg-beige-50 border-beige-300 min-w-[360px] overflow-scroll" :class="{ minimized: sidebarMinimized }">
		<Image :source="$state.discourse.current.attributes.featuredImage" />
		<h3 class="text-lg font-bold p-5 flex w-full hover:bg-white cursor-pointer" @click="sidebarMinimized = !sidebarMinimized">Opinions</h3>
		<div class="" v-if="!sidebarMinimized">
			<Opinion v-for="opinion in currentOpinions" :key="opinion" :opinion="opinion" @remove="removeOpinion(opinion.id)"
				@click="opinionHover(opinion)" />
		</div>
		<div class="p-5" v-if="$strapi.user && !sidebarMinimized">
			<FormNewOpinion />
		</div>
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
			return this.$state.configuration.font?.axes;
		},
	},
	watch: {
		axes() {
			this.setPosition();
		},
	},
	mounted() {
		this.setPosition();
	},
	methods: {
		setPosition() {
			this.$state.configuration.axes = this.$state.configuration.font?.axes.reduce((acc: Object, curr: SamsaFontAxes) => ({ ...acc, [curr.tag]: [curr.min, curr.max] }), {});
		},
		removeOpinion(id: string) {
			this.$strapi.delete("opinions", id).then(({ data }) => {
				this.$state.discourse.current.attributes.opinions.data =
					this.$state.discourse.current.attributes.opinions.data.filter((e) => e.id !== data.id);
			});
		},
		opinionHover(opinion: Opinion) {
			this.$state.configuration.glyphs = opinion.attributes.glyphs || this.$state.configuration.glyphs;
			this.$state.configuration.axes = opinion.attributes.tuple;
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