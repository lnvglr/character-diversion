<template>
	<GlyphsGlyph :glyph="glyph" :tuple="[tuple1, tuple2]" />
	<GlyphsGlyph glyph="ת" :tuple="[tuple1, tuple2]" />
	<GlyphsGlyph glyph="j" :tuple="[tuple1, tuple2]" />
	<br>
	<input v-model="glyph" />
	<input v-model="tuple1" type="range" min="0" max="1" step="0.0000001"/>
	<input v-model="tuple2" type="range" min="0" max="1" step="0.0000001"/>
</template>

<script>
export default {
	name: "Samsa",

	data() {
		return {
			glyph: 'n',
			tuple1: 0,
			tuple2: 0.5
		};
	},
	mounted() {
	},
}
</script>

<style>
</style>