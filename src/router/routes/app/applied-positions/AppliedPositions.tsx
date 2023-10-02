import React from 'react'

import { Navigate, Route } from 'react-router-dom'
import AppliedPositionsPage from 'views/app/applied-positions/AppliedPositions'
import ClassificationPage from 'views/app/applied-positions/subViews/classification/Classification'

import { ROUTES } from 'router'

export const renderAppliedPositionRoutes = () => {
  const { APPLIED_POSITIONS, ID, CLASSIFICATION } = ROUTES

  return (
    <Route path={`${APPLIED_POSITIONS}/?tab=on-going?`}>
      <Route index Component={AppliedPositionsPage} />
      <Route path={ID}>
        <Route index element={<Navigate to={APPLIED_POSITIONS} />} />
        <Route path={CLASSIFICATION} Component={ClassificationPage} />
      </Route>
    </Route>
  )
}
