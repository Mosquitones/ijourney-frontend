import { css } from 'styled-components'

import openSans700 from '../../../assets/fonts/openSans/OpenSans-Bold.ttf'
import openSans800 from '../../../assets/fonts/openSans/OpenSans-ExtraBold.ttf'
import openSans300 from '../../../assets/fonts/openSans/OpenSans-Light.ttf'
import openSans500 from '../../../assets/fonts/openSans/OpenSans-Medium.ttf'
import openSans400 from '../../../assets/fonts/openSans/OpenSans-Regular.ttf'
import openSans600 from '../../../assets/fonts/openSans/OpenSans-SemiBold.ttf'

export const FONT_WEIGHTS = {
  thin: 100,
  extraThin: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const

export type FontWeightTypes = typeof FONT_WEIGHTS
export type FontWeightKeyTypes = keyof FontWeightTypes

type NumericFontWeights<T> = {
  [K in keyof T]: T[K] extends number ? T[K] : never
}[keyof T]

type FontWeightValueTypes = NumericFontWeights<FontWeightTypes>

type FontFamilyTypes = {
  name: 'Open Sans'
  weights: {
    [Key in FontWeightValueTypes]?: string
  }
  format: 'truetype' | 'woff' | 'opentype'
}

export const FONT_FAMILIES: FontFamilyTypes[] = [
  {
    name: 'Open Sans',
    weights: {
      [FONT_WEIGHTS.light]: openSans300,
      [FONT_WEIGHTS.normal]: openSans400,
      [FONT_WEIGHTS.medium]: openSans500,
      [FONT_WEIGHTS.semiBold]: openSans600,
      [FONT_WEIGHTS.bold]: openSans700,
      [FONT_WEIGHTS.extraBold]: openSans800,
    },
    format: 'truetype',
  },
]

interface FontFaceOptionTypes {
  fontWeight: FontWeightKeyTypes
}

const generateFontFace = (
  name: FontFamilyTypes['name'],
  options: FontFaceOptionTypes
) => {
  const font = FONT_FAMILIES.find((font) => font.name === name)

  if (!font) throw new Error('Font not found')

  const fontName = font.name
  const fontWeight = FONT_WEIGHTS[options.fontWeight]
  const fontPath = font.weights[fontWeight]
  const fontFormat = font.format

  return css`
    @font-face {
      font-family: ${fontName};
      font-weight: ${fontWeight};
      src: local(${fontName}), url(${fontPath}) format(${fontFormat});
      font-style: normal;
      font-display: swap;
    }
  `
}

export const genericTypography = () => css`
  ${generateFontFace('Open Sans', {
    fontWeight: 'light',
  })}
  ${generateFontFace('Open Sans', {
    fontWeight: 'normal',
  })}
  ${generateFontFace('Open Sans', {
    fontWeight: 'medium',
  })}
  ${generateFontFace('Open Sans', {
    fontWeight: 'semiBold',
  })}
    ${generateFontFace('Open Sans', {
    fontWeight: 'bold',
  })}
  ${generateFontFace('Open Sans', {
    fontWeight: 'extraBold',
  })}
`
