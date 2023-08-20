import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const Reports = lazy(() => import('views/app/reports/Reports'))

export const renderReportRoutes = () => {
  const { REPORTS } = ROUTES

  return (
    <Route path={REPORTS} key={REPORTS}>
      <Route index element={<Reports />} />
    </Route>
  )
}
