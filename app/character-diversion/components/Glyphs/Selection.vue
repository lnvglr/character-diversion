<template>
  <div
    v-if="$state.discourse.font && $state.opinion.form.attributes"
    class="selection-container grid overflow-auto snap-y snap-proximity h-full"
    :class="`grid-cols-autofill-${gridSize}`"
    v-bind="$attrs"
    ref="container"
  >
    <GlyphContanier
      v-for="glyph in filledGlyphs"
      :key="glyph.id"
      :glyph="glyph"
      :gridSize="gridSize"
      :fontSize="fontSize"
      :edit="edit"
      :annotations="annotations"
      :intersection="intersection"
      :frame="frame"
      :outline="outline"
      class="snap-start"
    />
    <div class="col-span-full">
      <Card>
        <div class="w-full p-24 flex flex-col items-center justify-center gap-5">
          <span>{{ $t("glyphs.shown", { n: filteredGlyphs.length }) }}</span>
          <div class="flex items-center justify-center gap-2">
            <Button
              @click="limit = limit - 100"
              class="clear lg"
              v-if="100 < filteredGlyphs.length"
              icon="minus"
              >Show fewer</Button
            >
            <Button
              @click="limit = limit + 100"
              class="lg"
              v-if="$state.discourse.font?.glyphs.length > limit"
              icon="plus"
              >Show more</Button
            >
          </div>
        </div>
      </Card>
    </div>
  </div>
  <Card v-else class="w-full">
  <div class="p-20 flex flex-col items-center w-full">
    <font-awesome-icon :icon="['fa', 'xmark']" class="text-3xl" />
    <div class="text-beige-400">No font file attached.</div>
  </div>
  </Card>
</template>

<script lang="ts">
import { Opinion, SamsaGlyph } from "~/types";
import GlyphContanier from "~/components/Glyphs/GlyphContainer.vue";
export default defineComponent({
  components: { GlyphContanier },
  props: {
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
  data() {
    return {
      active: false,
      clickable: true,
      opinionFilter: false,
      limit: 100,
      fill: 0,
      // first: null,
      // last: null
    };
  },
  mounted() {
    window.addEventListener("resize", () => this.checkFill());
    this.$nextTick(() => this.checkFill());
  },
  watch: {
    // first() {
    //   this.select()
    // },
    // last(a, b) {
    //   this.select(b)
    // }
    filteredGlyphs(a, b) {
      if (a.length !== b.length) this.checkFill();
    },
  },
  computed: {
    filledGlyphs() {
      if (this.fill < 1 || this.fill > 999 || isNaN(this.fill))
        return this.filteredGlyphs;
      const dummy = [...Array(this.fill)].map((e) => ({
        id: (Math.random() * (100 + e)).toString(),
        dummy: true,
      }));
      return [...this.filteredGlyphs, ...dummy];
    },
    filteredGlyphs() {
      if (!this.$state.discourse.font) return [];
      const glyphs = this.$state.discourse.font.glyphs.filter((glyph: SamsaGlyph) => {
        if (
          this.removeEmpty(glyph.id) &&
          this.filterByVariability(glyph) &&
          this.filterByActive(glyph.id) &&
          this.filterByOpinions(glyph.id) &&
          this.matchGlyphs(glyph.id)
        ) {
          return glyph;
        }
      });
      return glyphs.slice(0, this.limit);
    },
  },
  methods: {
    checkFill(): number {
      const container = this.$refs.container as HTMLElement;
      const width = container?.offsetWidth;
      const gridSize = Math.floor(width / ((parseInt(this.gridSize) / 4) * 16));
      this.fill = Math.abs(
        this.filteredGlyphs.length > 0
          ? gridSize - (this.filteredGlyphs.length % gridSize)
          : 0
      );
      return this.fill;
    },
    removeEmpty(id: number) {
      const name = this.$state.discourse.font?.glyphMap[id].name;
      if (!name) return false;
      return ![
        ".notdef",
        ".null",
        "space",
        "nonmarkingreturn",
        "￿",
        "uni00A0",
        "uni2007",
        "uni2008",
        "uni2009",
        "uni200A",
      ].includes(name);
    },
    filterByVariability(glyph: SamsaGlyph) {
      if (this.intersection) return glyph.tvts.length > 0;
      return true;
    },
    filterByOpinions(id: number) {
      if (this.$state.discourse.filter.opinion)
        return (
          this.hasOpinion(id).length > 0 ||
          this.$state.opinion.form.attributes.glyphs?.includes(id)
        );
      return true;
    },
    filterByActive(id: number) {
      const active = this.$state.opinion.active.attributes.glyphs;
      if (!active) return true;
      return active.length === 0 || active.includes(id);
    },
    matchGlyphs(id: number) {
      const q = this.$state.discourse.search?.trim();
      const content = this.$state.opinion.form.attributes.content?.trim();
      let references = content;
      if (content === undefined && q !== undefined && q !== "") {
        references = q
          .split(/(\,|\s)/)
          .filter((e: string) => e !== " ")
          .map((e: string) => "/" + e)
          .join("");
      }
      const matchedGlyphs = this.$f.glyphMethods.match(references);
      const selectedGlyphs = this.$state.opinion.selectedGlyphs;
      return (
        matchedGlyphs.length === 0 ||
        matchedGlyphs.includes(id) ||
        selectedGlyphs.includes(id)
      );
    },
    hasOpinion(id: number) {
      if (!this.$state.discourse.current) return [];
      if (!this.$state.discourse.current.attributes.opinions?.data) return [];
      return this.$state.discourse.current?.attributes.opinions.data.filter(
        (opinion: Opinion) => opinion.attributes.glyphs?.includes(id)
      );
    },
    // select(remove) {
    // select range
    // const selected = [...this.$state.discourse.font.glyphs].slice(this.first, this.last + 1)
    // selected.forEach(e => this.$f.glyphMethods.toggleGlyph(this.$state.discourse.font.glyphs[e.id].id, true))
    // if (remove > this.last) this.$f.glyphMethods.toggleGlyph(remove, false)
    // },
  },
});
</script>

<style lang="scss">
.selection-container > div {
  position: relative;
  &:last-child::before,
  &:last-child::after {
    --i: 20;
    // content: '';
    position: relative;
    height: 100%;
    // width: calc(var(--i) * 100%);
    width: calc(100% / 64);
    top: 0;
    transform: translate(calc(100% / var(--i)), -100%);
    display: block;
  }
  &:last-child::before {
    background: var(--color-beige-50);
    position: absolute;
    transform: translate(calc(100% / var(--i)), 0%);
    margin: 1px;
    width: calc(var(--i) * 100% - 2px);
    height: calc(100% - 2px);
    border-radius: var(--rounded-lg);
    z-index: 20;
  }
  &:last-child::after {
    z-index: 10;
    background: var(--color-beige-500);
  }
}
</style>
