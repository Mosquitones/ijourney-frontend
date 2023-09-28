/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

import { Add } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  ButtonBase,
  CircularProgress,
  Container,
  Divider,
  Fab,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { EnumValueTypes, ROLE_ENUM } from '@types'
import { AxiosError } from 'axios'
import { QueryKey, UseQueryOptions, useMutation, useQuery } from 'react-query'

import { Banner, Button, FloatingActionButton, Input } from 'components'
import { useAuth, useFeedback, useLayout } from 'contexts'
import { useDebounce, useIsDevice } from 'hooks'
import {
  ApiResponseTypes,
  PositionServices,
  PositionTypes,
  RecruiterServices,
  SkillServices,
} from 'services'

import {
  AdditionalFilters,
  MainFilters,
  PositionCard,
  PositionModalHandler,
} from './components'

const DEFAULT_PADDINGS: Partial<BoxProps> = {
  py: 2,
  px: 3,
}

export default function PositionsPage() {
  const isDevice = useIsDevice()
  const { alert } = useFeedback()
  const [selectedPosition, setSelectedPosition] =
    useState<PositionTypes | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const { isUserRole, userId, userRole } = useAuth()

  const skillsQuery = useQuery({
    queryKey: ['/skills', { method: 'GET' }],
    queryFn: SkillServices.findAll,
  })

  const QUERIES: {
    [key in EnumValueTypes<typeof ROLE_ENUM>]: any
  } = {
    CANDIDATE: {
      queryKey: [`/positions/candidates/${userId}`, { method: 'GET' }],
      queryFn: () => PositionServices.candidates.get(userId),
    },
    RECRUITER: {
      queryKey: [`/recruiters/${userId}/positions`, { method: 'GET' }],
      queryFn: () => RecruiterServices.id.positions.get(userId),
    },
    ADMIN: {
      queryKey: [`/positions`, { method: 'GET' }],
      queryFn: () => PositionServices.findAll(),
    },
    COMPANY: {},
  } as const

  const positionsQuery = useQuery(QUERIES[userRole]) as any

  return (
    <>
      {!isUserRole.CANDIDATE && (
        <FloatingActionButton
          icon={Add}
          tooltip='Clique para Adicionar uma vaga'
          onClick={() => setOpenModal(true)}
        />
      )}
      <Banner.Container isLoading={positionsQuery.isLoading}>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>Encontre o emprego dos sonhos</Banner.Title>
          <Banner.Description>
            Procurando emprego? Pesquise nossas ultimas vagas abertas e aplique
            para as melhores oportunidades ainda hoje!
          </Banner.Description>
        </Banner.Wrapper>
      </Banner.Container>
      <Container sx={{ py: 3 }}>
        <Grid container columnSpacing={2}>
          <Grid item xs={0} sm={3.5} display={{ xs: 'none', sm: 'block' }}>
            <Paper>
              <Box
                {...DEFAULT_PADDINGS}
                display='flex'
                alignItems='center'
                justifyContent='space-between'
              >
                <Typography
                  variant='body1'
                  fontWeight={({ typography }) => typography.fontWeightBold}
                >
                  Filtrar
                </Typography>
                <Button color='error' sx={{ p: 0, mr: -1, my: -2 }}>
                  <Typography color='red' variant='body2'>
                    Limpar Filtros
                  </Typography>
                </Button>
              </Box>
              <Divider />
              <Box {...DEFAULT_PADDINGS}>
                <AdditionalFilters />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <MainFilters fullWidth />
            <Typography
              my={2}
              fontWeight={({ typography }) => typography.fontWeightBold}
              variant='body2'
              color='text.secondary'
            >
              {positionsQuery.isLoading
                ? 'Carregando oportunidades...'
                : positionsQuery.data?.length && positionsQuery.data.length >= 0
                ? `${positionsQuery.data.length} oportunidade(s) encontrada(s)`
                : 'Nenhuma oportunidade encontrada'}
            </Typography>

            <Box display='flex' flexDirection='column' gap={2}>
              {positionsQuery.isLoading
                ? [...Array(5)].map((_, i) => (
                    <Skeleton
                      key={crypto.randomUUID() + i}
                      height={130}
                      width='100%'
                      variant='rounded'
                      animation='wave'
                    />
                  ))
                : positionsQuery.data
                    .sort((a: PositionTypes, b: PositionTypes) => b.id - a.id)
                    ?.map((position: PositionTypes) => (
                      <PositionCard
                        key={position.id}
                        href={String(position.id)}
                        onEditClick={() => setSelectedPosition(position)}
                        position={position}
                      />
                    ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <PositionModalHandler
        key={selectedPosition?.id}
        skills={skillsQuery.data || []}
        position={selectedPosition || undefined}
        open={Boolean(selectedPosition) || openModal}
        refetchPositions={positionsQuery.refetch}
        onClose={() => {
          setSelectedPosition(null)
          setOpenModal(false)
        }}
      />
    </>
  )
}

export * from './components'
export * from './subViews'
