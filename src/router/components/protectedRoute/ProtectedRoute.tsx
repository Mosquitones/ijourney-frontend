import React from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from 'contexts'
import { GET_LOGOUT_ROUTE } from 'views'

import { AccessDeniedComponent } from './components'
import { ProtectedRoutePropTypes } from './ProtectedRoute.types'

export const ProtectedRoute: React.FC<ProtectedRoutePropTypes> = ({
  roles,
  redirectPath = GET_LOGOUT_ROUTE(),
}) => {
  const { user, isUserAuthenticated } = useAuth()
  const location = useLocation()

  const containsRoles = user?.userType ? roles.includes(user.userType) : false

  if (!isUserAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  if (user && !containsRoles) {
    return <AccessDeniedComponent />
  }

  return <Outlet />
}
export * from './ProtectedRoute.types'
export * from './components'
