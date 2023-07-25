import { PaginatedResponse } from 'services'

import { UserGroupMinimalTypes } from '../userGroups/UserGroups.types'

export interface StudentTypes {
  id: number
  name: string
  profileId: string
  userGroups: UserGroupMinimalTypes[]
  progress?: number
}

export interface StudentMinimalTypes {
  id: number
  name: string
  profileId: string | null
}

export type PaginatedStudentResponseTypes = PaginatedResponse<StudentTypes>
