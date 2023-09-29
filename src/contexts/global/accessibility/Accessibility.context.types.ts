type ColorTypes = {
  rgba: string
  hex: string
}

export interface AccessibilityContextTypes {
  color: ColorTypes
  availableColors: ColorTypes['hex'][]
  setColor: (value: ColorTypes) => void

  htmlFontSize: number
  fontSize: number
  fontSizeHandlers: {
    increase: () => void
    decrease: () => void
    reset: () => void
  }

  isFontSizeSameAsInitial: boolean
}
