import courseMethods from './Courses'
import courseRegisterMethods from './Courses.register'

export const CourseServices = {
  ...courseMethods,
  register: {
    ...courseRegisterMethods,
  },
}
// CourseServices.register.post
export * from './Courses.types'
