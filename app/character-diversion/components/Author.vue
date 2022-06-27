<template>
	<span class="flex gap-2 items-center text-beige-400" v-if="author">
		<Image class="object-cover rounded-full" :class="`w-${imageSize} h-${imageSize}`"
			:src="avatar" size="thumbnail" />
		<span
			v-if="info"
			v-html="[`<b>${name}</b>`, publishedAt].filter(e => e).join(' · ')"></span>
	</span>
</template>
<script lang="ts">
import { Author, Opinion, Discourse, User } from "~/types"

export default defineComponent({
	props: {
		post: {
			type: Object as () => Discourse | Opinion
		},
		user: {
			type: Object as () => User
		},
		imageSize: {
			type: String,
			default: '8'
		},
		info: {
			type: Boolean,
			default: true
		},
	},
	mounted() {
		if (!this.avatar || !this.author) {
		return this.$strapi
			.findOne("users", this.author.id, { populate: ["avatar"] })
			.then(({avatar}) => {
				this.author.avatar = avatar;
			});
		}
	},
	computed: {
		author(): Author {
			return this.post?.attributes.author?.data || this.user
		},
		avatar() {
			return this.author?.attributes?.avatar?.data?.attributes || this.author?.avatar
		},
		name() {
			return this.author?.attributes?.name || this.author?.name
		},
		publishedAt() {
			return this.$f.utils.relativeTime(this.post?.attributes.publishedAt)
		},
	}
})
</script>