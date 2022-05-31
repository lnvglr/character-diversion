<template>
	<form>
		<Input type="text" placeholder="Glyphs" v-model="string" />
		<Input type="textarea" placeholder="New opinion..." v-model="$state.configuration.opinion"
			v-on:keyup.enter="postOpinion" />
		<div v-for="axis in axes" :key="axis.tag">
			<Input v-if="axis.tag in $state.configuration.axes" type="range" :step="1" :min="axis.min" :max="axis.max"
			v-model="$state.configuration.axes[axis.tag]" :label="axis.name" class="success" />
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
			return this.$state.configuration.font?.axes;
		},
		string() {
			return this.$f.glyphMethods.getGlyphsById(this.$state.configuration.glyphs, this.$state.configuration.font)
			// const map = this.$state.configuration.font?.cmapReverse;
			// if (!map) return ''
			// return this.$state.configuration.glyphs.map((id: string) => {
			// 	if (!(id in map)) {
			// 		const SamsaGlyph = this.$state.configuration.font.glyphs[id];
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
			console.log('a')
			const opinion = {
				title: this.$state.configuration.opinion,
				fonts: null,
				glyphs: this.$state.configuration.glyphs,
				tuple: this.$state.configuration.axes,
				discourse: this.$state.discourse.current,
				author: this.$strapi.user
			};
			this.$strapi.create("opinions", opinion).then(({ data }) => {
				if (this.$state.discourse.current.attributes.opinions?.data) {
					this.$state.discourse.current.attributes.opinions.data.push(data);
				}
				else {
					this.$state.discourse.current.attributes.opinions = {
						data: [data],
					};
				}
				this.$state.configuration.opinion = "";
			});
		}
	},
}
</script>

<style>
</style>