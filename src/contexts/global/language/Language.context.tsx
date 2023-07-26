import React, { createContext, useContext, useMemo } from 'react'

import { FCWithChildren } from '@types'
import { I18nextProvider, useTranslation } from 'react-i18next'

import {
  LanguageContextTypes,
  LanguageWrapperTypes,
} from './Language.context.types'

export const LanguageContext = createContext<LanguageContextTypes>(
  {} as LanguageContextTypes
)

export const useLanguage = () => useContext(LanguageContext)

export const LanguageContextWrapper: FCWithChildren<LanguageWrapperTypes> = ({
  children,
  languages,
  i18nProviderProps,
}) => {
  const { i18n } = useTranslation()

  const langIndex = languages.findIndex((lang) => lang.iso639 === i18n.language)

  const language = languages[langIndex] || languages[2]

  const withoutAccent = language.withAccent
    ?.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const value = useMemo(
    () => ({
      languages,
      changeLanguage: i18n.changeLanguage,
      language: {
        ...language,
        withoutAccent,
      },
    }),
    [i18n.changeLanguage, language, languages, withoutAccent]
  )

  return (
    <I18nextProvider i18n={i18nProviderProps}>
      <LanguageContext.Provider value={value}>
        {children}
      </LanguageContext.Provider>
    </I18nextProvider>
  )
}
