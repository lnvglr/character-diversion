<template>
	<img v-if="src" :src="source" :style="`--aspect-ratio: ${aspectRatio}`" />
</template>
<script lang="ts">
export default defineComponent({
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
			if (!this.src) return
			const format = this.size in this.src.formats ? this.size : 'thumbnail';
			if (!(format in this.src.formats)) return
			return this.$strapi.api.url + this.src.formats[format].url
		},
	},
})
</script>
<style scoped>
img {
	aspect-ratio: var(--aspect-ratio);
	object-fit: cover;
}
</style>