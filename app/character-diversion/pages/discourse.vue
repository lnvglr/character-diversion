<template>
  <NuxtPage />
</template>

<script lang="ts">
import { Discourse } from "~/types";

export default defineComponent({
  setup() {
    definePageMeta({
      name: "Discourse",
      icon: "bars-progress",
      order: 3,
      layoutTransition: {
        name: "page",
      },
    });
  },
  mounted() {
    console.log("Discourse mounted");
    this.$state.discourse.fetch();
  },
  watch: {
    $route: {
      handler() {
        // if (Object.keys(this.$state.discourse.all).length === 0) {
        //   this.$state.discourse.fetch();
        // }
        this.$state.discourse.setCurrent(this.$route.params.id);
      },
      immediate: true,
    },
    "$state.discourse.current": {
      handler(current: Discourse) {
        const currentFont = this.$state.discourse.currentFont
        if (!current?.attributes.font?.data?.[currentFont]?.attributes.url) {
          this.$state.opinion.reset("active");
          return;
        }
        const dicourseFont = document.createElement("style");
        dicourseFont.appendChild(
          document.createTextNode(`@font-face {
          font-family: 'dicourseFont';
          src: url("${this.$strapi.media}${current.attributes.font?.data?.[currentFont]?.attributes.url}");
        }`)
        );
        document.head.appendChild(dicourseFont);
      },
      deep: true,
    },
  },
})
</script>

<style>
:where(.font-user) {
  font-family: dicourseFont, var(--font-sans);
}
</style>
