import { api, ApiResponseTypes } from 'services'

import { UserGroupTypes } from './UserGroups.types'

const getUserGroup = async (id: number) => {
  return api.get<ApiResponseTypes<UserGroupTypes>>(`/user-groups/${id}`)
}

const deleteUserGroup = async (id: number) => {
  return api.delete<ApiResponseTypes<UserGroupTypes>>(`/user-groups/${id}`)
}

const putUserGroup = async (
  id: number,
  payload: {
    name: string
    students: number[]
  }
) => {
  return api.put<ApiResponseTypes<UserGroupTypes>>(
    `/user-groups/${id}`,
    payload
  )
}

export default {
  get: getUserGroup,
  delete: deleteUserGroup,
  put: putUserGroup,
}
