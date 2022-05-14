<template>
<div class="p-10 flex justify-center w-2xl">
	<FormKit
    type="form"
    v-model="formData"
    :form-class="submitted ? 'hide' : 'show'"
    submit-label="Create"
    @submit="postDiscourse"
  >
    <h1 class="font-bold text-2xl mb-5">Start Discourse!</h1>
    <FormKit
      type="text"
      name="title"
      label="Title"
      placeholder="New conventional character relationships"
      validation="required"
    />
    <FormKit
      type="textarea"
      rows="3"
      name="content"
      label="Description"
      placeholder="Your desicription goes here"
    />
  </FormKit>
  </div>
</template>

<script setup>
import { discourse } from '@/composables/states'
const router = useRouter()

const formData = reactive({
	title: '',
	content: '',
})
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
  width: var(--max-w-sm)
}
</style>