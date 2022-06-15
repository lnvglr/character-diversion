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
			:title="ownOpinion ? $t('vote.not.allowed') : $t('vote.up')"
		/>
		<small
			:title="`Upvotes: ${positives}, Downvotes: ${negatives}`"
			class="font-bold"
		>{{voteCount}}</small>
		<!-- <Button
			@click.stop="vote(-1)"
			icon="angle-down"
			class="clear xxs"
			:title="ownOpinion ? $t('vote.not.allowed') : $t('vote.down')"
			:color="userVote === -1 ? 'primary' : 'beige'"
		/> -->
  </div>
</template>

<script lang="ts">
import { Vote } from "~/types"
export default {
  props: {
    opinion: {
      type: Object,
    },
  },
  computed: {
		userVote() {
			if (!this.$strapi.user) return
			return this.opinion.attributes.votes?.find((e: Vote) => e.author === this.$strapi.user.id)?.value
		},
		positives() {
			return this.countVotes(1)
		},
		negatives() {
			return this.countVotes(-1)
		},
		voteCount() {
			return this.positives - this.negatives
		},
		ownOpinion() {
			return this.$strapi.user?.id === this.opinion.attributes.author.data.id
		}
  },
  methods: {
		vote(vote: number) {

			if (!this.$strapi.user) return this.$router.push('/login')
			if (this.ownOpinion) return console.warn('cant upvote own opinion')
			if (this.userVote) return this.removeVote()
			this.addVote(vote)
		},
		countVotes(sign: number) {
			return this.opinion.attributes.votes?.filter(({value}) => value === sign)?.length || 0
		},
		removeVote() {
			this.opinion.attributes.votes = this.opinion.attributes.votes?.filter((e: Vote) => e.author !== this.$strapi.user.id) || []
		},
		async addVote(value: number) {
			if (!this.opinion.attributes.votes) this.opinion.attributes.votes = []
			this.opinion.attributes.votes.push({
				author: this.$strapi.user.id,
				value,
				createdAt: new Date(),
			})
			await this.$strapi.update('opinions', this.opinion.id, { votes: this.opinion.attributes.votes })
		},
	}
}
</script>

<style>
</style>