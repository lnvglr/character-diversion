<template>
	<img v-if="src" :src="source" :style="`--aspect-ratio: ${aspectRatio}`" />
</template>
<script lang="ts">
export default {
	props: {
		src: {
			type: Object,
		},
		size: {
			type: String,
			default: 'small'
		},
		aspectRatio: {
			type: String,
			default: '1/1'
		},
	},
	computed: {
		source() {
			return 'http://localhost:1337' + this.src?.formats[this.size]?.url
		},
	},
}
</script>
<style scoped>
img {
	aspect-ratio: var(--aspect-ratio);
	object-fit: cover;
}
</style>