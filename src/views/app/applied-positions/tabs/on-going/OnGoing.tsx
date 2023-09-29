/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { PositionTabTemplate } from '../../components'

import { OnGoingTabPropTypes } from './OnGoing.types'

export default function OnGoingTab({ positions }: OnGoingTabPropTypes) {
  return (
    <PositionTabTemplate positions={positions?.sort((a, b) => a.id - b.id)} />
  )
}
