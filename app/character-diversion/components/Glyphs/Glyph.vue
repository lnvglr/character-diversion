<template>
	<path class="glyph-default" v-if="path" :d="path" :stroke-width="strokeWidth"></path>
</template>
<script lang="ts">
export default {
	props: {
		path: {
			type: String,
		},
		scale: {
			type: Number,
			default: 1,
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
</style>