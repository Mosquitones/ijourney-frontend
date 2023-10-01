/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode, Suspense } from 'react'

import { CircularProgress } from '@mui/material'
import { EnumValueTypes, ROLE_ENUM } from '@types'
import { AuthTemplate, DashboardLayout } from 'layout'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
  RouterProviderProps,
} from 'react-router-dom'

import { useAuth } from 'contexts'

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
  renderSignUpRoutes,
  renderArchivedPositionRoutes,
  renderProfileRoutes,
  ROUTES,
  RouteTypes,
} from '.'

const redirectToDefaultRoute = (to: RouteTypes) => (
  <Route key={to} index element={<Navigate to={to} />} />
)

export const Router: React.FC = () => {
  const { BASE_ROOT, UNKNOWN, AUTH, LOGIN, APP } = ROUTES
  const { isUserAuthenticated, user } = useAuth()

  const renderRouteBasedOnUserRole: {
    [key in EnumValueTypes<typeof ROLE_ENUM>]?: ReactNode
  } = {
    CANDIDATE: (
      <>
        {redirectToDefaultRoute(ROUTES.POSITIONS)}
        {renderPositionRoutes()}
        {renderAppliedPositionRoutes()}
        {renderCourseRoutes()}
        {renderProfileRoutes()}
        {/* {renderAboutUsRoutes()} */}
      </>
    ),
    RECRUITER: (
      <>
        {redirectToDefaultRoute(ROUTES.POSITIONS)}
        {renderPositionRoutes()}
        {renderArchivedPositionRoutes()}
        {renderReportRoutes()}
        {renderProfileRoutes()}
        {/* {renderCourseRoutes()} */}
        {/* {renderAboutUsRoutes()} */}
      </>
    ),
    COMPANY: (
      <>
        {redirectToDefaultRoute(ROUTES.POSITIONS)}
        {renderPositionRoutes()}
        {renderArchivedPositionRoutes()}
        {renderReportRoutes()}
        {renderProfileRoutes()}
        {renderCourseRoutes()}
        {/* {renderAboutUsRoutes()} */}
      </>
    ),
    ADMIN: (
      <>
        {redirectToDefaultRoute(ROUTES.POSITIONS)}
        {renderPositionRoutes()}
        {renderReportRoutes()}
        {renderProfileRoutes()}
        {renderCourseRoutes()}
        {/* {renderAboutUsRoutes()} */}
      </>
    ),
  }

  const loginNavigate = <Navigate to={`/${AUTH}/${LOGIN}`} />

  const authRoutes = (
    <Route path={AUTH} Component={AuthTemplate}>
      {isUserAuthenticated ? (
        <Route index element={<Navigate to={BASE_ROOT} />} />
      ) : (
        <Route index element={loginNavigate} />
      )}
      {!isUserAuthenticated && (
        <>
          {renderLoginRoutes()}
          {renderSignUpRoutes()}
        </>
      )}
      {renderLogoutRoutes()}
    </Route>
  )

  const dashboardRoutes = (
    <Route path={BASE_ROOT} Component={DashboardLayout}>
      {isUserAuthenticated && user ? (
        <Route element={<ProtectedRoute roles={[user.userType]} />}>
          <Route index element={<Navigate to={APP} />} />
          <Route path={APP}>{renderRouteBasedOnUserRole[user.userType]}</Route>
        </Route>
      ) : (
        <Route index element={loginNavigate} />
      )}
    </Route>
  )

  const router: RouterProviderProps['router'] = createBrowserRouter(
    createRoutesFromElements(
      <>
        {!isUserAuthenticated && <Route index element={loginNavigate} />}
        {authRoutes}
        {dashboardRoutes}
        <Route path={UNKNOWN} element={<Navigate to={BASE_ROOT} />} />
      </>
    )
  )

  return (
    <RouterProvider
      fallbackElement={<BackdropComponent open />}
      router={router}
    />
  )
}
