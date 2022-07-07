<template>
  <div
    class="flex items-center select-none w-full overflow-hidden relative"
    ref="container"
    @click="addAnnotation"
    :class="{ ['edit-glyph']: edit }"
  >
    <div
      v-if="!isTTF && glyph"
      class="font-user absolute w-full left-0 text-center pointer-events-none"
    >
      {{ glyph.font?.glyphMap[glyph.id].literal }}
    </div>
    <svg
      :style="style"
      :viewBox="viewBox.join(' ')"
      class="pointer-events-none"
      ref="svgFrame"
    ></svg>
    <div class="absolute flex items-center justify-center w-full" v-if="loading">
      <div class="spinner"></div>
    </div>
    <Transition name="fade">
      <svg
        ref="svg"
        :style="style"
        v-show="path || !isTTF"
        class="h-full absolute"
        @pointerleave="$state.opinion.annotationTool.id = null"
        :viewBox="viewBox.join(' ')"
      >
        <g>
          <!-- <GlyphsGrid v-if="true" :width="characterWidth" :strokeWidth="strokeWidth" /> -->
          <GlyphsFrame
            v-if="frame && isTTF"
            :end="characterWidth"
            :strokeWidth="strokeWidth"
          />
          <GlyphsGlyph
            :path="path"
            :glyph="outline && glyph"
            :tuple="outline && tuple"
            :intersection="decomposedAlt && intersection && 'info'"
            :strokeWidth="strokeWidth"
          />
          <GlyphsGlyph
            v-if="pathAlt"
            :path="pathAlt"
            :intersection="decomposedAlt && intersection && 'primary'"
            :strokeWidth="strokeWidth"
          />
          <GlyphsAnnotationTool
            v-if="annotations"
            :edit="edit"
            :glyph="glyph"
            :strokeWidth="strokeWidth"
            :pointer="pointer"
            :height="height"
            :scaling="scaling"
            :offset="offset"
            ref="annotations"
          />
        </g>
      </svg>
    </Transition>
  </div>
</template>
<script lang="ts">
import { SamsaGlyph } from "~/types";

export default defineComponent({
  props: {
    glyph: {
      type: Object as () => SamsaGlyph,
    },
    tuple: {
      type: Object,
    },
    size: {
      type: Number,
      default: 1,
    },
    frame: {
      type: Boolean,
      default: false,
    },
    annotations: {
      type: Boolean,
      default: false,
    },
    edit: {
      type: Boolean,
      default: false,
    },
    grid: {
      type: Boolean,
      default: false,
    },
    pathClass: {
      type: String,
    },
    intersection: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    watcher: Array,
  },
  data() {
    return {
      decomposed: {} as SamsaGlyph | undefined,
      decomposedAlt: {} as SamsaGlyph | undefined,
      strokeWidth: "10px",
      scaling: 1,
      height: 0,
      pointer: {},
      observer: new IntersectionObserver((e) => this.checkView(e[0])),
      inView: false,
      loading: true
    };
  },
  mounted() {
    this.observer.observe(this.$refs.container as HTMLElement);
    this.setScaling();
  },
  watch: {
    watcher: {
      handler() {
        this.setScaling();
      },
      deep: true,
    },
    decomposeWatcher: {
      handler() {
        if (!this.inView || !this.isTTF) return;
        setTimeout(() => {
          this.decomposed = this.glyph?.decompose(this.$f.glyphMethods.getTupleValue(0));
          this.loading = false
          this.decomposedAlt =
            (this.intersection &&
              this.glyph?.decompose(this.$f.glyphMethods.getTupleValue(1))) ||
            undefined;
          const variableGlyph =
            typeof this.decomposedAlt?.svgPath === "function" &&
            this.decomposed?.svgPath() !== this.decomposedAlt.svgPath();
          if (!variableGlyph) {
            this.decomposedAlt = undefined;
          }
          this.setScaling();
        }, 0);
      },
      deep: true,
    },
  },
  computed: {
    isTTF(): boolean {
      return !!this.glyph?.font.tables.glyf;
    },
    decomposeWatcher() {
      return [this.tuple, this.inView, this.$attrs];
    },
    path() {
      return typeof this.decomposed?.svgPath === "function"
        ? this.decomposed.svgPath()
        : undefined;
    },
    pathAlt() {
      return (
        this.intersection &&
        typeof this.decomposedAlt?.svgPath === "function" &&
        this.decomposedAlt.svgPath()
      );
    },
    points(): number[][] {
      if (!this.decomposed?.points) return [];
      return this.decomposed.points;
    },
    characterWidth(): number {
      if (!this.glyph) return 0;
      return (
        this.points?.slice(-3, -2)?.[0]?.[0] ||
        this.glyph.font?.widths[this.glyph.id] ||
        0
      );
    },
    width() {
      if (!this.glyph) return 0;
      this.characterWidth + this.glyph.font?.unitsPerEm * 2;
    },
    scale() {
      return 1;
    },
    boundaries() {
      if (!this.points || this.points.length === 0) return [0, this.characterWidth];
      const xValues = this.points.map((pt: number[]) => pt[0]);
      return [Math.min(...xValues), Math.max(...xValues)];
    },
    offset() {
      if (!this.glyph) return { x: 0, y: 0 };
      return {
        x: this.glyph.font?.unitsPerEm * 10,
        y: this.glyph.font?.unitsPerEm / 4,
      };
    },
    viewBox() {
      if (!this.glyph) return [0, 0, 0, 0];
      return [
        this.boundaries[0] - this.offset.x / 2,
        -this.offset.y,
        this.boundaries[1] + this.offset.x,
        this.glyph.font?.unitsPerEm + this.offset.y,
      ];
    },
    fontSize() {
      if (!this.glyph) return 0;
      return (this.characterWidth + this.offset.x) / this.glyph.font?.unitsPerEm;
    },
    style() {
      return {
        width: `${this.fontSize}em`,
        minWidth: `${this.fontSize}em`,
        transform: "scale(1,-1)",
        left: "-9999px",
        right: "-9999px",
        marginInline: "auto",
      };
    },
  },
  methods: {
    checkView({ isIntersecting }: IntersectionObserverEntry) {
      if (isIntersecting) this.inView = true;
    },
    setScaling() {
      if (!window || !this.$refs.svg) return;
      if (!this.glyph) return 0;
      const refSVG = this.$refs.svg as HTMLElement;
      const style = window.getComputedStyle(refSVG);
      this.$nextTick(() => {
        this.scaling = this.glyph?.font.unitsPerEm / parseInt(style.fontSize);
        this.strokeWidth = this.scaling.toString() + "px";

        refSVG.addEventListener("pointermove", ({ offsetX, offsetY }) => {
          this.pointer = { x: offsetX, y: offsetY };
        });

        const refSVGFrame = this.$refs.svgFrame as HTMLElement;
        if (!refSVGFrame) return;
        this.height =
          (refSVG.getBoundingClientRect().height -
            refSVGFrame.getBoundingClientRect().height) /
          2;
      });
    },
    addAnnotation() {
      if (this.edit) this.$refs.annotations.addAnnotation();
    },
  },
});
</script>
<style scoped>
.font-user {
  font-variation-settings: var(--font-variation-settings);
}
</style>
