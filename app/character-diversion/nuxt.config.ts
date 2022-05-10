import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@formkit/nuxt'],
  buildModules: ['@nuxtjs/tailwindcss'],
  formkit: {
    configFile: './formkit.config.ts',
  },
  router: {
    // https://router.vuejs.org/api/#routeroptions
    options: {},
  },
	css: [
		'@fortawesome/fontawesome-svg-core/styles.css'
	],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/pro-solid-svg-icons',
      '@fortawesome/pro-regular-svg-icons',
      '@fortawesome/pro-light-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },
})
