<template>
	<img v-if="source?.data" :src="src" :style="`--aspect-ratio: ${aspectRatio}`" />
</template>
<script lang="ts">
export default {
	props: {
		source: {
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
		src() {
			console.log(process.env)
			return 'http://localhost:1337' + this.source.data.attributes.formats[this.size].url
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