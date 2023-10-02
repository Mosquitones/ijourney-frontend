/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react'

import { Edit, LocalPhone, Person } from '@mui/icons-material'
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
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
import { CandidateServices, UserServices } from 'services'
import { openPdfInAnotherPage } from 'utils'

import * as S from './ProfileId.styles'

export default function ProfileIdPage() {
  const { profileId } = useParams()
  const { userId, isUserRole } = useAuth()

  const [openModal, setOpenModal] = useState(false)

  const userIdQuery = useQuery({
    queryKey: [`/users/${userId}`, { method: 'GET' }],
    queryFn: () => UserServices.id.get(userId),
  })

  const user = userIdQuery.data

  const selectedVulnerabilities = VULNERABILITIES_LIST.filter((vulnerability) =>
    user?.vulnerabilityList?.includes(vulnerability.value)
  )

  const selectedGender = GENDER_MINIFIED_LIST.find(
    (gender) => user?.gender === gender.value
  )

  return (
    <>
      {userId === Number(profileId) && !userIdQuery.isLoading && (
        <FloatingActionButton
          icon={Edit}
          tooltip='Clique para editar perfil'
          onClick={() => setOpenModal(true)}
        />
      )}
      <Banner.Container isLoading={userIdQuery.isLoading}>
        <S.AvatarContainer>
          <S.BehindSemiCircle />
          <S.Avatar variant='circular' src={user?.picture}>
            {userIdQuery.isLoading ? (
              <CircularProgress color='inherit' size={60} />
            ) : null}
          </S.Avatar>
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
        {user && (
          <>
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
                {user.fullName && (
                  <Typography
                    variant='h5'
                    textAlign='center'
                    fontWeight={({ typography }) => typography.fontWeightBold}
                  >
                    {user.fullName}
                  </Typography>
                )}
                {user.dateOfBirth && (
                  <Tooltip
                    title={`Data de nascimento: ${format(
                      new Date(user.dateOfBirth),
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
                        new Date(user.dateOfBirth)
                      )} anos)`}
                    </Typography>
                  </Tooltip>
                )}
              </Box>
              {user.email && (
                <Link
                  href={`mailto:${user.email}`}
                  underline='hover'
                  variant='body1'
                  color='text.secondary'
                >
                  {user.email}
                </Link>
              )}
              {user.resume && (
                <Chip
                  label='Visualizar currículo'
                  color='primary'
                  variant='outlined'
                  onClick={() => {
                    if (user.resume) {
                      openPdfInAnotherPage(user.resume, {
                        title: `Currículo - ${user.fullName}`,
                      })
                    }
                  }}
                  sx={{ mt: 0.5 }}
                />
              )}
            </Box>

            {(!!user.skills?.length ||
              selectedGender ||
              !!selectedVulnerabilities?.length) && (
              <Divider orientation='horizontal' flexItem />
            )}

            {user.skills?.length > 0 && (
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
                  {user.skills
                    ?.sort((a, b) => a.id - b.id)
                    ?.map((skill) => (
                      <Chip
                        key={skill.id}
                        label={skill.name}
                        variant='outlined'
                      />
                    ))}
                </Box>
              </S.ContentContainer>
            )}

            {selectedGender && (
              <S.ContentContainer>
                <Typography
                  fontWeight={({ typography }) => typography.fontWeightBold}
                >
                  Gênero
                </Typography>
                <Chip label={selectedGender.label} variant='outlined' />
              </S.ContentContainer>
            )}

            {selectedVulnerabilities?.length > 0 && (
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
            )}

            <Divider orientation='horizontal' flexItem />

            <S.ContentContainer>
              <Box
                display='flex'
                gap={2}
                flexWrap='wrap'
                alignItems='center'
                justifyContent='center'
              >
                <Button
                  href={`tel:${user.phoneNumber}`}
                  variant='outlined'
                  color='primary'
                  startIcon={<LocalPhone />}
                  sx={{ borderRadius: 100 }}
                >
                  Ligar {isUserRole.CANDIDATE && 'para candidato'}
                </Button>
              </Box>
            </S.ContentContainer>
          </>
        )}
      </Container>
    </>
  )
}
