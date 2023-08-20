/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'

import {
  AddchartOutlined,
  AddchartTwoTone,
  BusinessOutlined,
  BusinessTwoTone,
  DashboardOutlined,
  DashboardTwoTone,
  InboxOutlined,
  Menu,
  MoveToInboxTwoTone,
  NotificationsOutlined,
  SchoolOutlined,
  SchoolTwoTone,
  Work,
  WorkOutlineOutlined,
  WorkTwoTone,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  ButtonBase,
  Container,
  IconButton,
  SvgIcon,
  Typography,
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

import { LeftNavigationComponent, NavItemTypes } from './components'
import * as S from './Header.styles'

export const Header: React.FC = () => {
  const device = useIsDevice()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { userNavItems } = useLayout()

  const drawerHandlers = useDisclosure()

  const isMobileScreen = device.from.sm

  const defaultPath = userNavItems?.find((item) => item.isDefaultPath)

  return (
    <S.Header>
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
                <IconButton>
                  <SvgIcon component={NotificationsOutlined} />
                </IconButton>
                <Avatar
                  sx={{ bgcolor: ({ palette }) => palette.primary.main }}
                  alt={user?.name}
                  src={user?.image}
                />
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
