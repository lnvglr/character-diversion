<template>
	<form v-if="$state.opinion.form.attributes">
		<Input type="text" placeholder="Glyphs" v-model="string" />
		<Input type="textarea" placeholder="New opinion..." v-model="$state.opinion.form.attributes.title"
			v-on:keyup.enter="postOpinion" />
		<div v-for="axis in axes" :key="axis.tag">
			<Input v-if="$state.opinion.form.attributes.axes && axis.tag in $state.opinion.form.attributes.axes" type="range" :step="1" :min="axis.min" :max="axis.max"
			v-model="$state.opinion.form.attributes.axes[axis.tag]" :label="axis.name" class="success" />
		</div>
	</form>
</template>

<script lang="ts">
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
			return this.$f.glyphMethods.getGlyphsById(this.$state.opinion.form.attributes.glyphs, this.$state.opinion.font)
			// const map = this.$state.opinion.font?.cmapReverse;
			// if (!map) return ''
			// return this.$state.opinion.form.attributes.glyphs.map((id: string) => {
			// 	if (!(id in map)) {
			// 		const SamsaGlyph = this.$state.opinion.font.glyphs[id];
			// 		const lig = SamsaGlyph?.openType.lig;
			// 		if (lig)
			// 			return lig;
			// 		id = SamsaGlyph?.openType.base;
			// 	}
			// 	return String.fromCharCode(map[id]);
			// }).join("");
		}
	},
	methods: {
		postOpinion() {
			const opinion = {
				title: this.$state.opinion.form.attributes.title,
				glyphs: this.$state.opinion.form.attributes.glyphs,
				axes: this.$state.opinion.form.attributes.axes,
				discourse: this.$state.discourse.current,
				author: this.$strapi.user
			};
			this.$strapi.create("opinions", opinion).then(({ data }) => {
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
			});
		}
	},
}
</script>

<style>
</style>