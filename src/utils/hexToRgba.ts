export const hexToRgba = (hex: string, alpha = 1) => {
  const sanitizedHex = hex.replace('#', '')
  const hexRegex = /^[0-9A-Fa-f]{6}$/

  if (!hexRegex.test(sanitizedHex)) {
    throw new Error('Invalid hex color format')
  }

  const r = parseInt(sanitizedHex.substring(0, 2), 16)
  const g = parseInt(sanitizedHex.substring(2, 4), 16)
  const b = parseInt(sanitizedHex.substring(4, 6), 16)

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
