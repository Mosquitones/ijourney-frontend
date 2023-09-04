import React from 'react'

import { Route } from 'react-router-dom'
import LoginPage from 'views/auth/login/Login'

import { ROUTES } from 'router'

export const renderLoginRoutes = () => {
  const { LOGIN } = ROUTES

  return (
    <Route path={LOGIN}>
      <Route index Component={LoginPage} />
    </Route>
  )
}
