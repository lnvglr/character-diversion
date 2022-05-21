import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@formkit/nuxt', '@nuxtjs/strapi', '@nuxtjs/color-mode'],
  env: {
    strapiBaseUri: process.env.API_URL || "https://character-diversion-backend.herokuapp.com/"
  },
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/pwa'],
  formkit: {
    configFile: './formkit.config.ts',
  },
  router: {
    // https://router.vuejs.org/api/#routeroptions
    options: {},
  },
  pageTransition: { 'page-fade': true },
  css: ['@/assets/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      '@fortawesome/free-brands-svg-icons',
    ],
  },
})
