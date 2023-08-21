/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { PlaceOutlined, SearchOutlined } from '@mui/icons-material'
import {
  Box,
  BoxProps,
  ButtonBase,
  Container,
  Divider,
  Grid,
  InputBase,
  Paper,
  Select,
  SvgIcon,
  Typography,
  useScrollTrigger,
} from '@mui/material'

import { Banner, Button, Input } from 'components'
import { useIsDevice } from 'hooks'

import * as S from './PositionId.styles'

export default function PositionIdPage() {
  return (
    <>
      <Banner.Container>
        <Banner.Wrapper maxWidth='sm'>
          {/* <Banner.Title>Encontre o emprego dos sonhos</Banner.Title>
          <Banner.Description>
            Procurando emprego? Pesquise nossas ultimas vagas abertas e aplique
            para as melhores oportunidades ainda hoje!
          </Banner.Description> */}
        </Banner.Wrapper>
      </Banner.Container>
      <Container sx={{ py: 3 }}>
        <div>content</div>
      </Container>
    </>
  )
}
