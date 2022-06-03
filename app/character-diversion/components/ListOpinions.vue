<template>
	<ListGroupTransition :watcher="watcher">
		<Opinion v-for="opinion in currentOpinions" :key="opinion.id" :opinion="opinion"
			@clicked="$emit('clicked', opinion)" />
	</ListGroupTransition>
</template>
<script lang="ts">
export default {
	computed: {
		currentDiscourse() {
			return this.$state.discourse.current;
		},
		currentOpinions() {
			return this.currentDiscourse?.attributes.opinions?.data;
		},
		watcher() {
			// return [this.currentOpinions]
			return [this.currentOpinions, this.$state.opinion.active.id]
		}
	},
	methods: {
	},
}
</script>