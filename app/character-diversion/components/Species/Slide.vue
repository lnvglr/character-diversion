<template>
  <div
    class="slide flex flex-col tabular-nums font-presentation text-2xl z-10 h-full gap-5 select-none"
    :class="{ 'text-white': bg || img[0] }"
    @click.self="$emit('next')"
  >
    <span class="text-3xl font-bold text-beige-300 font-presentation">{{
      preHeader
    }}</span>
    <component
      :is="headerSize"
      :class="headerClass"
      class="font-bold font-presentation leading-none"
      >{{ header }}</component
    >
    <div class="text-3xl"><slot></slot></div>
    <div
      class="flex justify-between mt-auto font-bold leading-none text-beige-400"
      :class="{ 'text-white': bg }"
    >
      <span :class="{ 'text-white': img[0] }">{{
        [pageFooter, date, name].join("&emsp;·&emsp;")
      }}</span
      ><span class="text-right" :class="{ 'text-white': img[1] }">{{ title }}</span>
    </div>
  </div>
  <img v-if="bg" :src="bg" class="absolute top-0 left-0 w-full h-full object-cover z-0" />
  <div v-if="img.length > 0" class="grid grid-cols-2 absolute top-0 left-0 w-full h-full">
    <img v-if="img[0]" :src="img[0]" class="object-cover col-start-1 col-span-1 h-full" />
    <img v-if="img[1]" :src="img[1]" class="object-cover col-start-2 col-span-1 h-full" />
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    header: {
      type: String,
    },
    headerSize: {
      type: String,
      default: "h2",
    },
    preHeader: {
      type: String,
    },
    page: {
      type: Number,
    },
    totalPages: {
      type: Number,
    },
    bg: {
      type: String,
    },
    img: {
      type: Array as () => string[],
      default: () => [],
    },
  },
  computed: {
    headerClass(): string {
      switch (this.headerSize) {
        case "h1":
          return "text-[6rem]";
        case "h2":
          return "text-6xl";
        case "h3":
          return "text-5xl";
        case "h4":
          return "text-4xl";
        default:
          return "";
      }
    },
    pageFooter(): string {
      return `${this.page} (${this.totalPages})`;
    },
  },
  data() {
    return {
      name: "Leon Vogler",
      date: "07/04/2022",
      title: "Character Diversion",
    };
  },
});
</script>

<style lang="scss">
.slide {
  ol {
    list-style: auto;
    padding-left: 1em;
  }
}
</style>
