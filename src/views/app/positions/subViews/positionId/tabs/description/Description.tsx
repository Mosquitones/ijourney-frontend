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
import { useTabContext } from 'contexts'
import { useIsDevice } from 'hooks'
import { PositionTypes } from 'services'
import { getChips } from 'utils'

import { MARKDOWN_TEXT } from './markdown.util'

export default function DescriptionTab() {
  const isDevice = useIsDevice()

  const tabContext = useTabContext<PositionTypes>()

  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Box display='flex' flexDirection='column' gap={2}>
        <Typography
          variant='h3'
          fontWeight={({ typography }) => typography.fontWeightBold}
        >
          {tabContext.title}
        </Typography>
        <ChipList
          chips={getChips({
            employmentType: tabContext.employmentType,
            locationType: tabContext.locationType,
            salary: tabContext.salaryRange,
          })}
        />
      </Box>
      <Box display='flex' flexDirection='column' gap={3}>
        <MarkdownViewer markdown={tabContext.longDescription} />
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
