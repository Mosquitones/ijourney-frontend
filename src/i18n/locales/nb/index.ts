import { createTranslation } from '@eduplaytion/numetry-ui-kit'

import auth from './auth'
import components from './components'
import general from './general'
import navigation from './navigation'
import pages from './pages'

export const translationNb = createTranslation('nb', {
  auth,
  components,
  general,
  navigation,
  pages,
})
