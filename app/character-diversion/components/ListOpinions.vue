<template>
	<ListGroupTransition :watcher="watcher" class="overflow-scroll" v-if="currentOpinions.length > 0">
		<Opinion v-for="opinion in currentOpinions" :key="opinion.id" :opinion="opinion" />
	</ListGroupTransition>
</template>
<script lang="ts">
import { Opinion } from "~/types"
export default {
	props: {
		opinions: {
			type: Array,
			default: [],
		}
	},
	computed: {
		currentOpinions() {
			return this.opinions.sort((a: Opinion, b: Opinion) => this.score(b) - this.score(a)
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
		},
		score(opinion: Opinion) {
			if (!opinion) return 0
			let score = this.countVotes(opinion) * 5
			const threshold = (new Date(opinion.attributes.updatedAt).getTime() + (1000 * 60 * 60) - new Date().getTime()) / 100000 | 0
			score += Math.max(0, threshold)
			return score
		}
	},
}
</script>