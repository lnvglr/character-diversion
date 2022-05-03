<template>
	<div class="double">
		<FormKit type="text" placeholder="Glyphs" v-model="glyph" />
		<FormKit type="select" placeholder="Glyphs" v-model="font" :options="fontOptions" />
	</div>
  <div class="glyphs">
    <GlyphsGlyph
      v-for="g in glyphs"
      :key="g"
      :glyphName="g"
      :font="font"
      :tuple="[tuple1, tuple2]"
    />
  </div>
</template>

<script>
export default {
  name: 'Samsa',

  data() {
    return {
      glyph: 'j',
      tuple1: 0,
      tuple2: 0,
      font: 'IBMPlexSansVar-Roman.ttf',
      fontOptions: ['DiodeNextGlobalVF.ttf', 'IBMPlexSansVar-Roman.ttf', 'NewFontVF.ttf'],
    }
  },
  computed: {
    glyphs() {
      return this.glyph.split('')
    },
  },
  mounted() {
    document.onmousemove = (event) => {
      this.tuple1 = 1 - (1 / window.innerWidth) * event.pageX
      this.tuple2 = 1 - (1 / window.innerHeight) * event.pageY
    }
  },
}
</script>

<style>
.double {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1em;
}
.glyphs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1px;
}
.glyphs > * {
  box-shadow: 0 0 0 1px grey;
}
</style>