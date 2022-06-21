<template>
  <div class="-m-10 flex h-screen" v-if="$state.discourse.current">

    <div class="mr-2 mt-2">
      <TabBar :items="tabs" @active="(e: string) => activeTab = e" />
    </div>
    <div class="grow overflow-auto">
      <Card class="" :hoverable="false">
        <div class="flex flex-col gap-5 w-full p-5">
          <FilterGroup :items="glyphsViews" @active="(e: string) => glyphsView = e" />
          <div :class="`flex flex-wrap mt-2 gap-5`">
            <!-- grid-cols-[25px_minmax(300px,_1fr)] -->
            <div
              class="py-2 flex-1 max-w-full items-center grid"
              v-if="$state.opinion.font"
              v-for="axis in $state.opinion.font.axes"
              :key="axis.tag"
            >
              <!-- <Input type="checkbox" class="" v-model="$state.opinion.form.attributes.activeAxes" :value="axis.tag" /> -->
            <Input
              v-if="axis.tag in $state.opinion.form.attributes.axes && glyphsView === 'intersect'"
              type="range"
              :step="$f.utils.convertToBase(axis.max - axis.min)"
              :decimal="1"
              :min="axis.min"
              :max="axis.max"
              v-model="$state.opinion.form.attributes.axes[axis.tag]"
              :label="axis.name"
              color="info"
              :inlineRange="true"
              containerClass="grid grid-cols-[80px_minmax(200px,_1fr)]"
            />
            <Input
              v-if="axis.tag in $state.opinion.form.attributes.axes && glyphsView !== 'intersect'"
              type="range"
              :step="$f.utils.convertToBase(axis.max - axis.min)"
              :decimal="1"
              :min="axis.min"
              :max="axis.max"
              v-model="$state.opinion.form.attributes.axes[axis.tag][0]"
              :label="axis.name"
              color="info"
              :inlineRange="true"
              containerClass="grid grid-cols-[80px_minmax(200px,_1fr)]"
            />
              <!-- :disabled="!$state.opinion.form.attributes.activeAxes.includes(axis.tag)" -->
            </div>
          </div>
        </div>
      </Card>
      <GlyphsSelection
        :gridSize="views[view].gridSize"
        :fontSize="views[view].fontSize"
        :edit="views[view].edit && $state.opinion.formActive"
        :annotations="views[view].annotations"
        :intersection="views[view].intersection"
        :frame="views[view].frame"
        :outline="views[view].outline"
        :style="style"
      />
    </div>
    <div class="">
      <DiscourseSidebar />
    </div>
  </div>
</template>

<script lang="ts">
import TabBar from "@/components/Cells/TabBar.vue";
import FilterGroup from "@/components/Organisms/FilterGroup.vue";
export default defineComponent({
  components: {
    TabBar, FilterGroup
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

<style lang="scss">
</style>
