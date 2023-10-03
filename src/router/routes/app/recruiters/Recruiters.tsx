import React from 'react'

import { Route } from 'react-router-dom'
import ProfileIdPage from 'views/app/profiles/subViews/profileId/ProfileId'
import RecruitersPage from 'views/app/recruiters/Recruiters'

import { ROUTES } from 'router'

export const renderRecruiterRoutes = () => {
  const { RECRUITERS, PROFILE_ID } = ROUTES

  return (
    <Route path={RECRUITERS}>
      <Route index Component={RecruitersPage} />
      <Route path={PROFILE_ID} Component={ProfileIdPage} />
    </Route>
  )
}
