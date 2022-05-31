<template>
  <div class="p-10 flex flex-col gap-5 max-w-xl mx-auto">
    <h1 class="text-4xl font-bold">New Discourse</h1>
    <form @submit="postDiscourse" class="flex flex-col justify-center">
      <Input type="text" name="title" v-model="formData.title" placeholder="Title" validation="required" />
      <Input type="textarea" rows="3" name="content" v-model="formData.content" placeholder="Description" />
      <!-- <FormKit type="select" placeholder="Choose Font..." v-model="formData.font" :options="availableOptions" /> -->
      <Input type="file" name="fonts" v-model="formData.font" :accept="['ttf', 'otf']" />
      <Button type="submit" class="large">Start New Discourse</Button>
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
    postDiscourse(e: Event) {
      
      e.preventDefault()

    const data = {};
    const formData = new FormData();

    // this.formData
    //   .forEach((e) => {
    //     if (!['submit', 'file'].includes(type)) {
    //       data[name] = value;
    //     } else if (type === 'file') {
    //       files.forEach((file) => {
    //         formData.append(`files.${name}`, file, file.name);
    //       });
    //     }
    //   });

    // formData.append('data', JSON.stringify(data));

      // form.append("files.featuredImage", this.formData.font)
      // console.log(form.get('files'))
      // const res = this.$strapi.create("upload", form).then((response) => response[0]?.url)
      this.$strapi.create('discourses', {...this.formData, author: this.$strapi.user}).then(({ data }) => {
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