import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const Positions = lazy(() => import('views/app/positions/Positions'))

export const renderPositionRoutes = () => {
  const { POSITIONS } = ROUTES

  return (
    <Route path={POSITIONS} key={POSITIONS}>
      <Route index element={<Positions />} />
    </Route>
  )
}
