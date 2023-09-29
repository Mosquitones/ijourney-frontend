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

import { Banner, Button, FloatingActionButton, Input } from 'components'
import { useAuth } from 'contexts'
import { useIsDevice } from 'hooks'

import { MainFilters } from '../positions/components'

import { CourseCard } from './components'

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
  const [openModal, setOpenModal] = useState(false)
  const [selectedTab, setSelectedTab] = useState(TABS[0].value)

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
        <Banner.Container>
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
          sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 4 }}
        >
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            justifyContent='space-between'
          >
            {isDevice.from.sm && (
              <Typography
                fontWeight={({ typography }) => typography.fontWeightBold}
                variant='h4'
              >
                Cursos
              </Typography>
            )}
            <MainFilters hideLocationFilters />
          </Box>
          {TABS.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              <Grid container columnSpacing={2} rowSpacing={6}>
                {[...Array(10)].map((_, index) => {
                  const key = crypto.randomUUID()

                  return (
                    <Grid item key={key} xs={12} sm={6} md={4}>
                      <CourseCard href={key} />
                    </Grid>
                  )
                })}
              </Grid>
            </TabPanel>
          ))}
        </Container>
      </TabContext>
    </>
  )
}
