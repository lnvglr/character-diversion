<template>
  <form class="flex flex-col gap-2" @submit="signUp">
    <Input type="text" name="name" placeholder="Name" v-model="formData.name" />
    <Input type="email" name="email" placeholder="Email" v-model="formData.email" />
    <Input type="password" name="password" placeholder="Password" v-model="formData.password" />
    <Button type="submit" class="">Sign up</Button>
    <p v-show="error" class="text-sm text-red-500">{{ errorMsg }}</p>
  </form>
</template>

<script lang="ts">
import axios from 'axios'
export default {
  data() {
    return {
      formData: {} as { name: string; email: string; password: string; username: string },
      error: false,
      errorMsg: `An error occurred, please try again`,
    }
  },
  computed: {
    name() {
      return this.formData.name
    }
  },
	watch: {
		name(value: string) {
			this.formData.username = this.slugify(value)
		}
	},
  methods: {
    async signUp(e: Event) {
      try {
        e.preventDefault()
        await axios
          .post(`http://localhost:1337/api/auth/local/register`, this.formData)
          .then((res) => {
            this.formData = {}
            // this.$router.push('login')
          })
      } catch (e) {
        console.error(e)
      }
    },
		slugify(string: string) {
			if (string == null) return string
			return string
				.toString()
				.normalize('NFKD')
				.toLowerCase()
				.trim()
				.replace(/\s+/g, '-')
				.replace(/[^\w\-]+/g, '')
				.replace(/\-\-+/g, '-')
		}
  },
}
</script>


<style>
</style>