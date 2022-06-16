<template>
  <NuxtLayout name="split" back="/discourse">
    <template #title>{{ formData.title || $t("new.discourse") }}</template>
    <form @submit.prevent="postDiscourse" class="flex flex-col justify-center">
      <Input
        type="text"
        name="title"
        v-model="formData.title"
        :placeholder="$t('title')"
        validation="required"
        class="lg"
      />
      <Input
        type="textarea"
        :maxlength="1000"
        :placeholder="$t('describe.discourse')"
        v-model="formData.content"
        :allowMarkdown="true"
      />
      <Input
        type="file"
        name="font"
        v-model="formData.font"
        :accept="['ttf', 'otf']"
        :maxFiles="1"
      />
      <Button type="submit" :disabled="!formData.font?.[0]" class="lg">{{ $t("start.new.discourse") }}</Button>
    </form>
  </NuxtLayout>
</template>

<script lang="ts">
export default {
  data() {
    return {
      formData: {
        title: "",
        content: "",
        font: null,
      },
    };
  },
  async mounted() {
    // console.log()
  },
  methods: {
    postDiscourse(e: Event) {
      if (!this.formData.font[0]) return
      const formData = new FormData();
      const dataCompiled = {
        ...this.formData,
        author: this.$strapi.user,
      };

      delete dataCompiled.font;
      formData.append("data", JSON.stringify(dataCompiled));
      formData.append("files.font", this.formData.font[0], this.formData.font[0].name);

      // this.$strapi.client('discourses', {
      //   method: 'POST',
      //   body: formData
      // })
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
}
</script>

<style scoped>
/* form {
  width: var(--max-w-sm);
} */
</style>
