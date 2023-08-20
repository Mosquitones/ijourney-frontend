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
    fontSize: '3.6rem',
  },
  h2: {
    fontSize: '3.2rem',
  },
  h3: {
    fontSize: '2.8rem',
  },
  h4: {
    fontSize: '2.4rem',
  },
  h5: {
    fontSize: '2rem',
  },
  h6: {
    // fontSize: '1.8rem',
  },
  body1: {
    fontSize: '1.6rem',
  },
  body2: {
    fontSize: '1.4rem',
  },
  button: {
    fontSize: '1.8rem',
  },
  caption: {},
  subtitle1: {},
  subtitle2: {},
  overline: {},
}
