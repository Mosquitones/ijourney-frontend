import { useCallback } from 'react'

import { FormikHandlers } from 'formik'

export const useInputHandlers = () => {
  const handleKeyboardActions = useCallback(
    (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
      index: number
    ) => {
      const key = e.code

      if (['ArrowLeft', 'ArrowRight'].includes(key)) {
        e.preventDefault()
      }

      let nextIndex = null

      if (['ArrowLeft', 'Backspace'].includes(key)) {
        nextIndex = index - 1
      }
      if (['ArrowRight'].includes(key)) {
        nextIndex = index + 1
      }

      if (nextIndex === null) return

      const nextInput = document.getElementsByName(`code[${nextIndex}]`)[0]

      setTimeout(
        () => {
          nextInput.focus()
        },
        key === 'Backspace' ? 100 : 0
      )
    },
    []
  )

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      formikEvent: FormikHandlers['handleChange']
    ) => {
      if (!/^(\s*|\d+)$/.test(e.currentTarget.value)) {
        e.preventDefault()
        return
      }

      formikEvent(e)
    },
    []
  )

  const handleInputFocus = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.selectionStart = 10000
      e.currentTarget.selectionEnd = 10000
    },
    []
  )
  return {
    handleKeyboardActions,
    handleInputChange,
    handleInputFocus,
  }
}
