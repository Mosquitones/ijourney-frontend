import React, { useState, MouseEvent } from 'react'

import {
  Logout,
  SettingsOutlined,
  PersonOutlined,
  HelpOutlineOutlined,
  TextFieldsOutlined,
} from '@mui/icons-material'
import {
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Tooltip,
} from '@mui/material'

import { useAuth } from 'contexts'
import { GET_LOGOUT_ROUTE } from 'views'

import { AppColorMenuItem } from './components'

export const AccountSettings: React.FC = () => {
  const { user } = useAuth()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Tooltip title='Configurações de Conta'>
        <IconButton sx={{ mr: -1 }} onClick={handleClick}>
          <Avatar
            sx={{ bgcolor: ({ palette }) => palette.primary.main }}
            alt={user?.name}
            src={user?.image}
          />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
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
              bgcolor: 'background.paper',
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
        <MenuItem onClick={handleClose} tabIndex={0}>
          <ListItemIcon>
            <PersonOutlined fontSize='small' />
          </ListItemIcon>
          Perfil
        </MenuItem>
        <MenuItem onClick={handleClose} tabIndex={0}>
          <ListItemIcon>
            <SettingsOutlined fontSize='small' />
          </ListItemIcon>
          Configurações
        </MenuItem>
        <MenuItem onClick={handleClose} tabIndex={0}>
          <ListItemIcon>
            <TextFieldsOutlined fontSize='small' />
          </ListItemIcon>
          Alterar Fonte
        </MenuItem>
        <AppColorMenuItem handleClose={handleClose} />
        <MenuItem onClick={handleClose} tabIndex={0}>
          <ListItemIcon>
            <HelpOutlineOutlined fontSize='small' />
          </ListItemIcon>
          Ajuda
        </MenuItem>
        <Divider />
        <MenuItem
          sx={{ color: ({ palette }) => palette.error.main }}
          component='a'
          href={GET_LOGOUT_ROUTE()}
          tabIndex={0}
        >
          <ListItemIcon>
            <Logout fontSize='small' color='error' />
          </ListItemIcon>
          Desconectar
        </MenuItem>
      </Menu>
    </>
  )
}
