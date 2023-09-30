import { AvatarProps } from '@mui/material'

import { PositionTypes } from 'services'

export interface PositionAvatarIconPropTypes {
  positionTitle: PositionTypes['title']
  positionId: PositionTypes['id']
  size?: number
  avatarProps?: AvatarProps
}
