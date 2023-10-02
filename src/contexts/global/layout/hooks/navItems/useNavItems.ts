import {
  DashboardOutlined,
  DashboardTwoTone,
  BusinessOutlined,
  BusinessTwoTone,
  InboxOutlined,
  MoveToInboxTwoTone,
  AddchartOutlined,
  AddchartTwoTone,
} from '@mui/icons-material'
import { EnumValueTypes, ROLE_ENUM } from '@types'
import { NavItemTypes } from 'layout'
// import { NavItemTypes } from 'layout/templates/dashboard/components/header/components'

import { ROUTES } from 'router'

type RouteBasedOnRoleTypes = {
  [key in EnumValueTypes<typeof ROLE_ENUM>]: NavItemTypes[]
}

type _NavItemWithoutLabel = Omit<NavItemTypes, 'label'>

export const useNavItems = () => {
  const POSITION_ITEM_PROPERTIES: NavItemTypes = {
    label: 'Vagas',
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

  const _ABOUT_US_ITEM: NavItemTypes = {
    label: 'Sobre nós',
    path: `/${ROUTES.APP}/${ROUTES.ABOUT_US}`,
    icon: BusinessOutlined,
    filledIcon: BusinessTwoTone,
    disabled: true,
  }

  const REPORT_ITEM: NavItemTypes = {
    label: 'Relatórios',
    path: `/${ROUTES.APP}/${ROUTES.REPORTS}`,
    icon: AddchartOutlined,
    filledIcon: AddchartTwoTone,
  }

  const _APP_MOCK_ITEM: NavItemTypes = {
    label: 'App',
    path: `/${ROUTES.APP}/${ROUTES.APP}`,
    icon: DashboardOutlined,
    filledIcon: DashboardTwoTone,
  }

  const ARCHIVED_POSITIONS_ITEM: NavItemTypes = {
    label: 'Vagas Arquivadas',
    path: `/${ROUTES.APP}/${ROUTES.ARCHIVED_POSITIONS}`,
    icon: InboxOutlined,
    filledIcon: MoveToInboxTwoTone,
  }

  const navItems: RouteBasedOnRoleTypes = {
    CANDIDATE: [
      {
        ...POSITION_ITEM_PROPERTIES,
        label: 'Vagas',
        isDefaultPath: true,
      },
      {
        label: 'Vagas Aplicadas',
        path: `/${ROUTES.APP}/${ROUTES.APPLIED_POSITIONS}?tab=on-going`,
        icon: InboxOutlined,
        filledIcon: MoveToInboxTwoTone,
      },
      COURSE_ITEM,
      // ABOUT_US_ITEM,
    ],
    RECRUITER: [
      {
        ...POSITION_ITEM_PROPERTIES,
        label: 'Minhas Vagas',
        isDefaultPath: true,
      },
      ARCHIVED_POSITIONS_ITEM,
      REPORT_ITEM,
      // COURSE_ITEM,
      // ABOUT_US_ITEM,
    ],
    COMPANY: [
      {
        ...POSITION_ITEM_PROPERTIES,
        isDefaultPath: true,
      },
      ARCHIVED_POSITIONS_ITEM,
      REPORT_ITEM,
      COURSE_ITEM,
      // ABOUT_US_ITEM,
    ],
    ADMIN: [
      {
        ...POSITION_ITEM_PROPERTIES,
        isDefaultPath: true,
      },
      REPORT_ITEM,
      COURSE_ITEM,
      // ABOUT_US_ITEM,
    ],
  }

  return navItems
}
