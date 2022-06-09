<template>
  <div v-if="opinion" class="flex flex-col text-beige-400 justify-center items-center self-start -ml-1 mr-1">
		<Button @click.stop="up" icon="angle-up" class="clear xxs" :color="userVote === 1 ? 'primary' : 'beige'" />
		<small class="font-bold" :title="`Upvotes: ${positives}, Downvotes: ${negatives}`">{{voteCount}}</small>
		<Button @click.stop="down" icon="angle-down" class="clear xxs" :color="userVote === -1 ? 'primary' : 'beige'" />
  </div>
</template>

<script lang="ts">
import { Vote } from "~~/types"
export default {
  props: {
    opinion: {
      type: Object,
    },
  },
  computed: {
		userVote() {
			return this.opinion.attributes.votes?.find((e: Vote) => e.user === this.$strapi.user.id)?.value
		},
		positives() {
			return this.opinion.attributes.votes?.filter((e: Vote) => e.value === 1)?.length || 0
		},
		negatives() {
			return this.opinion.attributes.votes?.filter((e: Vote) => e.value === -1)?.length || 0
		},
		voteCount() {
			return this.positives - this.negatives
		},
  },
  methods: {
		up() {
			if (this.userVote) return this.removeVote()
			this.addVote(1)
		},
		down() {
			if (this.userVote) return this.removeVote()
			this.addVote(-1)
		},
		removeVote() {
			this.opinion.attributes.votes = this.opinion.attributes.votes?.filter((e: Vote) => e.user !== this.$strapi.user.id) || []
		},
		async addVote(value: number) {
			if (!this.opinion.attributes.votes) this.opinion.attributes.votes = []
			this.opinion.attributes.votes.push({
				user: this.$strapi.user.id,
				value,
				date: new Date(),
			})
			console.log(await this.$strapi.update('opinions', this.opinion.id, { votes: this.opinion.attributes.votes }))
		},
	}
}
</script>

<style>
</style>