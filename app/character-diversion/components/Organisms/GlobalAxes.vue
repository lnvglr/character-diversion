<template>
  <div :class="`flex flex-wrap gap-x-5 gap-y-1`"
      v-if="$state.discourse.font?.axes && $state.discourse.font?.axes.length > 0">
    <div
      class="flex-1 max-w-full items-center grid"
      v-for="axis in $state.discourse.font.axes"
      :key="axis.tag"
    >
      <Input
        v-if="$state.opinion.form.attributes.axes?.[axis.tag] && spectrum"
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
        v-if="$state.opinion.form.attributes.axes?.[axis.tag] && !spectrum"
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
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    spectrum: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    axes: {
      handler() {
        this.$f.glyphMethods.setAxesPosition();
      },
      immediate: true,
    },
  },
});
</script>

<style scoped></style>
