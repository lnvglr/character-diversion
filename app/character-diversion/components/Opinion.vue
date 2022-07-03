<template>
  <div
    v-if="opinion"
    @click="selectOpinion"
    class="opinion w-full duration-300 border-y -mt-[1px] border-beige-300 last:border-b-0"
    :class="{
      'opacity-30': inactive,
      'z-10': active,
    }"
  >
    <div
      class="flex items-center p-2 pt-1 hover:bg-beige-100 cursor-pointer"
      :class="active && 'bg-beige-100'"
    >
      <div class="flex flex-col gap-2 w-full">
        <div class="relative">
          <div class="flex w-full">
            <Vote :opinion="opinion" class="w-10 -ml-1 mr-1" style="min-width: var(--w-7)" />
            <div class="flex-1">
              <div
                class="float-right"
                v-if="
                  opinion.attributes.author?.data?.id === $strapi.user?.id ||
                  $strapi.user?.id === 11
                "
              >
                <Button
                  class="clear text-sm xs"
                  :class="{ 'opacity-0 pointer-events-none': !active }"
                  @click.stop="removeOpinion()"
                  color="alert"
                  icon="trash"
                />
              </div>
              <p
                class="mt-1 line-clamp-3 text-sm break-words markdown"
                :class="!active ? 'line-clamp-3' : 'line-clamp-none'"
                v-html="parseOpinion.content"
              />
              <span class="mt-2 flex flex-wrap gap-1 items-center text-xs">
                <UITag v-for="glyph in glyphs">{{ glyph }}</UITag>
              </span>
              <TransitionExpand>
                <div v-if="active && Object.values(opinion.attributes.axes || {}).length > 0">
                  <span class="mt-2 flex flex-wrap gap-1 items-center text-xs">
                    <AxisIndicator :axes="opinion.attributes.axes" />
                  </span>
                </div>
              </TransitionExpand>
            </div>
          </div>
        </div>
        <div class="flex w-full justify-between items-center">
          <Author :post="opinion" class="text-xs" />
          <Button icon="diagram-next" class="clear sm" @click.stop="quote" />
        </div>
      </div>
    </div>
    <!-- <TransitionExpand>
      <div v-if="active && (opinion.attributes.comments?.data.length > 0)">
        <div class="p-5 border-b border-beige-300 bg-white">
          <div v-for="comment in opinion.attributes.comments?.data" :key="comment.id">{{ comment.attributes.content }}
          </div>
        </div>
      </div>
    </TransitionExpand> -->
  </div>
</template>

<script lang="ts">
import { Opinion } from "~/types";
export default defineComponent({
  props: {
    opinion: {
      type: Object as () => Opinion,
    },
  },
  computed: {
    active() {
      return this.$state.opinion.active.id === this.opinion?.id;
    },
    inactive() {
      return (
        !!this.$state.opinion.active.id &&
        this.$state.opinion.active.id !== this.opinion?.id
      );
    },
    glyphs(): string[] {
      const extra: string[] = [];
      this.opinion?.attributes.glyphs?.forEach((glyph: number) => {
        if (
          !this.parseOpinion.parsedGlyphs.includes(glyph) &&
          this.$state.discourse.font?.glyphMap[glyph].literal
        )
          extra.push(this.$state.discourse.font.glyphMap[glyph].literal);
      });
      return extra;
    },
    parseOpinion() {
      const parsedGlyphs: number[] = [];
      const contentRaw = this.opinion?.attributes.content?.replaceAll(
        this.$f.glyphMethods.regexPattern,
        (glyph: string) => {
          if (
            this.$f.utils.invertObject(this.opinion?.attributes.glyphs)[
              this.$f.glyphMethods.glyphToUnicode(glyph.slice(1))
            ]
          ) {
            parsedGlyphs.push(this.$f.glyphMethods.glyphToUnicode(glyph.slice(1)));
            return `<span class='glyph-tag'>${glyph}</span>`;
          }
          return glyph;
        }
      );
      const content = this.$f.utils.renderMarkdown(contentRaw);
      return {
        content,
        parsedGlyphs,
      };
    },
  },
  watch: {
    active(active: boolean) {
      if (active && this.$el) {
        this.$el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    },
  },
  methods: {
    quote() {
      this.$state.opinion.formActive = true;
      const content = this.$state.opinion.form.attributes.content;
      const author = this.opinion?.attributes.author?.data.attributes?.name;
      const quote = `> ${this.opinion?.attributes.content} (by ${author})\n\n`;
      if (!content) {
        return (this.$state.opinion.form.attributes.content = quote);
      }
      return (this.$state.opinion.form.attributes.content = content + "\n" + quote);
    },
    selectOpinion() {
      const opinion = this.opinion;
      if (opinion === null || this.$state.opinion.active.id === opinion?.id) {
        this.$state.opinion.reset("active");
        this.$state.opinion.reset("form");
        return;
      }
      const selected = JSON.parse(JSON.stringify(opinion));
      this.$state.opinion.active = selected;
      this.$state.opinion.form.attributes.axes = selected.attributes.axes;
      this.$state.opinion.formActive = false;
      // this.$state.opinion.form.attributes.glyphs = selected.attributes.glyphs
      // this.$state.opinion.form.attributes.annotations = selected.attributes.annotations
    },
    removeOpinion() {
      if (!this.opinion) return
      this.$strapi.delete("opinions", this.opinion.id).then(({ data }) => {
        const opinions = this.$state.discourse.current?.attributes.opinions;
        if (opinions?.data) {
          opinions.data = opinions.data.filter((e: Opinion) => e.id !== data.id);
        }
        this.$state.opinion.reset("active");
      });
    },
  },
});
</script>

<style lang="scss">
.opinion {
  .opinion-title {
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box !important;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    white-space: normal;
  }
}
</style>
