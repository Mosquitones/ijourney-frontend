/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { DeleteOutlineOutlined } from '@mui/icons-material'
import {
  Box,
  ButtonBase,
  CircularProgress,
  Divider,
  MenuItem,
  SvgIcon,
  Tooltip,
  Typography,
} from '@mui/material'
import { AxiosError } from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMutation } from 'react-query'

import { useAuth, useFeedback } from 'contexts'
import { ApiResponseTypes, UserServices } from 'services'

import * as S from './NotificationItem.styles'
import { NotificationItemPropTypes } from './NotificationItem.types'

export const NotificationItem: React.FC<NotificationItemPropTypes> = ({
  notification,
  refetchNotifications,
}) => {
  const { userId } = useAuth()
  const { alert } = useFeedback()

  const readNotificationQuery = useMutation({
    mutationKey: [
      `/users/${userId}/notifications/${notification.id}/read`,
      { method: 'POST' },
    ],
    mutationFn: () =>
      UserServices.id.notifications.id.read.post(userId, notification.id),
    onSuccess: () => {
      refetchNotifications()
    },

    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const deleteNotificationQuery = useMutation({
    mutationKey: [
      `/users/${userId}/notifications/${notification.id}`,
      { method: 'DELETE' },
    ],
    mutationFn: () =>
      UserServices.id.notifications.id.delete(userId, notification.id),
    onSuccess: () => {
      refetchNotifications()
    },
    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  return (
    <>
      <S.MenuItem read={notification.read} tabIndex={0}>
        <Box
          display='flex'
          justifyContent='space-between'
          gap={1}
          width='100%'
          minWidth={280}
        >
          <Typography
            variant='body2'
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            {notification.title}
          </Typography>
          <Typography
            // className=''
            variant='caption'
            color='text.secondary'
            fontStyle='italic'
          >
            {formatDistanceToNow(new Date(notification.creationDate), {
              locale: ptBR,
            })}
          </Typography>
          <Tooltip title='Deletar notificação'>
            <ButtonBase
              sx={{
                color: ({ palette }) => palette.error.main,
                display: 'flex',
                gap: 0.5,
                borderRadius: '0.5rem',
                alignItems: 'center',
                py: '0.6rem',
                mt: '-0.6rem',
                px: 2,
              }}
              color='error'
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation()
                deleteNotificationQuery.mutate()
              }}
            >
              {deleteNotificationQuery.isLoading ? (
                <>
                  <CircularProgress size={14} color='inherit' />
                  Deletando...
                </>
              ) : (
                <>
                  <SvgIcon
                    component={DeleteOutlineOutlined}
                    color='inherit'
                    sx={{ fontSize: 15 }}
                  />
                  Deletar
                </>
              )}
            </ButtonBase>
          </Tooltip>
        </Box>
        {/* <Box> */}
        <Typography
          variant='body2'
          color='text.secondary'
          // noWrap
          // flexWrap='wrap'
          // maxWidth={400}
          sx={{ wordBreak: 'break-word' }}
          textAlign='left'
        >
          {notification.description}
        </Typography>
        {/* </Box> */}
      </S.MenuItem>
      <Divider component='li' sx={{ m: '0 !important' }} />
    </>
  )
}
