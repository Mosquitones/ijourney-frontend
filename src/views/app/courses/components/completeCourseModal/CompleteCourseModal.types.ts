/* eslint-disable @typescript-eslint/no-empty-interface */
import { DialogProps } from '@mui/material'

import { CourseTypes } from 'services'

export interface CompleteCouseModalPropTypes extends DialogProps {
  course?: CourseTypes
  refetchCourses?: () => void
}
