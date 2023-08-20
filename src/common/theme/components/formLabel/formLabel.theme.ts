import { palette } from 'common/theme/palette'
import { typography } from 'common/theme/typography'

import { ThemeComponentTypes } from '../types'

export const FormLabelStyleOverrides: ThemeComponentTypes['MuiFormLabel'] = {
  styleOverrides: {
    root: {
      color: palette.text.primary,
      fontSize: typography.body1.fontSize,
      marginBottom: '0.8rem',
    },
  },
}
