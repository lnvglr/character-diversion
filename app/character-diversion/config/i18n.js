// import { titleCase } from 'text-title-case'
const locales = ['en', 'de', 'he'].reduce((acc, locale) => {
  acc[locale] = import(`../locales/${locale}.json`)
  return acc
}, {})
// locales = locales.reduce((cu => import(`../locales/${locale}.json`))
// import de from '../locales/de.json'
// import he from '../locales/he.json'

export default {
  strategy: 'no_prefix',
  locales: Object.keys(locales),
  defaultLocale: 'en',
  detectBrowserLanguage: false,
  vueI18n: {
    locale: 'en',
    fallbackLocale: 'en',
    messages: locales,
  },
}