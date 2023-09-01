/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, Suspense } from 'react'

import { CircularProgress } from '@mui/material'
import { AuthTemplate, DashboardLayout } from 'layout'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { useAuth } from 'contexts'
import { ROLES, UserRoleTypes } from 'services'

import {
  BackdropComponent,
  ProtectedRoute,
  renderAboutUsRoutes,
  renderAppliedPositionRoutes,
  renderCourseRoutes,
  renderLoginRoutes,
  renderLogoutRoutes,
  renderPositionRoutes,
  renderReportRoutes,
  ROUTES,
  RouteTypes,
} from '.'

const redirectToDefaultRoute = (to: RouteTypes) => (
  <Route key={to} index element={<Navigate to={to} />} />
)

export const Router: React.FC = () => {
  const { BASE_ROOT, UNKNOWN, AUTH, LOGIN, APP } = ROUTES
  const { isUserAuthenticated, signOut, user } = useAuth()

  const renderRouteBasedOnUserRole: { [key in UserRoleTypes]?: ReactNode[] } = {
    candidate: [
      redirectToDefaultRoute(ROUTES.POSITIONS),
      renderPositionRoutes(),
      renderAppliedPositionRoutes(),
      renderCourseRoutes(),
      renderAboutUsRoutes(),
    ],
    recruiter: [
      redirectToDefaultRoute(ROUTES.POSITIONS),
      renderPositionRoutes(),
      renderReportRoutes(),
      // renderCourseRoutes(),
      renderAboutUsRoutes(),
    ],
    company: [
      redirectToDefaultRoute(ROUTES.REPORTS),
      // renderPositionRoutes(),
      renderReportRoutes(),
      renderCourseRoutes(),
      renderAboutUsRoutes(),
    ],
    admin: [
      redirectToDefaultRoute(ROUTES.REPORTS),
      // renderPositionRoutes(),
      renderReportRoutes(),
      renderCourseRoutes(),
      renderAboutUsRoutes(),
    ],
  }

  return (
    <RouterProvider
      fallbackElement={<BackdropComponent open />}
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {isUserAuthenticated ? (
              <Route path={AUTH}>{renderLogoutRoutes()}</Route>
            ) : (
              <>
                <Route index element={<Navigate to={AUTH} />} />
                <Route path={AUTH}>
                  <Route index element={<Navigate to={LOGIN} />} />
                  <Route Component={AuthTemplate}>
                    {renderLoginRoutes()}
                    {renderLogoutRoutes()}
                  </Route>
                </Route>
              </>
            )}

            <Route path={BASE_ROOT} Component={DashboardLayout}>
              {user && (
                <Route element={<ProtectedRoute roles={[user.role]} />}>
                  <Route index element={<Navigate to={APP} />} />
                  <Route path={APP}>
                    {renderRouteBasedOnUserRole[user.role]}
                  </Route>
                </Route>
              )}
            </Route>

            <Route path={UNKNOWN} element={<Navigate to={BASE_ROOT} />} />
          </>
        )
      )}
    />
  )
}
