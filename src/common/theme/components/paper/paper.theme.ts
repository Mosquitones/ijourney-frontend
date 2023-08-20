import { palette } from 'common/theme/palette'

import { ThemeComponentTypes } from '../types'

export const PaperStyleOverrides: ThemeComponentTypes['MuiPaper'] = {
  defaultProps: {
    elevation: 0,
  },
  styleOverrides: {
    root: {
      backgroundColor: palette.background.default,
      borderRadius: '0.5rem',
      border: `0.1rem solid ${palette.divider}`,
    },
  },
}
