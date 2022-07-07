<template>
  <div class="overflow-auto h-full flex flex-col gap-0.5" v-if="$state.discourse.font && $state.opinion.form.attributes">
  <transition-group name="list" tag="div"
    class="selection-container grid mb-auto gap-0.5"
    :class="`grid-cols-autofill-${gridSize} ${false ? 'snap-y snap-proximity' : ''}`"
    v-bind="$attrs"
    ref="container"
    :style="{ '--total': filledGlyphs.length }"
    v-if="filledGlyphs.length > 0"
  >
    <GlyphContanier
      v-for="(glyph, i) in filledGlyphs"
      :key="glyph.id"
      :glyph="glyph"
      :gridSize="gridSize"
      :fontSize="fontSize"
      :edit="edit"
      :annotations="annotations"
      :intersection="intersection"
      :frame="frame"
      :outline="outline"
      :style="{'--i': i && !glyph.dummy}"
      class="snap-start"
    />
  </transition-group>

    <div class="col-span-full" key="footer">
      <Card>
        <div class="w-full p-24 pb-48 flex flex-col items-center justify-center gap-5">
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
import stringSimilarity from 'string-similarity'
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
      scores: {} as { [key: number]: number },
    };
  },
  mounted() {
    // window.addEventListener("resize", () => this.checkFill());
    // this.$nextTick(() => this.checkFill());
  },
  watch: {
    filteredGlyphs(a, b) {
      if (a.length !== b.length) {
        // this.checkFill();
        setTimeout(() => {
          const container = this.$refs.container as any;
          container?.$el.scrollTo({top:0,left:0, behavior: "smooth"});
        },100)
      }
    },
  },
  computed: {
    filledGlyphs() {
      if (this.fill < 1 || this.fill > 999 || isNaN(this.fill))
        return this.filteredGlyphs;
      const dummy = {
        id: (Math.random() * (100)).toString(),
        dummy: true,
        n: this.fill
      }
      return [...this.filteredGlyphs, dummy];
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
      const sorted = glyphs.slice(0, this.limit).sort((a, b) => (this.scores?.[b.id] || 0) - (this.scores?.[a.id] || 0));
      return sorted
    },
  },
  methods: {
    checkFill(): number {
      const container = (this.$refs.container as any)?.$el as HTMLElement;
      const width = container?.offsetWidth;
      // const gridSize = Math.floor(width / ((parseInt(this.gridSize) / 4) * 16));
      const style = container instanceof Element ? window.getComputedStyle(container) : false;
      const gridSize = style ? style.getPropertyValue("grid-template-columns").split(" ").length : 0;
      const remainder = this.filteredGlyphs.length % gridSize
      this.fill = Math.abs(
        this.filteredGlyphs.length > 0
          ? (remainder > 0 ? gridSize - remainder : 0)
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
        "CR",
        "nbsp",
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
      // const selectedGlyphs = this.$state.opinion.selectedGlyphs;
      // const match = stringSimilarity.compareTwoStrings()
      const q = this.$state.discourse.search?.trim();
      const content = this.$f.glyphMethods.match(this.$state.opinion.form.attributes.content?.trim(), 'literal').join(' ');
      let references = content || ""
      if ((content === undefined || content === "")&& q !== undefined && q !== "") {
        references = q.replace(', ', ' ').replace(',', ' ')
      }
      const map = this.$state.discourse.font?.glyphMap[id]
      const ref = Object.values(map || {}).slice(3, 7).join(' ')
      const words = references.split(' ')
      const queryMatch = words.some(e => ref.toLowerCase().indexOf(e.toLowerCase()) > -1) || stringSimilarity.compareTwoStrings(ref, references) > 0.2
      if (words.some((e: string) => map?.literal === e)) {
        words.forEach((word: string) => {
          if (map?.literal === word) this.scores[this.$state.discourse.font?.literalMap[word].glyph.id] = 1
        })
      } else if (queryMatch) {
        this.scores[id] = stringSimilarity.compareTwoStrings(ref, references)
      }
      return queryMatch
      // return (
      //   matchedGlyphs.length === 0 ||
      //   matchedGlyphs.includes(id) ||
      //   selectedGlyphs.includes(id)
      // );
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
