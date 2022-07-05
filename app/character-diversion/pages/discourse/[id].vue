<template>
  <div class="discourse-container gap-0.5" v-if="$state.discourse.current">
    
    <!-- {{$state.opinion.selectedGlyphs}} -->

    <!-- <Input type="checkbox" v-for="glyph in $state.discourse.font?.glyphs.slice(0,10)" v-model="$state.opinion.selectedGlyphs" :itemValue="glyph.id" /> -->
    <Card class="shrink sticky top-0 z-20">
      <TabBar :items="tabs" @active="(e: string) => activeTab = e" />
    </Card>

    <AboutDiscourse v-if="activeTab === 'about'" />

    <div
      v-if="activeTab === 'opinions'"
      class="grid grid-cols-2 grid-rows-1 overflow-auto h-full gap-0.5"
    >
      <Card class="overflow-auto h-full">
        <div class="flex flex-col w-full h-full overflow-auto">
          <div class="p-2 sticky top-0 bg-beige-100 border-b border-beige-300 z-10">
            <FormNewOpinion />
          </div>
          <ListOpinions
            :opinions="$state.discourse.current.attributes.opinions?.data"
            class="border-b border-beige-300"
          />
        </div>
      </Card>
      <GlyphsSelection
        :gridSize="glyphsViews[glyphsView].gridSize"
        :fontSize="glyphsViews[glyphsView].fontSize"
        :edit="glyphsViews[glyphsView].edit && $state.opinion.formActive"
        :annotations="glyphsViews[glyphsView].annotations"
        :intersection="glyphsViews[glyphsView].intersection"
        :frame="glyphsViews[glyphsView].frame"
        :outline="glyphsViews[glyphsView].outline"
        :style="style"
      />
    </div>
    <Card v-if="activeTab === 'glyphs'">
      <div class="flex flex-col gap-5 w-full p-5">
        <FilterGroup :items="glyphsViews" @active="(e: string) => glyphsView = e" />
        <GlobalAxes :spectrum="glyphsView === 'intersect'" />
      </div>
    </Card>
    <GlyphsSelection
      v-if="activeTab === 'glyphs'"
      :gridSize="glyphsViews[glyphsView].gridSize"
      :fontSize="glyphsViews[glyphsView].fontSize"
      :edit="glyphsViews[glyphsView].edit && $state.opinion.formActive"
      :annotations="glyphsViews[glyphsView].annotations"
      :intersection="glyphsViews[glyphsView].intersection"
      :frame="glyphsViews[glyphsView].frame"
      :outline="glyphsViews[glyphsView].outline"
      :style="style"
    />
    <div
      class="fixed ml-0 sm:ml-10 mb-10 sm:mb-10 left-1/2 bottom-0 z-50 -translate-x-1/2 w-full max-w-xs"
      v-if="activeTab === 'glyphs'"
    >
      <FormNewOpinion :floating="true" />
    </div>
  </div>
  <div v-else class="absolute top-0 w-full h-full flex items-center justify-center"><div class="spinner absolute lg"></div></div>
</template>

<script lang="ts">
import TabBar from "@/components/Cells/TabBar.vue";
import FilterGroup from "@/components/Organisms/FilterGroup.vue";
import GlobalAxes from "@/components/Organisms/GlobalAxes.vue";
import AboutDiscourse from "@/components/Species/AboutDiscourse.vue";
export default defineComponent({
  components: {
    TabBar,
    FilterGroup,
    GlobalAxes,
    AboutDiscourse
  },
  data() {
    return {
      glyphsView: "detail",
      activeTab: "glyphs",
      tabs: {
        about: {
          icon: "address-card",
          label: "About",
        },
        glyphs: {
          icon: "border-all",
          label: "Glyphs",
          active: true,
        },
        opinions: {
          icon: "diagram-successor",
          label: "Opinions",
        },
      },
    };
  },
  created() {
    // if (!this.$state.discourse.current) this.$state.discourse.setCurrent(Number(this.$route.params.id));
  },
  computed: {
    glyphsViews() {
      return {
        overview: {
          label: "Overview",
          icon: "border-all",
          gridSize: "16",
          fontSize: "2xl",
        },
        detail: {
          label: "Detail",
          icon: "eye",
          gridSize: "64",
          fontSize: "10xl",
          edit: true,
          annotations: true,
          frame: true,
        },
        intersect: {
          label: "Intersection",
          icon: "diagram-venn",
          gridSize: "80",
          fontSize: "16xl",
          edit: true,
          annotations: true,
          intersection: true,
          frame: true,
          hide: !this.$state.discourse.font?.glyphs.some((e) => e.tvts.length > 0),
        },
        path: {
          label: "Path",
          icon: "bezier-curve",
          gridSize: "80",
          fontSize: "16xl",
          edit: true,
          annotations: true,
          frame: true,
          outline: true,
        },
      };
    },
    style() {
      const axesRaw = this.$state.opinion.form.attributes.axes;
      const axes = Object.entries(axesRaw || {})
        .map((axis) => {
          return `'${axis[0]}' ${axis[1][0]}`;
        })
        .join(", ");
      return `--font-variation-settings: ${axes}`;
    },
  },
  watch: {
    activeTab(tab) {
      this.$state.discourse.filter.opinion = tab === "opinions";
    },
  },
  methods: {
    setView(name: string) {
      this.glyphsView = name;
    },
  },
});
</script>

<style lang="scss">
.discourse-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content 1fr min-content;
  height: 100%;
}
</style>
