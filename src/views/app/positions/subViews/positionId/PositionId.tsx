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
import { useMutation } from 'react-query'

import { Banner, Button, Input } from 'components'
import { useAuth } from 'contexts'
import { useIsDevice } from 'hooks'
import { ROLES } from 'services'

import CandidatesPage from './tabs/candidates/Candidates'
import DescriptionPage from './tabs/description/Description'
import { getTabsBasedOnRole } from './utils/getTabBasedOnRole'

export default function PositionIdPage() {
  const { user } = useAuth()
  const tabs = getTabsBasedOnRole(user?.userType)

  // const positionIdQuery = useMutation(() => {}, {
  //   onSuccess: () => {},
  // })

  const [selectedTab, setSelectedTab] = useState(tabs[0].value)

  const isDevice = useIsDevice()

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
            {tabs.map((tab) => (
              <Banner.Tab key={tab.value} {...tab} />
            ))}
          </Banner.Tabs>
        </Banner.Container>
        <Container sx={{ py: 6 }}>
          {tabs.map((tab) => (
            <TabPanel key={tab.value} value={tab.value}>
              {tab.content}
            </TabPanel>
          ))}
        </Container>
      </TabContext>
    </>
  )
}
