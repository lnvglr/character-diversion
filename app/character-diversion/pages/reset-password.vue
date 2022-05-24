<template>
  <NuxtLayout name="split">
    <template #title>Recover Your Password</template>
    <p v-show="done" class="text-sm text-green-500">
      Password reset link has been sent to {{ email }}
    </p>
    <p v-show="error" class="text-sm text-red-500">An error occurred</p>
    <FormRecoverPassword />
  </NuxtLayout>
</template>

<script>
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
  },
}
</script>

<style>
</style>