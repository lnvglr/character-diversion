<template>
	<ListGroupTransition :watcher="watcher">
		<Opinion v-for="opinion in currentOpinions" :key="opinion.id" :opinion="opinion" />
	</ListGroupTransition>
</template>
<script lang="ts">
import { Opinion } from "~/types"
export default {
	computed: {
		currentDiscourse() {
			return this.$state.discourse.current;
		},
		currentOpinions() {
			return this.currentDiscourse?.attributes.opinions?.data.sort((a: Opinion, b: Opinion) => this.countVotes(b) - this.countVotes(a)
			);
		},
		watcher() {
			return [this.currentOpinions, this.$state.opinion.active.id]
		}
	},
	methods: {
		countVotes(opinion: Opinion) {
			if (!opinion.attributes.votes) return 0
			return opinion.attributes.votes?.map(e => e.value).reduce((a, b) => a + b, 0)
			// return opinion.attributes.votes?.reduce((a: Vote, b: number) => a.value + b.value, 0);
		}
	},
}
</script>