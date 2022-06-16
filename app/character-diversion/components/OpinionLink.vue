<template>
  <div v-if="linkedOpinions(glyph.id).length > 0" class="z-10 absolute bottom-2 left-2">
    <VDropdown :distance="12" :skidding="-8" placement="bottom-start">
      <button
        class="flex items-center justify-center font-bold rounded-full text-white bg-primary-500/80"
        :class="size === 'sm' ? 'w-3 h-3 text-[0.5rem]' : 'w-5 h-5 text-xs'"
        @click="$state.opinion.reset('active')"
      >
        {{ linkedOpinions(glyph.id).length }}
      </button>
      <template #popper>
        <ListOpinions
          v-if="linkedOpinions(glyph.id).length > 0"
          :opinions="linkedOpinions(glyph.id)"
          class="w-[360px] min-w-[360px]"
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
    },
  },
  methods: {
    linkedOpinions(id: number) {
      return this.$f.glyphMethods.glyphHasOpinion(id);
    },
  },
};
</script>
