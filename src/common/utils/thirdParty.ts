import { Color, CommonColors, PaletteColor, PaletteMode } from '@mui/material'
import { MixinsOptions } from '@mui/material/styles/createMixins'
import {
  PaletteTonalOffset,
  TypeAction,
  TypeBackground,
  TypeText,
} from '@mui/material/styles/createPalette'
import { TypographyThemeOverrides } from 'common/theme/typography'

export type CustomPaletteColor = Partial<Color> & PaletteColor

export type CustomTheme = {
  palette: {
    primary: CustomPaletteColor
    secondary: CustomPaletteColor
    error: CustomPaletteColor
    warning: CustomPaletteColor
    success: CustomPaletteColor
    grey: CustomPaletteColor
    common: Partial<CommonColors>
    text: Partial<TypeText>
    royalBlue: Partial<CustomPaletteColor>
    yellow: CustomPaletteColor
    info: CustomPaletteColor
    mode?: PaletteMode
    tonalOffset?: PaletteTonalOffset
    contrastThreshold?: number
    divider?: string
    action?: Partial<TypeAction>
    background: Partial<TypeBackground>
    getContrastText?: (background: string) => string
  }
  mixins: {
    header?: MixinsOptions['toolbar']
    toolbar?: MixinsOptions['toolbar']
  }
  typography: TypographyThemeOverrides
}
