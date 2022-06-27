<template>
  <form class="flex flex-col gap-2" @submit.prevent="login">
    <Input type="text" name="email" placeholder="Email" v-model="formData.identifier" class="lg" />
    <Input type="password" name="password" placeholder="Password" v-model="formData.password" class="lg" autocomplete="current-password" />
    <Button type="submit" :disabled="formData.password?.length < 3" icon="arrow-right" class="lg"
      >Login</Button>
    <p v-show="error" class="text-sm text-alert-500">{{ errorMsg }}</p>

    <Button to="/forgot-password" class="my-2 clear inline-block lg">{{$t('forgot.password')}}</Button>
    <hr />
    <p>{{$t('no.account.yet')}} <Button to="/register" class="clear inline-block">{{$t('register')}}</Button></p>

  </form>
</template>
<script lang="ts">
export default defineComponent({
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
        this.$strapi.login(this.formData).then(() => {
          this.$router.push('/profile')
        }).catch((e) => {
          this.error = true
          this.errorMsg = e.error?.message
        })
      } catch (e) {
      }
    },
  },
})
</script>