import { api, ApiPropTypes } from 'services'
import { makeQueryParams } from 'utils'

import { PaginatedUserGroupResponse } from './UserGroups.types'

const paginated = async ({
  params: {
    page = 1,
    pageSize = 20,
    orderBy = 'created_at',
    orderType = 'DESC',
    search,
    ...rest
  },
}: ApiPropTypes) => {
  return api
    .get<PaginatedUserGroupResponse>(
      `/user-groups/paginated?selectedPage=${page}&pageSize=${pageSize}${makeQueryParams(
        { search, orderBy, orderType, ...rest }
      )}`
    )
    .then((response) => response.data)
}

export default {
  paginated,
}
