<template>
	<svg :id="_uid" :width="w / 2" :height="h /2" :viewBox="`0 ${h * -1} ${w} ${h * 2}`" transform="scale(1,-1)"><g v-html="SVG"></g></svg>
</template>

<script lang="ts">
import { SamsaFont, SamsaGlyph } from '@/assets/samsa-core.js'

export default {
	name: "default",
	props: {
		glyph: {
			type: String,
			default: 'a',
			validator: (value: String) => value.length === 1
		},
		tuple : {
			type: Array,
			default: () => [0.5,0.5],
		},
	},
	data() {
		return {
			SVG: '',
			w: 0,
			h: 0,
			// fontUrl: "fonts/DiodeNextGlobalVF.ttf",
			fontUrl: "fonts/NewFontVF.ttf",
			SamsaFont: null,
			SamsaGlyph: null,
		};
	},
	mounted() {
		this.SamsaFont = new SamsaFont({url: this.fontUrl, callback: ({ glyphs }) => this.assignGlyph(glyphs, this.glyph)});
		console.log(this.SamsaFont)
	},
	methods: {
		getSVGGlyph(glyph: SamsaGlyph, tuple: Array<Number>) {
			if (glyph && 'decompose' in glyph && typeof glyph.decompose === 'function') {
				const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
				svgPath.setAttribute("d", glyph.decompose(tuple).svgPath());
				return svgPath.outerHTML;
			}
		},
		assignGlyph(glyphs, glyph) {
			const g = glyphs.map(e => e.name).includes(glyph) ? glyph : this.toUnicode(glyph);
			if (glyph.length === 1) this.SamsaGlyph = glyphs.find(e => e.name === g);
		},
		toUnicode(string) {
			var result = "";
			for (var i = 0; i < string.length; i++){
					// Assumption: all characters are < 0xffff
					result += "uni" + (("000" + string[i].charCodeAt(0).toString(16)).substr(-4)).toUpperCase();
			}
			return result;
		}
	},
	computed: {
		_uid() {
			return `${this._uid}`;
		},
	},
	watch: {
		glyph(g) {
			this.assignGlyph(this.SamsaFont?.glyphs, g);
		},
		SamsaGlyph(g) {
			this.SVG = this.getSVGGlyph(g, this.tuple);
			this.w = this.SamsaGlyph?.xMax || 0;
			this.h = this.SamsaGlyph?.yMax || 0;
		},
		tuple(t) {
			this.SVG = this.getSVGGlyph(this.SamsaGlyph, t);
		}
	}
}
</script>

<style>
path {
	fill: rgb(255, 191, 202);
}
</style>