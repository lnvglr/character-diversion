<template>
	<rect :width="'300px'" height="100%" fill="red" />
</template>

<script lang="ts">
export default {
	props: {
		decomposed: {
			type: Object,
		},
		strokeWidth: {
			type: String,
			default: '1px',
		},
	},
	mounted() {
	},
	data() {
		return {
			lg: 200,
			sm: 50
		}
	}
}
</script>
<style scoped>
path {
	stroke: var(--color-beige-200);
}
</style>