import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const AppliedPositions = lazy(
  () => import('views/app/applied-positions/AppliedPositions')
)

export const renderAppliedPositionRoutes = () => {
  const { APPLIED_POSITIONS } = ROUTES

  return (
    <Route path={APPLIED_POSITIONS} key={APPLIED_POSITIONS}>
      <Route index element={<AppliedPositions />} />
    </Route>
  )
}
