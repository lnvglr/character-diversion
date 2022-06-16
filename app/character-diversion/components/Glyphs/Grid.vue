<template>
	<defs>
		<pattern id="smallGrid" :width="sm" :height="sm" patternUnits="userSpaceOnUse">
			<path :d="`M ${sm} 0 L 0 0 0 ${sm}`" fill="none" :stroke-width="strokeWidth / 1.5" />
		</pattern>
		<pattern id="grid" :width="lg" :height="lg" patternUnits="userSpaceOnUse">
			<rect :width="lg" :height="lg" fill="url(#smallGrid)" />
			<path :d="`M ${lg} 0 L 0 0 0 ${lg}`" fill="none" :stroke-width="strokeWidth" />
		</pattern>
	</defs>
	<rect :width="width + 'px'" height="100%" fill="url(#grid)" />

</template>

<script lang="ts">
export default {
	props: {
		width: {
			type: Number,
			default: 0,
		},
		strokeWidth: {
			type: String,
			default: '1px',
		},
	},
	data() {
		return {
			lg: 200,
			sm: 50
		}
	}
}
</script>
<style scoped>
path {
	stroke: var(--color-beige-200);
}
</style>