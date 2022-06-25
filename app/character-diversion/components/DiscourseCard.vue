<template>
  <Card class="min-h-[200px] flex" v-if="discourse">
    <NuxtLink
      :to="`/discourse/${discourse.id}`"
      class="p-4 flex flex-col flex-1 items-stretch"
    >
      <h2 class="text-2xl font-bold leading-tight flex justify-between">
        {{ discourse.attributes.title
        }}<Button
          v-if="discourse.attributes.author?.data?.id === $strapi.user?.id"
          @click.prevent="removeDiscourse(discourse.id)"
          color="alert"
          class="sm text-sm clear"
          icon="trash"
          label="false"
        />
      </h2>

      <Author :post="discourse" class="text-sm mt-auto border-t border-beige-200 pt-4" />
    </NuxtLink>
  </Card>
</template>
<script lang="ts">
import { Discourse, Strapi4Response } from "~/types";
export default defineComponent({
  name: "Discourse Card",
  props: {
    discourse: Object as () => Discourse,
  },
  data() {
    return {};
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
