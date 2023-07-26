import { ThemeComponentTypes } from '../types'

export const InputStyleOverrides: ThemeComponentTypes['MuiInput'] = {}

export const InputLabelStyleOverrides: ThemeComponentTypes['MuiInputLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      position: 'relative',
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightBold,
    }),
    focused: ({ theme }) => ({
      color: theme.palette.secondary.main,
    }),
    error: ({ theme }) => ({
      color: theme.palette.error.main,
    }),
  },
}
