<template>
	<span class="flex gap-2 items-center text-beige-400" v-if="post.attributes.author?.data">
		<Image class="object-cover rounded-full" :class="`w-${imageSize} h-${imageSize}`"
			:src="post.attributes.author.data?.attributes?.avatar.data?.attributes" size="thumbnail" />
		<span
			v-html="[`<b>${post.attributes.author.data?.attributes?.name}</b>`, publishedAt].filter(e => e).join(' · ')"></span>
	</span>
</template>
<script lang="ts">
import { Opinion, Discourse } from "~/types"

export default {
	props: {
		post: {
			type: Object as () => Discourse | Opinion
		},
		imageSize: {
			type: String,
			default: '8'
		}
	},
	computed: {
		publishedAt() {
			return this.$f.utils.relativeTime(this.post.attributes.publishedAt)
		},
	}
}
</script>