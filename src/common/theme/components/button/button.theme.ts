import { LinkBehavior } from '../_accessors/LinkBehavior'
import { ThemeComponentTypes } from '../types'

export const ButtonBaseStyleOverrides: ThemeComponentTypes['MuiButtonBase'] = {
  defaultProps: {
    LinkComponent: LinkBehavior,
  },
}

export const ButtonStyleOverrides: ThemeComponentTypes['MuiButton'] = {
  defaultProps: {
    type: 'button',
    style: {
      fontSize: '1.6rem',
    },
    LinkComponent: LinkBehavior,
  },
  styleOverrides: {
    root: {
      padding: '0.8rem 1.6rem',
      textTransform: 'none',
      fontWeight: 'bold',
      minHeight: '4rem',
      boxShadow: 'none',
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
