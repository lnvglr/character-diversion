<template>
	<span class="glyph-tag" :class="{round}">
		<slot />
	</span>
</template>

<script lang="ts">
export default {
	name: "Tag",
	props: {
		round: {
			type: Boolean,
			default: false
		}
	}
}
</script>

<style lang="scss">
.glyph-tag {
	background-color: var(--color-beige-200);
	padding-inline: var(--p-1);
	border-radius: var(--rounded-sm);
	color: var(--color-beige-500);
	& + & {
		margin-left: var(--p-1);
	}
	&.round {
		border-radius: var(--rounded-full);
	}
}
</style>