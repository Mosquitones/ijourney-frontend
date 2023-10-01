/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  Cancel,
  PlaylistAddCheckCircle,
  Restore,
  SupervisedUserCircle,
} from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Link,
  SvgIcon,
  Typography,
} from '@mui/material'
import { COMPANY_ENUM } from '@types'
import dashboardImage from 'assets/images/app/reports/dashboard.png'
import { useQuery } from 'react-query'

import { Banner, CircularProgress as Progress } from 'components'
import { useAuth } from 'contexts'
import { useIsDevice } from 'hooks'
import { CompanyServices, RecruiterServices } from 'services'

import {
  AcquisitionGeneralDataProgressChart,
  CandidatesByGenderPieChart,
  DataContainer,
  PositionsCreatedByMonthBarChart,
} from './components'

const TABS = [
  {
    value: 'db3796c0-3c5c-4820-88c8-8acbf3fa10f8',
    label: 'Gerais',
    content: 'Gerais',
  },
  {
    value: 'c6161324-2300-436a-9017-232029190680',
    label: 'Aplicações',
    content: 'Aplicações',
    disabled: true,
  },
  {
    value: '79242fd3-c2c7-4747-bfee-780b93a91852',
    label: 'Vagas',
    content: 'Vagas',
    disabled: true,
  },
  {
    value: '3aa3e3a1-df67-4f47-82d3-b8e600b6b69c',
    label: 'Ranking',
    content: 'Ranking',
    disabled: true,
  },
]

const SimpleInfoCard: React.FC<{
  title: string
  label?: string
  icon: React.ElementType
  value: number
  progress?: number
}> = ({ icon, label = 'Quantidade total:', title, value, progress }) => {
  return (
    <DataContainer title={title}>
      <Box display='flex' alignItems='flex-end' justifyContent='space-between'>
        <Box display='flex' flexDirection='column' gap={2}>
          <Typography color='text.secondary'>{label}</Typography>
          <Box display='flex' gap={2} alignItems='center'>
            <SvgIcon
              component={icon}
              color='primary'
              fontSize='large'
              sx={{
                fontSize: 45,
              }}
            />
            <Typography
              variant='h3'
              component='span'
              fontWeight={({ typography }) => typography.fontWeightBold}
            >
              {value}
            </Typography>
          </Box>
        </Box>
        {!!progress && <Progress value={progress} color='primary' size={45} />}
      </Box>
      <Link
        underline='hover'
        sx={{ color: ({ palette }) => palette.secondary.main }}
        display='flex'
        gap={0.5}
        alignItems='center'
        mt={-0.5}
        href={undefined}
        width='min-content'
        onClick={(e) => {
          e.preventDefault()
        }}
      >
        <SvgIcon component={Restore} color='inherit' sx={{ fontSize: 18 }} />
        Histórico
      </Link>
    </DataContainer>
  )
}

const GRID_CONTAINER_PROPS = {
  spacing: 2,
} as const

