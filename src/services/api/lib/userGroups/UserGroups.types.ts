import { PaginatedResponse } from 'services'

import { StudentTypes } from '../students/Students.types'

export type ActionMethodUserGroupTypes = {
  name: string
  students: number[]
}

export type PostUserGroupTypes = ActionMethodUserGroupTypes

export type PutUserGroupTypes = ActionMethodUserGroupTypes

export interface UserGroupTypes {
  id: number
  feideId?: string // ! It only exists if the group belongs to feide
  isActive?: boolean
  name: string
  studentCount: number
  students: StudentTypes[]
}

export interface UserGroupMinimalTypes {
  id: number
  name: string
  isFeideGroup: boolean
}

export type PaginatedUserGroupResponse = PaginatedResponse<UserGroupTypes>
