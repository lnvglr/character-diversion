<template>
  <TransitionExpand>
    <form
      v-if="$strapi.user && $state.opinion.form.attributes && $state.opinion.formActive"
      @submit.prevent="postOpinion"
      class="relative"
      :class="{ ['opacity-50']: loading }"
    >
      <!-- <Author :user="$strapi.user" imageSize="8" class="mb-2 text-xs" /> -->
      <Image class="object-cover rounded-full" :class="`absolute top-2 left-3 w-6 h-6 z-10`"
			:src="$strapi.user.avatar" size="thumbnail" />
      <Input
        ref="content"
        class="indent-7"
        type="textarea"
        rows="4"
        :maxlength="1000"
        :placeholder="$t('describe.opinion')"
        v-model="$state.opinion.form.attributes.content"
        :submitOnEnter="true"
        :allowMarkdown="true"
        @enter="postOpinion"
        @cancel="$state.opinion.reset('form')"
        :class="{
          'shadow-xl': floating && $state.opinion.formActive,
        }"
      />
      <div class="flex gap-1 w-full mb-1" v-if="!floating">

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
        <Button
          class="clear ml-auto hover:text-alert-500"
          style="--color: var(--color-black); --background-color: var(--color-alert-500)"
          @click="$state.opinion.reset('form')"
          >{{ $t("cancel") }}</Button
        >
        <Button :disabled="!canPost" class="" color="success" type="submit">{{
          $t("share.opinion")
        }}</Button>
      </div>
    </form>
  </TransitionExpand>
  <TransitionExpand>
    <div v-if="!$state.opinion.formActive">
      <Button
        class="lg"
        :class="`rounded-full ${floating ? 'mx-auto' : ''}`"
        :style="floating ? '--border-radius: 999px' : ''"
        :color="'primary'"
        @click="openOpinionForm"
        :label="$t('new.opinion')"
        icon="plus"
        >{{ $t("new.opinion") }}</Button
      >
    </div>
  </TransitionExpand>
</template>

<script lang="ts">
import Input from '~/components/Input.vue'
import { SamsaFontAxis } from '~/types'
export default defineComponent({
  components: {
    Input,
  },
  props: {
    floating: {
      type: Boolean
    }
  },
  data() {
    return {
      loading: false
    }
  },
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
    "$state.opinion.formActive"(value: boolean) {
      if (!value) return
      setTimeout(() => {
        const container = this.$refs.content as InstanceType<typeof Input>
        if (!container) return
        const content = container.$el?.querySelector('textarea') as HTMLTextAreaElement;
        if (content) content.focus();
      }, 200);
    },
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
      this.loading = true
      const { content, glyphs, axes: axesRaw, annotations } = this.$state.opinion.form.attributes;
      if (!this.canPost) return;
      const { id, attributes } = this.$state.discourse.current
      const discourse = JSON.parse(JSON.stringify({ id, attributes }))
      const axes = {} as { [key: string]: number[] };
      Object.entries(axesRaw || {})
        .forEach(e => {
          const axis: SamsaFontAxis = this.$state.discourse.font.axes.find((f: SamsaFontAxis) => f.tag === e[0])
          // this adds all axes:
          axes[e[0]] = e[1]
          // this adds only non default axes:
          // if (axis.default !== e[1][0]) {
          //   axes[e[0]] = e[1]
          // }
        })
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
          const attributes = this.$state.discourse.current?.attributes;
          if (attributes?.opinions?.data) {
            attributes.opinions.data.push(data);
          } else if (attributes) {
            attributes.opinions = {
              data: [data],
            };
          }
          this.$state.opinion.form.attributes.content = "";
          this.$state.opinion.form.attributes.annotations = {};
          // this.$state.opinion.active = JSON.parse(JSON.stringify(data));
          this.$state.opinion.selectedGlyphs = [];
          this.$state.opinion.formActive = false;
        });
    },
  },
})
</script>

<style></style>
