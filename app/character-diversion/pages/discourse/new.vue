<template>
  <div class="p-10 flex flex-col gap-5 max-w-xl mx-auto">
    <h1 class="text-4xl font-bold">New Discourse</h1>
    <form @submit.prevent="postDiscourse" class="flex flex-col justify-center">
      <Input type="text" name="title" v-model="formData.title" placeholder="Title" validation="required" />
      <Input type="textarea" rows="3" name="content" v-model="formData.content" placeholder="Description" />
      <!-- <FormKit type="select" placeholder="Choose Font..." v-model="formData.font" :options="availableOptions" /> -->
      <Input type="file" name="font" v-model="formData.font" :accept="['ttf', 'otf', 'jpg', 'png']" />
      <Button type="submit" class="lg">Start New Discourse</Button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  setup() {
    const fonts = import.meta.glob('@/public/fonts/*.{ttf,otf}')
    const availableOptions = Object.keys(fonts).map(e => e.split('fonts/')[1])
    return {
      availableOptions
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
    postDiscourse(e: Event) {
      const formData = new FormData();
      const dataCompiled = {
        ...this.formData,
        author: this.$strapi.user
      };
      
      delete dataCompiled.font
      formData.append('data', JSON.stringify(dataCompiled));
      formData.append('files.font', this.formData.font[0], this.formData.font[0].name);

      // this.$strapi.client('discourses', {
      //   method: 'POST',
      //   body: formData
      // })
      this.$strapi.client('discourses', formData)
        .then(({ data }) => {
          return this.$strapi.findOne('discourses', data.id, {
            populate: ['featuredImage', 'font', 'author', 'author.avatar', 'opinions.author', 'opinions.author.avatar', 'opinions.comments.author', 'opinions.comments.author.avatar']
          })
        })
        .then(({ data }) => {
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