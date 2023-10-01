import { UseQueryOptions } from 'react-query'

export type QueryOptionTypes<T> = UseQueryOptions<
  T,
  unknown,
  T,
  (
    | string
    | {
        method: string
      }
  )[]
>
