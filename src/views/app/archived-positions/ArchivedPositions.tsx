/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

import { BusinessCenter } from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import { Avatar, Typography, Divider, Container, Box } from '@mui/material'
import { useQuery } from 'react-query'

import { Banner } from 'components'
import { useAuth } from 'contexts'
import { useParamsSelector } from 'hooks'
import { ROUTES } from 'router'
import {
  CandidateServices,
  PositionTypes,
  RecruiterServices,
  SkillServices,
} from 'services'

import { PositionTabTemplate } from '../applied-positions/components'
import { PositionCard, PositionModalHandler } from '../positions/components'

export default function ArchivedPositionsPage() {
  const { userId } = useAuth()

  const skillsQuery = useQuery({
    queryKey: ['/skills', { method: 'GET' }],
    queryFn: SkillServices.findAll,
  })

  const [selectedPosition, setSelectedPosition] =
    useState<PositionTypes | null>(null)
  const [openModal, setOpenModal] = useState(false)

  const archivedPositionsQuery = useQuery({
    queryKey: [`/recruiters/${userId}/positions/archived`, { method: 'GET' }],
    queryFn: () => RecruiterServices.id.positions.archived.get(userId),
  })

  return (
    <>
      <Banner.Container isLoading={archivedPositionsQuery.isLoading}>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>Vagas arquivadas</Banner.Title>
          <Banner.Description>
            Mantenha um registro organizado das vagas que foram arquivadas.
            Tenha a flexibilidade de revisitar oportunidades passadas e reativar
            vagas quando necessário, simplificando seu processo de recrutamento
          </Banner.Description>
        </Banner.Wrapper>
      </Banner.Container>
      <Container sx={{ py: 6 }}>
        <Box display='flex' flexDirection='column' gap={4}>
          <Typography
            variant='body1'
            fontWeight={({ typography }) => typography.fontWeightBold}
            color='text.secondary'
          >
            {archivedPositionsQuery.isLoading
              ? 'Carregando vagas arquivadas...'
              : archivedPositionsQuery.data?.length &&
                archivedPositionsQuery.data.length >= 0
              ? `${archivedPositionsQuery.data.length} vagas arquivadas encontrada(s)`
              : 'Nenhuma vaga foi arquivada'}
          </Typography>

          <Box display='flex' flexDirection='column' gap={2}>
            {archivedPositionsQuery.data
              ?.sort((a, b) => b.id - a.id)
              ?.map((position) => (
                <PositionCard
                  key={position.id}
                  isArchived
                  href={`/${ROUTES.APP}/${ROUTES.POSITIONS}/${position.id}`}
                  onEditClick={() => setSelectedPosition(position)}
                  position={position}
                />
              ))}
          </Box>
        </Box>
      </Container>
      <PositionModalHandler
        key={selectedPosition?.id}
        skills={skillsQuery.data || []}
        position={selectedPosition || undefined}
        open={Boolean(selectedPosition) || openModal}
        onClose={() => {
          setSelectedPosition(null)
          setOpenModal(false)
        }}
      />
    </>
  )
}
