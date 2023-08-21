import React from 'react'

import { Logout, Menu } from '@mui/icons-material'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from '@mui/material'

import { Logo } from 'components'
import { GET_LOGOUT_ROUTE } from 'views'

import { LeftNavigationItem } from './components'
import { LeftNavigationPropTypes } from './LeftNavigation.types'

export const LeftNavigationComponent: React.FC<LeftNavigationPropTypes> = ({
  items,
  dialogHandlers,
}) => {
  return (
    <Drawer
      open={dialogHandlers.isOpen}
      onClose={dialogHandlers.onClose}
      // tabIndex={-1}
      PaperProps={{
        sx: {
          width: '100%',
          maxWidth: 250,
        },
      }}
    >
      <Box
        role='presentation'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        height='100%'
        paddingX={2}
      >
        <div>
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={dialogHandlers.onToggle}>
                <ListItemIcon>
                  <Menu />
                </ListItemIcon>
                <Logo extended />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            {items.map((item) => (
              <LeftNavigationItem
                item={item}
                key={item.path}
                onClick={dialogHandlers.onClose}
              />
            ))}
          </List>
        </div>
        <div>
          <Divider />
          <List>
            <LeftNavigationItem
              item={{
                path: GET_LOGOUT_ROUTE(),
                label: 'Desconectar',
                icon: Logout,
              }}
            />
          </List>
        </div>
      </Box>
    </Drawer>
  )
}

export * from './LeftNavigation.types'
