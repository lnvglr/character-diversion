// import { titleCase } from 'text-title-case'

import en from '../locales/en.json'
import de from '../locales/de.json'

export default {
  strategy: 'no_prefix',
  locales: ['en', 'de'],
  defaultLocale: 'de',
  detectBrowserLanguage: false,
  vueI18n: {
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, de },
  },
}