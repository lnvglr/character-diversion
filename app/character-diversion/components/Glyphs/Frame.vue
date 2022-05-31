<template>
	<line :x1="-5000" :y1="0" :x2="10000" :y2="0" :stroke-width="3000 / size" />
	<line :x1="start" :y1="-3000" :x2="start" :y2="3000" :stroke-width="3000 / size" />
	<line :x1="end" :y1="-3000" :x2="end" :y2="3000" :stroke-width="3000 / size" />
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