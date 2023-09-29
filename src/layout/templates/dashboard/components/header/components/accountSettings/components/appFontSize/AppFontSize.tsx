/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import {
  Add,
  PaletteOutlined,
  RemoveOutlined,
  RestartAltOutlined,
  TextFieldsOutlined,
} from '@mui/icons-material'
import {
  Box,
  ButtonGroup,
  IconButton,
  InputBase,
  ListItemIcon,
  MenuItem,
  Popover,
  SvgIcon,
  Tooltip,
} from '@mui/material'
import Block from '@uiw/react-color-block'

import { Button, Input } from 'components'
import { useAccessibility } from 'contexts'

import * as S from './AppFontSize.styles'
import { AppColorMenuItemTypes } from './AppFontSize.types'

const FAKE_COUNTER: { [key: number]: number } = {
  7.5: 18,
  8.75: 17,
  10: 16,
  11.25: 15,
  12.5: 14,
  13.75: 13,
}

// { htmlFontSize: 13.75}
// { htmlFontSize: 12.5}
// { htmlFontSize: 11.25}
// { htmlFontSize: 10}
// { htmlFontSize: 8.75}
// { htmlFontSize: 7.5}

export const AppFontSizeMenuItem: React.FC<AppColorMenuItemTypes> = ({
  handleClose: onClose,
}) => {
  const { fontSizeHandlers, fontSize, htmlFontSize, isFontSizeSameAsInitial } =
    useAccessibility()

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
          <TextFieldsOutlined fontSize='small' />
        </ListItemIcon>
        Alterar Fonte
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
        <Box display='flex' alignItems='center'>
          {!isFontSizeSameAsInitial && (
            <Tooltip title='Voltar ao tamanho original'>
              <IconButton onClick={fontSizeHandlers.reset}>
                <SvgIcon component={RestartAltOutlined} />
              </IconButton>
            </Tooltip>
          )}
          <S.ButtonGroup
            disableElevation
            variant='outlined'
            color='primary'
            aria-label='Disabled elevation buttons'
          >
            <Tooltip title='Aumentar tamanho da fonte'>
              <S.Button
                onClick={fontSizeHandlers.increase}
                disabled={htmlFontSize === 7.5}
              >
                <SvgIcon
                  component={Add}
                  sx={{ color: 'text.secondary', fontSize: 22 }}
                />
              </S.Button>
            </Tooltip>
            <S.Button tabIndex={-1} disabled sx={{ px: 2, py: 1 }}>
              {FAKE_COUNTER[htmlFontSize] || 16}
            </S.Button>
            <Tooltip title='Diminuir tamanho da fonte'>
              <S.Button
                onClick={fontSizeHandlers.decrease}
                disabled={htmlFontSize === 13.75}
              >
                <SvgIcon
                  component={RemoveOutlined}
                  sx={{ color: 'text.secondary', fontSize: 22 }}
                />
              </S.Button>
            </Tooltip>
          </S.ButtonGroup>
        </Box>
      </Popover>
    </>
  )
}
