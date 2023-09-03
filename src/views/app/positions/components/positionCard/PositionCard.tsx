import React from 'react'

import { useAuth } from 'contexts'

import { PositionCardVariant } from './_variants/Variants'
import { PositionCardTypes } from './PositionCard.types'

export const PositionCard: React.FC<PositionCardTypes> = ({
  position,
  href,
}) => {
  const { isUserRole } = useAuth()

  if (!isUserRole.CANDIDATE) {
    return (
      <PositionCardVariant.Complete
        seeButtonProps={{ href }}
        position={position}
      />
    )
  }

  return <PositionCardVariant.Basic href={href} position={position} />
}