export default function ReportsPage() {
  const { isUserRole, userId } = useAuth()
  const isDevice = useIsDevice()
  const [selectedTab, setSelectedTab] = useState(TABS[0].value)

  const recruiterIdReportsQuery = useQuery({
    queryKey: [`/recruiters/${userId}/reports`, { method: 'GET' }],
    queryFn: () => RecruiterServices.id.reports.get(userId),
    enabled: isUserRole.RECRUITER,
  })

  const companyIdReportsQuery = useQuery({
    queryKey: [
      `/companies/${COMPANY_ENUM.ID}/recruiters/positions/report`,
      { method: 'GET' },
    ],
    queryFn: () => CompanyServices.id.recruiters.report.get(),
    enabled: isUserRole.SUPER_ADMIN,
  })

  const data = companyIdReportsQuery.data || recruiterIdReportsQuery.data

  const isLoading =
    companyIdReportsQuery.isLoading || recruiterIdReportsQuery.isLoading

  const SIMPLE_INFO_ITEMS_LIST = [
    {
      id: 'applications',
      title: 'Aplicações',
      icon: SupervisedUserCircle,
      value: data?.totalApplications || 0,
      progress: data?.totalApplicationsPercentage || 0,
    },
    {
      id: 'selected-candidates',
      title: 'Candidatos selecionados',
      icon: PlaylistAddCheckCircle,
      value: data?.totalSelected || 0,
      progress: data?.totalSelectedPercentage || 0,
    },
    {
      id: 'rejected-candidates',
      title: 'Candidatos rejeitados',
      icon: Cancel,
      value: data?.totalRejected || 0,
      progress: data?.totalRejectedPercentage || 0,
    },
  ]

  return (
    <TabContext value={selectedTab}>
      <Banner.Container isLoading={isLoading}>
        <Banner.Wrapper maxWidth='sm'>
          <Banner.Title>
            {isUserRole.RECRUITER && 'Análise e Orientações Estratégicas'}
            {isUserRole.SUPER_ADMIN && 'Análise e Gestão Estratégica'}
          </Banner.Title>
          <Banner.Description>
            {isUserRole.RECRUITER &&
              'Acesse informações detalhadas e orientações estratégicas para aprimorar sua estratégia de recrutamento. Tome decisões fundamentadas e otimize sua busca pelos candidatos ideais.'}
            {isUserRole.SUPER_ADMIN &&
              'Tenha acesso a informações detalhadas e ferramentas de gestão estratégica para aprimorar a eficiência da sua plataforma de recrutamento. Tome decisões embasadas e otimize o processo de recrutamento.'}
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
          <Box gap={2} display='flex' alignItems='center'>
            <CircularProgress size={16} />
            <Typography color='text.secondary'>
              Carregando informações....
            </Typography>
          </Box>
        ) : (
          <Grid {...GRID_CONTAINER_PROPS} container>
            {SIMPLE_INFO_ITEMS_LIST.map((item) => (
              <Grid
                item
                xs={12}
                sm={
                  isDevice.from.sm && item.id === 'rejected-candidates' ? 12 : 6
                }
                md={4}
                key={item.id}
              >
                <SimpleInfoCard {...item} />
              </Grid>
            ))}
            <Grid {...GRID_CONTAINER_PROPS} container item xs={12}>
              <Grid {...GRID_CONTAINER_PROPS} container item xs={12} md={8}>
                <Grid item xs={12}>
                  <DataContainer title='Vagas criadas de acordo com o mês'>
                    <PositionsCreatedByMonthBarChart
                      positionsCreatedByMonth={data?.positionsCreatedByMonth}
                    />
                  </DataContainer>
                </Grid>
                <Grid {...GRID_CONTAINER_PROPS} container item xs={12}>
                  <Grid item xs={12} sm={6}>
                    <DataContainer title='Candidatos'>
                      <AcquisitionGeneralDataProgressChart
                        application={{
                          percentage: data?.totalApplicationsPercentage,
                          total: data?.totalApplications,
                        }}
                        hired={{
                          percentage: data?.totalSelectedPercentage,
                          total: data?.totalSelected,
                        }}
                        pending={{
                          percentage: data?.totalRejectedPercentage,
                          total: data?.totalRejected,
                        }}
                        rejected={{
                          percentage: data?.totalRejectedPercentage,
                          total: data?.totalRejected,
                        }}
                        selected={{
                          percentage: data?.totalSelectedPercentage,
                          total: data?.totalSelected,
                        }}
                      />
                    </DataContainer>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DataContainer title='Candidatos p/ gênero'>
                      <CandidatesByGenderPieChart
                        totalFeminineGender={data?.totalFeminineGender}
                        totalMasculineGender={data?.totalMasculineGender}
                        totalOtherGender={data?.totalOtherGender}
                      />
                    </DataContainer>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4}>
                <DataContainer title='Top ranking'>
                  {data?.candidates
                    .sort((a, b) => b.totalPoints - a.totalPoints)
                    .map((candidate) => (
                      <Box
                        key={candidate.name + crypto.randomUUID()}
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                      >
                        <Typography color='text.secondary'>
                          {candidate.name}
                        </Typography>
                        <Typography
                          color='primary'
                          fontWeight={({ typography }) =>
                            typography.fontWeightBold
                          }
                        >
                          {candidate.totalPoints}
                        </Typography>
                      </Box>
                    ))}
                </DataContainer>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
    </TabContext>
  )
}
