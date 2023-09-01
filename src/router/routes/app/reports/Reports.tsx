import React from 'react'

import { Route } from 'react-router-dom'
import ReportsPage from 'views/app/reports/Reports'

import { ROUTES } from 'router'

export const renderReportRoutes = () => {
  const { REPORTS } = ROUTES

  return (
    <Route path={REPORTS}>
      <Route index Component={ReportsPage} />
    </Route>
  )
}
