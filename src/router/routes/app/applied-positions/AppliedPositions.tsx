import React from 'react'

import { Route } from 'react-router-dom'
import AppliedPositionsPage from 'views/app/applied-positions/AppliedPositions'

import { ROUTES } from 'router'

export const renderAppliedPositionRoutes = () => {
  const { APPLIED_POSITIONS } = ROUTES

  return (
    <Route path={APPLIED_POSITIONS}>
      <Route index element={<AppliedPositionsPage />} />
    </Route>
  )
}
