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

import { Banner, Button, ChipList, Input, MarkdownViewer } from 'components'
import { useIsDevice } from 'hooks'

import { MARKDOWN_TEXT } from './markdown.util'

export default function DescriptionPage() {
  const isDevice = useIsDevice()

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography
          variant='h3'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          WebFlow Developer (Frontend) at EY Academy
        </Typography>
        <ChipList />
      </Box>
      <Box display='flex' flexDirection='column' gap={3}>
        <MarkdownViewer markdown={MARKDOWN_TEXT} />
      </Box>
      <Box display='flex' gap={2}>
        <Button variant='contained' color='black'>
          Aplicar para vaga
        </Button>
        <Button variant='outlined' color='black'>
          Salvar
        </Button>
        <Button variant='text' color='black'>
          Reportar
        </Button>
      </Box>
    </Box>
  )
}
