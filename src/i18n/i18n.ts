/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { translationEn } from './locales/en'

const resources = {
  en: translationEn,
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en'
    resources: typeof resources
  }
}

i18n.on('languageChanged', (language) => {
  document.documentElement.setAttribute('lang', language)
})

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transSupportBasicHtmlNodes: true,
    },
    resources: {
      en: { translation: resources.en },
    },
  })

export { i18n }
