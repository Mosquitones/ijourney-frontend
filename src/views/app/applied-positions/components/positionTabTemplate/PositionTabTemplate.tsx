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
  CandidateServices,
  PositionTypes,
  CandidatePositionTypes,
} from 'services'

import { PositionAccordion, PositionAccordionSaved } from '..'

import { PositionTabTemplatePropTypes } from './PositionTabTemplate.types'

export const PositionTabTemplate: React.FC<PositionTabTemplatePropTypes> = ({
  positions = [],
  variant = 'default',
}) => {
  return (
    <Box display='flex' flexDirection='column' gap={4}>
      <Typography
        variant='body1'
        fontWeight={({ typography }) => typography.fontWeightBold}
        color='text.secondary'
      >
        {positions.length} Aplicações encontradas
      </Typography>

      <Box display='flex' flexDirection='column' gap={2}>
        {positions.map((position) => {
          if (variant === 'saved') {
            return (
              <PositionAccordionSaved
                key={position.id}
                position={position as PositionTypes}
              />
            )
          }

          return (
            <PositionAccordion
              key={position.id}
              position={position as CandidatePositionTypes}
            />
          )
        })}
      </Box>
    </Box>
  )
}
