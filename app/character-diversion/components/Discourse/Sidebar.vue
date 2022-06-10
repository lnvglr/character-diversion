<template>
	<div
		class="flex flex-col m-5 border rounded-md bg-beige-50 border-beige-300 w-[360px] min-w-[360px] overflow-scroll outline outline-8 outline-beige-200/90"
		:class="{ minimized: sidebarMinimized }">

		<!-- <pre>{{ $state.opinion.form.attributes.annotations }}</pre> -->
		<!-- <pre>{{ $state.discourse.current.attributes.opinions }}</pre> -->
		<!-- <pre>{{ $state.opinion.annotationTool }}</pre> -->
		<!-- {{$state.discourse.current.attributes.featuredImage}} -->
		<Image :src="$state.discourse.current.attributes.featuredImage.data?.attributes" />
		<h3 class="text-lg font-bold border-beige-300 p-5 flex w-full hover:bg-white cursor-pointer"
			:class="{ 'border-b': !sidebarMinimized }" @click="sidebarMinimized = !sidebarMinimized">{{$t('opinion', 2)}}</h3>
		<div class="p-2 sticky top-0 bg-beige-100 border-b border-beige-300 z-10" v-if="$strapi.user && !sidebarMinimized">
			<FormNewOpinion />
		</div>
		<ListOpinions v-if="!sidebarMinimized" />
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