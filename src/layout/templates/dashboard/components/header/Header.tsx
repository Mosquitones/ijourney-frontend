/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

import { Menu, NotificationsOutlined } from '@mui/icons-material'
import {
  Avatar,
  Badge,
  Box,
  ButtonBase,
  Container,
  IconButton,
  Slide,
  SvgIcon,
  Tooltip,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import {
  NavLink,
  Link as RouterLink,
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { Logo } from 'components'
import { useAuth, useLayout } from 'contexts'
import { useDisclosure, useIsDevice } from 'hooks'
import { ROUTES } from 'router'
import { UserRoleTypes } from 'services'

import {
  AccountSettings,
  LeftNavigationComponent,
  NavItemTypes,
} from './components'
import * as S from './Header.styles'

const NOTIFICATIONS_VALUE = 100

export const GET_HEADER_TRIGGER = () => useScrollTrigger({ threshold: 200 })
export const Header: React.FC = () => {
  const device = useIsDevice()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { userNavItems } = useLayout()

  const drawerHandlers = useDisclosure()

  const isMobileScreen = device.from.sm

  const defaultPath = userNavItems?.find((item) => item.isDefaultPath)

  function notificationsLabel(count: number) {
    if (count === 0) return 'nenhuma notificação'

    if (count > 99) return 'mais de 99 notificações'

    return `${count} notificações`
  }

  const trigger = GET_HEADER_TRIGGER()

  return (
    <S.Header showOnScroll={!trigger}>
      <Container>
        <S.Wrapper>
          {defaultPath && (
            <ButtonBase href={defaultPath.path} disableRipple>
              <Logo extended={isMobileScreen} />
            </ButtonBase>
          )}

          {isMobileScreen ? (
            <S.Nav>
              {userNavItems?.map((item) => (
                <NavLink key={item.path} to={item.path}>
                  {({ isActive }) => (
                    <S.NavLinkItem isActive={isActive}>
                      <Typography>{item.label}</Typography>
                    </S.NavLinkItem>
                  )}
                </NavLink>
              ))}
            </S.Nav>
          ) : (
            <Typography
              py={2}
              variant='h5'
              component='h1'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {userNavItems?.find((item) => item.path === location.pathname)
                ?.label || 'Desconhecido'}
            </Typography>
          )}
          <Box display='flex' alignItems='center' gap={{ xs: 1, md: 3 }}>
            {isMobileScreen ? (
              <>
                <Tooltip title={notificationsLabel(NOTIFICATIONS_VALUE)}>
                  <IconButton>
                    <Badge badgeContent={NOTIFICATIONS_VALUE} color='primary'>
                      <SvgIcon component={NotificationsOutlined} />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <AccountSettings />
              </>
            ) : (
              <>
                <IconButton onClick={drawerHandlers.onToggle} sx={{ mr: -1.2 }}>
                  <Menu />
                </IconButton>
                {userNavItems && (
                  <LeftNavigationComponent
                    items={userNavItems}
                    dialogHandlers={drawerHandlers}
                  />
                )}
              </>
            )}
          </Box>
        </S.Wrapper>
      </Container>
    </S.Header>
  )
}

export * from './Header.types'
export * from './components'
