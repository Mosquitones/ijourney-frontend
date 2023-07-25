import React from 'react'

import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from 'contexts'
import { ROUTES } from 'router'

import { AccessDeniedComponent } from './components'
import { ProtectedRoutePropTypes } from './ProtectedRoute.types'

export const ProtectedRoute: React.FC<ProtectedRoutePropTypes> = ({
  roles,
  redirectPath = `/${ROUTES.AUTH}/${ROUTES.LOGIN}`,
}) => {
  const { user, isUserAuthenticated } = useAuth()
  const location = useLocation()

  const containsRoles = user?.roles?.some((role) => roles.includes(role))

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
