import { api, ApiResponseTypes } from 'services'

import { PostUserGroupTypes, UserGroupTypes } from './UserGroups.types'

const getAllUserGroups = async () => {
  return (await api.get<ApiResponseTypes<UserGroupTypes[]>>('/user-groups'))
    .data.data
}

const postUserGroup = async (group: PostUserGroupTypes) => {
  return (await api.post<UserGroupTypes>('/user-groups', group)).data
}

export default {
  get: getAllUserGroups,
  post: postUserGroup,
}
