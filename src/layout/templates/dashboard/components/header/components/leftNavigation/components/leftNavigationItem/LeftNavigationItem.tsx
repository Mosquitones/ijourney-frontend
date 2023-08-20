/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import * as S from './LeftNavigation.styles'
import { LeftNavigationPropTypes } from './LeftNavigationItem.types'

export const LeftNavigationItem: React.FC<LeftNavigationPropTypes> = ({
  item,
  onClick,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleClick = () => {
    if (onClick) onClick()

    if (location.pathname !== item.path) {
      setTimeout(() => {
        navigate(item.path, { replace: true })
      }, 50)
    }
  }

  return (
    <S.NavLink
      to={item.path}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          handleClick()
        }
      }}
      onClick={(e) => {
        e.preventDefault()
      }}
    >
      {({ isActive }) => (
        <ListItemButton
          color='primary'
          LinkComponent={NavLink}
          tabIndex={-1}
          onClick={handleClick}
        >
          <ListItemIcon color='primary'>
            <SvgIcon
              component={
                item.filledIcon && isActive ? item.filledIcon : item.icon
              }
              color={isActive ? 'primary' : 'inherit'}
              fontSize='medium'
            />
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            primaryTypographyProps={{
              color: isActive ? 'primary' : 'inherit',
              fontWeight: isActive ? 'bold' : 'initial',
              minWidth: 'max-content',
            }}
          />
        </ListItemButton>
      )}
    </S.NavLink>
  )
}

export * from './LeftNavigationItem.types'
