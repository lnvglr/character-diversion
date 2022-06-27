const locales = ['en', 'de'].reduce((acc, locale) => {
  acc[locale] = import(`../locales/${locale}.json`)
  return acc
}, {})
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