import { ThemeComponentTypes } from '../types'

export const ButtonStyleOverrides: ThemeComponentTypes['MuiButton'] = {
  defaultProps: {
    type: 'button',
    style: {
      fontSize: '1.5rem',
    },
  },
  styleOverrides: {
    root: {
      padding: '0.8rem 1.6rem',
      textTransform: 'none',
      fontWeight: 'bold',
      fontSize: '1.4rem',
      minHeight: '4rem',
    },
  },
  variants: [
    {
      props: { size: 'small' },
      style: { minWidth: '5rem', fontSize: '1.3rem' },
    },
    {
      props: { size: 'medium' },
      style: { minWidth: '8rem', fontSize: '1.5rem' },
    },
    {
      props: { size: 'large' },
      style: { minWidth: '12rem', fontSize: '1.7rem' },
    },
  ],
}
