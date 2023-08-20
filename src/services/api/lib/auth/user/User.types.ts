export const ROLES = {
  RECRUITER: 'recruiter',
  ADMIN: 'admin',
  CANDIDATE: 'candidate',
  COMPANY: 'company',
} as const

export type UserRoleTypes = (typeof ROLES)[keyof typeof ROLES]

interface RegistrationTypes {
  applicationId: string
  id: string
  insertInstant: number
  lastLoginInstant: number
  lastUpdateInstant: number
  roles: UserRoleTypes[]
  usernameStatus: string
  verified: boolean
}

export interface UserTypes {
  active: boolean
  connectorId: string
  id: string
  insertInstant: number
  lastLoginInstant: number
  lastUpdateInstant: number
  passwordChangeRequired: boolean
  passwordLastUpdateInstant: number
  registrations: RegistrationTypes[]
  tenantId: string
  twoFactor: Record<string, unknown>
  uniqueUsername: string
  username: string
  usernameStatus: string
  verified: boolean
}

export interface UserInfoTypes {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
  role: UserRoleTypes
  image?: string
}
