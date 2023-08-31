import { LinkBehavior } from '../_accessors/LinkBehavior'
import { ThemeComponentTypes } from '../types'

export const IconButtonStyleOverrides: ThemeComponentTypes['MuiIconButton'] = {
  defaultProps: {
    LinkComponent: LinkBehavior,
  },
}
