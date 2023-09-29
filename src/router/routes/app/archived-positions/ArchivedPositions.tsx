import React from 'react'

import { Route } from 'react-router-dom'
import ArchivedPositionsPage from 'views/app/archived-positions/ArchivedPositions'

import { ROUTES } from 'router'

export const renderArchivedPositionRoutes = () => {
  const { ARCHIVED_POSITIONS } = ROUTES

  return (
    <Route path={ARCHIVED_POSITIONS}>
      <Route index Component={ArchivedPositionsPage} />
      {/* <Route path={ID}>
        <Route index element={<Navigate to={APPLIED_POSITIONS} />} />
        <Route path={CLASSIFICATION} Component={ClassificationPage} />
      </Route> */}
      {/* <Route path={NEW} Component={NewPlanPage} /> */}
    </Route>
  )
}
