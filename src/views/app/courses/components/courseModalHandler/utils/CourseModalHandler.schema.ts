/* eslint-disable no-useless-escape */

import * as yup from 'yup'

import { CourseRegisterPayloadTypes } from 'services'

export const CourseModalHandlerSchema: yup.ObjectSchema<CourseRegisterPayloadTypes> =
  yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    picture: yup.string().required(),
    createdAt: yup.string().required(),
    skillsId: yup.array().of(yup.number().required()).min(1).required(),
    mentorsId: yup.array().of(yup.number().required()).min(1).required(),
  })
