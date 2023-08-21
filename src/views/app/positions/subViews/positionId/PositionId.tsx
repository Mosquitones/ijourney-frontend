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

export default function PositionIdPage() {
  const [selectedTab, setSelectedTab] = useState(String(0))

  const isDevice = useIsDevice()

  const TABS = [
    {
      value: String(0),
      label: 'Descrição',
      content: 'Descrição',
    },
    {
      value: String(1),
      label: 'Pessoas',
      content: 'Pessoas',
      disabled: true,
    },
    {
      value: String(2),
      label: 'Cultura e Beneficios',
      content: 'Cultura e Beneficios',
      disabled: true,
    },
  ]
  return (
    <>
      <TabContext value={selectedTab}>
        <Banner.Container>
          <Banner.Wrapper maxWidth='sm' renderBackButton>
            <Box
              display='flex'
              alignItems={{ sm: 'center' }}
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={3}
            >
              <Avatar
                sx={{
                  bgcolor: ({ palette }) => palette.primary.main,
                  width: 54,
                  height: 54,
                }}
                variant='rounded'
              >
                <BusinessCenter />
              </Avatar>
              <Box display='flex' flexDirection='column' gap={1}>
                <Box
                  display='flex'
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  gap={1}
                  alignItems={{ sm: 'center' }}
                >
                  <Typography
                    variant='body1'
                    fontWeight={({ typography }) => typography.fontWeightBold}
                  >
                    WebFlow Developer (Frontend)
                  </Typography>
                  {isDevice.from.sm && (
                    <Divider orientation='vertical' flexItem />
                  )}
                  <Typography variant='body2' color='text.secondary'>
                    Company name
                  </Typography>
                </Box>

                <Typography variant='body2' color='text.secondary'>
                  Descrição do projeto - Lorem ipsum dolor sit amet, consetetur
                  sadipscing elitr, sed diamr
                </Typography>
              </Box>
            </Box>
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
        <Container sx={{ py: 3 }}>
          {TABS.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              {tab.content}
            </TabPanel>
          ))}
        </Container>
      </TabContext>
    </>
  )
}
