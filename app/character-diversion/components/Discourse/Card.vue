<template>
	<NuxtLink :to="`/discourse/${discourse.id}`"
		class="flex flex-col min-h-[200px] rounded-md border border-beige-300 bg-beige-50 hover:bg-white hover:shadow-[10px_10px_0_0_black] duration-100">
		<!-- <div class="text-6xl font-bold p-5 text-primary-500 border-b border-beige-300">AaBbCc</div> -->
		<div class="flex flex-col justify-start p-5 gap-2  h-full">
		<h2 class="text-2xl font-bold leading-5">
			{{ discourse.attributes.title }} {{ discourse.id }}
		</h2>
		<span> {{ discourse.attributes.author.data?.attributes.name }}</span>
		<span class="mt-auto"> {{ $f.utils.relativeTime(discourse.attributes.publishedAt) }}</span>
		</div>
	</NuxtLink>
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