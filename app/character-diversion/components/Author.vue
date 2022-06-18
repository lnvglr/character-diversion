<template>
	<span class="flex gap-2 items-center text-beige-400" v-if="author">
		<Image class="object-cover rounded-full" :class="`w-${imageSize} h-${imageSize}`"
			:src="author.attributes?.avatar.data?.attributes" size="thumbnail" />
		<span
			v-html="[`<b>${author.attributes?.name}</b>`, publishedAt].filter(e => e).join(' · ')"></span>
	</span>
</template>
<script lang="ts">
import { Author, Opinion, Discourse } from "~/types"

export default defineComponent({
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
		author(): Author {
			return this.post?.attributes.author?.data
		},
		publishedAt() {
			return this.$f.utils.relativeTime(this.post?.attributes.publishedAt)
		},
	}
})
</script>