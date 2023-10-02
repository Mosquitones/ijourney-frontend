/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import { NotificationsOutlined } from '@mui/icons-material'
import {
  IconButton,
  Badge,
  SvgIcon,
  Tooltip,
  Menu,
  MenuItem,
  MenuList,
  ListItemText,
  Typography,
  Divider,
  Box,
  ButtonBase,
  CircularProgress,
} from '@mui/material'
import { AxiosError } from 'axios'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useMutation, useQuery } from 'react-query'

import { Button } from 'components'
import { useAuth, useFeedback } from 'contexts'
import { ApiResponseTypes, UserServices } from 'services'

import { NotificationItem } from './components'

const notificationsLabel = (count: number) => {
  if (count === 0) return 'Nenhuma notificação'
  if (count === 1) return '1 notificação'

  if (count > 99) return 'Mais de 99 notificações'

  return `${count} notificações`
}

export const AccountNotifications: React.FC = () => {
  const { userId } = useAuth()
  const { alert } = useFeedback()
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  const open = Boolean(anchorEl)
  const handleClose = () => setAnchorEl(null)

  const userNotificationsQuery = useQuery({
    queryKey: [`/users/${userId}/notifications`, { method: 'GET' }],
    queryFn: () => UserServices.id.notifications.get(userId),

    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const readAllNotificationsQuery = useMutation({
    mutationKey: [`/users/${userId}/notifications/read`, { method: 'POST' }],
    mutationFn: () => UserServices.id.notifications.read.post(userId),

    onError: (error: AxiosError<ApiResponseTypes<unknown>>) => {
      alert.showError(error.response?.data.message || error.message)
    },
  })

  const isLoading = userNotificationsQuery.isLoading
  const userNotifications = userNotificationsQuery.data

  const NOTIFICATIONS_QUANTITY =
    userNotifications?.totalUnreadNotifications || 0

  useEffect(() => {
    if (open && NOTIFICATIONS_QUANTITY > 0) readAllNotificationsQuery.mutate()
  }, [open, userNotifications?.totalUnreadNotifications])

  return (
    <>
      <Tooltip title={notificationsLabel(NOTIFICATIONS_QUANTITY)}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Badge badgeContent={NOTIFICATIONS_QUANTITY} color='primary'>
            <SvgIcon component={NotificationsOutlined} />
          </Badge>
        </IconButton>
      </Tooltip>
      <Menu
        id='notification-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'notification-button',
          role: 'listbox',
          disablePadding: true,
        }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.default',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        disableAutoFocus
        disableAutoFocusItem
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isLoading ? (
          <Box
            display='flex'
            py={1}
            px={2}
            justifyContent='center'
            alignItems='center'
          >
            <Typography
              color='text.secondary'
              display='flex'
              gap={1}
              alignItems='center'
            >
              <CircularProgress size={18} />
              Carregando notificações...
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              px={2}
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              py={1}
              tabIndex={-1}
            >
              <Typography
                variant='body2'
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                Notificações
              </Typography>
              {!!userNotifications?.totalUnreadNotifications &&
                userNotifications.totalUnreadNotifications > 0 && (
                  <ButtonBase
                    sx={{
                      px: 2,
                      py: 1,
                      mr: -2,
                      display: 'flex',
                      gap: 1,
                      borderRadius: '0.5rem',
                      alignItems: 'center',
                    }}
                    tabIndex={0}
                    onClick={() => readAllNotificationsQuery.mutate()}
                  >
                    {readAllNotificationsQuery.isLoading ? (
                      <>
                        <CircularProgress size={14} />
                        Marcando...
                      </>
                    ) : (
                      'Marcar todas como lida'
                    )}
                  </ButtonBase>
                )}
            </Box>

            <Divider component='li' sx={{ m: '0 !important' }} />

            {!userNotifications?.notifications ||
            userNotifications?.notifications?.length === 0 ? (
              <Box
                display='flex'
                justifyContent='center'
                alignItems='center'
                textAlign='center'
                bgcolor='background.paper'
                py={1}
                px={2}
                sx={{
                  borderBottomLeftRadius: '0.5rem',
                  borderBottomRightRadius: '0.5rem',
                }}
              >
                <Typography variant='body2' color='text.secondary'>
                  Nenhuma nova notificação
                </Typography>
              </Box>
            ) : (
              userNotifications?.notifications.map((notification) => (
                <NotificationItem
                  notification={notification}
                  key={notification.id}
                  refetchNotifications={userNotificationsQuery.refetch}
                />
              ))
            )}
          </>
        )}
      </Menu>
    </>
  )
}
