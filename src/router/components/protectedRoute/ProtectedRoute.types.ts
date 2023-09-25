import { EnumValueTypes, ROLE_ENUM } from '@types'

export interface ProtectedRoutePropTypes {
  redirectPath?: string
  roles: EnumValueTypes<typeof ROLE_ENUM>[]
  hideAside?: boolean
  hideMenu?: boolean
}
