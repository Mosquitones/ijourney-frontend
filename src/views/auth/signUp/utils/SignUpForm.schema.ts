/* eslint-disable no-useless-escape */
import {
  EnumValueTypes,
  FAMILY_INCOME_ENUM,
  GENDER_ENUM,
  RACE_ETHNICITY_ENUM,
  SEXUAL_ORIENTATION_ENUM,
} from '@types'
import * as yup from 'yup'

import { SkillTypes } from 'services'

import { SignUpFormPropTypes } from '../SignUp.types'

const emailRegExp = /^(?![-._])[\w\.-]+(\+\w+)?@([\w-]+\.)+[\w-]{2,4}$/
const phoneNumberRegExp = /^\+55 \(\d{2}\) [1-9]\.\d{4}-\d{4}$/
const dateOfBirthRegExp = /^\d{4}-\d{2}-\d{2}$/

const SkillSchema: yup.ObjectSchema<SkillTypes> = yup.object({
  id: yup.number().required(),
  name: yup.string().required(),
})

export const SignUpFormSchema: yup.ObjectSchema<SignUpFormPropTypes> =
  yup.object({
    fullName: yup
      .string()
      .test({
        name: 'has-min-two-words',
        message: 'fullName must be your full name',
        test: (value) => {
          if (!value) return false

          return /\s/.test(value) && value.trim().split(/\s+/).length >= 2
        },
      })
      .required(),
    email: yup
      .string()
      .email()
      .matches(emailRegExp, 'email must be a valid email')
      .required(),

    password: yup.string().min(6).required(),
    passwordConfirmation: yup
      .string()
      .min(6)
      .oneOf([yup.ref('password'), ''])
      .required(),

    phoneNumber: yup
      .string()
      .matches(phoneNumberRegExp, 'phoneNumber must be a valid phone number')
      .required(),
    dateOfBirth: yup
      .string()
      .matches(dateOfBirthRegExp, 'dateOfBirth must be a valid date')
      .required(),

    picture: yup.mixed<File>().nullable(),

    resume: yup
      .mixed<File>()
      .test({
        name: 'is-a-file',
        message: 'resume must be a file',
        test: (value) => {
          if (!value) return false
          return value instanceof File
        },
      })
      .required(),
    skills: yup.array(SkillSchema).min(1).required(),

    gender: yup.string<EnumValueTypes<typeof GENDER_ENUM>>().required(),
    sexualOrientation: yup
      .string<EnumValueTypes<typeof SEXUAL_ORIENTATION_ENUM>>()
      .required(),
    raceEthnicity: yup
      .string<EnumValueTypes<typeof RACE_ETHNICITY_ENUM>>()
      .required(),

    familyIncome: yup
      .string<EnumValueTypes<typeof FAMILY_INCOME_ENUM>>()
      .required(),
    hasDisability: yup.boolean().required(),
    whichDisability: yup.string().when('hasDisability', {
      is: true,
      then: (schema) => schema.required().notOneOf([null, undefined]),
      otherwise: (schema) => schema.notRequired(),
    }),
  })
