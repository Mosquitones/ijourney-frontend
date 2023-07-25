/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next'
import languageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import { translationEn } from './locales/en'
import { translationNb } from './locales/nb'
import { translationNn } from './locales/nn'

const resources = {
  en: translationEn,
  nn: translationNn,
  nb: translationNb,
}

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'nb'
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
    lng: localStorage.getItem('i18nextLng') || 'nb',
    fallbackLng: 'nb',
    returnNull: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      transSupportBasicHtmlNodes: true,
    },
    resources: {
      en: { translation: resources.en },
      nn: { translation: resources.nn },
      nb: { translation: resources.nb },
    },
  })

export { i18n }
