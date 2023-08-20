import React, { lazy } from 'react'

import { Route } from 'react-router-dom'

import { ROUTES } from 'router'

const Courses = lazy(() => import('views/app/courses/Courses'))

export const renderCourseRoutes = () => {
  const { COURSES } = ROUTES

  return (
    <Route path={COURSES} key={COURSES}>
      <Route index element={<Courses />} />
    </Route>
  )
}
