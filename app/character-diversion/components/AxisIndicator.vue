<template>
	<div v-for="axis in filteredAxes" :key="axis.tag" class="flex gap-2 items-center text-xs">
		<span>{{axis.tag}}</span>
		<div class="bar" :style="`--value: ${axis.valueMin ? 100 / axis.max * axis.valueMin : 0}`" />
		<span>{{axis.valueMin}}</span>
	</div>
</template>
<script lang="ts">
import { SamsaFontAxis } from "~/types"
export default defineComponent({
	name: 'Axis Indicator',
	props: {
		axes: Object,
	},
	computed: {
		fontAxes(): SamsaFontAxis[] {
			return this.$state.discourse.font.axes
		},
		axesArray(): SamsaFontAxis[] {
			return Object.entries(this.axes || {}).map(e => ({  valueMin: e[1][0], valueMax: e[1][1], ...this.$state.discourse.font.axes.find((f: SamsaFontAxis) => f.tag === e[0]) }))
		},
		filteredAxes(): SamsaFontAxis[] {
			return this.axesArray?.filter((e: SamsaFontAxis) => e.valueMin !== e.default || e.valueMax !== e.default)
		},
	},
	data() {
		return {
		}
	},
})
</script>
<style scoped>
.bar {
	--track-bg: var(--color-beige-300);
	--track-fill: var(--color-info-500);
	--start: 0;
	--end: calc(var(--value) * 1%);
	width: var(--w-20);
	height: var(--h-1);
	border-radius: var(--rounded-sm);
	background: linear-gradient(to right,
			var(--track-bg) var(--start),
			var(--track-fill) var(--start),
			var(--track-fill) var(--end),
			var(--track-bg) var(--end));
}
</style>