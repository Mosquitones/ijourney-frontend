/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react'

export const useForwardedRef = <T>(
  ref: React.ForwardedRef<T>,
  initialValue: T | null = null
) => {
  const targetRef = useRef<T>(initialValue)

  useEffect(() => {
    if (!ref) return

    if (typeof ref === 'function') {
      ref(targetRef.current)
    } else {
      ref.current = targetRef.current
    }
  }, [ref])

  return targetRef
}
