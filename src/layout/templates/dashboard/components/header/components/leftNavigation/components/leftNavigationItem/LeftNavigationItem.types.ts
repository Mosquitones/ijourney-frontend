import { NavItemTypes } from '../../LeftNavigation.types'

export interface LeftNavigationPropTypes {
  item: NavItemTypes
  onClick?: () => void
  icon?: React.ElementType
}
