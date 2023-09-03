export const ROLES = {
  RECRUITER: 'RECRUITER',
  ADMIN: 'ADMIN',
  CANDIDATE: 'CANDIDATE',
  COMPANY: 'COMPANY',
} as const

export type UserRoleTypes = (typeof ROLES)[keyof typeof ROLES]

export interface UserTypes {
  id: number
  fullName: string
  imageUrl: string
  email: string
  password: string
  userType: UserRoleTypes
  dateOfBirth: Date
  gender: 'MALE' | 'FEMININE'
  phoneNumber: string
  cpf: string
  companyId: number
}
