import { createTranslation } from '@eduplaytion/numetry-ui-kit'

import auth from './auth'
import components from './components'
import general from './general'
import navigation from './navigation'
import pages from './pages'

const english = {
  auth,
  components,
  general,
  navigation,
  pages,
}

export type localTranslationEn = typeof english

export const translationEn = createTranslation<typeof english>('en', english)
