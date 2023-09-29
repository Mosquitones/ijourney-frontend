/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { PositionTabTemplate } from '../../components'

import { SavedTabPropTypes } from './Saved.types'

export default function SavedTab({ savedPositions }: SavedTabPropTypes) {
  return (
    <PositionTabTemplate
      positions={savedPositions?.sort((a, b) => a.id - b.id)}
      variant='saved'
    />
  )
}
