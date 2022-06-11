<template>
  <div v-if="opinion" @click="selectOpinion" class="opinion w-full duration-300"
    :class="{ 'opacity-30': inactive }">
    <div class="flex items-center p-2 pt-1 hover:bg-beige-100 cursor-pointer border-b border-beige-300"
      :class="active && 'bg-beige-100 -mt-[1px] border-y'">
      <div class="flex flex-col gap-2 w-full">
        <div class="relative">
          <div class="flex w-full">
            <Vote :opinion="opinion" class="w-10" style="min-width: var(--w-7)" />
            <div class="flex-1">
              <div class="float-right" v-if="opinion.attributes.author.data.id === $strapi.user?.id"><Button
                  class="clear text-sm xs" :class="{ 'opacity-0 pointer-events-none': !active }"
                  @click.stop="removeOpinion()" color="alert" icon="trash" /></div>
              <p
                class="line-clamp-3 text-sm break-words"
                :class="!active ? 'line-clamp-3' : 'line-clamp-none'"
                v-html="parseOpinion.title"
              />
            </div>
          </div>
          <TransitionExpand>
            <div v-if="active && glyphs.length > 0">
              <span class="mt-2 flex flex-wrap gap-1 items-center text-xs">
                <UITag v-for="glyph in glyphs">{{ glyph }}</UITag>
              </span>
            </div>
          </TransitionExpand>
        </div>
        <span class="flex gap-2 items-center text-beige-400 text-xs">
          <Image class="w-8 h-8 object-cover rounded-full"
            :src="opinion.attributes.author?.data?.attributes?.avatar.data?.attributes" size="thumbnail" />
          <span
            v-html="[`<b>${opinion.attributes.author?.data?.attributes?.name}</b>`, publishedAt].filter(e => e).join(' · ')"></span>
        </span>
      </div>
    </div>
    <TransitionExpand>
      <div v-if="active && opinion.attributes.comments?.data.length > 0">
        <div class="p-5 border-b border-beige-300 bg-white">
          <div v-for="comment in opinion.attributes.comments?.data" :key="comment.id">{{ comment.attributes.content }}
          </div>
        </div>
      </div>
    </TransitionExpand>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    opinion: {
      type: Object,
    },
  },
  data() {
    return {
    }
  },
  computed: {
    active() {
      return this.$state.opinion.active.id === this.opinion.id
    },
    inactive() {
      return this.$state.opinion.active.id && (this.$state.opinion.active.id !== this.opinion.id)
    },
    glyphs() {
      const extra = []
      this.opinion.attributes.glyphs.forEach((glyph: number) => {
        if (!this.parseOpinion.parsedGlyphs.includes(glyph)) extra.push(this.$state.opinion.font.glyphMap[glyph].literal)
      })
      return extra
    },
    publishedAt() {
      return this.$f.utils.relativeTime(this.opinion.attributes.publishedAt)
    },
    parseOpinion() {
      const parsedGlyphs = []
      const titleRaw = this.opinion.attributes.title.replaceAll(this.$f.glyphMethods.regexPattern, (glyph: string) => {
        if (this.$f.utils.invertObject(this.opinion.attributes.glyphs)[this.$f.glyphMethods.glyphToUnicode(glyph.slice(1))]) {
          parsedGlyphs.push(this.$f.glyphMethods.glyphToUnicode(glyph.slice(1)))
          return `<span class='glyph-tag'>${glyph}</span>`
        }
        return glyph

      })
      // const title = this.active ? titleRaw : titleRaw.substring(0, 160) + (titleRaw.length > 180 ? ' ...' : '');
      const title = titleRaw


      return {
        title: this.$f.utils.renderMarkdown(title),
        parsedGlyphs,
      }
    },
  },
  watch: {
    active(active: boolean) {
      if (active && this.$el) {
        this.$el.scrollIntoView({ block: "nearest", behavior: 'smooth' })
      }
    },
  },
  methods: {
    selectOpinion() {
      const opinion = this.opinion
      if (opinion === null || this.$state.opinion.active.id === opinion.id) {
        this.$state.opinion.reset('active')
        this.$state.opinion.reset('form')
        return
      }
      const selected = JSON.parse(JSON.stringify(opinion))
      this.$state.opinion.active = selected
      this.$state.opinion.form.attributes.axes = selected.attributes.axes
      // this.$state.opinion.form.attributes.glyphs = selected.attributes.glyphs
      // this.$state.opinion.form.attributes.annotations = selected.attributes.annotations
    },
    removeOpinion() {
      this.$strapi.delete("opinions", this.opinion.id).then(({ data }) => {
        const opinions = this.$state.discourse.current.attributes.opinions
        if (opinions?.data) {
          opinions.data = opinions.data.filter((e) => e.id !== data.id)
        }
        this.$state.opinion.reset('active')
      });
    },
  }
}
</script>

<style lang="scss">
.opinion {
  a {
    color: var(--color-info-500);

    &:hover {
      text-decoration: underline;
    }
  }
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