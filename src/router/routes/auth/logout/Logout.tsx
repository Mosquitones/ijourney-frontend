import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const Login = lazy(() => import('views/auth/login/Login'))
const Logout = lazy(() => import('views/auth/logout/Logout'))

export const renderLogoutRoutes = () => {
  const { LOGOUT, ID } = ROUTES

  return (
    <Route path={LOGOUT}>
      <Route index element={<Logout />} />
      <Route path={ID} element={<Login />} />
    </Route>
  )
}
