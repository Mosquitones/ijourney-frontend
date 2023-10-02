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
  CircularProgress,
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
  EmptyContent,
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

import {
  PositionAccordion,
  PositionArchivedAccordion,
  PositionSavedAccordion,
} from '..'

import { PositionTabTemplatePropTypes } from './PositionTabTemplate.types'

export const PositionTabTemplate: React.FC<PositionTabTemplatePropTypes> = ({
  positions = [],
  isLoading,
  variant = 'default',
}) => {
  return (
    <Container
      sx={{
        py: 6,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isLoading ? (
        <Box
          display='flex'
          flex={1}
          justifyContent='center'
          alignItems='center'
        >
          <Typography
            color='text.secondary'
            display='flex'
            gap={1}
            alignItems='center'
          >
            <CircularProgress size={18} />
            Carregando vagas...
          </Typography>
        </Box>
      ) : positions.length === 0 ? (
        <Box
          display='flex'
          flex={1}
          justifyContent='center'
          alignItems='center'
        >
          <EmptyContent title='Nenhuma vaga encontrada' />
        </Box>
      ) : (
        <Box display='flex' flexDirection='column' gap={4} flex={1}>
          <Typography
            variant='body1'
            fontWeight={({ typography }) => typography.fontWeightBold}
            color='text.secondary'
          >
            {positions.length} vaga(s) encontrada(s)
          </Typography>

          <Box display='flex' flexDirection='column' gap={2}>
            {positions
              ?.sort((a, b) => a.id - b.id)
              .map((position) => {
                if (variant === 'saved') {
                  return (
                    <PositionSavedAccordion
                      key={position.id}
                      position={position as PositionTypes}
                    />
                  )
                }

                if (variant === 'archived') {
                  return (
                    <PositionArchivedAccordion
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
      )}
    </Container>
  )
}
