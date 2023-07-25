export interface UseDisclosureTypes {
  onClose: () => void
  onOpen: () => void
  onToggle: () => void
  isOpen: boolean
}

export interface UseDisclosurePropTypes {
  defaultIsOpen?: boolean
}

export type UseDisclosureFunctionTypes = (
  props?: UseDisclosurePropTypes
) => UseDisclosureTypes
