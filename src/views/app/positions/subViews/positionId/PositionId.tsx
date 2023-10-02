/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
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
import { AxiosError } from 'axios'
import { useMutation, useQuery } from 'react-query'
import { useParams } from 'react-router-dom'

import { Banner, EmptyContent, PositionAvatarIcon } from 'components'
import { TabContextWrapper, useAuth, useFeedback } from 'contexts'
import { useIsDevice, useParamsSelector } from 'hooks'
import { ApiResponseTypes, CandidateServices, PositionServices } from 'services'

import { getTabsBasedOnRole } from './utils/getTabBasedOnRole'

const NotFoundPosition: React.FC = () => (
  <Box flex={1} display='flex' justifyContent='center' alignItems='center'>
    <EmptyContent boxProps={{ mb: 3 }} />
  </Box>
)

export default function PositionIdPage() {
  const { user } = useAuth()
  const { alert } = useFeedback()
  const { positionId } = useParams()
  const tabs = getTabsBasedOnRole(user?.userType)

  const params = useParamsSelector<'tab'>()

  const positionIdQuery = useQuery({
    queryKey: [`/positions/${positionId}`, { method: 'GET' }],
    queryFn: () => PositionServices.findById(String(positionId)),
  })

  const selectedTabId = params.get('tab') || tabs[0].id

  const isDevice = useIsDevice()

  return (
    <>
      <TabContext value={selectedTabId}>
        <Banner.Container isLoading={positionIdQuery.isLoading}>
          <Banner.Wrapper maxWidth='sm' renderBackButton>
            <Box
              display='flex'
              alignItems={{ sm: 'center' }}
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={3}
            >
              <PositionAvatarIcon
                isLoading={positionIdQuery.isLoading}
                positionId={Number(positionId)}
                positionTitle={String(positionIdQuery.data?.title)}
              />

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
            value={selectedTabId}
            onChange={(_, value) => params.add({ key: 'tab', value })}
          >
            {tabs.map((tab) => (
              <Banner.Tab {...tab} value={tab.id} key={tab.id} />
            ))}
          </Banner.Tabs>
        </Banner.Container>
        <Container sx={{ py: 6 }}>
          {positionIdQuery.data && (
            <TabContextWrapper value={positionIdQuery.data}>
              {tabs.map((tab) => (
                <TabPanel key={tab.id} value={tab.id}>
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

export * from './tabs'
export * from './utils/getTabBasedOnRole'
