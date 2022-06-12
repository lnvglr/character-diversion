<template>
  <div
		v-if="opinion"
		class="flex flex-col text-beige-400 justify-center items-center self-start -ml-1 mr-1"
	>
		<Button
			@click.stop="vote(1)"
			icon="angle-up"
			class="clear xxs"
			:color="userVote === 1 ? 'primary' : 'beige'"
			:title="`Upvote`"
		/>
		<small
			:title="`Upvotes: ${positives}, Downvotes: ${negatives}`"
			class="font-bold"
		>{{voteCount}}</small>
		<Button
			@click.stop="vote(-1)"
			icon="angle-down"
			class="clear xxs"
			:title="`Downvote`"
			:color="userVote === -1 ? 'primary' : 'beige'"
		/>
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
			if (!this.$strapi.user) return
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
		vote(vote: number) {
			if (!this.$strapi.user) return this.$router.push('/login')
			if (this.userVote) return this.removeVote()
			this.addVote(vote)
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
			await this.$strapi.update('opinions', this.opinion.id, { votes: this.opinion.attributes.votes })
		},
	}
}
</script>

<style>
</style>