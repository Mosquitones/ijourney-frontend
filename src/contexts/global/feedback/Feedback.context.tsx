/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useMemo } from 'react'

import { CloseRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { FCWithChildren } from '@types'
import { SnackbarKey, useSnackbar } from 'notistack'

import { useDisclosure } from 'hooks'

import { FeedbackContextTypes } from './Feedback.context.types'

export const FeedbackContext = createContext<FeedbackContextTypes>(
  {} as FeedbackContextTypes
)

export const useFeedback = () => useContext(FeedbackContext)

export const FeedbackContextWrapper: FCWithChildren = ({ children }) => {
  const feedbackHandlers = useDisclosure()
  const alert = useSnackbar()

  const action = (snackbarKey: SnackbarKey) => (
    <IconButton onClick={() => alert.closeSnackbar(snackbarKey)}>
      <CloseRounded sx={{ color: ({ palette }) => palette.common.white }} />
    </IconButton>
  )

  const showAlertError = (error: string) => {
    return alert.enqueueSnackbar(error, {
      variant: 'error',
      action,
    })
  }

  const showAlertSuccess = (success: string) => {
    return alert.enqueueSnackbar(success, {
      variant: 'success',
      action,
    })
  }

  const feedback = useMemo(
    () => ({
      alert: {
        show: alert.enqueueSnackbar,
        showError: showAlertError,
        showSuccess: showAlertSuccess,
      },
    }),
    [feedbackHandlers, alert.enqueueSnackbar, showAlertError, showAlertSuccess]
  )

  return (
    <FeedbackContext.Provider value={feedback}>
      {children}
    </FeedbackContext.Provider>
  )
}

export * from './Feedback.context.types'
