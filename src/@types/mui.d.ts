import { CustomTheme } from 'common/utils'

declare module '@mui/material' {
  export interface Theme extends CustomTheme {
    palette: CustomTheme['palette']
    mixins: CustomTheme['mixins']
  }
}
