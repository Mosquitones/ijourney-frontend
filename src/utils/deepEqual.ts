/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AnyObjectTypes {
  [key: string]: any
}

export const deepEquals = <T extends AnyObjectTypes>(
  obj1: T,
  obj2: T
): boolean => {
  if (obj1 === obj2) return true

  if (
    typeof obj1 !== 'object' ||
    obj1 === null ||
    typeof obj2 !== 'object' ||
    obj2 === null
  ) {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) return false

  return keys1.every((key) => {
    const val1 = obj1[key as keyof T]
    const val2 = obj2[key as keyof T]

    if (typeof val1 === 'object' && typeof val2 === 'object') {
      return deepEquals(val1, val2)
    }
    return val1 === val2
  })
}
