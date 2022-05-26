<template>
	<img v-if="source?.data" :src="src" />
</template>
<script lang="ts">
export default {
	props: {
		source: {
			type: Object,
		},
	},
	computed: {
		src() {
			return 'http://localhost:1337' + this.source.data.attributes.formats.small.url
		},
	},
}
</script>
<style scoped>
img {
	width: 100%;
	aspect-ratio: 21/9;
	object-fit: cover;
}
</style>