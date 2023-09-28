import {
  EnumValueTypes,
  FAMILY_INCOME_ENUM,
  GENDER_ENUM,
  RACE_ETHNICITY_ENUM,
  SEXUAL_ORIENTATION_ENUM,
} from '@types'

import { SkillTypes } from 'services'

export interface SignUpFormPropTypes {
  fullName: string
  email: string

  password: string
  passwordConfirmation: string

  phoneNumber: string
  dateOfBirth: string | null

  picture?: File | null
  resume: File | null
  skills: SkillTypes[]

  gender: EnumValueTypes<typeof GENDER_ENUM> | null
  sexualOrientation: EnumValueTypes<typeof SEXUAL_ORIENTATION_ENUM> | null
  raceEthnicity: EnumValueTypes<typeof RACE_ETHNICITY_ENUM> | null

  familyIncome: EnumValueTypes<typeof FAMILY_INCOME_ENUM> | null
  hasDisability: boolean | null
  whichDisability?: string
}
