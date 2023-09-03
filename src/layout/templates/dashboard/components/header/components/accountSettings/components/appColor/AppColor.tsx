/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { PaletteOutlined } from '@mui/icons-material'
import { ListItemIcon, MenuItem, Popover } from '@mui/material'
import Block from '@uiw/react-color-block'

import { useAccessibility } from 'contexts'

import { AppColorMenuItemTypes } from './AppColor.types'

export const AppColorMenuItem: React.FC<AppColorMenuItemTypes> = ({
  handleClose: onClose,
}) => {
  const { setColor, color } = useAccessibility()

  const [anchorEl, setAnchorEl] = React.useState<HTMLLIElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => setAnchorEl(null)

  const open = Boolean(anchorEl)

  return (
    <>
      <MenuItem onClick={handleClick} tabIndex={0}>
        <ListItemIcon>
          <PaletteOutlined fontSize='small' />
        </ListItemIcon>
        Trocar tema
      </MenuItem>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Block
          colors={[
            '#f89e0d',
            `#f7ca0e`,
            '#a5f80d',
            '#0df867',
            '#0ddcf8',
            '#0d96f8',
            '#0d28f8',
            '#a50df8',
            '#f80d96',
            '#f80d0d',
          ]}
          color={color.hex}
          onChange={({ rgba, hex }) => {
            const rgbaColor = `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`
            setColor({ rgba: rgbaColor, hex })
          }}
        />
      </Popover>
    </>
  )
}
