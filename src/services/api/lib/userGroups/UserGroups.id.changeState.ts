import { api, ApiResponseTypes } from 'services'

import { UserGroupTypes } from './UserGroups.types'

const putToChangeState = async (id: string, enabled: boolean) => {
  return api.put<ApiResponseTypes<UserGroupTypes>>(
    `/user-groups/${id}/changeState?state=${enabled}`
  )
}

export default {
  put: putToChangeState,
}
