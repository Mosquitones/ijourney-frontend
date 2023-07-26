import { ThemeOptions, createTheme } from '@mui/material'

const customBreakpoints: ThemeOptions['breakpoints'] = {
  values: {
    xs: 0,
    sm: 768,
    md: 1025,
    lg: 1200,
    xl: 1440,
  },
}

const { breakpoints } = createTheme({ breakpoints: customBreakpoints })

const from = {
  xs: breakpoints.up('xs'),
  sm: breakpoints.up('sm'),
  md: breakpoints.up('md'),
  lg: breakpoints.up('lg'),
  xl: breakpoints.up('xl'),
}

const to = {
  xs: breakpoints.down('xs'),
  sm: breakpoints.down('sm'),
  md: breakpoints.down('md'),
  lg: breakpoints.down('lg'),
  xl: breakpoints.down('xl'),
}

export { to, from, breakpoints, customBreakpoints }
