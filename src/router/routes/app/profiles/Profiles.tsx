import React from 'react'

import { Navigate, Route } from 'react-router-dom'
import ProfileIdPage from 'views/app/profiles/subViews/profileId/ProfileId'

import { ROUTES } from 'router'

export const renderProfileRoutes = () => {
  const { PROFILES, PROFILE_ID, APP, POSITIONS } = ROUTES

  return (
    <Route path={PROFILES}>
      <Route index element={<Navigate to={`/${APP}/${POSITIONS}`} />} />
      <Route path={PROFILE_ID} Component={ProfileIdPage} />
    </Route>
  )
}
