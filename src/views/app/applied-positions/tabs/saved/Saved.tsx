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
import { createColumnHelper } from '@tanstack/react-table'
import { useQuery } from 'react-query'

import {
  Banner,
  Button,
  ChipList,
  DisplayHeaderComponent,
  Input,
  MarkdownViewer,
  TableComponent,
} from 'components'
import { useAuth } from 'contexts'
import { useIsDevice } from 'hooks'
import {
  CandidatePositionTypes,
  CandidateServices,
  PositionTypes,
} from 'services'

import { PositionTabTemplate } from '../../components'

export default function SavedTab() {
  const { userId } = useAuth()

  const positionsQuery = useQuery({
    queryKey: [`/candidates/${userId}/positions/saved`, { method: 'GET' }],
    queryFn: () => CandidateServices.id.positions.saved.get(userId),
  })

  return <PositionTabTemplate positions={positionsQuery.data} variant='saved' />
}
