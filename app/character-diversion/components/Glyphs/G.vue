<template>
	<path v-if="path" :d="path" :stroke-width="4 / scale"></path>
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
		}
	}
}
</script>