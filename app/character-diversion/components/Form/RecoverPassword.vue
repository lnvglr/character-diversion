<template>
  <form class="flex gap-2" @submit="forgotPassword">
    <Input type="text" name="email" placeholder="Email" v-model="email" />
    <Button type="submit">
      Send Email Link<font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']" />
    </Button>
  </form>
</template>
<script lang="ts">
import axios from 'axios'
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
      e.preventDefault()
      this.done = false
      this.error = false
      axios
        .post(`http://localhost:1337/api/auth/forgot-password`, {
          email: this.email,
        })
        .then(() => {
          this.done = true
        })
        .catch(() => {
          this.error = true
        })
    },
  },
}
</script>