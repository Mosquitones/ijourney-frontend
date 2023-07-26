import { i18n } from 'i18next'

import { LanguageTypes as i18nLanguageTypes } from 'i18n'

interface LanguageTypes extends i18nLanguageTypes {
  withoutAccent: string
}

export interface LanguageContextTypes {
  changeLanguage: i18n['changeLanguage']
  language: LanguageTypes
  languages: i18nLanguageTypes[]
}

export interface LanguageWrapperTypes {
  languages: i18nLanguageTypes[]
  i18nProviderProps: i18n
}
