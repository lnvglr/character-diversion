<template>
  <div class="p-10 flex flex-col gap-5 items-center w-4xl">
  <div class="p-10 flex gap-5 justify-center w-full">
    <Input
      type="text"
      name="title"
      v-model="formData.title"
      placeholder="Title"
      validation="required"
    />
    <Input
      type="textarea"
      rows="3"
      name="content"
      v-model="formData.content"
      placeholder="Description"
    />
  </div>
    <Input
      class="w-full"
      type="range"
      min="0"
      max="1"
      :step="0.01"
      :gap="0.1"
      :decimal="0.01"
      name="range"
      v-model="formData.content"
      label="SHLD"
    />
</div>
</template>

<script setup>
import { discourse } from '@/composables/states'
const router = useRouter()

const formData = reactive({
  title: '',
  // content: 5,
  content: [0.2,0.8],
  contentb: 0.4,
})
const value = ref('hello')
const { create } = useStrapi4()

const postDiscourse = () => {
  create('discourses', {
    title: formData.title,
    content: formData.content,
  }).then(({ data }) => {
    discourse.all.push(data)
    router.push(`/discourse/${data.id}`)
  })
}
</script>

<style>
form {
  width: var(--max-w-sm);
}
</style>