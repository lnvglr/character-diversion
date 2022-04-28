<template>
	<div>
		glyph
		<svg id="samsa-svg" width="1320" height="809" style="background-color: transparent;"><g v-html="glyph"></g></svg>
		<slot />
	</div>
</template>

<script>
import { SamsaFont } from '/assets/samsa-core.js'

export default {
	name: "default",

	data() {
		return {
			glyph: ''
		};
	},
	mounted() {
		console.log(SamsaFont)
		let vf = new SamsaFont({
			fontFamily: "IBM Plex Sans",
			url: "fonts/NewFontVF.ttf",
			callback: (font) => {
				const glyph = font.glyphs[5];
				// create svg
				const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
				svgPath.setAttribute("d", glyph.decompose().svgPath());
				this.glyph = svgPath.outerHTML;
			}
		});
		// 	stroke: ui.glyphDefault.stroke,
		// 	"stroke-width": ui.glyphDefault.strokeWidth * uiScale,
		// 	fill: ui.glyphDefault.fill,


		// let vf = new SamsaFont({
		// 	fontFamily: "IBM Plex Sans",
		// 	url: "fonts/IBMPlexSansVar-Roman.ttf",
		// 	callback: function (font) {
		// 		console.log(font);
		// 	}
		// });
		console.log(vf)
	},
	methods: {
		SVG(tag) {
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
}
	}
}
</script>

<style>
path {
	fill: red;
}
</style>