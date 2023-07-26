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
  fontWeightBlack?: CSSProperties['fontWeight']
}

export interface TypographyThemeOverrides
  extends TypographyOptionsWithRenamedFontWeightTypes {
  fontWeightThin?: CSSProperties['fontWeight']
  fontWeightExtraThin?: CSSProperties['fontWeight']
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
  fontWeightThin: FONT_WEIGHTS.thin,
  fontWeightExtraThin: FONT_WEIGHTS.extraThin,
  fontWeightLight: FONT_WEIGHTS.light,
  fontWeightNormal: FONT_WEIGHTS.normal,
  fontWeightMedium: FONT_WEIGHTS.medium,
  fontWeightSemiBold: FONT_WEIGHTS.semiBold,
  fontWeightBold: FONT_WEIGHTS.bold,
  fontWeightExtraBold: FONT_WEIGHTS.extraBold,
  fontWeightBlack: FONT_WEIGHTS.black,
  allVariants: {
    lineHeight: 1.2,
  },
  h1: {
    fontSize: '3rem',
  },
  h2: {
    fontSize: '2.5rem',
  },
  h3: {
    fontSize: '2.3rem',
  },
  h4: {},
  h5: {},
  h6: {},
  subtitle1: {
    fontSize: '1.5rem',
  },
  subtitle2: {
    fontSize: '1.3rem',
  },
  body1: {
    fontSize: '1.6rem',
  },
  body2: {
    fontSize: '1.3rem',
  },
  caption: {
    fontSize: '1rem',
  },
  button: {},
  overline: {},
}
