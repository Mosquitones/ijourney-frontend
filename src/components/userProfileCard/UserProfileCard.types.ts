import { ButtonProps } from '@mui/material'

import { UserTypes } from 'services'

export interface UserProfileCardPropTypes extends ButtonProps {
  user: UserTypes
}
