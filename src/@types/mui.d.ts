import { CustomTheme } from '@eduplaytion/numetry-ui-kit'

declare module '@mui/material' {
  export interface Theme extends CustomTheme {
    palette: CustomTheme['palette']
    mixins: CustomTheme['mixins']
  }
}
