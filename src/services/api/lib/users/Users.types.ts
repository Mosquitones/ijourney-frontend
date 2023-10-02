import {
  EnumValueTypes,
  GENDER_ENUM,
  ROLE_ENUM,
  VULNERABILITY_ENUM,
} from '@types'

import { SkillTypes } from '../skills'

export interface UserTypes {
  id: number
  fullName: string
  picture: string
  email: string
  password: string
  userType: EnumValueTypes<typeof ROLE_ENUM>
  dateOfBirth: Date
  resume: string | null
  gender: EnumValueTypes<typeof GENDER_ENUM>
  companyId: number
  phoneNumber: string
  vulnerabilityList: EnumValueTypes<typeof VULNERABILITY_ENUM>[]
  skills: SkillTypes[]
}
