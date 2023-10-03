import React from 'react'

import { Route } from 'react-router-dom'
import CandidatesPage from 'views/app/candidates/Candidates'
import ProfileIdPage from 'views/app/profiles/subViews/profileId/ProfileId'

import { ROUTES } from 'router'

export const renderCandidateRoutes = () => {
  const { PROFILE_ID, CANDIDATES } = ROUTES

  return (
    <Route path={CANDIDATES}>
      <Route index Component={CandidatesPage} />
      <Route path={PROFILE_ID} Component={ProfileIdPage} />
    </Route>
  )
}
