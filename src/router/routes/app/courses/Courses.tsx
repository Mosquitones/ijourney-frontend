import React from 'react'

import { Route } from 'react-router-dom'
import CoursesPage from 'views/app/courses/Courses'

import { ROUTES } from 'router'

export const renderCourseRoutes = () => {
  const { COURSES } = ROUTES

  return (
    <Route path={COURSES}>
      <Route index element={<CoursesPage />} />
    </Route>
  )
}
