<template>
  <div class="h-full overflow-hidden">
    <div class="grid md:grid-cols-2 h-full gap-0.5">
      <Card v-if="$state.discourse.current" class="p-10 flex-col overflow-y-auto">
        <div class="flex gap-5 mb-5 items-center justify-between">
          <h1 class="font-bold text-4xl">
            {{ $state.discourse.current.attributes.title }}
          </h1>
          <Button class="clear" @click="edit" v-if="$state.discourse.current.attributes.author.data.id === $strapi.user.id">{{ $t(editing ? "done" : "edit") }}</Button>
        </div>
        <Author
          v-if="!editing"
          :post="$state.discourse.current"
          imageSize="12"
          class="mt-5"
        />
        <p v-if="!editing" class="text-md mt-5 markdown">
          <span
            v-html="$f.utils.renderMarkdown($state.discourse.current.attributes.content)"
          ></span>
        </p>
        <FormNewDiscourse
          v-if="editing"
          :submitLabel="$t('update')"
          :discourse="$state.discourse.current"
          @submit="updateDiscourse"
          @cancel="cancel"
          @update:formData="updateFormData"
        />
      </Card>
      <Card>
        <div class="h-full p-10">
          <h2 class="text-xl font-bold" v-if="$state.discourse.font?.name">
            <span>{{ $state.discourse.font.name }}</span>
          </h2>
          <p
            class="text-sm flex gap-2 items-center my-2 text-beige-600"
            v-if="$state.discourse.font?.version"
          >
            <font-awesome-icon :icon="['fa', 'code-branch']" fixed-width /><span>{{
              $state.discourse.font.version
            }}</span>
          </p>

					<!-- <Input
						type="number"
						v-model="$state.discourse.currentFont"
						:max="$state.discourse.current?.attributes.font.data?.length - 1 || 0"
					/> -->
					<p class="mt-5">Select Version:</p>
					<div class="flex gap-2">
					<Button v-for="(font, key) in $state.discourse.current?.attributes.font.data" :key="font.id" @click="$state.discourse.currentFont = key" class="text-sm" :class="{active: $state.discourse.currentFont === key }">{{ font.attributes.name }}</Button>
					</div>
        </div>
        <!-- @update:formData="({ title }) => (discourseTitle = title)" -->
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  data() {
    return {
      editing: false,
      formData: {} as {
        title?: string;
        content?: string;
        font?: File;
      },
    };
  },
  methods: {
    cancel() {
      this.editing = false;
    },
    edit() {
      if (!this.editing) {
        this.editing = true;
      } else {
        this.updateDiscourse(this.formData);
      }
    },
    updateFormData(formData: typeof this.formData) {
      this.formData = formData;
      if (this.$state.discourse.current && formData.title)
        this.$state.discourse.current.attributes.title = formData.title;
    },
    async updateDiscourse(formData: typeof this.formData): Promise<void> {
      console.log(this.$state.discourse.current);
      if (!this.$state.discourse.current) return;
      const data = {} as typeof formData;
      data.title = formData.title;
      data.content = formData.content;

      if (formData.font) {
        const font = await this.$strapi.uploadFile(
          formData.font[0],
          "discourses",
          this.$state.discourse.current.id,
          "font"
        ).then((res) => res);
        console.log(font);
      }

      this.$strapi
        .update("discourses", this.$state.discourse.current.id, data)
        .then((e) => this.editing = false);
    },
  },
});
</script>

<style lang="scss"></style>
