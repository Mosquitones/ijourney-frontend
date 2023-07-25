import { createSearchParams } from 'react-router-dom'

import { PaginatedApiParamsTypes } from 'services'

export const makeQueryParams = (params: PaginatedApiParamsTypes) => {
  const listOfParams = Object.entries(params)

  const filteredList = listOfParams.filter(
    ([_key, value]) => value !== undefined && value !== null
  )

  const objectParams = Object.fromEntries(filteredList)
  const query = createSearchParams(objectParams).toString()

  return query ? `?${query}` : ''
}
