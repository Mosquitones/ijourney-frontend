import { api, ApiPropTypes } from 'services'
import { makeQueryParams } from 'utils'

import { PaginatedStudentResponseTypes } from './Students.types'

const paginated = async ({
  params: {
    page = 1,
    pageSize = 20,
    search = null,
    withProgress,
    withCustomGroups,
  },
}: ApiPropTypes) => {
  return api
    .get<PaginatedStudentResponseTypes>(
      `/students?selectedPage=${page}${makeQueryParams({
        pageSize,
        search,
        withProgress,
        withCustomGroups,
      })}`
    )
    .then((response) => {
      return response.data
    })
}

export default {
  paginated,
}
