<template>
  <form @submit.prevent="$emit('submit', formData)" class="flex flex-col justify-center">
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
      name="content"
      v-model="formData.content"
      :placeholder="$t('describe.discourse')"
      :allowMarkdown="true"
    />
    <Input
      type="file"
      name="font"
      v-model="formData.font"
      :accept="['ttf']"
      :maxFiles="1"
      :maxSize="3 * 1024 * 1024"
    />
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
      <Button type="submit" class="lg sm:order-2">{{submitLabel}}</Button>
      <Button class="clear lg" @click="$emit('cancel')">{{$t('cancel')}}</Button>
    </div>
  </form>
</template>

<script lang="ts">
import { Discourse } from '~/types'
export default defineComponent({
  props: {
    submitLabel: {
      type: String,
      required: true,
    },
    discourse: {
      type: Object as () => Discourse,
    },
  },
  data() {
    return {
      formData: {
        title: "",
        content: "",
        font: null,
      } as {
        title: string
        content: string
        font?: File | null
      },
    };
  },
  mounted() {
    if (this.discourse) {
      this.formData = {
        title: this.discourse.attributes.title,
        content: this.discourse.attributes.content,
        font: null,
      };
    }
  },
  watch: {
    formData: {
      handler(newData) {
        this.$emit('update:formData', newData);
      },
      deep: true,
    },
  }
});
</script>