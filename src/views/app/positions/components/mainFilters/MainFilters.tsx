/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SVGProps, useEffect } from 'react'

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
import { is } from 'date-fns/locale'

import { DialogTitleComponent } from 'components'
import {
  useDebounce,
  useDisclosure,
  useIsDevice,
  useParamsSelector,
} from 'hooks'
import { PositionPayloadQueryTypes } from 'services'

import { AdditionalFilters } from '../additionalFilters/AdditionalFilters'

import * as S from './MainFilters.styles'
import { MainFiltersPropTypes } from './MainFilters.types'

type Filters = keyof PositionPayloadQueryTypes

const renderFindButton = () => <Button variant='contained'>Encontrar</Button>

const renderInternalButton = () => (
  <Box my={-2} mr={-0.5}>
    {renderFindButton()}
  </Box>
)

export const MainFilters: React.FC<MainFiltersPropTypes> = ({
  hideLocationFilters = false,
  fullWidth = false,
}) => {
  const params = useParamsSelector<Filters>()
  const isDevice = useIsDevice()
  const filterHandlers = useDisclosure()

  const [positionName, setPositionName] = React.useState('')
  const [cityOrStateName, setCityOrStateName] = React.useState('')

  const debouncedPositionName = useDebounce<string>(positionName, 500)
  const debouncedCityOrStateName = useDebounce<string>(cityOrStateName, 500)

  const CONTAINER_AND_INPUT_PADDING_PROPS = {
    flex: 1,
    p: isDevice.from.sm ? 2 : 1,
    gap: 2,
  } as const

  const SVG_ICON_PROPS: Partial<SvgIconProps> = {
    fontSize: 'small',
    sx: {
      color: ({ palette }) => palette.grey[300],
    },
  }

  useEffect(() => {
    if (debouncedPositionName) {
      params.add({
        key: 'position-name',
        value: positionName,
      })
    } else {
      params.delete('position-name')
    }
  }, [debouncedPositionName])

  useEffect(() => {
    if (debouncedCityOrStateName) {
      params.add({
        key: 'city-or-state-name',
        value: cityOrStateName,
      })
    } else {
      params.delete('city-or-state-name')
    }
  }, [debouncedCityOrStateName])

  return (
    <Box width={fullWidth || isDevice.to.sm ? '100%' : 'initial'}>
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
            scroll='paper'
          >
            <DialogTitleComponent
              title='Filtros'
              onClose={filterHandlers.onClose}
            />
            <DialogContent dividers>
              <AdditionalFilters />
            </DialogContent>
            <DialogActions>
              {Object.keys(params.objParams).length > 0 && (
                <Button onClick={params.deleteAll} variant='text'>
                  Apagar
                </Button>
              )}
              <Button onClick={filterHandlers.onClose} variant='contained'>
                Aplicar filtros
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <S.Paper
        sx={{
          width: fullWidth || isDevice.to.sm ? '100%' : 'fit-content',
          minWidth: !fullWidth && isDevice.from.sm ? '60rem' : 'initial',
        }}
      >
        <Box
          {...CONTAINER_AND_INPUT_PADDING_PROPS}
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <S.InputBase
            type='autocomplete'
            fullWidth={fullWidth}
            value={positionName}
            placeholder={
              isDevice.from.sm
                ? 'Pesquise pelo termo da vaga'
                : 'Nome ou palavra-chave'
            }
            onChange={(e) => {
              setPositionName(e.target.value)
            }}
            startAdornment={
              <SvgIcon {...SVG_ICON_PROPS} component={SearchOutlined} />
            }
          />
          {hideLocationFilters && isDevice.from.sm && renderInternalButton()}
        </Box>

        {!hideLocationFilters && (
          <>
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
                fullWidth={fullWidth}
                placeholder='Cidade ou estado'
                value={cityOrStateName}
                onChange={(e) => {
                  setCityOrStateName(e.target.value)
                }}
                startAdornment={
                  <SvgIcon {...SVG_ICON_PROPS} component={PlaceOutlined} />
                }
              />
              {isDevice.from.sm && renderInternalButton()}
            </Box>
          </>
        )}
        {isDevice.to.sm && (
          <>
            <Divider orientation='horizontal' flexItem />
            {renderFindButton()}
          </>
        )}
      </S.Paper>
    </Box>
  )
}
