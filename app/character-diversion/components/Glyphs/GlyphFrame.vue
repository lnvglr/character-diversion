<template>
		<line :x1="baseline * -1" :y1="0" x2="100%" :y2="0" :stroke-width="4 / size" />
		<line :x1="start" :y1="-2000" :x2="start" :y2="2000" :stroke-width="4 / size" />
		<line :x1="end" :y1="-2000" :x2="end" :y2="2000" :stroke-width="4 / size" />
</template>

<script lang="ts">
export default {
	props: {
		size: {
			type: Number,
			default: 1,
		},
		baseline: {
			type: Number,
			default: 0,
		},
		start: {
			type: Number,
			default: 0,
		},
		end: {
			type: Number,
			default: 0,
		},
	},
}
</script>
<style>
line {
	stroke: var(--color-beige-200);
}
</style>