/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { SVGProps, useEffect } from 'react'

import {
  SearchOutlined,
  PlaceOutlined,
  Tune,
  Close,
  AlternateEmail,
} from '@mui/icons-material'
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
  useSkills,
} from 'hooks'
import {
  CandidatePayloadQueryTypes,
  PositionPayloadQueryTypes,
  RecruiterPayloadQueryTypes,
} from 'services'

import * as S from '../../../positions/components/mainFilters/MainFilters.styles'

import { RecruiterFilters } from './RecruiterFilters'

interface RecruiterMainFiltersPropTypes {
  fullWidth?: boolean
}

type Filters = keyof RecruiterPayloadQueryTypes

const renderFindButton = () => <Button variant='contained'>Encontrar</Button>

const renderInternalButton = () => (
  <Box my={-2} mr={-0.5}>
    {renderFindButton()}
  </Box>
)

export const RecruiterMainFilters: React.FC<RecruiterMainFiltersPropTypes> = ({
  fullWidth = false,
}) => {
  const params = useParamsSelector<Filters>()
  const isDevice = useIsDevice()
  const filterHandlers = useDisclosure()

  const [candidateName, setCandidateName] = React.useState('')
  const [email, setEmail] = React.useState('')

  const debouncedCandidateName = useDebounce<string>(candidateName, 500)
  const debouncedEmail = useDebounce<string>(email, 500)

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
    if (debouncedCandidateName) {
      params.add({
        key: 'recruiter-name',
        value: candidateName,
      })
    } else {
      params.delete('recruiter-name')
    }
  }, [debouncedCandidateName])

  useEffect(() => {
    if (debouncedEmail) {
      params.add({
        key: 'email',
        value: email,
      })
    } else {
      params.delete('email')
    }
  }, [debouncedEmail])

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
              <RecruiterFilters />
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
            value={candidateName}
            placeholder={
              isDevice.from.sm ? 'Pesquise pelo nome do recrutador' : 'Nome'
            }
            onChange={(e) => {
              setCandidateName(e.target.value)
            }}
            startAdornment={
              <SvgIcon {...SVG_ICON_PROPS} component={SearchOutlined} />
            }
          />
        </Box>

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
              placeholder='E-mail'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              startAdornment={
                <SvgIcon {...SVG_ICON_PROPS} component={AlternateEmail} />
              }
            />
            {isDevice.from.sm && renderInternalButton()}
          </Box>
        </>
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
