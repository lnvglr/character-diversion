<template>
  <div class="p-10 flex flex-col gap-5 items-center w-full">
    <form @submit="postDiscourse" class="p-10 gap-2 flex flex-col justify-center max-w-2xl">
      <Input type="text" name="title" v-model="formData.title" placeholder="Title" validation="required" />
      <Input type="textarea" rows="3" name="content" v-model="formData.content" placeholder="Description" />
      <FormKit type="select" placeholder="Choose Font..." v-model="formData.font" :options="availableOptions" />
      <ButtonDefault type="submit">Start New Discourse</ButtonDefault>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const fonts = import.meta.glob('@/public/fonts/*.{ttf,otf}')
    const availableOptions = Object.keys(fonts).map(e => e.split('fonts/')[1])
    return {
      availableOptions,
    }
  },
  data() {
    return {
      formData: {
        title: '',
        content: '',
        font: null,
      }
    }
  },
  methods: {
    postDiscourse() {
      this.$strapi.create('discourses', this.formData).then(({ data }) => {
        this.$state.discourse.id[data.id] = data
        this.$router.push(`/discourse/${data.id}`)
      })
    }
  }
}

</script>

<style scoped>
form {
  width: var(--max-w-sm);
}
</style>