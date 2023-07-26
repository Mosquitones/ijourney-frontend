import { ThemeComponentTypes } from '../types'

export const DividerStyleOverrides: ThemeComponentTypes['MuiDivider'] = {
  styleOverrides: {
    wrapper: ({ theme, ownerState: { color = theme.palette.grey[100] } }) => ({
      textTransform: 'lowercase',
      fontSize: theme.typography.body1.fontSize,
      color,
      fontWeight: 'bold',
    }),
  },
}
