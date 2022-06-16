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
      v-if="!ownOpinion"
    />
    <small :title="`Upvotes: ${positives}, Downvotes: ${negatives}`" class="font-bold">{{
      voteCount
    }}</small>
    <Button
			@click.stop="vote(-1)"
			icon="angle-down"
			class="clear xxs"
			:title="ownOpinion ? $t('vote.not.allowed') : $t('vote.down')"
			:color="userVote === -1 ? 'primary' : 'beige'"
      v-if="!ownOpinion"
		/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Opinion, Vote } from "~/types";
export default {
  props: {
    opinion: Object as () => Opinion,
  },
  computed: {
    userVote(): number {
      if (!this.$strapi.user) return;
      return this.opinion.attributes.votes?.find(
        (e: Vote) => e.author === this.$strapi.user.id
      )?.value;
    },
    positives(): number {
      return this.countVotes(1);
    },
    negatives(): number {
      return this.countVotes(-1);
    },
    voteCount(): number {
      return this.positives - this.negatives;
    },
    ownOpinion(): boolean {
      return this.$strapi.user?.id === this.opinion.attributes.author.data.id;
    },
  },
  methods: {
    vote(vote: number): void {
      if (!this.$strapi.user) return this.$router.push("/login");
      if (this.ownOpinion) return console.warn("cant upvote own opinion");
      if (this.userVote) return this.removeVote();
      this.addVote(vote);
    },
    countVotes(sign: number): number {
      return (
        this.opinion.attributes.votes?.filter(({ value }) => value === sign)?.length || 0
      );
    },
    removeVote(): void {
      this.opinion.attributes.votes =
        this.opinion.attributes.votes?.filter(
          (e: Vote) => e.author !== this.$strapi.user.id
        ) || [];
    },
    async addVote(value: number): Promise<void> {
      if (!this.opinion.attributes.votes) this.opinion.attributes.votes = [];
      this.opinion.attributes.votes.push({
        author: this.$strapi.user.id,
        value,
        createdAt: new Date(),
      });
      await this.$strapi.update("opinions", this.opinion.id, {
        votes: this.opinion.attributes.votes,
      });
    },
  },
};
</script>

<style></style>
