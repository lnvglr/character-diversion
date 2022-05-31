import { defineNuxtConfig } from 'nuxt'
import i18n from './config/i18n'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@formkit/nuxt',
    '@nuxtjs/strapi',
    '@nuxtjs/color-mode',
    [
      '@nuxtjs/i18n-edge',
      i18n,
    ],
  ],
  env: {
    strapiBaseUri:
      process.env.API_URL ||
      'https://character-diversion-backend.herokuapp.com/',
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
    ],
  },
  pwa: {
    manifest: {
      name: 'Character Diversion',
    },
  },
})
