import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const AboutUs = lazy(() => import('views/app/about-us/AboutUs'))

export const renderAboutUsRoutes = () => {
  const { ABOUT_US } = ROUTES

  return (
    <Route path={ABOUT_US} key={ABOUT_US}>
      <Route index element={<AboutUs />} />
    </Route>
  )
}
