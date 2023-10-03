import { EnumValueTypes, ROLE_ENUM, GENDER_ENUM, COMPANY_ENUM } from '@types'

export interface RecruiterRegisterPayloadTypes {
  fullName: string
  dateOfBirth: Date
  gender: EnumValueTypes<typeof GENDER_ENUM>
  email: string
  phoneNumber: string
  password: string
  userType: EnumValueTypes<typeof ROLE_ENUM, 'RECRUITER'>
  companyId: EnumValueTypes<typeof COMPANY_ENUM, 'ID'>
}

export interface RecruiterTypes extends RecruiterRegisterPayloadTypes {
  id: number
}

export interface RecruiterPayloadQueryTypes {
  'recruiter-name': string
  email: string
  'min-age': number
  'max-age': number
  genders: EnumValueTypes<typeof GENDER_ENUM>[]
}

export interface RecruiterServerQueryTypes {
  fullName: string
  email: string
  rangeBetweenAges: string // min~max
  genders: EnumValueTypes<typeof GENDER_ENUM>[]
}
