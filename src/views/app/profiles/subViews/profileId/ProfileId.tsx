/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'

import { Edit, LocalPhone } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  Container,
  Divider,
  Link,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material'
import { GENDER_LIST, GENDER_MINIFIED_LIST, VULNERABILITIES_LIST } from '@types'
import { differenceInYears, format } from 'date-fns'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Banner, Button, FloatingActionButton } from 'components'
import { useAuth } from 'contexts'
import { CandidateServices } from 'services'
import { openPdfInAnotherPage } from 'utils'

import * as S from './ProfileId.styles'

export default function ProfileIdPage() {
  const { profileId } = useParams()
  const { userId } = useAuth()

  const [openModal, setOpenModal] = useState(false)

  const candidateIdQuery = useQuery({
    queryKey: [`/candidates/${profileId}`, { method: 'GET' }],
    queryFn: () => CandidateServices.id.get(Number(profileId)),
  })

  const candidate = candidateIdQuery.data

  if (!candidate) return null

  const selectedVulnerabilities = VULNERABILITIES_LIST.filter((vulnerability) =>
    candidate.vulnerabilityList.includes(vulnerability.value)
  )

  const selectedGender = GENDER_MINIFIED_LIST.find(
    (gender) => candidate.gender === gender.value
  )

  return (
    <>
      {userId === Number(profileId) && (
        <FloatingActionButton
          icon={Edit}
          tooltip='Clique para editar perfil'
          onClick={() => setOpenModal(true)}
        />
      )}
      <Banner.Container isLoading={candidateIdQuery.isLoading}>
        <S.AvatarContainer>
          <S.BehindSemiCircle />
          <S.Avatar variant='circular' src={candidate.picture} />
        </S.AvatarContainer>
      </Banner.Container>
      <Container
        maxWidth='sm'
        sx={{
          pt: 12,
          pb: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          flex: 1,
          textAlign: 'center',
        }}
      >
        <Box
          display='flex'
          flexDirection='column'
          gap={1}
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <Box
            display='flex'
            flexWrap='wrap'
            gap={1}
            justifyContent='center'
            alignItems='center'
          >
            <Typography
              variant='h5'
              textAlign='center'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {candidate.fullName}
            </Typography>
            <Tooltip
              title={`Data de nascimento: ${format(
                new Date(candidate.dateOfBirth),
                'dd/MM/yyyy'
              )}`}
            >
              <Typography
                color='primary'
                component='span'
                variant='h6'
                textAlign='center'
                fontWeight={({ typography }) => typography.fontWeightBold}
              >
                {`(${differenceInYears(
                  new Date(),
                  new Date(candidate.dateOfBirth)
                )} anos)`}
              </Typography>
            </Tooltip>
          </Box>
          <Link
            href={`mailto:${candidate.email}`}
            underline='hover'
            variant='body1'
            color='text.secondary'
          >
            {candidate.email}
          </Link>
          {candidate.resume && (
            <Chip
              label='Visualizar currículo'
              color='primary'
              variant='outlined'
              onClick={() => {
                if (candidate.resume) {
                  openPdfInAnotherPage(candidate.resume, {
                    title: `Currículo - ${candidate.fullName}`,
                  })
                }
              }}
              sx={{ mt: 0.5 }}
            />
          )}
        </Box>

        <Divider orientation='horizontal' flexItem />

        <S.ContentContainer>
          <Typography
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Habilidades
          </Typography>
          <Box
            display='flex'
            gap={1}
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
          >
            {candidate.skills.map((skill) => (
              <Chip key={skill.id} label={skill.name} variant='outlined' />
            ))}
          </Box>
        </S.ContentContainer>

        <S.ContentContainer>
          <Typography
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Gênero
          </Typography>
          <Chip label={selectedGender?.label} variant='outlined' />
        </S.ContentContainer>

        <S.ContentContainer>
          <Typography
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Vulnerabilidades
          </Typography>
          <Box
            display='flex'
            gap={1}
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
          >
            {selectedVulnerabilities.map((vulnerability) => (
              <Chip
                key={vulnerability.value}
                sx={{
                  minHeight: 24,
                  height: 'auto',
                  '& .MuiChip-label': {
                    display: 'block',
                    whiteSpace: 'normal',
                    maxWidth: { xs: 180, sm: 'initial' },
                  },
                }}
                label={vulnerability.label}
                variant='outlined'
              />
            ))}
          </Box>
        </S.ContentContainer>

        <Divider orientation='horizontal' flexItem />

        <S.ContentContainer>
          {/* <Typography
            fontWeight={({ typography }) => typography.fontWeightBold}
          >
            Vulnerabilidades
          </Typography> */}
          <Box
            display='flex'
            gap={2}
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
          >
            <Button
              href={`tel:${candidate.phoneNumber}`}
              variant='outlined'
              color='primary'
              startIcon={<LocalPhone />}
              sx={{ borderRadius: 100 }}
            >
              Ligar para candidato
            </Button>
          </Box>
        </S.ContentContainer>
      </Container>
    </>
  )
}
