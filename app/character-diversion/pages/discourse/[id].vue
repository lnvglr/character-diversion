<template>
  <div class="-m-10 flex h-screen" v-if="$state.discourse.current">
    <div class="grow overflow-auto">
      <div class="p-5 flex flex-col gap-5">
        <h1 class="text-6xl font-bold">{{ $state.discourse.current.attributes.title }}</h1>
        <Author :post="$state.discourse.current" class="text-sm" />
        <p class="text-md max-w-lg">{{ $state.discourse.current.attributes.content }}</p>
      </div>
      <div class="flex item-center px-5 mb-10 justify-between">
        <div class="button-group">
          <Button v-for="(viewObject, name) in views" @click="view = name" :class="{ active: view === name }" :icon="viewObject.icon" :title="viewObject.label" />
        </div>
        <Button @click="$state.discourse.filter.opinion = !$state.discourse.filter.opinion" icon="filter"
        class="ml-auto mr-2 clear" :title="$t('filter')"
          :class="{ active: $state.discourse.filter.opinion }" />
        <Input type="text" v-model="$state.discourse.search" placeholder="Filter glyphs ..."
          containerClass="text-bold w-auto sm" />
      </div>
      <div :class="`flex flex-wrap`">
        <div class="px-5 py-2 flex-1 max-w-full items-center grid grid-cols-[25px_minmax(300px,_1fr)]"
          v-if="$state.opinion.font" v-for="axis in $state.opinion.font.axes" :key="axis.tag">

          <Input type="checkbox" class="" v-model="$state.opinion.form.attributes.activeAxes" :value="axis.tag" />
          <Input v-if="$state.opinion.form.attributes.axes && axis.tag in $state.opinion.form.attributes.axes"
            type="range" :step="1" :min="axis.min" :max="axis.max"
            v-model="$state.opinion.form.attributes.axes[axis.tag][0]" :label="axis.name" color="info"
            :inlineRange="true" containerClass="grid grid-cols-[80px_minmax(200px,_1fr)]"
            :disabled="!$state.opinion.form.attributes.activeAxes.includes(axis.tag)" />
        </div>
      </div>
      <GlyphsSelection
        :gridSize="views[view].gridSize"
        :fontSize="views[view].fontSize"
        :edit="views[view].edit && $state.opinion.formActive"
        :annotations="views[view].annotations"
        :intersection="views[view].intersection"
        :frame="views[view].frame"
        :style="style"
      />
    </div>

    <DiscourseSidebar />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      view: 'detail',
      views: {
        overview: {
          label: 'Overview',
          icon: 'border-all',
          gridSize: '12',
          fontSize: '2xl',
        },
        detail: {
          label: 'Detail',
          icon: 'eye',
          gridSize: '64',
          fontSize: '10xl',
          edit: true,
          annotations: true,
          frame: true
        },
        intersect: {
          label: 'Intersection',
          icon: 'diagram-venn',
          gridSize: '80',
          fontSize: '16xl',
          edit: true,
          annotations: true,
          intersection: true,
          frame: true
        },
        path: {
          label: 'Path',
          icon: 'bezier-curve',
          gridSize: '80',
          fontSize: '16xl',
          edit: true,
          annotations: true,
          frame: true,
          outline: true
        }
      }
    }
  },
  mounted() {
  },
  computed: {
    style() {
      const axes = Object.entries(this.$state.opinion.form.attributes.axes).map(axis => {
        return `'${axis[0]}' ${axis[1][0]}`;
      }).join(', ')
      return `--font-variation-settings: ${axes}`
    }
  },
})
</script>

<style lang="scss">
.button-group {
  display: flex;
  gap: var(--border-default);

  .button {
    --border-radius: 0;

    &:first-child {
      --border-radius: var(--rounded-md) 0 0 var(--rounded-md);
    }

    &:last-child {
      --border-radius: 0 var(--rounded-md) var(--rounded-md) 0;
    }
  }
}
</style>