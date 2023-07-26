import { ThemeOptions } from '@mui/material'

declare module '@mui/material/styles/createMixins' {
  interface MixinsOptions {
    header?: MixinsOptions['toolbar']
  }
}

export const mixins: ThemeOptions['mixins'] = {
  header: {
    height: '8.1rem',
  },
}
