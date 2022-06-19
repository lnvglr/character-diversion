<template>
  <div v-if="linkedOpinions(glyph.id).length > 0" class="">
    <VDropdown :distance="12" :skidding="-8" placement="bottom-start">
      <button
        class="flex items-center justify-center font-bold rounded-full text-white bg-primary-500/80"
        :class="size === 'lg' ? 'w-5 h-5 text-xs' : 'w-3 h-3 text-[0.5rem]'"
      >
        <!-- @click="$state.opinion.reset('active')" -->
        {{ linkedOpinions(glyph.id).length }}
      </button>
      <template #popper>
        <ListOpinions
          v-if="linkedOpinions(glyph.id).length > 0"
          :opinions="linkedOpinions(glyph.id)"
          class="w-[360px] min-w-[360px] max-h-[360px] overflow-auto"
        />
      </template>
    </VDropdown>
  </div>
</template>
<script lang="ts">
import SamsaGlyph from "~/types";
export default {
  props: {
    glyph: {
      type: Object as () => SamsaGlyph,
    },
    size: {
      type: String,
      default: 'sm'
    },
  },
  methods: {
    linkedOpinions(id: number) {
      return this.$f.glyphMethods.glyphHasOpinion(id);
    },
  },
};
</script>
