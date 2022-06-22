<template>
  <div class="h-full flex flex-col justify-start gap-0 overflow-hidden" v-if="$state.discourse.current">
    <Card class="shrink sticky top-0 z-20" :hoverable="false">
      <TabBar :items="tabs" @active="(e: string) => activeTab = e" />
    </Card>
    <!-- <DiscourseSidebar /> -->
    <Card class="" :hoverable="false">
      <div class="flex flex-col gap-5 w-full p-5">
        <FilterGroup :items="glyphsViews" @active="(e: string) => glyphsView = e" />
        <GlobalAxes :spectrum="glyphsView === 'intersect'" />
      </div>
    </Card>
    <div class="fixed ml-10 left-1/2 bottom-10 z-50 -translate-x-1/2 w-96">
      <FormNewOpinion :floating="true" />
    </div>
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
</template>

<script lang="ts">
import TabBar from "@/components/Cells/TabBar.vue";
import FilterGroup from "@/components/Organisms/FilterGroup.vue";
import GlobalAxes from "@/components/Organisms/GlobalAxes.vue";
export default defineComponent({
  components: {
    TabBar,
    FilterGroup,
    GlobalAxes
  },
  data() {
    return {
      glyphsView: "detail",
      activeTab: "about",
      tabs: {
        about: {
          icon: "address-card",
          label: "About",
          active: true,
        },
        glyphs: {
          icon: "border-all",
          label: "Glyphs",
        },
        opinions: {
          icon: "diagram-successor",
          label: "Opinions",
        },
      },
    };
  },
  computed: {
    glyphsViews(): { [key: string]: { [key: string]: any } } {
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
      const axes = Object.entries(axesRaw)
        .map((axis) => {
          return `'${axis[0]}' ${axis[1][0]}`;
        })
        .join(", ");
      return `--font-variation-settings: ${axes}`;
    },
  },
  methods: {
    setView(name: string) {
      this.glyphsView = name;
    },
  },
});
</script>

<style lang="scss"></style>
