/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { PlaceOutlined, SearchOutlined } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  ButtonBase,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Select,
  SvgIcon,
  Typography,
} from '@mui/material'

import { Banner, Button, Input } from 'components'
import { useIsDevice } from 'hooks'

import { AdditionalFilters, MainFilters } from './components'
import * as S from './Positions.styles'

const DEFAULT_PADDINGS: Partial<BoxProps> = {
  py: 2,
  px: 3,
}

export default function PositionsPage() {
  const isDevice = useIsDevice()

  return (
    <S.Page>
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
            <MainFilters />
            <Typography
              my={2}
              fontWeight={({ typography }) => typography.fontWeightBold}
              variant='body2'
              color='text.secondary'
            >
              22 Oportunidades encontradas
            </Typography>
            {/* {[...Array(10)].map((_, i) => (
              
            ))} */}
          </Grid>
        </Grid>
      </Container>
    </S.Page>
  )
}
