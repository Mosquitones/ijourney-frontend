/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ParamKeyTypes, ParamTypes } from './useParamsSelector.types'

export const useParamsSelector = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getQueryParam = (key: ParamKeyTypes) => {
    return searchParams.get(key)
  }

  const getAllParams = () => {
    const params: ParamTypes[] = []
    searchParams.forEach((value, key) =>
      params.push({ key: key as ParamKeyTypes, value })
    )
    return params
  }

  const removeQueryParam = (key: ParamKeyTypes) => {
    const param = getQueryParam(key)

    if (param) {
      searchParams.delete(key)
      setSearchParams(searchParams)
    }
  }

  const removeAllParams = () => setSearchParams([])

  const addQueryParam = (queries: ParamTypes[] | ParamTypes) => {
    const params = Array.isArray(queries) ? queries : [queries]

    params.forEach(({ key, value }) => {
      const param = getQueryParam(key)

      if (param) {
        searchParams.set(key, value)
      } else {
        searchParams.append(key, value)
      }
    })

    setSearchParams(searchParams)
  }

  const objParams = Object.assign(
    {},
    ...getAllParams().map(({ key, value }) => ({
      [key]: value,
    }))
  )

  return useMemo(
    () => ({
      getAll: getAllParams,
      deleteAll: removeAllParams,
      get: getQueryParam,
      add: addQueryParam,
      delete: removeQueryParam,
      objParams,
    }),
    [
      getAllParams,
      removeAllParams,
      getQueryParam,
      addQueryParam,
      removeQueryParam,
      objParams,
    ]
  )
}

export * from './useParamsSelector.types'
