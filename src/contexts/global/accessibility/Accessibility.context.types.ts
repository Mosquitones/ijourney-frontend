type ColorTypes = {
  rgba: string
  hex: string
}

export interface AccessibilityContextTypes {
  color: ColorTypes
  availableColors: ColorTypes['hex'][]
  setColor: (value: ColorTypes) => void
}
