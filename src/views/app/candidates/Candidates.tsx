/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Add } from '@mui/icons-material'
import {
  Container,
  Grid,
  Paper,
  Typography,
  Divider,
  Skeleton,
  Box,
  CircularProgress,
  BoxProps,
} from '@mui/material'
import { useQuery } from 'react-query'
import { Navigate } from 'react-router-dom'

import {
  Banner,
  Button,
  EmptyContent,
  FloatingActionButton,
  UserProfileCard,
} from 'components'
import { useAuth } from 'contexts'
import { useParamsSelector, useSkills } from 'hooks'
import { ROUTES } from 'router'
import { CandidateServices, PositionTypes } from 'services'

import {
  AdditionalFilters,
  MainFilters,
  PositionCard,
} from '../positions/components'
import { TabTypes } from '../positions/subViews'

import { CandidateFilters, CandidateMainFilters } from './components'

// import { Container } from './styles';

const DEFAULT_PADDINGS: Partial<BoxProps> = {
  py: 2,
  px: 3,
}

export default function CandidatesPage() {
  const { isUserRole, user } = useAuth()

  const [openModal, setOpenModal] = React.useState(false)
  const isRecruiterOrSuperAdmin = isUserRole.RECRUITER || isUserRole.SUPER_ADMIN

  const params = useParamsSelector()

  const skillsQuery = useSkills()

  const candidatesQuery = useQuery({
    queryKey: [`/candidates`, { method: 'GET', query: params.objParams }],
    queryFn: () => CandidateServices.get(params.objParams),
    enabled: isRecruiterOrSuperAdmin,
  })

  return (
    <>
      {isRecruiterOrSuperAdmin && (
        <FloatingActionButton
          icon={Add}
          tooltip='Clique para Adicionar um candidato'
          onClick={() => setOpenModal(true)}
        />
      )}
      <Banner.Container>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>
            {isRecruiterOrSuperAdmin && 'Encontre os Talentos Certos'}
          </Banner.Title>
          <Banner.Description>
            {isRecruiterOrSuperAdmin &&
              'Explore nossa base de dados de candidatos altamente qualificados. Encontre o ajuste perfeito para suas vagas e construa a equipe dos seus sonhos.'}
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
                <CandidateFilters skills={skillsQuery?.data || []} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <CandidateMainFilters fullWidth />

            {candidatesQuery.isLoading ? (
              <Box display='flex' flex={1} my={2}>
                <Typography
                  color='text.secondary'
                  display='flex'
                  gap={1}
                  alignItems='center'
                >
                  <CircularProgress size={18} />
                  Carregando candidatos...
                </Typography>
              </Box>
            ) : (
              <>
                {candidatesQuery.data?.length === 0 ? (
                  <Box
                    display='flex'
                    flex={1}
                    justifyContent='center'
                    alignItems='center'
                    pb={10}
                    my={2}
                  >
                    <EmptyContent title='Nenhum candidato' />
                  </Box>
                ) : (
                  <>
                    <Typography
                      my={2}
                      fontWeight={({ typography }) => typography.fontWeightBold}
                      variant='body2'
                      color='text.secondary'
                    >
                      {candidatesQuery?.data?.length} candidatos(as)
                      encontrados(as)
                    </Typography>
                    <Box display='flex' flexDirection='column' gap={2}>
                      {candidatesQuery.data
                        ?.sort((a, b) => a.id - b.id)
                        .map((user) => (
                          <UserProfileCard key={user.id} user={user} />
                        ))}
                    </Box>
                  </>
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export * from '../profiles/subViews'
