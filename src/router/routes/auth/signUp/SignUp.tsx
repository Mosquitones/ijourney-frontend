import React from 'react'

import { Route } from 'react-router-dom'
import SignUpPage from 'views/auth/signUp/SignUp'

import { ROUTES } from 'router'

export const renderSignUpRoutes = () => {
  const { SIGN_UP } = ROUTES

  return (
    <Route path={SIGN_UP}>
      <Route index element={<SignUpPage />} />
    </Route>
  )
}
