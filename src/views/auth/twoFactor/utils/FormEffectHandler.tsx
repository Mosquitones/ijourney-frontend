import React, { useEffect } from 'react'

import { useFormikContext } from 'formik'

import defaultForm from './defaultForm'

export const FormEffectHandler: React.FC<{
  onFilled: (val: { code: string[] }) => void
}> = ({ onFilled }) => {
  const formik = useFormikContext<{ code: string[] }>()

  useEffect(() => {
    const { code } = formik.values
    if (!code) return

    const focused =
      document?.activeElement?.attributes?.getNamedItem('name')?.textContent ||
      ''

    const focusedIndex = Number((focused.match(/\d+/g) || ['-1'])[0])

    const emptyIndex = code?.findIndex((where) => where === '')

    if (code.filter((where) => where === '').length === 0) {
      onFilled(formik.values)
      return
    }

    if (emptyIndex !== focusedIndex && code !== defaultForm.code) {
      const inputRef = document.getElementsByName(`code[${emptyIndex}]`)[0]
      if (inputRef) {
        inputRef.focus()
      }
    }
  }, [formik.values, onFilled])
  return null
}
