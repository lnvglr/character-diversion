import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@formkit/nuxt'],
	formkit: {
    configFile: './formkit.config.ts',
  },
})
