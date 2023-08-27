import { Chip as MUIChip } from '@mui/material'
import styled from 'styled-components'

export const Chip = styled(MUIChip)<{ currentHexColor: string }>`
  background-color: ${({ currentHexColor }) => currentHexColor}20 !important;
  padding: 0.4rem 0.8rem !important;
  color: ${({ currentHexColor }) => currentHexColor} !important;
`
