import React from 'react'

import { Route } from 'react-router-dom'
import PositionsPage from 'views/app/positions/Positions'
import PositionIdPage from 'views/app/positions/subViews/positionId/PositionId'

import { ROUTES } from 'router'

export const renderPositionRoutes = () => {
  const { POSITIONS, ID } = ROUTES

  return (
    <Route path={POSITIONS}>
      <Route index Component={PositionsPage} />
      <Route path={ID} Component={PositionIdPage} />
      {/* <Route path={NEW} Component={NewPlanPage} /> */}
    </Route>
  )
}
