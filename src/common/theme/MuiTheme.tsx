/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'

import { CssBaseline, responsiveFontSizes } from '@mui/material'
import { createTheme, ThemeOptions, ThemeProvider } from '@mui/material/styles'
import { FCWithChildren } from '@types'

import { useAccessibility } from 'contexts'

import { breakpoints } from './breakpoints'
import { MuiComponents as components } from './components'
import { mixins } from './mixins'
import { palette } from './palette'
import { getPaletteColors } from './palette/utils'
import { StyledThemeWrapper } from './StyledTheme'
import { typography } from './typography'

const MuiTheme: ThemeOptions = {
  palette,
  components,
  typography,
  mixins,
  breakpoints,
}

export const MuiThemeWrapper: FCWithChildren<{ theme?: ThemeOptions }> = ({
  children,
  theme = MuiTheme,
}) => {
  const [contrast, setContrast] = React.useState(1)
  const { color, fontSize, htmlFontSize, fontSizeHandlers } = useAccessibility()

  let currentTheme = createTheme(theme, {
    typography: {
      htmlFontSize,
      fontSize,
    },
  })

  currentTheme = responsiveFontSizes(currentTheme)

  currentTheme.palette.primary = getPaletteColors(color.rgba)

  const headAppThemeColor = document.querySelector<HTMLElement>(
    "meta[name='theme-color']"
  )

  if (headAppThemeColor instanceof HTMLMetaElement) {
    headAppThemeColor.content = color.hex
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <StyledThemeWrapper>{children}</StyledThemeWrapper>
    </ThemeProvider>
  )
}
