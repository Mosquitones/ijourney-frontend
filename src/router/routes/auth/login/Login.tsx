import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const Login = lazy(() => import('views/auth/login/Login'))

export const renderLoginRoutes = () => {
  const { LOGIN } = ROUTES

  return (
    <Route path={LOGIN}>
      <Route index element={<Login />} />
    </Route>
  )
}
