import React from 'react'

import { Route } from 'react-router-dom'
import LogoutPage from 'views/auth/logout/Logout'

import { ROUTES } from 'router'

export const renderLogoutRoutes = () => {
  const { LOGOUT } = ROUTES

  return (
    <Route path={LOGOUT}>
      <Route index Component={LogoutPage} />
    </Route>
  )
}
