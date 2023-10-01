import { ButtonProps } from '@mui/material'

import { CourseTypes } from 'services'

export interface CourseCardPropTypes extends ButtonProps {
  course: CourseTypes
}
