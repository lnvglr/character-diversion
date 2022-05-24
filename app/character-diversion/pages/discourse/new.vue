<template>
  <div class="p-10 flex flex-col gap-5 items-center w-full">
  <div class="p-10 flex flex-col justify-center max-w-2xl">
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
  <FormKit type="select" placeholder="Choose Font..." v-model="formData.font" :options="availableOptions" />
  <FormKit type="button" @click="postDiscourse" label="Start Discourse" />
  </div>

</div>
</template>

<script setup>

import { discourse } from '@/composables/states'
const fonts = import.meta.glob('@/public/fonts/*.{ttf,otf}')
const availableOptions = Object.keys(fonts).map(e => e.split('fonts/')[1])

const router = useRouter()

const formData = reactive({
  title: '',
  content: '',
  font: null,
})
// watch(() => {
//   console.log(reactive(toRefs(formData)).font)
// })
const { create } = useStrapi4()

const postDiscourse = () => {
  create('discourses', {
    title: formData.title,
    content: formData.content,
    font: formData.font,
  }).then(({ data }) => {
    discourse.all.push(data)
    router.push(`/discourse/${data.id}`)
  })
}
</script>

<style scoped>
form {
  width: var(--max-w-sm);
}
</style>