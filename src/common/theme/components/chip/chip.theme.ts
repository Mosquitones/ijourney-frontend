import { ThemeComponentTypes } from '../types'

export const ChipStyleOverrides: ThemeComponentTypes['MuiChip'] = {
  defaultProps: {
    size: 'small',
    variant: 'outlined',
  },
  styleOverrides: {
    root: () => {
      return {
        width: 'max-content',
      }
    },
    label: ({ theme }) => ({
      fontSize: theme.typography.body2.fontSize,
    }),
  },
}
