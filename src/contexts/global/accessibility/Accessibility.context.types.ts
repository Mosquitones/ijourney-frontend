type ColorTypes = {
  rgba: string
  hex: string
}

export interface AccessibilityContextTypes {
  color: ColorTypes
  setColor: (value: ColorTypes) => void
}
