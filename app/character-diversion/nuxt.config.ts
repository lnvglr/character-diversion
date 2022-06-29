import { defineNuxtConfig } from 'nuxt'
import i18n from './config/i18n'
// import redirectSSL from 'redirect-ssl';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Character Diversion',
  },
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/color-mode',
    // '@nuxtjs/pwa'
  ],
  strapi: {
    url: process.env.API_BASE || 'http://localhost:1337',
  },
  publicRuntimeConfig: {
    media: process.env.API_MEDIA,
    env: process.env.NODE_ENV
  },
  buildModules: [
    '@nuxtjs/tailwindcss',
    '@intlify/nuxt3',
    'floating-vue/nuxt'
  ],
  router: {
    // https://router.vuejs.org/api/#routeroptions
    options: {},
  },
  pageTransition: {
    'page-fade': true,
    onLeave: () => {
      console.log("leaving");
    },
    onBeforeLeave: () => {
      console.log("onBeforeLeave");
    },
    onBeforeEnter: () => {
      console.log("onBeforeEnter");
    },
  },
  css: ['@/assets/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
  // pwa: {
  //   manifest: {
  //     name: 'Character Diversion',
  //     publicPath: './pwa/manifest.json',
  //   },
  // },
  intlify: i18n,
  vite: {
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
    },
  },
  // serverMiddleware: [
  //   redirectSSL.create({enabled: process.env.NODE_ENV === 'production'})
  // ],
  
})
