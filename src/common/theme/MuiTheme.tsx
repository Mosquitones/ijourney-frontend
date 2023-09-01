/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { CssBaseline, responsiveFontSizes } from '@mui/material'
import {
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
} from '@mui/material/styles'
import { FCWithChildren } from '@types'

import { ColorTypes, useLayout } from 'contexts'
import { useLocalStorage } from 'hooks'

import { breakpoints } from './breakpoints'
import { MuiComponents as components } from './components'
import { mixins } from './mixins'
import { palette } from './palette'
import { getPaletteColors } from './palette/utils'
import { StyledThemeWrapper } from './StyledTheme'
import { typography } from './typography'

export const MuiThemeWrapper: FCWithChildren<{ theme?: ThemeOptions }> = ({
  children,
  theme,
}) => {
  let currentTheme = createTheme(theme)

  // createTheme
  // let currentTheme = createTheme(theme, {
  //   palette: {
  //     primary: appPaletteColors.paletteColor,
  //   },
  // })

  // const currentTheme = createTheme(theme, {
  //   palette: {
  //     primary: appPaletteColors.paletteColor,
  //   },
  // })

  // React.useEffect(() => {
  //   console.log(appHexColor)
  // }, [appHexColor])

  // currentTheme.palette.primary =

  currentTheme = responsiveFontSizes(currentTheme)
  // currentTheme.palette.primary = appPaletteColors.paletteColor

  // const newTheme = React.useMemo(
  //   () =>
  //     createTheme(currentTheme as ThemeOptions, {
  //       palette: {
  //         primary: appPaletteColors,
  //       },
  //     }),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [appPaletteColors]
  // )

  // currentTheme.palette.primary = {
  //   ...appPaletteColors,
  //   contrastText: '#fffffff',
  // }
  // red  in rgba(255, 0, 0, 1)
  // currentTheme.palette.primary.main = 'rgba(255, 0, 0, 1)'

  // React.useEffect(() => {
  //   currentTheme.palette.primary = getPaletteColors(appHexColor)
  // }, [appHexColor, currentTheme.palette])

  return (
    <ThemeProvider theme={currentTheme}>
      <StyledThemeWrapper>
        <CssBaseline />
        {children}
      </StyledThemeWrapper>
    </ThemeProvider>
  )
}
