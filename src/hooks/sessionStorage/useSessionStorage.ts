import { useState } from 'react'

export const useSessionStorage = <T = unknown>(
  key: string,
  initialValue: T
) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.sessionStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value: T) => {
    try {
      setStoredValue(value)
      window.sessionStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}

export * from './useSessionStorage.types'
