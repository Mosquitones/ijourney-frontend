import React from 'react'

import { useAuth } from 'contexts'

import { PositionCardVariant } from './_variants/Variants'
import { PositionCardTypes } from './PositionCard.types'

export const PositionCard: React.FC<PositionCardTypes> = ({
  position,
  href,
  onEditClick,
}) => {
  const { isUserRole } = useAuth()

  if (!isUserRole.CANDIDATE) {
    return (
      <PositionCardVariant.Complete
        seeButtonProps={{ href }}
        position={position}
        onEditClick={onEditClick}
      />
    )
  }

  return <PositionCardVariant.Basic href={href} position={position} />
}
