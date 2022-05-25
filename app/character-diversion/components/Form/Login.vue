<template>
  <form class="flex flex-col gap-2" @submit="login">
    <Input type="text" name="email" placeholder="Email" v-model="formData.identifier" />
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
      e.preventDefault()
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