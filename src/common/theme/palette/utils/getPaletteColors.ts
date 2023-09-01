/* eslint-disable @typescript-eslint/no-unused-vars */
import { alpha, darken, lighten, getContrastRatio } from '@mui/material'
import { CustomPaletteColor } from 'common/utils'

import { rgbaToHexWithoutOpacity } from 'utils'

export const getPaletteColors = (
  hexColor: string
): Required<CustomPaletteColor> => {
  const COLOR_BASE = hexColor

  const COLOR_LIGHT = lighten(COLOR_BASE, 0.6)
  const COLOR_MAIN = alpha(COLOR_BASE, 1)
  const COLOR_DARK = darken(COLOR_BASE, 0.2)

  const contrastTextColor =
    getContrastRatio(COLOR_BASE, '#fffffff') > 1.5 ? '#ffffff' : '#000000'

  // A = alpha | C = color
  const A100 = lighten(COLOR_BASE, 0.6)
  const A200 = lighten(COLOR_BASE, 0.7)
  const A400 = lighten(COLOR_BASE, 0.8)
  const A700 = lighten(COLOR_BASE, 0.9)
  const C_50 = alpha(COLOR_BASE, 0.25)
  const C_100 = alpha(COLOR_BASE, 0.4)
  const C_200 = alpha(COLOR_BASE, 0.5)
  const C_400 = alpha(COLOR_BASE, 0.7)
  const C_600 = darken(COLOR_BASE, 0.1)
  const C_800 = darken(COLOR_BASE, 0.3)
  const C_900 = darken(COLOR_BASE, 0.4)

  return {
    A100: rgbaToHexWithoutOpacity(A100),
    A200: rgbaToHexWithoutOpacity(A200),
    A400: rgbaToHexWithoutOpacity(A400),
    A700: rgbaToHexWithoutOpacity(A700),
    50: rgbaToHexWithoutOpacity(C_50),
    100: rgbaToHexWithoutOpacity(C_100),
    200: rgbaToHexWithoutOpacity(C_200),
    300: rgbaToHexWithoutOpacity(COLOR_LIGHT),
    400: rgbaToHexWithoutOpacity(C_400),
    500: rgbaToHexWithoutOpacity(COLOR_MAIN),
    600: rgbaToHexWithoutOpacity(C_600),
    700: rgbaToHexWithoutOpacity(COLOR_DARK),
    800: rgbaToHexWithoutOpacity(C_800),
    900: rgbaToHexWithoutOpacity(C_900),
    light: rgbaToHexWithoutOpacity(COLOR_LIGHT),
    main: rgbaToHexWithoutOpacity(COLOR_MAIN),
    dark: rgbaToHexWithoutOpacity(COLOR_DARK),
    contrastText: contrastTextColor,
  }
}

// console.log(A100)

// return {
//   A100: A100,
//   A200: A200,
//   A400: A400,
//   A700: A700,
//   50: C_50,
//   100: C_100,
//   200: C_200,
//   300: COLOR_LIGHT,
//   400: C_400,
//   500: COLOR_MAIN,
//   600: C_600,
//   700: COLOR_DARK,
//   800: C_800,
//   900: C_900,
//   light: COLOR_LIGHT,
//   main: COLOR_MAIN,
//   dark: COLOR_DARK,
//   contrastText: '#FFFFFF',
// }
