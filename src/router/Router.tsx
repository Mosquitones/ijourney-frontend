/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'

import { HeaderComponent } from '@eduplaytion/numetry-ui-kit'
import { DashboardLayout } from 'layout'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom'
import LoginPage from 'views/auth/login/Login'
import PlanAndDiscountCodeLayout from 'views/planAndDiscountCode/layout/PlanAndDiscountCodeLayout'
import DiscountCodesPage from 'views/planAndDiscountCode/subViews/discountCodes/DiscountCodes'
import PlansPage from 'views/planAndDiscountCode/subViews/plans/Plans'

import { useAuth } from 'contexts'
import { ROLES } from 'services'

import {
  ProtectedRoute,
  renderLoginRoutes,
  renderLogoutRoutes,
  ROUTES,
} from '.'

export const Router: React.FC = () => {
  const { BASE_ROOT, UNKNOWN, AUTH, LOGIN, PLANS, DISCOUNT_CODES, ID, NEW } =
    ROUTES
  const { isUserAuthenticated, signOut, user } = useAuth()

  return (
    <RouterProvider
      router={createBrowserRouter(
        createRoutesFromElements(
          <>
            {/* {!isUserAuthenticated && (
              <Route path={AUTH}>
                <Route index element={<Navigate to={LOGIN} />} />
                {renderLoginRoutes()}
                {renderLogoutRoutes()}
              </Route>
            )} */}
            <Route path={BASE_ROOT} Component={DashboardLayout}>
              <Route index element={<Navigate to={PLANS} />} />
              <Route Component={PlanAndDiscountCodeLayout}>
                <Route path={PLANS}>
                  <Route index Component={PlansPage} />
                  <Route path={ID} element={<div>plan:id</div>} />
                  <Route path={NEW} element={<div>plan/new</div>} />
                </Route>
                <Route path={DISCOUNT_CODES}>
                  <Route index Component={DiscountCodesPage} />
                  <Route path={ID} element={<div>discount_code:id</div>} />
                  <Route path={NEW} element={<div>discount_code/new</div>} />
                </Route>
              </Route>
            </Route>
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
            {/* <Route
              path={BASE_ROOT}
              element={<ProtectedRoute roles={[ROLES.BACK_OFFICE]} />}
            >
              <Route index element={<Navigate to='home' />} />
              <Route
                path='home'
                element={
                  <div>
                    HOME
                    <button type='button' onClick={signOut}>
                      logout
                    </button>
                  </div>
                }
              />
            </Route> */}
            <Route path={UNKNOWN} element={<Navigate to={BASE_ROOT} />} />
          </>
        )
      )}
    />
  )
}
