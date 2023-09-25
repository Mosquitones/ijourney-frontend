export const convertToBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)

    fileReader.onload = () => {
      resolve(fileReader.result as string)
    }

    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}

export const base64ToOriginalFile = (base64String: string): File | null => {
  const dataUriPattern =
    /^data:([A-Za-z-+/]+);([A-Za-z0-9-]+),([A-Za-z0-9+/=]+)$/

  const matches = base64String.match(dataUriPattern)

  if (matches && matches.length === 4) {
    const mimeType = matches[1]
    const base64Data = matches[3]

    const byteCharacters = atob(base64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: mimeType })

    const fileName = 'reconstructed_file' // You can change this default filename
    return new File([blob], fileName, { type: mimeType })
  }

  return null
}
