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
import { useNavigate, useSearchParams } from 'react-router-dom'

import { Banner, Button, FloatingActionButton, Input } from 'components'
import { useAuth, useFeedback, useLayout } from 'contexts'
import { useDebounce, useIsDevice, useParamsSelector, useSkills } from 'hooks'
import { ROUTES } from 'router'
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
import { TabTypes } from './subViews'

const DEFAULT_PADDINGS: Partial<BoxProps> = {
  py: 2,
  px: 3,
}

export default function PositionsPage() {
  const isDevice = useIsDevice()
  const { alert } = useFeedback()
  const params = useParamsSelector()
  const [selectedPosition, setSelectedPosition] =
    useState<PositionTypes | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const { isUserRole, userId, userRole } = useAuth()

  const skillsQuery = useSkills()

  const { 'salary-id': _, ...restOfParams } = params.objParams

  const QUERIES: {
    [key in EnumValueTypes<typeof ROLE_ENUM>]: any
  } = {
    CANDIDATE: {
      queryKey: [
        `/positions/candidates/${userId}`,
        { method: 'GET', query: restOfParams },
      ],
      queryFn: () => PositionServices.candidates.get(userId, restOfParams),
    },
    RECRUITER: {
      queryKey: [
        `/recruiters/${userId}/positions`,
        { method: 'GET', query: restOfParams },
      ],
      queryFn: () => RecruiterServices.id.positions.get(userId, restOfParams),
    },
    ADMIN: {
      queryKey: [`/positions`, { method: 'GET', query: restOfParams }],
      queryFn: () => PositionServices.findAll(restOfParams),
    },
    COMPANY: {
      queryKey: [`/positions`, { method: 'GET', query: restOfParams }],
      queryFn: () => PositionServices.findAll(restOfParams),
    },
  } as const

  const positionsQuery = useQuery(QUERIES[userRole]) as any

  return (
    <>
      {(isUserRole.SUPER_ADMIN || isUserRole.RECRUITER) && (
        <FloatingActionButton
          icon={Add}
          tooltip='Clique para Adicionar uma vaga'
          onClick={() => setOpenModal(true)}
        />
      )}
      <Banner.Container isLoading={positionsQuery.isLoading}>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>
            {isUserRole.CANDIDATE && 'Encontre o emprego dos sonhos'}
            {isUserRole.RECRUITER && 'Gerencie suas Oportunidades'}
            {isUserRole.SUPER_ADMIN &&
              'Controle Centralizado das Oportunidades'}
          </Banner.Title>
          <Banner.Description>
            {isUserRole.CANDIDATE &&
              'Em busca da oportunidade perfeita? Explore as vagas mais recentes e aplique hoje mesmo para transformar seus sonhos em realidade. Sua carreira de sucesso começa aqui.'}
            {isUserRole.RECRUITER &&
              'Controle e gerencie facilmente as vagas que você criou. Otimize seu processo de recrutamento e encontre os melhores talentos para sua empresa.'}
            {isUserRole.SUPER_ADMIN &&
              'Tenha o controle completo sobre todas as vagas criadas na plataforma. Gerencie, edite e monitore cada oportunidade para garantir um processo de recrutamento eficiente e transparente.'}
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
                {Object.keys(params.objParams).length > 0 && (
                  <Button
                    color='error'
                    sx={{ p: 0, mr: -1, my: -2 }}
                    onClick={params.deleteAll}
                  >
                    <Typography color='red' variant='body2'>
                      Limpar Filtros
                    </Typography>
                  </Button>
                )}
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
                    ?.sort((a: PositionTypes, b: PositionTypes) => b.id - a.id)
                    ?.map((position: PositionTypes) => (
                      <PositionCard
                        key={position.id}
                        href={`${position.id}?tab=${
                          'description' as TabTypes['id']
                        }`}
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
