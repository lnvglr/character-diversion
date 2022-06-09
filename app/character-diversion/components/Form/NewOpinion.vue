<template>
	<form v-if="$state.opinion.form.attributes">
		<Input
			type="textarea"
			rows="5"
			placeholder="New opinion..."
			v-model="$state.opinion.form.attributes.title"
			v-on:keyup.enter="postOpinion"
		/>
		<small class="opacity-50 mb-2">{{$t('hinting.reference.glyphs.slash')}}</small>
		<UITag v-for="g in string">{{ g }}</UITag><br/>
		<!-- <Input type="text" placeholder="Glyphs" v-model="string" /> -->
	</form>
</template>

<script lang="ts">
export default {
	computed: {
		currentDiscourse() {
			return this.$state.discourse.current;
		},
		string() {
			if (!this.$state.opinion.form.attributes) return ''
			return this.$f.glyphMethods.getGlyphsById(this.$state.opinion.form.attributes.glyphs)
		}
	},
	watch: {
		'$state.opinion.form.attributes.title'(value: string) {
			const match = (value?.match(this.$f.glyphMethods.regexPattern) || []).map((e: string) => e.slice(1))
			const font = this.$state.opinion.font
			const matchedGlyphs = 
				match.map(e => {
					return (
						font.literalMap[e] ||
						font.postScriptMap[e] ||
						font.nameMap[e]
					)?.glyph.id
				})
				.filter(e => e)
			console.log(font.postScriptMap)
			// @todo 
			this.$state.opinion.form.attributes.glyphs = [...new Set([...matchedGlyphs])].filter(e => e);
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
					this.$state.opinion.form.attributes.annotations = {};
					this.$state.opinion.active = JSON.parse(JSON.stringify(data))
				})
		}
	},
}
</script>

<style>
</style>