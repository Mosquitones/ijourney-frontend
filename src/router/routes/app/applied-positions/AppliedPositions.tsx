import React from 'react'

import { Route } from 'react-router-dom'
import AppliedPositionsPage from 'views/app/applied-positions/AppliedPositions'

import { ROUTES } from 'router'

export const renderAppliedPositionRoutes = () => {
  const { APPLIED_POSITIONS } = ROUTES

  return (
    <Route path={APPLIED_POSITIONS}>
      <Route index Component={AppliedPositionsPage} />
      {/* <Route path={ID} Component={PositionIdPage} /> */}
      {/* <Route path={NEW} Component={NewPlanPage} /> */}
    </Route>
  )
}
