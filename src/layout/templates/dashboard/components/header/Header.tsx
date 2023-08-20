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
import { NavLink, Link as RouterLink, useLocation } from 'react-router-dom'

import { Logo } from 'components'
import { useAuth } from 'contexts'
import { useDisclosure, useIsDevice } from 'hooks'
import { ROUTES } from 'router'
import { UserRoleTypes } from 'services'

import { LeftNavigationComponent, NavItemTypes } from './components'
import * as S from './Header.styles'

type RouteBasedOnRoleTypes = {
  [key in UserRoleTypes]: NavItemTypes[]
}

type NavItemWithoutLabel = Omit<NavItemTypes, 'label'>

export const Header: React.FC = () => {
  const device = useIsDevice()
  const location = useLocation()

  const { user } = useAuth()

  const drawerHandlers = useDisclosure()

  const POSITION_ITEM_PROPERTIES: NavItemWithoutLabel = {
    path: `/${ROUTES.APP}/${ROUTES.POSITIONS}`,
    icon: DashboardOutlined,
    filledIcon: DashboardTwoTone,
  }

  const COURSE_ITEM: NavItemTypes = {
    label: 'Cursos',
    path: `/${ROUTES.APP}/${ROUTES.COURSES}`,
    icon: DashboardOutlined,
    filledIcon: DashboardTwoTone,
  }

  const ABOUT_US_ITEM: NavItemTypes = {
    label: 'Sobre nós',
    path: `/${ROUTES.APP}/${ROUTES.ABOUT_US}`,
    icon: BusinessOutlined,
    filledIcon: BusinessTwoTone,
  }

  const APP_MOCK_ITEM: NavItemTypes = {
    label: 'App',
    path: `/${ROUTES.APP}/${ROUTES.APP}`,
    icon: DashboardOutlined,
    filledIcon: DashboardTwoTone,
  }

  const routes: RouteBasedOnRoleTypes = {
    candidate: [
      {
        label: 'Vagas',
        ...POSITION_ITEM_PROPERTIES,
      },
      {
        label: 'Vagas Aplicadas',
        path: `/${ROUTES.APP}/${ROUTES.APPLIED_POSITIONS}`,
        icon: InboxOutlined,
        filledIcon: MoveToInboxTwoTone,
      },
      COURSE_ITEM,
      ABOUT_US_ITEM,
    ],
    recruiter: [
      {
        label: 'Minhas Vagas',
        ...POSITION_ITEM_PROPERTIES,
      },
      {
        label: 'Relatórios',
        path: `/${ROUTES.APP}/${ROUTES.REPORTS}`,
        icon: AddchartOutlined,
        filledIcon: AddchartTwoTone,
      },
      COURSE_ITEM,
      ABOUT_US_ITEM,
    ],
    admin: [APP_MOCK_ITEM],
    company: [APP_MOCK_ITEM],
  }

  // useEffect(() => {
  //   if (drawerHandlers.isOpen) {
  //     drawerHandlers.onClose()
  //   }
  // }, [drawerHandlers, location.pathname])

  return (
    <S.Header>
      <Container maxWidth='lg'>
        <S.Wrapper>
          <ButtonBase LinkComponent={RouterLink} href={`/${ROUTES.APP}`}>
            <Logo extended={device.from.md} />
          </ButtonBase>
          {user &&
            (device.from.sm ? (
              <S.Nav>
                {routes[user.role].map((route) => (
                  <NavLink key={route.path} to={route.path}>
                    {({ isActive }) => (
                      <S.NavLinkItem isActive={isActive}>
                        <Typography>{route.label}</Typography>
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
                {routes[user.role].find(
                  (route) => route.path === location.pathname
                )?.label || 'unknown'}
              </Typography>
            ))}
          <Box display='flex' alignItems='center' gap={{ xs: 1, md: 3 }}>
            {user &&
              (device.from.sm ? (
                <>
                  <IconButton>
                    <SvgIcon component={NotificationsOutlined} />
                  </IconButton>
                  <Avatar
                    sx={{ bgcolor: ({ palette }) => palette.primary.main }}
                    alt={user.name}
                    src={user.image}
                  />
                </>
              ) : (
                <>
                  <IconButton
                    onClick={drawerHandlers.onToggle}
                    sx={{ mr: -1.2 }}
                  >
                    <Menu />
                  </IconButton>
                  <LeftNavigationComponent
                    items={routes[user.role]}
                    dialogHandlers={drawerHandlers}
                  />
                </>
              ))}
          </Box>
        </S.Wrapper>
      </Container>
    </S.Header>
  )
}
