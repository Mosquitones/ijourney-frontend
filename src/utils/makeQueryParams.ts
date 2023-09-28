import { createSearchParams } from 'react-router-dom'

export const makeQueryParams = <T extends object = { [k: string]: string }>(
  params?: T
) => {
  if (!params) return ''

  const listOfParams = Object.entries(params)

  if (listOfParams.length === 0) return ''

  const filteredList = listOfParams.filter(
    ([_key, value]) =>
      value !== undefined && value !== null && value !== '' && value !== -1
  )

  const objectParams = Object.fromEntries(filteredList)
  const query = createSearchParams(objectParams).toString()

  return query ? `?${query}` : ''
}
