import { LinearProgress as MUILinearProgress } from '@mui/material'
import styled, { css } from 'styled-components'

export const LinearProgress = styled(MUILinearProgress)<{ bgcolor?: string }>`
  ${({ bgcolor }) =>
    bgcolor &&
    css`
      .MuiLinearProgress-bar {
        border-radius: 0.8rem;
        background-color: ${bgcolor};
      }

      background-color: ${bgcolor}20 !important;
    `}
`
