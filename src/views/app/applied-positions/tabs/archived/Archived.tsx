/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { PositionTabTemplate } from '../../components'

import { ArchivedTabPropTypes } from './Archived.types'

export default function ArchiveTab({
  archivedPositions,
  isLoading,
}: ArchivedTabPropTypes) {
  return (
    <PositionTabTemplate
      isLoading={isLoading}
      variant='archived'
      positions={archivedPositions?.sort((a, b) => a.id - b.id)}
    />
  )
}
