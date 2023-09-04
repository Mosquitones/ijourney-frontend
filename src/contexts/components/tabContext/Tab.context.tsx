import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
} from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TabContext = createContext<any>({})

export const useTabContext = <T,>() => useContext<T>(TabContext)

export const TabContextWrapper = <T,>({
  children,
  value,
}: PropsWithChildren<{ value: T }>) => {
  const memoizedValue = useMemo(() => value, [value])

  return (
    <TabContext.Provider value={memoizedValue}>{children}</TabContext.Provider>
  )
}
