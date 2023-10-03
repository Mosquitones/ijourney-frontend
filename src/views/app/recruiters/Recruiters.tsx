/* eslint-disable no-constant-condition */
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
import { RecruiterServices } from 'services'

import {
  AdditionalFilters,
  MainFilters,
  PositionCard,
} from '../positions/components'
import { TabTypes } from '../positions/subViews'

import { RecruiterFilters, RecruiterMainFilters } from './components'

// import { Container } from './styles';

const DEFAULT_PADDINGS: Partial<BoxProps> = {
  py: 2,
  px: 3,
}

export default function RecruitersPage() {
  const { isUserRole } = useAuth()

  const [openModal, setOpenModal] = React.useState(false)

  const params = useParamsSelector()

  const skillsQuery = useSkills()

  const recruitersQuery = useQuery({
    queryKey: [`/recruiters`, { method: 'GET', query: params.objParams }],
    queryFn: () => RecruiterServices.get(params.objParams),
    enabled: isUserRole.SUPER_ADMIN,
  })

  return (
    <>
      {isUserRole.SUPER_ADMIN && (
        <FloatingActionButton
          icon={Add}
          tooltip='Clique para Adicionar um recrutador'
          onClick={() => setOpenModal(true)}
        />
      )}
      <Banner.Container>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>
            {isUserRole.SUPER_ADMIN && 'Gerenciamento de Recrutadores'}
          </Banner.Title>
          <Banner.Description>
            {isUserRole.SUPER_ADMIN &&
              'Tenha o controle total sobre a equipe de recrutadores em sua plataforma. Adicione, edite ou remova contas de recrutadores, atribua permissões e mantenha a gestão organizada e eficiente.'}
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
                <RecruiterFilters />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={8.5}>
            <RecruiterMainFilters fullWidth />

            {recruitersQuery.isLoading ? (
              <Box display='flex' flex={1} my={2}>
                <Typography
                  color='text.secondary'
                  display='flex'
                  gap={1}
                  alignItems='center'
                >
                  <CircularProgress size={18} />
                  Carregando recrutadores...
                </Typography>
              </Box>
            ) : (
              <>
                {recruitersQuery.data?.length === 0 ? (
                  <Box
                    display='flex'
                    flex={1}
                    justifyContent='center'
                    alignItems='center'
                    pb={10}
                    my={2}
                  >
                    <EmptyContent title='Nenhum recrutador' />
                  </Box>
                ) : (
                  <>
                    <Typography
                      my={2}
                      fontWeight={({ typography }) => typography.fontWeightBold}
                      variant='body2'
                      color='text.secondary'
                    >
                      {recruitersQuery?.data?.length} recrutadores(as)
                      encontrados(as)
                    </Typography>
                    <Box display='flex' flexDirection='column' gap={2}>
                      {recruitersQuery.data
                        ?.sort((a, b) => a.id - b.id)
                        .map((recruiter) => (
                          <UserProfileCard
                            key={recruiter.id}
                            user={recruiter}
                          />
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
