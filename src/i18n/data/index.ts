export type LanguageISO639Types = 'en' | 'pt-BR'
export type LanguageIdTypes = -1 | 0 | 1

export type LanguageTypes = {
  iso639: LanguageISO639Types
  id: LanguageIdTypes
  withAccent: string
  flag?: string
  disabled?: boolean
}

export const LANGUAGES_DATA: LanguageTypes[] = [
  {
    id: 0,
    iso639: 'en',
    withAccent: 'English',
  },
  {
    id: 1,
    iso639: 'pt-BR',
    withAccent: 'Português (Brasil)',
  },
]

export const langTags: Record<string, LanguageISO639Types> = {
  english: 'en',
  portuguese: 'pt-BR',
}
