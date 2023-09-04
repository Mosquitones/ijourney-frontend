/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react'

import {
  BusinessCenter,
  ExpandMore,
  KeyboardBackspaceOutlined,
  PlaceOutlined,
  SearchOutlined,
} from '@mui/icons-material'
import { TabContext, TabPanel } from '@mui/lab'
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
  Divider,
  Link,
} from '@mui/material'
import { CircularProgress } from 'components/circularProgress/CircularProgress'

import { Banner, Button, Input, Position } from 'components'
import { useIsDevice } from 'hooks'
import { ROUTES } from 'router'

import * as S from './PositionAccordion.styles'

export const PositionAccordion: React.FC = () => {
  return (
    <S.Accordion disableGutters TransitionProps={{ unmountOnExit: true }}>
      <S.AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          flex={1}
          pr={2}
        >
          <Position.Header
            title='aaaaaaa'
            chips={[{ color: 'default', variant: 'filled', label: 'aaaa' }]}
          />
          <CircularProgress value={60} />
        </Box>
      </S.AccordionSummary>
      <S.AccordionDetails>
        <S.ItemContainer>
          <Position.Status />
        </S.ItemContainer>
        <Divider />
        <S.ItemContainer>
          <Position.Score
            header={{
              endAdornment: (
                <Link
                  sx={{
                    color: ({ palette }) => palette.info.main,
                    textDecorationColor: ({ palette }) => palette.info.main,
                  }}
                  href={`${crypto.randomUUID()}/${ROUTES.CLASSIFICATION}`}
                >
                  Consultar tabela de classificação
                </Link>
              ),
            }}
          />
        </S.ItemContainer>

        <Divider />
        <S.ItemContainer>
          <Position.Details />
        </S.ItemContainer>
        <Divider />
        <Box display='flex' alignItems='center' gap={2} py={2} px={3}>
          <Button variant='contained' color='black'>
            Enviar Sugestão
          </Button>
          <Button variant='outlined' color='black'>
            Enviar reclamação
          </Button>
          <Button variant='text' color='black'>
            Deixar aplicação
          </Button>
        </Box>
      </S.AccordionDetails>
    </S.Accordion>
  )
}
