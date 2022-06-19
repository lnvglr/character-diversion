<template>
  <TransitionExpand>
    <form
      v-if="$strapi.user && $state.opinion.form.attributes && $state.opinion.formActive"
      @submit.prevent="postOpinion"
    >
      <Input
        type="textarea"
        :maxlength="500"
        :placeholder="$t('describe.opinion')"
        v-model="$state.opinion.form.attributes.content"
        :submitOnEnter="true"
        :allowMarkdown="true"
        @enter="postOpinion"
        @cancel="$state.opinion.reset('form')"
      />
      <TransitionExpand>
        <div v-if="selectedGlyphs.length > 0">
          <div>
            <font-awesome-icon
              :icon="['fas', 'circle-check']"
              class="text-beige-400 mr-2"
            />
            <UITag v-for="g in selectedGlyphs">{{ g }}</UITag>
          </div>
        </div>
      </TransitionExpand>
      <div class="flex gap-1 w-full mb-1">
        <Button
          class="clear w-full lg"
          color="alert"
          @click="$state.opinion.reset('form')"
          >{{ $t("cancel") }}</Button
        >
        <Button :disabled="!canPost" class="w-full lg" color="success" type="submit">{{
          $t("share.opinion")
        }}</Button>
      </div>
    </form>
  </TransitionExpand>
  <TransitionExpand>
    <div v-if="!$state.opinion.formActive">
      <Button
        class="w-full"
        color="success lg"
        @click="openOpinionForm"
        :label="$t('new.opinion')"
        icon="plus"
        >{{ $t("new.opinion") }}</Button
      >
    </div>
  </TransitionExpand>
</template>

<script lang="ts">
export default defineComponent({
  computed: {
    currentDiscourse() {
      return this.$state.discourse.current;
    },
    selectedGlyphs() {
      if (!this.$state.opinion.selectedGlyphs) return [];
      return this.$f.glyphMethods.getGlyphsById([
        ...new Set([
          ...this.$state.opinion.form.attributes.glyphs,
          ...this.$state.opinion.selectedGlyphs,
        ]),
      ]);
    },
    canPost() {
      const { content } = this.$state.opinion.form.attributes;
      if (content !== null && content?.length > 1) return true;
    },
  },
  watch: {
    "$state.opinion.form.attributes.content"(value: string) {
      const matchedGlyphs = this.$f.glyphMethods.match(value);
      this.$state.opinion.form.attributes.glyphs = [
        ...new Set([...this.$state.opinion.selectedGlyphs, ...matchedGlyphs]),
      ].filter((e) => e);
    },
  },
  methods: {
    openOpinionForm() {
      if (!this.$strapi.user) return this.$router.push("/login");
      this.$state.opinion.formActive = true;
    },
    postOpinion() {
      const { content, glyphs, axes, annotations } = this.$state.opinion.form.attributes;
      if (!this.canPost) return;
      const { id, attributes } = this.$state.discourse.current
      const discourse = JSON.parse(JSON.stringify({ id, attributes }))
      const opinion = {
        content,
        glyphs,
        axes,
        annotations,
        discourse,
        author: this.$strapi.user,
      };
      this.$strapi
        .create("opinions", opinion)
        .then(({ data }) => {
          return this.$strapi.findOne("opinions", data.id, {
            populate: [
              "author",
              "author.avatar",
              "comments.author",
              "comments.author.avatar",
            ],
          });
        })
        .then(({ data }) => {
          const attributes = this.$state.discourse.current.attributes;
          if (attributes.opinions?.data) {
            attributes.opinions.data.push(data);
          } else {
            attributes.opinions = {
              data: [data],
            };
          }
          this.$state.opinion.form.attributes.content = "";
          this.$state.opinion.form.attributes.annotations = {};
          this.$state.opinion.active = JSON.parse(JSON.stringify(data));
          this.$state.opinion.selectedGlyphs = [];
          this.$state.opinion.formActive = false;
        });
    },
  },
})
</script>

<style></style>
