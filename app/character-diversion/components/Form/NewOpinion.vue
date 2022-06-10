<template>
	<TransitionExpand>
		<form v-if="$state.opinion.form.attributes && $state.opinion.formActive" @submit.prevent="postOpinion">
			<Input type="textarea" maxlength="500" :placeholder="$t('describe.opinion')"
				v-model="$state.opinion.form.attributes.title" :submitOnEnter="true" @enter="postOpinion"
				@cancel="$state.opinion.formActive = false" />
			<Button :disabled="!canPost" class="w-full mb-1" color="success" type="submit">{{ $t('share.opinion') }}</Button>
			<!-- <small class="opacity-50">{{ $t('hinting.reference.glyphs.slash') }}</small> -->
			<div><UITag v-for="g in string">{{ g }}</UITag></div>
			<!-- <Input type="text" placeholder="Glyphs" v-model="string" /> -->
		</form>
	</TransitionExpand>
	<TransitionExpand>
		<div v-if="!$state.opinion.formActive" >
			<Button class="w-full mb-1" color="success" @click="$state.opinion.formActive = true"
				label="{{$t('new.opinion')}}" icon="plus" />
		</div>
	</TransitionExpand>
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
		},
		canPost() {
			const { title } = this.$state.opinion.form.attributes
			if (title !== null && title?.length > 1) return true
		},
	},
	watch: {
		'$state.opinion.form.attributes.title'(value: string) {
			const match = (value?.match(this.$f.glyphMethods.regexPattern) || []).map((e: string) => e.slice(1))
			const font = this.$state.opinion.font
			const matchedGlyphs =
				match
					.map(e => {
						return (
							font.literalMap[e] ||
							font.postScriptMap[e] ||
							font.nameMap[e]
						)?.glyph.id
					})
					.filter(e => e)
			// // @todo include selected

			this.$state.opinion.form.attributes.glyphs = [...new Set([...this.$state.opinion.selectedGlyphs, ...matchedGlyphs])].filter(e => e);
		}
	},
	methods: {
		postOpinion() {
			console.log('postOpinion')
			const { title, glyphs, axes, annotations } = this.$state.opinion.form.attributes;
			if (!this.canPost) return
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