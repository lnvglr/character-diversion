<template>
	<span class="glyph-tag">
		<slot />
	</span>
</template>

<script lang="ts">
export default defineComponent({
	name: "Tag",
})
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
}
</style>