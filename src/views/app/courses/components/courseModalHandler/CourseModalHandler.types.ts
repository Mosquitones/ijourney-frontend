import { DialogProps } from '@mui/material'
import { CourseTypes } from 'services/api/lib/courses/Courses.types'

import { MentorTypes, SkillTypes } from 'services'

export interface CourseModalHandlerPropTypes extends DialogProps {
  course?: CourseTypes
  skills: SkillTypes[]
  mentors: MentorTypes[]
  refetchCourses?: () => void
}
