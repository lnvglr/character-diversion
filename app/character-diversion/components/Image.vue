<template>
	<img v-if="src && source" :src="source" :style="`--aspect-ratio: ${aspectRatio}`" />
	<div v-else class="placeholder flex items-center justify-center text-beige-400 font-bold">{{placeholder}}</div>
</template>
<script lang="ts">
export default defineComponent({
	props: {
		src: {
			type: [Object, String],
		},
		size: {
			type: String,
			default: 'small'
		},
		aspectRatio: {
			type: String,
			default: '1/1'
		},
		placeholder: {
			type: String,
			default: ''
		}
	},
	computed: {
		source() {
			if (typeof this.src === 'string') return this.src
			const base = '';
			const format = this.src?.formats?.[this.size] ? this.size : 'thumbnail';

			if (this.src?.formats?.[format]) return base + this.src.formats[format].url
			if (this.src?.url) return base + this.src.url
		},
	},
})
</script>
<style scoped>
img {
	aspect-ratio: var(--aspect-ratio);
	object-fit: cover;
}
:global(.placeholder) {
	font-size: var(--text-sm);
}
</style>