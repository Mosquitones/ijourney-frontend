/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import { Avatar, Typography, Divider, Container, Box } from '@mui/material'
import { useCandidateColumns } from 'common/hooks'
import { useCandidateMockData } from 'common/hooks/candidate/useCandidateMockData'

import { Banner, TableComponent } from 'components'

export default function ClassificationPage() {
  const columns = useCandidateColumns()
  const data = useCandidateMockData()

  return (
    <>
      <Banner.Container>
        <Banner.Wrapper maxWidth='sm' renderBackButton>
          <Banner.Title>Tabela de classificação</Banner.Title>
          <Banner.Description>Descrição?</Banner.Description>
        </Banner.Wrapper>
      </Banner.Container>
      <Container
        sx={{ py: 6, display: 'flex', flexDirection: 'column', gap: 6 }}
      >
        <Box display='flex' flexDirection='column' gap={4}>
          <Typography
            variant='body1'
            fontWeight={({ typography }) => typography.fontWeightBold}
            color='text.secondary'
          >
            Suas estatísticas
          </Typography>

          <TableComponent
            columns={columns}
            data={[data[0]]}
            focused
            color='primary'
          />
        </Box>
        <Box display='flex' flexDirection='column' gap={4}>
          <Typography
            variant='body1'
            display='flex'
            alignItems='center'
            gap={0.8}
            fontWeight={({ typography }) => typography.fontWeightBold}
            color='text.secondary'
          >
            Estatísticas do
            <Typography
              variant='body1'
              component='span'
              fontWeight={({ typography }) => typography.fontWeightBold}
              color='primary'
            >
              #TOP10
            </Typography>
          </Typography>

          <TableComponent
            columns={columns}
            data={[...data, ...data, data[2], data[3]]}
          />
        </Box>
      </Container>
    </>
  )
}
