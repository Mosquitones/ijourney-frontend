/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from 'react'

import { useSearchParams } from 'react-router-dom'

import { ParamTypes } from './useParamsSelector.types'

export const useParamsSelector = <TKey extends string>() => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getQueryParam = <TValue extends string>(key: TKey) => {
    const value = searchParams.get(key)

    return value as TValue | null
  }

  const getQueryParamAsArray = <TValue extends string[]>(key: TKey) => {
    const value = searchParams.get(key)

    if (!value) return []

    const isValueWithComma = value.includes(',')
    if (isValueWithComma) return value.split(',')

    return [value] as TValue
  }

  const getAllParams = () => {
    const params: ParamTypes<TKey>[] = []
    searchParams.forEach((value, key) =>
      params.push({ key: key as TKey, value })
    )
    return params
  }

  const removeQueryParam = (key: TKey) => {
    const param = getQueryParam(key)

    if (param) {
      searchParams.delete(key)
      setSearchParams(searchParams)
    }
  }

  const removeAllParams = () => setSearchParams([])

  const addQueryParam = (
    paramsToAdd: ParamTypes<TKey>[] | ParamTypes<TKey>
  ) => {
    const paramsToAddAsArray = Array.isArray(paramsToAdd)
      ? paramsToAdd
      : [paramsToAdd]

    paramsToAddAsArray.forEach((paramToAdd) => {
      const valueAsArray = Array.isArray(paramToAdd.value)
        ? paramToAdd.value
        : [paramToAdd.value]

      const browserAlreadyHasThisParam = getQueryParam(paramToAdd.key)

      if (browserAlreadyHasThisParam) {
        if (valueAsArray.length === 0) removeQueryParam(paramToAdd.key)
        else {
          searchParams.set(paramToAdd.key, valueAsArray.join(','))
        }
      } else {
        searchParams.append(paramToAdd.key, valueAsArray[0])
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
      getAsArray: getQueryParamAsArray,
      add: addQueryParam,
      delete: removeQueryParam,
      objParams,
    }),
    [
      getAllParams,
      removeAllParams,
      getQueryParam,
      getQueryParamAsArray,
      addQueryParam,
      removeQueryParam,
      objParams,
    ]
  )
}

export * from './useParamsSelector.types'
