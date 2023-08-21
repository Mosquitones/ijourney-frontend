/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  BusinessCenter,
  KeyboardBackspaceOutlined,
  PlaceOutlined,
  SearchOutlined,
} from '@mui/icons-material'
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

import { Banner, Button, Input } from 'components'
import { useIsDevice } from 'hooks'

import { MainFilters } from '../positions/components'

import { CourseCard } from './components'

export default function CoursesPage() {
  const [selectedTab, setSelectedTab] = useState(String(0))

  const isDevice = useIsDevice()

  const TABS = [
    {
      value: String(0),
      label: 'Gerais',
      content: 'Gerais',
    },
    {
      value: String(1),
      label: 'Front-end',
      content: 'Front-end',
      disabled: true,
    },
    {
      value: String(2),
      label: 'Back-end',
      content: 'Back-end',
      disabled: true,
    },
    {
      value: String(3),
      label: 'Marketing',
      content: 'Marketing',
      disabled: true,
    },
  ]
  return (
    <>
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
            aria-label='scrollable force tabs example'
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
              {/* {tab.content} */}
            </TabPanel>
          ))}
        </Container>
      </TabContext>
    </>
  )
}
