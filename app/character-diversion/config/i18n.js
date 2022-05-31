// import { titleCase } from 'text-title-case'

import en from '../locales/en.json'
import de from '../locales/de.json'

export default {
  strategy: 'no_prefix',
  locales: ['en', 'de'],
  defaultLocale: 'en',
  detectBrowserLanguage: false,
  vueI18n: {
    locale: 'en',
    fallbackLocale: 'en',
    messages: { en, de },
  },
}

// String.prototype.preserveCase = function () {
//   const regexUC = new RegExp(
//     '(?:' + preserve.uppercase.join(')|(?:') + ')',
//     'gi'
//   )
//   const regexLC = new RegExp(
//     '(?:' + preserve.lowercase.join(')|(?:') + ')',
//     'gi'
//   )
//   return this.replace(regexUC, (l) => l.toUpperCase()).replace(regexLC, (l) =>
//     l.toLowerCase()
//   )
// }
// String.prototype.toHeaderCase = function (locale) {
//   const whitelist = [...preserve.uppercase, ...preserve.lowercase]
//   const language = locale || i18n.global.locale
//   switch (language) {
//     case 'en':
//       return titleCase(this).preserveCase()
//     default:
//       return capitalize(this, { whitelist })
//   }
// }
// String.prototype.toSentenceCase = function () {
//   const string = this.trim()
//   return string.charAt(0).toUpperCase() + string.slice(1)
// }

// function capitalize(string, options, locale) {
//   const whitelist = options.whitelist || []
//   const sentences = string.split('.').map((e) => e.trim())
//   let convertedString
//   switch (locale) {
//     default:
//       // de
//       convertedString = sentences
//         .map((e) => {
//           if (whitelist.includes(e.split(/[^a-z]/i)[0])) {
//             // if first word is in whitelist don't capitalize
//             return e
//           } else {
//             // else capitalize first character in sentence
//             return e.charAt(0).toUpperCase() + e.substring(1)
//           }
//         })
//         .join('. ')
//   }
//   return convertedString
// }
