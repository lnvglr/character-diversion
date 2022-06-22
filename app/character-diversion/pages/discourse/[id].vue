<template>
  <div
    class=""
    v-if="$state.discourse.current"
  >
    <Card class="shrink sticky top-0 z-20">
      <TabBar :items="tabs" @active="(e: string) => activeTab = e" />
    </Card>
    <div v-if="activeTab === 'about'" class="">
      <Card>
      <div class="p-5 h-full">
        <h1 class="text-4xl font-bold">{{$state.discourse.current.attributes.title}}</h1>
        <h2 class="text-xl font-bold mt-5" v-if="$state.discourse.font?.name"><span>{{ $state.discourse.font.name }}</span></h2>
        <p class="text-sm flex gap-2 items-center my-2 text-beige-600" v-if="$state.discourse.font?.version"><font-awesome-icon :icon="['fa', 'code-branch']" fixed-width /><span>{{ $state.discourse.font.version }}</span></p>
        </div>
      </Card>
    </div>
    <div v-if="activeTab === 'opinions'" class="grid grid-cols-2 h-full" style="padding-bottom: 66px;">
      <Card class="overflow-auto h-full">
      <div class="flex flex-col w-full h-full overflow-auto">
        <div
          class="p-2 sticky top-0 bg-beige-100 border-y border-beige-300 z-10"
          :class="{ 'border-b-0': sidebarMinimized }"
          v-if="!sidebarMinimized || $state.opinion.formActive"
        >
          <FormNewOpinion />
        </div>
        <ListOpinions
          v-if="!sidebarMinimized && $state.discourse.current"
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
    GlobalAxes,
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
  computed: {
    glyphsViews(): { [key: string]: { [key: string]: string | boolean | undefined } } {
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
