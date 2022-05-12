import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@formkit/nuxt', '@nuxtjs/strapi'],
  buildModules: [
		'@nuxtjs/tailwindcss',
		// '@intlify/nuxt3'
	],
  formkit: {
    configFile: './formkit.config.ts',
  },
  router: {
    // https://router.vuejs.org/api/#routeroptions
    options: {},
  },
  // intlify: {
	// 	localeDir: 'locales',
  //   vueI18n: {
  //     fallbackLocale: 'en',
  //   },
  // },
  css: ['@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },
})
