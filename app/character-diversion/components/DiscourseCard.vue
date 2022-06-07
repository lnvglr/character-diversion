<template>
	<Card class="min-h-[200px]">
		<NuxtLink :to="`/discourse/${discourse.id}`" class="p-5 flex flex-col h-full">
			<h2 class="text-2xl font-bold leading-5">{{ discourse.attributes.title }}</h2>
			<span>{{ discourse.attributes.author.data?.attributes.name }}</span>
			<span class="mt-auto"> {{ $f.utils.relativeTime(discourse.attributes.publishedAt) }}</span>
		</NuxtLink>
	</Card>
</template>

<script lang="ts">
import { Discourse } from '@/types'
export default {
	name: 'Discourse Card',
	props: {
		discourse: Object as () => Discourse,
	},
	data() {
		return {
		}
	},
}
</script>
<style>
</style>