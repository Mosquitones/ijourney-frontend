export const ROLES = {
  SALES_TEAM: 'sales_team',
  TEACHER: 'teacher',
  STUDENT: 'student',
  BACK_OFFICE: 'back_office',
} as const

export type UserRoleTypes = (typeof ROLES)[keyof typeof ROLES]

type TeacherTypes = 'Teacher' | 'TeacherManager' | 'TeacherGuest'

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
  roles: UserRoleTypes[]
  feideToken: string
  teacherType: TeacherTypes
  fusionauthId: string
  fusionauthAccessToken: string
}
