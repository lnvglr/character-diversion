<template>
  <!-- class="flex flex-col m-5 border rounded-md bg-beige-50 border-beige-300 outline outline-8 outline-beige-200/90 overflow-hidden w-[240px] min-w-[240px] md:w-[360px] md:min-w-[360px] lg:w-[480px] lg:min-w-[480px]" -->
  <Card class="h-screen" :hoverable="false">
    <div
      class="flex flex-col bg-beige-50 h-full overflow-hidden w-[240px] min-w-[240px] md:w-[360px] md:min-w-[360px] lg:w-[480px] lg:min-w-[480px]"
      :class="{ minimized: sidebarMinimized }"
    >
      <!-- <Image :src="$state.discourse.current.attributes.featuredImage.data?.attributes" /> -->
      <div
        class="p-4 hover:bg-white cursor-pointer"
        @click="sidebarMinimized = !sidebarMinimized"
      >
        <h1 class="text-2xl font-bold flex w-full">
          {{ $state.discourse.current.attributes.title }}
        </h1>
        <p class="text-sm">{{ $state.opinion.font?.names[5].split(";")[0] }}</p>
        <Author :post="$state.discourse.current" class="text-sm mt-2" />
        <p
          class="text-md max-w-lg markdown mt-2"
          v-html="$f.utils.renderMarkdown($state.discourse.current.attributes.content)"
          v-if="
            !sidebarMinimized && $state.discourse.current.attributes.content.length > 0
          "
        ></p>
      </div>
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
</template>

<script lang="ts">
import type { Discourse, Opinion } from "~/types";
export default defineComponent({
  data() {
    return {
      sidebarMinimized: false,
    };
  },
  computed: {
    currentDiscourse(): Discourse {
      return this.$state.discourse.current;
    },
    currentOpinions(): Opinion[] {
      return this.currentDiscourse?.attributes.opinions?.data;
    },
    axes(): string[] {
      return this.$state.discourse.font?.axes;
    },
    version() {
      const v = this.$state.discourse.font?.names[5].split(";")[0]
      const convert = (e: number) => (e % 1 == 0) ? e + ".0" : e;
      return v.split(' ').map((e: string, i: number) => i === 1 ? convert(parseFloat(e)) : e ).join(' ')
    }
  },
});
</script>

<style scoped>
.minimized {
  position: absolute;
  right: 0;
  z-index: 10;
}
</style>
