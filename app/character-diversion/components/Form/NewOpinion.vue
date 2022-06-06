<template>
	<form v-if="$state.opinion.form.attributes">
		<Input type="textarea" rows="10" placeholder="New opinion..." v-model="$state.opinion.form.attributes.title"
			v-on:keyup.enter="postOpinion" />
		<span v-for="g in string">{{ g }}</span>
		<!-- <Input type="text" placeholder="Glyphs" v-model="string" /> -->
		<div v-for="axis in axes" :key="axis.tag">
			<Input v-if="$state.opinion.form.attributes.axes && axis.tag in $state.opinion.form.attributes.axes" type="range"
				:step="1" :min="axis.min" :max="axis.max" v-model="$state.opinion.form.attributes.axes[axis.tag]"
				:label="axis.name" class="success" />
		</div>
	</form>
</template>

<script lang="ts">
import { SamsaGlyph } from "~~/types";

export default {
	computed: {
		currentDiscourse() {
			return this.$state.discourse.current;
		},
		axes() {
			return this.$state.opinion.font?.axes;
		},
		string() {
			if (!this.$state.opinion.form.attributes) return ''
			return this.$f.glyphMethods.getGlyphsById(this.$state.opinion.form.attributes.glyphs)
		}
	},
	watch: {
		'$state.opinion.form.attributes.title'(value: string) {
			// positive look behind                  (?<=\/)
			// match 1 or more none white characters [\S]+?
			// until positive look ahead             (?=
			// - end of word                         $
			// - period space                        \.\s
			// - no non-word characters space        [[^\w.\s]]
			// - space                               \s
			//                                       )

			const pattern = /(?<=\/)[\S]+?(?=$|\.\s|[^\w.\s]|\s|\/)/ig;
			const match = value?.match(pattern) || []
			const matchedGlyphs = this.$f.glyphMethods.glyphToUnicode(match)
			this.$state.opinion.form.attributes.glyphs = [...new Set(matchedGlyphs)];
		}
	},
	methods: {
		postOpinion() {
			const { title, glyphs, axes, annotations } = this.$state.opinion.form.attributes;
			const opinion = {
				title,
				glyphs,
				axes,
				annotations,
				discourse: this.$state.discourse.current,
				author: this.$strapi.user
			};
			this.$strapi.create("opinions", opinion)
				.then(({ data }) => {
					return this.$strapi.findOne('opinions', data.id, {
						populate: ['author', 'author.avatar', 'comments.author', 'comments.author.avatar']
					})
				})
				.then(({ data }) => {
					const attributes = this.$state.discourse.current.attributes
					if (attributes.opinions?.data) {
						attributes.opinions.data.push(data);
					}
					else {
						attributes.opinions = {
							data: [data],
						};
					}
					this.$state.opinion.form.attributes.title = "";
				})
		}
	},
}
</script>

<style>
</style>