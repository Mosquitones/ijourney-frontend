import { UserRoleTypes } from 'services'

export interface ProtectedRoutePropTypes {
  redirectPath?: string
  roles: UserRoleTypes[]
  hideAside?: boolean
  hideMenu?: boolean
}
