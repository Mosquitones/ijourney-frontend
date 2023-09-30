/* eslint-disable @typescript-eslint/no-unused-vars */
import { Chip } from '@mui/material'
import { PHASE_STATUS_TYPE_ENUM } from '@types'
import styled, { css } from 'styled-components'

import { PhaseStatusIndicatorPropTypes as StatusIndicatorPropTypes } from './PhaseStatusIndicator.types'

export const StatusIndicatorStyles = styled(Chip)<StatusIndicatorPropTypes>`
  --color: initial;

  color: var(--color) !important;
  border-color: var(--color) !important;
  background-color: ${({ theme }) => theme.palette.common.white} !important;

  span {
    font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  }

  ${({ phaseStatusType }) => {
    if (phaseStatusType === PHASE_STATUS_TYPE_ENUM.SELECTED) {
      return css`
        --color: ${({ theme }) => theme.palette.info[500]};
      `
    }
    if (phaseStatusType === PHASE_STATUS_TYPE_ENUM.PENDING) {
      return css`
        --color: ${({ theme }) => theme.palette.warning[600]};
      `
    }
    if (phaseStatusType === PHASE_STATUS_TYPE_ENUM.HIRED) {
      return css`
        --color: ${({ theme }) => theme.palette.success[900]};
      `
    }
    return ''
  }}
`
