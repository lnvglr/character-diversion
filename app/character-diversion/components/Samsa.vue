<template>
	<!-- <div class="double">
		<FormKit type="select" placeholder="Glyphs" v-model="selectedFont" :options="fontOptions" />
	</div> -->
  <div class="glyphs" v-if="selectedFont">
    <GlyphsGlyph
      v-for="g in glyphs"
      :key="g"
      :glyphName="g"
      :font="selectedFont"
      :tuple="tuple"
      :tupleAlt="tupleAlt"
    />
  </div>
</template>

<script>
const fonts = import.meta.glob('@/public/fonts/*.{ttf,otf}')

export default {
  name: 'Samsa',
  props: {
    tuple: {
      type: Array,
    },
    tupleAlt: {
      type: Array,
    },
    string: {
      type: String,
      default: 'jתm',
    },
    font: {
      type: String,
    }
  },

  data() {
    return {
      selectedFont: null,
      fontOptions: [],
    }
  },
  computed: {
    glyphs() {
      return this.string.split('')
    },
  },
  mounted() {
    this.fontOptions = Object.keys(fonts).map(e => e.split('fonts/')[1])
    this.selectedFont = this.font
    // document.onmousemove = (event) => {
    //   this.tuple[0] = 1 - (1 / window.innerWidth) * event.pageX
    //   this.tuple[1] = 1 - (1 / window.innerHeight) * event.pageY
    // }
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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  grid-auto-rows: 1fr;
  gap: 1px;
}
.glyphs > * {
  box-shadow: 0 0 0 1px grey;
}
</style>