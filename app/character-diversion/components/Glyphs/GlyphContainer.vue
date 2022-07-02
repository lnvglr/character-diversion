<template>
  <div ref="container" v-if="glyph"
      :style="glyph.dummy && glyph.n ? `grid-column: span ${glyph.n} / span ${glyph.n};` : ''"
      >
    <Card
      :hover="$state.opinion.formActive && !glyph.dummy"
      class="card flex justify-center w-full relative border-0"
      :class="{
        'opacity-10': dim(glyph.id),
        'hover:z-40': !glyph.dummy,
        [`h-${gridSize}`]: true,
      }"
      @pointerdown="
        (active = toggleGlyph), clickable && $f.glyphMethods.toggleGlyph(glyph?.id)
      "
      @pointerenter="clickable && active && $f.glyphMethods.toggleGlyph(glyph?.id)"
    >
      <GlyphsMiniGlyph
        v-if="!glyph.dummy"
        :class="`glyph overflow-hidden text-${fontSize}`"
        :glyph="glyph"
        :tuple="$state.opinion.form.attributes.axes"
        :annotations="annotations"
        :frame="frame"
        :edit="edit"
        :intersection="intersection"
        :outline="outline"
        :watcher="[gridSize, intersection]"
      />
      <Input
        v-if="$state.opinion.formActive"
        type="checkbox"
        v-model="$state.opinion.selectedGlyphs"
        :itemValue="glyph.id"
        :containerClass="`absolute w-fit right-0 p-1 ${!$state.opinion.selectedGlyphs.includes(glyph.id) ? 'hide' : ''}`"
        class="info z-10"
        @click.prevent
      />
      <div
        v-if="$state.discourse.font?.glyphMap[glyph.id]"
        class="z-10 absolute bottom-0 right-0 px-2 m-1 rounded-sm bg-beige-200/80"
        :class="{
          'hover:bg-beige-300 cursor-pointer': $state.opinion.formActive,
          'text-xs': parseInt(gridSize) < 30,
          'text-sm m-2': parseInt(gridSize) >= 30,
        }"
        v-html="glyphName(glyph, parseInt(gridSize) < 30)"
        @pointerdown="(clickable = false), appendGlyph(glyph)"
        @pointerup="clickable = true"
        :title="
          $state.opinion.formActive
            ? $t('insert.into.opinion', { glyph: '/' + glyphName(glyph) })
            : ''
        "
      />
      <OpinionLink
        :glyph="glyph"
        :size="gridSize >= 30 ? 'lg' : 'md'"
        @pointerdown="clickable = false"
        @pointerup="clickable = true"
        :active="peek"
        class="m-1 z-10 absolute bottom-0 left-0"
        :class="{
          'm-2': gridSize >= 30,
        }"
      />
    </Card>
  </div>
</template>

<script lang="ts">
import { Opinion, SamsaGlyph } from "~/types";
export default defineComponent({
  props: {
    glyph: {
      type: Object as () => SamsaGlyph,
    },
    gridSize: {
      type: String,
      default: "16",
    },
    fontSize: {
      type: String,
      default: "2xl",
    },
    frame: {
      type: Boolean,
      default: false,
    },
    annotations: {
      type: Boolean,
      default: true,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    intersection: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.$refs.container) {
      this.$nextTick(() => this.observer.observe(this.$refs.container));
    }
  },
  data() {
    return {
      active: false,
      clickable: true,
      observer: new IntersectionObserver((e) => this.checkView(e[0])),
      inView: false,
      peek: false,
    };
  },
  computed: {
    selected() {
      return this.$state.opinion.active.id;
    },
  },
  watch: {
    '$state.opinion.peek': {
      handler(id: number) {
        this.peek = this.glyph?.id === id
      },
    }
  },
  methods: {
    checkView({ isIntersecting }) {
      this.inView = isIntersecting;
    },
    glyphName(glyph: SamsaGlyph, literal = false) {
      const g = this.$state.discourse.font?.glyphMap[glyph.id];
      if (!g) return "";
      return literal || g.postScript === "" ? g.literal : g.postScript;
    },
    appendGlyph(glyph: SamsaGlyph) {
      if (!this.$state.opinion.formActive) return;
      const content = this.$state.opinion.form.attributes.content;
      const glyphReference = "/" + this.glyphName(glyph);
      if (!content) return (this.$state.opinion.form.attributes.content = glyphReference);
      if (content.trim().endsWith(glyphReference)) {
        return (this.$state.opinion.form.attributes.content = content.substring(
          0,
          content.length - glyphReference.length - 1
        ));
      }
      this.$state.opinion.form.attributes.content = content.trim() + " " + glyphReference;
    },
    dim(id: number) {
      const active = this.$state.opinion.active.attributes.glyphs;
      const form = this.$state.opinion.form.attributes.glyphs;
      return (
        (active && active.length > 0 && !active.find((g: number) => g === id)) ||
        (form && form.length > 0 && !form.find((g: number) => g === id))
      );
    },
  },
});
</script>

<style lang="scss">
.selection-container .card {
  .input-container.hide {
    opacity: 0;
  }

  &:hover .input-container.hide {
    opacity: 1;
  }
}
</style>
