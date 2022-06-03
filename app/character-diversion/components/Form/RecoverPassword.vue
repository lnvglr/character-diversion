<template>
  <form class="input-group" @submit.prevent="forgotPassword">
    <Input type="text" name="email" placeholder="Email" v-model="email" />
    <Button type="submit" icon="arrow-right" class="lg">
      Send Email Link
    </Button>
  </form>
</template>
<script lang="ts">
export default {
  name: 'ForgotPassword',

  data() {
    return {
      email: '',
      done: false,
      error: false,
    }
  },
  methods: {
    async forgotPassword(e: Event) {
      this.done = false
      this.error = false
      this.$strapi.forgotPassword({
          email: this.email,
        })
        .then(() => {
          this.done = true
        })
        .catch((e) => {
          console.log(e)
          this.error = true
        })
    },
  },
}
</script>