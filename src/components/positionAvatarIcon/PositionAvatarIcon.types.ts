import { AvatarProps } from '@mui/material'

import { PositionTypes } from 'services'

export interface PositionAvatarIconPropTypes {
  positionId: PositionTypes['id']
  size?: number
  avatarProps?: AvatarProps
}
