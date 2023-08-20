/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ReactNode } from 'react'

import { AuthTemplate, DashboardLayout } from 'layout'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'

import { useAuth } from 'contexts'
import { ROLES, UserRoleTypes } from 'services'

import {
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

export const Router: React.FC = () => {
  const { BASE_ROOT, UNKNOWN, AUTH, LOGIN, APP } = ROUTES
  const { isUserAuthenticated, signOut, user } = useAuth()

  const renderLogoutButton = () => (
    <button type='button' onClick={signOut}>
      logout
    </button>
  )

  const renderDefaultRoute = (to: RouteTypes) => (
    <Route key={to} index element={<Navigate to={to} />} />
  )

  const userRoutes: { [key in UserRoleTypes]?: ReactNode[] } = {
    candidate: [
      renderDefaultRoute(ROUTES.POSITIONS),
      renderPositionRoutes(),
      renderAppliedPositionRoutes(),
      renderCourseRoutes(),
      renderAboutUsRoutes(),
    ],
    recruiter: [
      renderDefaultRoute(ROUTES.POSITIONS),
      renderPositionRoutes(),
      renderReportRoutes(),
      renderCourseRoutes(),
      renderAboutUsRoutes(),
    ],
    admin: [
      // renderCourseRoutes()
    ],
    company: [
      // renderCourseRoutes()
    ],
  }

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {!isUserAuthenticated && (
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
            {isUserAuthenticated && (
              <Route path={AUTH}>{renderLogoutRoutes()}</Route>
            )}
            <Route path={BASE_ROOT} Component={DashboardLayout}>
              {/* <Route path={BASE_ROOT} Component={DashboardLayout}>
              <Route index element={<Navigate to={PLANS} />} />
              <Route
                element={
                  <div>
                    layout <Outlet />
                  </div>
                }
              >
                <Route path={PLANS}>
                  <Route index element={<div>plans</div>} />
                  <Route path={ID} element={<div>plan:id</div>} />
                  <Route path={NEW} element={<div>plan/new</div>} />
                </Route>
                <Route path={DISCOUNT_CODES}>
                  <Route index element={<div>discount_codes</div>} />
                  <Route path={ID} element={<div>discount_code:id</div>} />
                  <Route path={NEW} element={<div>discount_code/new</div>} />
                </Route>
              </Route>
            </Route> */}
              {/* <Route
              index
              element={
                // <LayoutComponent
                //   loading
                //   header={{
                //     title: 'Title',
                //     subtitle: 'Description',
                //   }}
                // >
                //   home
                // </LayoutComponent>
              }
            /> */}
              {/* {user &&
                Object.values(ROLES).find((role) => {
                  if (role === user.role) {
                  }
                })} */}

              {/* {user && <>{userRoutes[user.role]}</>}
              {user && Object.keys(ROLES).find((role) => {})} */}
              {user && (
                <Route element={<ProtectedRoute roles={[user.role]} />}>
                  <Route index element={<Navigate to={APP} />} />
                  <Route path={APP}>{userRoutes[user.role]}</Route>
                </Route>
              )}

              {/* {user?.role === ROLES.CANDIDATE && (
                <Route element={<ProtectedRoute roles={[ROLES.CANDIDATE]} />}>
                  <Route index element={<Navigate to={APP} />} />
                  <Route
                    path={APP}
                    element={
                      <div> HOME - CANDIDATE {renderLogoutButton()} </div>
                    }
                  />
                </Route>
              )}
              {user?.role === ROLES.RECRUITER && (
                <Route element={<ProtectedRoute roles={[ROLES.RECRUITER]} />}>
                  <Route index element={<Navigate to={APP} />} />
                  <Route
                    path={APP}
                    element={
                      <div> HOME - RECRUITER {renderLogoutButton()} </div>
                    }
                  />
                </Route>
              )}
              {user?.role === ROLES.ADMIN && (
                <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
                  <Route index element={<Navigate to={APP} />} />
                  <Route
                    path={APP}
                    element={<div> HOME - ADMIN {renderLogoutButton()} </div>}
                  />
                </Route>
              )} */}
            </Route>
            <Route path={UNKNOWN} element={<Navigate to={BASE_ROOT} />} />
          </>
        )
      )}
    />
  )
}
