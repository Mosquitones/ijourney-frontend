import { CustomTheme } from 'common/utils'

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string
    }
    palette: CustomTheme['palette']
    mixins: CustomTheme['mixins']
    typography: CustomTheme['typography']
  }

  // allow configuration using `createTheme`
  interface ThemeOptions {
    status?: {
      danger?: string
    }
    palette?: CustomTheme['palette']
    mixins?: CustomTheme['mixins']
    typography?: CustomTheme['typography']
  }
}
