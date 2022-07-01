import { defineNuxtConfig } from 'nuxt'
import i18n from './config/i18n'
import pwa from './config/pwa'
import vite from './config/vite'
import io from './config/web-sockets'
import { Server as SocketIO } from 'socket.io'


// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: 'Character Diversion',
  },
  modules: [
    '@nuxtjs/strapi',
    '@nuxtjs/color-mode',
    '@kevinmarrec/nuxt-pwa',
    'nuxt-socket-io',
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
  css: ['@/assets/main.css', '@fortawesome/fontawesome-svg-core/styles.css'],
  build: {
    transpile: [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ],
  },
  pwa,
  intlify: i18n,
  vite,
  io,

  hooks: {
    listen(server: Server) {
      const io = new SocketIO(server)
    }
  }
})
