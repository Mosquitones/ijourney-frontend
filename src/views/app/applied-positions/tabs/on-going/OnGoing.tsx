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

import {
  Banner,
  Button,
  ChipList,
  DisplayHeaderComponent,
  Input,
  MarkdownViewer,
  TableComponent,
} from 'components'
import { useIsDevice } from 'hooks'

import { PositionAccordion } from '../../components'

export default function OnGoingTab() {
  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
        color='text.secondary'
      >
        22 Aplicações encontradas
      </Typography>

      <Box display='flex' flexDirection='column' gap={2}>
        {[...Array(3)].map((_, i) => (
          <PositionAccordion key={crypto.randomUUID() + i} />
        ))}
      </Box>
    </Box>
  )
}
