/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import { Add } from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Avatar,
  Box,
  BoxProps,
  ButtonBase,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Select,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { useMutation, useQuery } from 'react-query'

import {
  Banner,
  Button,
  EmptyContent,
  FloatingActionButton,
  Input,
} from 'components'
import { useAuth, useFeedback } from 'contexts'
import { useIsDevice, useMentors, useSkills } from 'hooks'
import { CourseServices, CourseTypes } from 'services'

import { MainFilters } from '../positions/components'

import { CourseCard, CourseModalHandler } from './components'

const TABS = [
  {
    value: 'db3796c0-3c5c-4820-88c8-8acbf3fa10f8',
    label: 'Gerais',
    content: 'Gerais',
  },
  {
    value: 'c6161324-2300-436a-9017-232029190680',
    label: 'Front-end',
    content: 'Front-end',
    disabled: true,
  },
  {
    value: '79242fd3-c2c7-4747-bfee-780b93a91852',
    label: 'Back-end',
    content: 'Back-end',
    disabled: true,
  },
  {
    value: '3aa3e3a1-df67-4f47-82d3-b8e600b6b69c',
    label: 'Marketing',
    content: 'Marketing',
    disabled: true,
  },
]

export default function CoursesPage() {
  const { isUserRole } = useAuth()

  const { alert } = useFeedback()
  const [selectedCourse, setSelectedCourse] = useState<CourseTypes | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState(TABS[0].value)

  const skillsQuery = useSkills({
    enabled: isUserRole.SUPER_ADMIN,
  })

  const mentorsQuery = useMentors({
    enabled: isUserRole.SUPER_ADMIN,
  })

  const coursesQuery = useQuery({
    queryKey: ['/courses', { method: 'GET' }],
    queryFn: () => CourseServices.get(),
  })

  const isLoading =
    skillsQuery.isLoading || mentorsQuery.isLoading || coursesQuery.isLoading

  const isDevice = useIsDevice()

  return (
    <>
      {isUserRole.SUPER_ADMIN && (
        <FloatingActionButton
          icon={Add}
          tooltip='Clique para Adicionar um curso'
          onClick={() => setOpenModal(true)}
        />
      )}
      <TabContext value={selectedTab}>
        <Banner.Container isLoading={isLoading}>
          <Banner.Wrapper maxWidth='sm'>
            <Banner.Title>Se profissionalize com nossos cursos</Banner.Title>
            <Banner.Description>
              Procurando o curso perfeito? Pesquise nossas ultimas cursos
              lançados e fique a frente dos seus demais concorrentes!
            </Banner.Description>
          </Banner.Wrapper>
          <Banner.Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
          >
            {TABS.map((tab) => (
              <Banner.Tab key={tab.value} {...tab} />
            ))}
          </Banner.Tabs>
        </Banner.Container>
        <Container
          sx={{
            py: 4,
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            flex: 1,
          }}
        >
          {isLoading ? (
            <Box
              display='flex'
              flex={1}
              justifyContent='center'
              alignItems='center'
            >
              <Typography
                color='text.secondary'
                display='flex'
                gap={1}
                alignItems='center'
              >
                <CircularProgress size={18} />
                Carregando cursos...
              </Typography>
            </Box>
          ) : (
            <>
              {coursesQuery.data?.length === 0 ? (
                <Box
                  display='flex'
                  flex={1}
                  justifyContent='center'
                  alignItems='center'
                  pb={10}
                >
                  <EmptyContent title='Nenhum curso encontrado' />
                </Box>
              ) : (
                <>
                  <Box
                    display='flex'
                    flexDirection='row'
                    alignItems='center'
                    justifyContent='space-between'
                  >
                    {isDevice.from.sm && (
                      <Typography
                        fontWeight={({ typography }) =>
                          typography.fontWeightBold
                        }
                        variant='h4'
                      >
                        Cursos
                      </Typography>
                    )}
                    <MainFilters hideLocationFilters />
                  </Box>
                  <Grid container spacing={2}>
                    {coursesQuery.data
                      ?.sort((a, b) => b.id - a.id)
                      .map((course) => (
                        <Grid item key={course.id} xs={12} sm={6} md={4}>
                          <CourseCard
                            onClick={() => setSelectedCourse(course)}
                            course={course}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </>
              )}
            </>
          )}
        </Container>
      </TabContext>
      {isUserRole.SUPER_ADMIN && (
        <CourseModalHandler
          key={selectedCourse?.id}
          skills={skillsQuery.data || []}
          mentors={mentorsQuery.data || []}
          course={selectedCourse || undefined}
          open={Boolean(selectedCourse) || openModal}
          refetchCourses={coursesQuery.refetch}
          onClose={() => {
            setSelectedCourse(null)
            setOpenModal(false)
          }}
        />
      )}
    </>
  )
}
