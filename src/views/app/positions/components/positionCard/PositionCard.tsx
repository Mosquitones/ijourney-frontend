import React from 'react'

import { useAuth } from 'contexts'

import { PositionCardVariant } from './_variants/Variants'
import { PositionCardTypes } from './PositionCard.types'

export const PositionCard: React.FC<PositionCardTypes> = (props) => {
  const { isUserRole } = useAuth()

  if (!isUserRole.CANDIDATE) {
    return <PositionCardVariant.Complete seeButtonProps={props} />
  }

  return <PositionCardVariant.Basic {...props} />
}
