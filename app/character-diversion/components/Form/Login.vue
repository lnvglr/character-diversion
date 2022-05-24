<template>
  <form class="flex flex-col gap-2" @submit="login">
    <Input type="text" name="email" placeholder="Email" v-model="formData.email" />
    <Input type="password" name="password" placeholder="Password" v-model="formData.password" />
    <ButtonDefault type="submit" :disabled="formData.password?.length < 3"
      >Login<font-awesome-icon class="ml-3" :icon="['fas', 'arrow-right']"
    /></ButtonDefault>

    <p class="my-2">
      <NuxtLink to="/forgot-password">Forgot Password?</NuxtLink>
    </p>
  </form>
</template>
<script lang="ts">
import axios from 'axios'
export default {
  name: 'Login',

  data() {
    return {
      formData: {} as { email: string; password: string },
      error: false,
      errorMsg: `An error occurred, please try again`,
    }
  },
  methods: {
    async login(e: Event) {
      e.preventDefault()
      try {
        console.log(this.formData)
        const res = await axios.post(`http://localhost:1337/api/auth/local`, {
          identifier: this.formData.email,
          password: this.formData.password,
        })
        console.log(res.data)
        const { jwt, user } = res.data
        window.sessionStorage.setItem('jwt', jwt)
        window.sessionStorage.setItem('userData', JSON.stringify(user))
        this.$router.push('/')
      } catch (error) {
        this.error = true
        this.password = ''
      }
    },
  },
}
</script>