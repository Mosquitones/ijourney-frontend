/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SVGProps } from 'react'

import { SearchOutlined, PlaceOutlined, Tune, Close } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  InputBase,
  Paper,
  SvgIcon,
  SvgIconProps,
  Typography,
} from '@mui/material'

import { useDisclosure, useIsDevice } from 'hooks'

import { AdditionalFilters } from '../additionalFilters/AdditionalFilters'

import * as S from './MainFilters.styles'

export const MainFilters: React.FC = () => {
  const isDevice = useIsDevice()
  const filterHandlers = useDisclosure()

  const CONTAINER_AND_INPUT_PADDING_PROPS = {
    flex: 1,
    p: isDevice.from.sm ? 2 : 1,
  } as const

  const SVG_ICON_PROPS: Partial<SvgIconProps> = {
    fontSize: 'small',
    sx: {
      color: ({ palette }) => palette.grey[300],
    },
  }

  const renderFindButton = () => <Button variant='contained'>Encontrar</Button>

  return (
    <>
      {isDevice.to.sm && (
        <>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
          >
            <Typography
              variant='body1'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              Filtre por:
            </Typography>
            <IconButton onClick={filterHandlers.onOpen}>
              <SvgIcon component={Tune} />
            </IconButton>
          </Box>
          <Dialog
            fullScreen
            open={filterHandlers.isOpen}
            onClose={filterHandlers.onClose}
            scroll='body'
          >
            <DialogTitle>
              <Typography
                variant='h3'
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                Filtros
              </Typography>
              <IconButton
                aria-label='close'
                onClick={filterHandlers.onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <AdditionalFilters />
            </DialogContent>
            <DialogActions>
              <Button onClick={filterHandlers.onClose} variant='text'>
                Apagar
              </Button>
              <Button onClick={filterHandlers.onClose} variant='contained'>
                Aplicar filtros
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <S.Paper>
        <S.InputBase
          sx={{ ...CONTAINER_AND_INPUT_PADDING_PROPS }}
          placeholder={
            isDevice.from.sm
              ? 'Pesquise pelo nome ou palavra-chave'
              : 'Nome ou palavra-chave'
          }
          startAdornment={
            <SvgIcon {...SVG_ICON_PROPS} component={SearchOutlined} />
          }
        />
        <Divider
          orientation={isDevice.from.sm ? 'vertical' : 'horizontal'}
          flexItem
        />
        <Box
          {...CONTAINER_AND_INPUT_PADDING_PROPS}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <S.InputBase
            placeholder='Cidade ou estado'
            startAdornment={
              <SvgIcon {...SVG_ICON_PROPS} component={PlaceOutlined} />
            }
          />
          {isDevice.from.sm && (
            <Box my={-2} mr={-0.5}>
              {renderFindButton()}
            </Box>
          )}
        </Box>
        {isDevice.to.sm && (
          <>
            <Divider orientation='horizontal' flexItem />
            {renderFindButton()}
          </>
        )}
      </S.Paper>
    </>
  )
}
