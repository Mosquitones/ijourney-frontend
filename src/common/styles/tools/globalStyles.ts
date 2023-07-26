import { createGlobalStyle } from 'styled-components'

import { genericReset } from './reset'
import { genericTypography } from './typography'

export const GlobalStyles = createGlobalStyle(genericReset, genericTypography)
