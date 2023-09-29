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
  // const [fontSize, setFontSize] = React.useState(16)
  const { color } = useAccessibility()

  let currentTheme = createTheme(theme, {
    // typography: {
    //   // htmlFontSize: (62.5 / 100) * fontSize,
    //   fontSize: fontSize,
    // },
  })

  currentTheme = responsiveFontSizes(currentTheme)

  currentTheme.palette.primary = getPaletteColors(color.rgba)
  // currentTheme.typography.htmlFontSize = fontSize

  // React.useEffect(() => {
  //   console.log({ stateFontSize: fontSize })
  // }, [fontSize])

  // React.useEffect(() => {
  //   console.log(currentTheme.typography.htmlFontSize)
  // }, [currentTheme.typography.htmlFontSize, fontSize])

  return (
    <>
      {/* <button type='button' onClick={() => setFontSize(fontSize + 1)}>
        aumentar
      </button>
      <button type='button' onClick={() => setFontSize(fontSize - 1)}>
        reduzir
      </button> */}
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <StyledThemeWrapper>{children}</StyledThemeWrapper>
      </ThemeProvider>
    </>
  )
}
