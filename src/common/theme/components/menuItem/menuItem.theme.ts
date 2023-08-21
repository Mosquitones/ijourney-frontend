import { LinkBehavior } from '../_accessors/LinkBehavior'
import { ThemeComponentTypes } from '../types'

export const MenuItemStyleOverrides: ThemeComponentTypes['MuiMenuItem'] = {
  defaultProps: {
    LinkComponent: LinkBehavior,
  },
}
