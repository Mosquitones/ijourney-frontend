import { LinkProps } from '@mui/material'

import { LinkBehavior } from '../_accessors/LinkBehavior'
import { ThemeComponentTypes } from '../types'

export const LinkStyleOverrides: ThemeComponentTypes['MuiLink'] = {
  defaultProps: {
    component: LinkBehavior,
  } as LinkProps,
}
