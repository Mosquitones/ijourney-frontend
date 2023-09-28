import {
  COMPANY_ENUM,
  EnumValueTypes,
  GENDER_ENUM,
  ROLE_ENUM,
  VULNERABILITY_ENUM,
} from '@types'

import { SkillTypes } from '../../skills'

export interface RegisterCandidatePayloadTypes {
  fullName: string
  email: string
  password: string
  phoneNumber: string
  dateOfBirth: Date
  gender: EnumValueTypes<typeof GENDER_ENUM>
  userType: EnumValueTypes<typeof ROLE_ENUM, 'CANDIDATE'>
  companyId: EnumValueTypes<typeof COMPANY_ENUM, 'ID'>
  vulnerabilityList: EnumValueTypes<typeof VULNERABILITY_ENUM>[]
  skillsId: SkillTypes['id'][]
  picture?: string
  resume: string
}
