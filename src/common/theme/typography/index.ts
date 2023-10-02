import { CSSProperties } from 'react'

import { TypographyOptions } from '@mui/material/styles/createTypography'
import { FONT_FAMILIES, FONT_WEIGHTS } from 'common/styles'

interface TypographyOptionsWithRenamedFontWeightTypes
  extends Omit<
    Required<TypographyOptions>,
    'fontWeightRegular' | 'fontWeightMedium' | 'fontWeightExtraBold'
  > {
  fontWeightNormal?: CSSProperties['fontWeight']
  fontWeightSemiBold?: CSSProperties['fontWeight']
}

export interface TypographyThemeOverrides
  extends TypographyOptionsWithRenamedFontWeightTypes {
  fontWeightMedium?: CSSProperties['fontWeight']
  fontWeightExtraBold?: CSSProperties['fontWeight']
}

export const typography: TypographyThemeOverrides = {
  fontFamily: [
    FONT_FAMILIES.flatMap(({ name }) => name).join(','),
    'sans-serif',
  ].join(','),
  htmlFontSize: 10,
  fontSize: 16,
  fontWeightLight: FONT_WEIGHTS.light,
  fontWeightNormal: FONT_WEIGHTS.normal,
  fontWeightMedium: FONT_WEIGHTS.medium,
  fontWeightSemiBold: FONT_WEIGHTS.semiBold,
  fontWeightBold: FONT_WEIGHTS.bold,
  fontWeightExtraBold: FONT_WEIGHTS.extraBold,
  allVariants: {
    // lineHeight: 1.2,
  },
  h1: {
    // fontSize: '3.6rem',
    // fontSize: '4.6em,
    fontSize: 36,
  },
  h2: {
    // fontSize: '3.2rem',
    // fontSize: '4.2ex',
    fontSize: 32,
  },
  h3: {
    // fontSize: '2.8rem',
    // fontSize: '3.8ex',
    fontSize: 28,
  },
  h4: {
    // fontSize: '2.4rem',
    // fontSize: '3.4ex',
    fontSize: 24,
  },
  h5: {
    // fontSize: '2rem',
    // fontSize: '3ex',
    fontSize: 20,
  },
  h6: {
    // fontSize: '2.8ex',
    fontSize: 18,
  },
  body1: {
    // fontSize: '1.6rem',
    // fontSize: '2.6ex',
    fontSize: 16,
  },
  body2: {
    // fontSize: '1.4rem',
    // fontSize: '2.4ex',
    fontSize: 14,
  },
  button: {
    // fontSize: '1.8rem',
    // fontSize: '2.8ex',
    fontSize: 18,
  },
  subtitle1: {
    // fontSize: '1.8rem',
    // fontSize: '2.8ex',
    fontSize: 18,
  },
  caption: {
    fontSize: 12,
  },
  subtitle2: {},
  overline: {},
}
