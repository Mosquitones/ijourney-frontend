/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { PositionTabTemplate } from '../../components'

import { ArchivedTabPropTypes } from './Archived.types'

export default function ArchiveTab({
  archivedPositions,
}: ArchivedTabPropTypes) {
  return (
    <PositionTabTemplate
      positions={archivedPositions?.sort((a, b) => a.id - b.id)}
    />
  )
}
