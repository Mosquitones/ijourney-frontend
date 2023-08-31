/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef } from 'react'

import { Add } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  ButtonBase,
  Container,
  Divider,
  Fab,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'

import { Banner, Button, FloatingActionButton } from 'components'
import { useAuth } from 'contexts'
import { useIsDevice } from 'hooks'

import { AdditionalFilters, MainFilters, PositionCard } from './components'

const DEFAULT_PADDINGS: Partial<BoxProps> = {
  py: 2,
  px: 3,
}

export default function PositionsPage() {
  const isDevice = useIsDevice()
  const { isUserRole } = useAuth()

  return (
    <>
      {!isUserRole.candidate && (
        <FloatingActionButton
          icon={Add}
          tooltip='Clique para Adicionar uma vaga'
        />
      )}
      <Banner.Container>
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
            <Paper
              sx={{
                position: 'sticky',
                top: '1.5rem',
                transition: 'all 0.3s ease-in-out',
              }}
            >
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
              22 Oportunidades encontradas
            </Typography>
            <Box display='flex' flexDirection='column' gap={2}>
              {[...Array(20)].map((_, i) => {
                const key = crypto.randomUUID()

                return <PositionCard key={key} href={key} />
              })}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export * from './components'
export * from './subViews'
