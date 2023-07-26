import React from 'react'

import { CssBaseline, responsiveFontSizes } from '@mui/material'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { FCWithChildren } from '@types'

import { breakpoints } from './breakpoints'
import { MuiComponents as components } from './components'
import { mixins } from './mixins'
import { palette } from './palette'
import { StyledThemeWrapper } from './StyledTheme'
import { typography } from './typography'

export const MuiTheme = {
  palette,
  components,
  typography,
  breakpoints,
  mixins,
}

export const MuiThemeWrapper: FCWithChildren<{ theme?: ThemeOptions }> = ({
  children,
  theme = MuiTheme,
}) => {
  let currentTheme = createTheme(theme)

  currentTheme = responsiveFontSizes(currentTheme)

  return (
    <ThemeProvider theme={currentTheme}>
      <StyledThemeWrapper>
        <CssBaseline />
        {children}
      </StyledThemeWrapper>
    </ThemeProvider>
  )
}
