import { IconButtonProps } from '@mui/material'

import { PositionTypes } from 'services'

export interface CompletePositionCardPropTypes extends IconButtonProps {
  seeButtonProps: { href: string }
  position: PositionTypes
}
