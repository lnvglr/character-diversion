import { defineNuxtConfig } from 'nuxt'
import i18n from './config/i18n'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/color-mode',
  ],
  buildModules: ['@nuxtjs/tailwindcss', '@nuxtjs/pwa', '@intlify/nuxt3'],
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
  intlify: i18n,
  vite: {
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  },
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    // url: process.env.STRAPI_URL || 'https://character-diversion-backend.herokuapp.com',
  },
})
