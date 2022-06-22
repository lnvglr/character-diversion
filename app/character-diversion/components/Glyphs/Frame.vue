<template>
	<line :x1="-5000" :y1="0" :x2="10000" :y2="0" :stroke-width="strokeWidth" />
	<line :x1="0" :y1="-3000" :x2="0" :y2="5000" :stroke-width="strokeWidth" />
	<line :x1="end" :y1="-3000" :x2="end" :y2="5000" :stroke-width="strokeWidth" />
</template>

<script lang="ts">
export default {
	props: {
		end: {
			type: Number,
			default: 0,
		},
		strokeWidth: {
			type: String,
			default: '1px',
		},
	},
}
</script>
<style scoped>
line {
	stroke: var(--color-beige-200);
}
:global(.dark line) {
	stroke: var(--color-beige-700);
}
</style>