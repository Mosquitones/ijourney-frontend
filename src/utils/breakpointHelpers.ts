export const customBreakpoints = {
  values: {
    xs: 0,
    sm: 768,
    md: 1025,
    lg: 1200,
    xl: 1440,
  },
}

export const from = {
  xs: `@media screen and (min-width: ${customBreakpoints.values.xs}px)`,
  sm: `@media screen and (min-width: ${customBreakpoints.values.sm}px)`,
  md: `@media screen and (min-width: ${customBreakpoints.values.md}px)`,
  lg: `@media screen and (min-width: ${customBreakpoints.values.lg}px)`,
  xl: `@media screen and (min-width: ${customBreakpoints.values.xl}px)`,
}

// desktop first
export const to = {
  xs: `@media screen and (max-width: ${customBreakpoints.values.xs - 1}px)`,
  sm: `@media screen and (max-width: ${customBreakpoints.values.sm - 1}px)`,
  md: `@media screen and (max-width: ${customBreakpoints.values.md - 1}px)`,
  lg: `@media screen and (max-width: ${customBreakpoints.values.lg - 1}px)`,
  xl: `@media screen and (max-width: ${customBreakpoints.values.xl - 1}px)`,
}
