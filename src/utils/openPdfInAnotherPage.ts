type FileOptionTypes = {
  title: string
}
export const openPdfInAnotherPage = (
  file: string,
  options?: FileOptionTypes
) => {
  if (!file) return
  const pdfWindow = window.open('')
  if (!pdfWindow) return
  pdfWindow.document.write(
    `<iframe 
      width='100%' 
      height='100%' 
      title='${options?.title || 'PDF'}' 
      src='${encodeURI(file)}'
      ></iframe>`
  )
}
