import React, { lazy } from 'react'

import { Outlet, Route } from 'react-router-dom'

import { ROUTES } from 'router'

const Login = lazy(() => import('views/auth/login/Login'))

export const renderLoginRoutes = () => {
  const { LOGIN } = ROUTES

  return (
    <Route
      path={LOGIN}
      element={
        <div>
          layout <Outlet />
        </div>
      }
    >
      <Route index element={<Login />} />
    </Route>
  )
}
