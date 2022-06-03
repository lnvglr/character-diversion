<template>
  <form class="flex flex-col gap-2" @submit.prevent="resetPassword">
    <Input type="password" v-model="password" placeholder="Password" />
    <Input type="password" v-model="confirmPassword" placeholder="Confirm Password" />
    <Button type="submit" class="arrow" :disabled="password.length < 3 || password !== confirmPassword">
      Reset Password
    </Button>
  </form>
</template>
<script lang="ts">
export default {
  name: 'ResetPassword',
  data() {
    return {
      password: '',
      confirmPassword: '',
      done: false,
      error: false,
    }
  },
  methods: {
    async resetPassword() {
      this.$strapi.resetPassword({
        code: this.$route.query.code,
        password: this.password,
        passwordConfirmation: this.confirmPassword,
      })
        .then(() => {
          this.done = true
          this.$router.push('login')
        })
        .catch(() => {
          this.error = true
        })
    },
  },
}
</script>