import { useMemo, useState } from 'react'

import { UseDisclosureFunctionTypes } from './useDisclosure.types'

export const useDisclosure: UseDisclosureFunctionTypes = (props) => {
  const [isOpen, setIsOpen] = useState(props?.defaultIsOpen || false)

  const onClose = () => {
    setIsOpen(false)
  }

  const onOpen = () => {
    setIsOpen(true)
  }

  const onToggle = () => {
    setIsOpen((isOpenState) => !isOpenState)
  }

  return useMemo(
    () => ({
      isOpen,
      onClose,
      onOpen,
      onToggle,
    }),
    [isOpen]
  )
}
