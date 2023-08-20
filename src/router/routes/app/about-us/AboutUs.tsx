import React from 'react'

import { Route } from 'react-router-dom'
import AboutUsPage from 'views/app/about-us/AboutUs'

import { ROUTES } from 'router'

export const renderAboutUsRoutes = () => {
  const { ABOUT_US } = ROUTES

  return (
    <Route path={ABOUT_US}>
      <Route index element={<AboutUsPage />} />
    </Route>
  )
}
