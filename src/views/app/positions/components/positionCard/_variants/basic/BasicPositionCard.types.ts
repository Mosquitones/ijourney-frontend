import { ButtonProps } from '@mui/material'

import { PositionTypes } from 'services'

export interface BasicPositionCardPropTypes extends ButtonProps {
  position: PositionTypes
}
