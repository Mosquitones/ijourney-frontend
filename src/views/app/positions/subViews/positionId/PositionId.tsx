/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'

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
  Skeleton,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
  useScrollTrigger,
} from '@mui/material'
import { useQuery } from 'react-query'
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

  const positionIdQuery = useQuery({
    queryKey: [`/positions/${positionId}`, { method: 'GET' }],
    queryFn: () => PositionServices.findById(String(positionId)),
  })

  const [selectedTab, setSelectedTab] = useState(tabs[0].value)

  const isDevice = useIsDevice()

  if (
    !positionIdQuery.isLoading &&
    !positionIdQuery.data &&
    Boolean((positionIdQuery.error as any).response.status !== 200)
  ) {
    return <NotFoundPosition />
  }

  return (
    <>
      <TabContext value={selectedTab}>
        <Banner.Container isLoading={positionIdQuery.isLoading}>
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
                  {positionIdQuery.isLoading ? (
                    <Skeleton variant='text' width={200} />
                  ) : (
                    <Typography
                      variant='body1'
                      fontWeight={({ typography }) => typography.fontWeightBold}
                    >
                      {positionIdQuery.data?.title}
                    </Typography>
                  )}
                  {isDevice.from.sm && (
                    <Divider orientation='vertical' flexItem />
                  )}

                  {positionIdQuery.isLoading ? (
                    <Skeleton variant='text' width={100} />
                  ) : (
                    <Typography variant='body2' color='text.secondary'>
                      {positionIdQuery.data?.companyName}
                    </Typography>
                  )}
                </Box>

                {positionIdQuery.isLoading ? (
                  <Skeleton variant='text' width={300} />
                ) : (
                  <Typography variant='body2' color='text.secondary'>
                    {positionIdQuery.data?.shortDescription}
                  </Typography>
                )}
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
          {positionIdQuery.data && (
            <TabContextWrapper value={positionIdQuery.data}>
              {tabs.map((tab) => (
                <TabPanel key={tab.value} value={tab.value}>
                  {tab.content}
                </TabPanel>
              ))}
            </TabContextWrapper>
          )}
        </Container>
      </TabContext>
    </>
  )
}
