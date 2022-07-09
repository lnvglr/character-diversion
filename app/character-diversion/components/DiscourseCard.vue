<template>
  <Card class="min-h-[200px] grid duration-75 hover:rounded-md hover:shadow-[inset_0_0_0_2px_var(--color-beige-300)] dark:hover:shadow-[inset_0_0_0_2px_var(--color-neutral-900)]" v-if="discourse">
    <NuxtLink
      :to="`/discourse/${discourse.id}`"
      class="p-4 flex flex-col flex-1 items-stretch"
    >
    <div class="flex items-center gap-3 mb-5">
      <div class="text-5xl text-info-500 bg-beige-100 flex items-center justify-center p-2 rounded-md w-20 h-20 min-w-[5rem] overflow-hidden" v-html="fontPreview"></div>
        <h2 class="text-2xl font-bold leading-tight flex justify-between">
          {{ discourse.attributes.title
          }}
        </h2>
      </div>
      <div class="mt-auto py-2">
      <span class="text-xs flex gap-2">
        <span class="flex gap-1">{{$t('opinion', opinions.length)}}<UITag :round="true">{{opinions.length}}</UITag></span>
        <span class="flex gap-1">{{$t('participant', participants.length)}}<UITag :round="true">{{participants.length}}</UITag></span>
      </span>
      </div>
      <div class="flex justify-between items-center border-t border-beige-200 dark:border-neutral-600 pt-4">
      <Author :post="discourse" class="text-sm" /><Button
            v-if="discourse.attributes.author?.data?.id === $strapi.user?.id"
            @click.prevent="removeDiscourse(discourse.id)"
            color="alert"
            class="sm text-sm clear"
            icon="trash"
            label="false"
          />
          </div>
    </NuxtLink>
  </Card>
</template>
<script lang="ts">
import { Discourse, Opinion, Strapi4Response } from "~/types";
export default defineComponent({
  name: "Discourse Card",
  props: {
    discourse: Object as () => Discourse,
  },
  data() {
    return {};
  },
  computed: {
    font() {
      return {
        url: this.discourse?.attributes.font.data[0].attributes.url,
        name: this.discourse?.attributes.font.data[0].attributes.name,
      }
    },
    previewGlyphs() {
      const font = this.font.name;
      switch (font) {
        case "SeoulGrotesqueVF.ttf":
        case "CableBoldNewHebrewTypography-Regular.ttf":
          return "אל";
        case "square-float.ttf":
          return "f";
        case "FedrawithCRVF.ttf":
          return "jת";
        default:
          return "Ag";
      }
    },
    fontPreview() {
      return `
        <style type="text/css">
          @font-face {
            font-family: '${this.font.name}';
            src: url('${this.font.url}');
          }
        </style>
        <div class="font-preview" style="font-family: '${this.font.name}';">${this.previewGlyphs}</div>
      `;
    },
    opinions() {
      return this.discourse?.attributes.opinions?.data;
    },
    participants() {
      return [...new Set(this.discourse?.attributes.opinions?.data.map((opinion: Opinion) => opinion.attributes.author?.data?.id))]
    },
  },
  methods: {
    removeDiscourse(id: number) {
      this.$strapi
        .delete("discourses", id)
        .then(({ data }: Strapi4Response<Discourse>) => delete discourse.all[data.id]);
    },
  },
})
</script>
<style></style>
