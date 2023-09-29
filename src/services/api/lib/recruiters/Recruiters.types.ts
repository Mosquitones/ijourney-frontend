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
