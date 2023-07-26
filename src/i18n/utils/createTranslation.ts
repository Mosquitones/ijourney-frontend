/* eslint-disable @typescript-eslint/ban-types */
import merge from 'deepmerge'

import { i18nResources } from '../../i18n'

export interface LocaleBaseType<
  Auth = {},
  Components = {},
  General = {},
  Navigation = {},
  Pages = {}
> {
  auth: Auth
  components: Components
  general: General
  navigation: Navigation
  pages: Pages
}

export function createTranslation<T extends LocaleBaseType>(
  lang: keyof typeof i18nResources,
  locale: T
) {
  const localeKeys = Object.keys(locale) as (keyof LocaleBaseType)[]
  return localeKeys.reduce(
    (acc, cur) => ({
      ...acc,
      [cur]:
        cur !== 'pages' && typeof i18nResources[lang][cur] === 'object'
          ? merge.all([locale[cur], i18nResources[lang][cur]])
          : locale[cur],
    }),
    {}
  ) as LocaleBaseType<
    typeof i18nResources.en.auth & T['auth'],
    typeof i18nResources.en.components & T['components'],
    typeof i18nResources.en.general & T['general'],
    typeof i18nResources.en.navigation & T['navigation'],
    T['pages']
  >
}
