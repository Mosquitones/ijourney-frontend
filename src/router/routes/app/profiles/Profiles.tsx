import React from 'react'

import { Navigate, Route } from 'react-router-dom'
import ProfileIdPage from 'views/app/profiles/subViews/profileId/ProfileId'

import { ROUTES } from 'router'

export const renderProfileRoutes = () => {
  const { PROFILES, APP, PROFILE_ID } = ROUTES

  return (
    <Route path={PROFILES}>
      <Route index element={<Navigate to={`/${APP}`} />} />
      <Route path={PROFILE_ID} Component={ProfileIdPage} />
    </Route>
  )
}
