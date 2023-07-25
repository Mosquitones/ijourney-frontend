export type LanguageISO639Types = 'en' | 'nb' | 'nn' | 'pt' | 'es'
export type LanguageIdTypes = -1 | 0 | 1 | 2 | 3 | 4

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
    iso639: 'nn',
    withAccent: 'Nynorsk',
  },
  {
    id: 2,
    iso639: 'nb',
    withAccent: 'Bokmål',
  },
  {
    id: 3,
    iso639: 'pt',
    withAccent: 'Portuguese',
  },
  {
    id: 4,
    iso639: 'es',
    withAccent: 'Spanish',
  },
]

export const langTags = {
  nynorsk: 'nn',
  english: 'en',
  bokmal: 'nb',
  portuguese: 'pt-Br',
  spanish: 'es',
} as const
