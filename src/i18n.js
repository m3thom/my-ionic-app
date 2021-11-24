import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import dayjs from 'dayjs'

import 'dayjs/locale/th'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import updateLocale from 'dayjs/plugin/updateLocale'

// dayjs.fromNow() eg. 1 hour from now
dayjs.extend(relativeTime)
// dayjs.updateLocale
dayjs.extend(updateLocale)
// dayjs().format('L')
dayjs.extend(localizedFormat)

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    },

    fallbackLng: 'en',
    whitelist: ['en', 'th'],

    // defaultNS: 'translation',
    fallbackNS: 'translation',

    react: {
      wait: true,
      nsMode: 'fallback',
      useSuspense: false,
    }
  })
  .then(() => dayjs.locale(i18next.language))


// In English it should be 08/13/2021
dayjs.updateLocale('en', {
  formats: {
    L: 'MM/DD/YYYY',
  },
})

// In Thai it should be 13/08/2021
dayjs.updateLocale('th', {
  formats: {
    L: 'DD/MM/YYYY',
  },
})


export default i18next
