import React from 'react'

import { Route } from 'react-router-dom'
import PositionsPage from 'views/app/positions/Positions'

import { ROUTES } from 'router'

export const renderPositionRoutes = () => {
  const { POSITIONS } = ROUTES

  return (
    <Route path={POSITIONS}>
      <Route index element={<PositionsPage />} />
    </Route>
  )
}
