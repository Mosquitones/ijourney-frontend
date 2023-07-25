import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

import { LoginLayoutComponent } from './loginLayout/Login.layout'

const Login = lazy(() => import('views/auth/login/Login'))
const ForgotPassword = lazy(
  () => import('views/auth/forgotPassword/ForgotPassword')
)
const TwoFactorPrompt = lazy(() => import('views/auth/twoFactor/TwoFactor'))

export const renderLoginRoutes = () => {
  const { LOGIN, FORGOT_PASSWORD, TWO_FACTOR } = ROUTES

  return (
    <Route path={LOGIN} element={<LoginLayoutComponent />}>
      <Route index element={<Login />} />
      <Route path={TWO_FACTOR} element={<TwoFactorPrompt />} />
      <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
    </Route>
  )
}
