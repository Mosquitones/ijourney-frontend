export const rgbaToHexWithoutOpacity = (rgba: string) => {
  const rgbaRegex =
    /^(rgba|rgb)\((\d+),\s*(\d+),\s*(\d+)(,\s*(\d+(\.\d+)?))?\)$/

  const matches = rgba.match(rgbaRegex)

  if (!matches) {
    throw new Error('Invalid RGBA or RGB color format')
  }

  const [, _format, r, g, b] = matches

  const rHex = parseInt(r).toString(16).padStart(2, '0')
  const gHex = parseInt(g).toString(16).padStart(2, '0')
  const bHex = parseInt(b).toString(16).padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}
