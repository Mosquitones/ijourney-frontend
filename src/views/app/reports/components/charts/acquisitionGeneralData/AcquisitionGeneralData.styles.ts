import { LinearProgress as MUILinearProgress } from '@mui/material'
import styled, { css } from 'styled-components'

export const LinearProgress = styled(MUILinearProgress)<{ bgColor?: string }>`
  ${({ bgColor }) =>
    bgColor &&
    css`
      .MuiLinearProgress-bar {
        border-radius: 0.8rem;
        background-color: ${bgColor};
      }

      background-color: ${bgColor}20 !important;
    `}
`
