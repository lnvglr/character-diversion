<template>
	<div class="
		rounded-md
		border
		bg-white
		border-beige-200
		dark:bg-neutral-900
		dark:border-neutral-700
		dark:text-white
		"
		:class="hoverable ? `hover:bg-beige-50 hover:border-beige-300 dark:hover:bg-neutral-800 dark:hover:border-neutral-600` : ''"
		>
		<slot></slot>
	</div>
</template>

<script lang="ts">
export default {
	props: {
		hoverable: {
			type: Boolean,
			default: true,
		}
	}
}
</script>
<style>
</style>