/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, forwardRef } from 'react'

import { UploadFile } from '@mui/icons-material'
import {
  Box,
  Button,
  ButtonBase,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
  TextFieldProps,
  Typography,
  useFormControl,
} from '@mui/material'

import { useForwardedRef } from 'hooks'

import * as S from './Input.styles'

export const Input = forwardRef<
  HTMLInputElement,
  TextFieldProps & {
    fileName?: string | null
    label?: string | React.ReactNode
  }
>(({ label, variant = 'outlined', fileName = null, ...rest }, ref) => {
  const [inputFileName, setInputFileName] = React.useState<string | null>(
    fileName
  )
  const inputRef = useForwardedRef<HTMLInputElement>(ref)

  const buttonFileNameHasError = inputFileName ? false : rest.error

  return (
    <S.Container fullWidth={!!rest.fullWidth}>
      {typeof label === 'string' ? (
        <S.Label
          {...rest.InputLabelProps}
          htmlFor={rest.name}
          error={buttonFileNameHasError}
          required={rest.required || rest.InputLabelProps?.required}
        >
          {label}
        </S.Label>
      ) : (
        label
      )}

      {rest.type === 'file' ? (
        <>
          <FormControl error={buttonFileNameHasError}>
            <S.FileButton
              type='button'
              error={buttonFileNameHasError}
              hasFile={!!inputFileName}
              onClick={() => {
                inputRef.current?.click()
              }}
              onBlur={() => {
                inputRef.current?.focus()
                inputRef.current?.blur()
              }}
            >
              <Typography
                color='inherit'
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                variant='body2'
                width='100%'
                gap={1}
              >
                {inputFileName || rest.placeholder || 'Escolha um arquivo'}
                <UploadFile
                  sx={{
                    fontSize: 20,
                    color: ({ palette }) => `${palette.common.black}75`,
                  }}
                />
              </Typography>
            </S.FileButton>
            <FormHelperText>{rest.helperText}</FormHelperText>
          </FormControl>

          <TextField
            {...rest}
            id={rest.name}
            size='small'
            tabIndex={-1}
            inputProps={{
              ...rest.inputProps,
              tabIndex: -1,
            }}
            inputRef={inputRef}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const fileObj = e.target.files && e.target.files[0]

              if (!fileObj) return

              setInputFileName(fileObj.name)
              rest.onChange?.(e)
            }}
            sx={{ position: 'absolute', zIndex: -1, opacity: 0 }}
          />
        </>
      ) : (
        <S.Input
          {...rest}
          variant={variant}
          id={rest.name}
          size='small'
          inputRef={inputRef}
        />
      )}
    </S.Container>
  )
})
