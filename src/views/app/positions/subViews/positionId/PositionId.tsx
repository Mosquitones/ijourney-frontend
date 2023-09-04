/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  BusinessCenter,
  InboxOutlined,
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
import { useParams } from 'react-router-dom'

import { Banner, EmptyContent } from 'components'
import { TabContextWrapper, useAuth } from 'contexts'
import { useIsDevice } from 'hooks'
import { PositionServices } from 'services'

import { getTabsBasedOnRole } from './utils/getTabBasedOnRole'

const NotFoundPosition: React.FC = () => (
  <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
    <EmptyContent boxProps={{ mb: 3 }} />
  </Box>
)

export default function PositionIdPage() {
  const { user } = useAuth()
  const { positionId } = useParams()
  const tabs = getTabsBasedOnRole(user?.userType)

  const positionIdQuery = useMutation({
    mutationKey: [`/positions/${positionId}`, { method: 'GET' }],
    mutationFn: () => PositionServices.findById(String(positionId)),
  })

  if (positionIdQuery.isLoading) return <div>Loading....</div>
  // if (!positionIdQuery.data) return <NotFoundPosition />

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
                    {positionIdQuery.data?.title}
                  </Typography>
                  {isDevice.from.sm && (
                    <Divider orientation='vertical' flexItem />
                  )}
                  <Typography variant='body2' color='text.secondary'>
                    {positionIdQuery.data?.companyName}
                  </Typography>
                </Box>

                <Typography variant='body2' color='text.secondary'>
                  {positionIdQuery.data?.shortDescription}
                </Typography>
              </Box>
            </Box>
          </Banner.Wrapper>
          <Banner.Tabs
            value={selectedTab}
            onChange={(_, newValue) => setSelectedTab(newValue)}
          >
            {tabs.map((tab) => (
              <Banner.Tab key={tab.value} {...tab} />
            ))}
          </Banner.Tabs>
        </Banner.Container>
        <Container sx={{ py: 6 }}>
          <TabContextWrapper value={positionIdQuery.data}>
            {tabs.map((tab) => (
              <TabPanel key={tab.value} value={tab.value}>
                {tab.content}
              </TabPanel>
            ))}
          </TabContextWrapper>
        </Container>
      </TabContext>
    </>
  )
}
