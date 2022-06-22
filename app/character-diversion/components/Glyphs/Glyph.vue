<template>
	<path class="glyph-default" v-if="path" :d="path" :stroke-width="strokeWidth"></path>
</template>
<script lang="ts">
export default {
	props: {
		path: {
			type: String,
		},
		strokeWidth: {
			type: String,
			default: '1px',
		},
	},
}
</script>
<style scoped>
:global(:where(.glyph-default)) {
	fill: currentColor;
	mix-blend-mode: multiply;
}
:global(:where(.dark .glyph-default)) {
	mix-blend-mode: color-dodge;
}
</style>