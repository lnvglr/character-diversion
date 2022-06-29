<template>
  <NuxtLayout name="split" back="/discourse">
    <template #title>{{discourseTitle || $t("new.discourse") }}</template>
    <FormNewDiscourse
      :submitLabel="$t('start.new.discourse')"
      @submit="postDiscourse"
      @cancel="$router.push('/discourse')"
      @update:formData="({title}) => discourseTitle = title"
    />
  </NuxtLayout>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      discourseTitle: "",
    }
  },
  methods: {
    postDiscourse(data: any) {
      if (!data.font?.[0]) return;
      const formData = new FormData();
      const dataCompiled = {
        ...data,
        author: this.$strapi.user,
      };

      delete dataCompiled.font;
      formData.append("data", JSON.stringify(dataCompiled));
      formData.append("files.font", data.font[0], data.font[0].name);

      this.$strapi
        .client("discourses", formData)
        .then(({ data }) => {
          return this.$strapi.findOne("discourses", data.id, {
            populate: [
              "featuredImage",
              "font",
              "author",
              "author.avatar",
              "opinions.author",
              "opinions.author.avatar",
              "opinions.comments.author",
              "opinions.comments.author.avatar",
            ],
          });
        })
        .then(({ data }) => {
          this.$state.discourse.all[data.id] = data;
          this.$router.push(`/discourse/${data.id}`);
        });
    },
  },
});
</script>

<style scoped>
/* form {
  width: var(--max-w-sm);
} */
</style>
