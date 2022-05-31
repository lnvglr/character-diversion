<template>
  <div class="-m-10 flex h-screen" v-if="$state.discourse.current">
    <div class="grow overflow-auto">
      <div class="p-5 flex flex-col gap-5">
        <h1 class="text-6xl font-bold">{{ $state.discourse.current.attributes.title }}</h1>
        <p class="text-sm text-beige-500">{{ [$state.discourse.current.attributes.author.data?.attributes.name,
          $f.utils.relativeTime($state.discourse.current.attributes.createdAt)].filter(e => e).join(' · ')
        }}</p>
        <p class="text-md">{{ $state.discourse.current.attributes.content }}</p>
        <!-- <p class="text-md">{{$f.utils.relativeTime($state.discourse.current.attributes.createdAt)}}</p> -->
      </div>
      <div class="grid grid-cols-autofill-16 gap-1 p-1" v-if="$state.configuration.font">
        <div
          class="flex justify-center w-full h-16 bg-white rounded-md relative cursor-pointer border border-beige-100 hover:border-beige-200 hover:bg-neutral-50 overflow-hidden"
          v-for="(glyph, k) in $state.configuration.font.glyphs" :key="glyph.id" :title="glyph.name"
          @mousedown="active = true, $f.glyphMethods.toggleGlyph(glyph.id)"
          @mouseenter="active && $f.glyphMethods.toggleGlyph(glyph.id)"
          >
          <!-- @mousedown="active = true, first = k"
          @mouseenter="active && (last = k)" -->
          <GlyphsMiniGlyph class="text-4xl" :glyph="glyph" :tuple="$state.configuration.axes" :frame="true" />
          <Input type="checkbox" v-model="$state.configuration.glyphs" :value="glyph.id"
            containerClass="absolute w-fit right-0 p-1 pointer-events-none" class="info z-10" />
          <div v-if="glyph.openType?.is"
            class="z-10 absolute bottom-0 right-0 text-xs px-1 m-1 rounded-sm bg-secondary-300/80">{{ glyph.openType.is
            }}
          </div>
          <div
            v-if="$state.discourse.current.attributes.opinions.data.filter(e => e.attributes.glyphs.includes(glyph.id)).length > 0"
            class="z-10 absolute bottom-0 flex items-center justify-center left-0 text-[0.5rem] font-bold px-1 m-1 rounded-full text-white bg-primary-500/80 w-3 h-3"
            :title="$state.discourse.current.attributes.opinions.data.filter(e => e.attributes.glyphs.includes(glyph.id)).map(e => e.attributes.title).filter(e => e).join(', ')">
            {{ $state.discourse.current.attributes.opinions.data.filter(e =>
                e.attributes.glyphs.includes(glyph.id)).map(e => e.attributes.title).filter(e => e).length
            }}
          </div>
        </div>
      </div>
    </div>

    <DiscourseSidebar />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      active: false,
      // first: null,
      // last: null
    }
  },
  watch: {
    // first() {
    //   this.select()
    // },
    // last(a, b) {
    //   this.select(b)
    // }
  },
  mounted() {
    window.addEventListener('mouseup', () => this.active = false);
  },
  methods: {
    select(remove) {
      // select range
      // const selected = [...this.$state.configuration.font.glyphs].slice(this.first, this.last + 1)
      // selected.forEach(e => this.$f.glyphMethods.toggleGlyph(this.$state.configuration.font.glyphs[e.id].id, true))
      // if (remove > this.last) this.$f.glyphMethods.toggleGlyph(remove, false)
      
    },
    removeDiscourse(id: string) {
      this.$strapi.delete("discourses", id).then(({ data }) => delete this.$state.discourse.id[data.id]);
    },
  },
}
</script>

<style scoped>
.minimized {
  position: absolute;
  right: 0;
  z-index: 10;
}
</style>