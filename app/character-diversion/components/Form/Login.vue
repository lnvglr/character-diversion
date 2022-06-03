<template>
  <form class="flex flex-col gap-2" @submit.prevent="login">
    <Input type="text" name="email" placeholder="Email" v-model="formData.identifier" />
    <Input type="password" name="password" placeholder="Password" v-model="formData.password" />
    <Button type="submit" :disabled="formData.password?.length < 3" icon="arrow-right" class="lg"
      >Login</Button>
    <Button to="/forgot-password" class="my-2 clear">Forgot Password?</Button>
  </form>
</template>
<script lang="ts">
export default {
  name: 'Login',

  data() {
    return {
      formData: {} as { identifier: string; password: string },
      error: false,
      errorMsg: `An error occurred, please try again`,
    }
  },
  methods: {
    async login(e: Event) {
      try {
        console.log(e)
        // await this.$strapi.login(this.formData)
        // this.$strapi.user = (await this.$strapi.login(this.formData)).user.value
        this.$strapi.login(this.formData)

        // this.$strapi.login(this.formData).then(({value}) => this.$strapi.user = value)
        this.$router.push('/profile')
        // this.$router.go()
      } catch (e) {}
    },
  },
}
</script>