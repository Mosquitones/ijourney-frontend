import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
  AccordionDetails as MUIAccordionDetails,
  Box,
} from '@mui/material'
import styled, { css } from 'styled-components'

export const Accordion = styled(MUIAccordion)<{ isConcluded?: boolean }>`
  --border-radius: 0.5rem;

  border-radius: var(--border-radius) !important;

  ::before {
    display: none;
  }

  & > .MuiButtonBase-root {
    &.Mui-expanded {
      border-bottom: 0.1rem solid ${({ theme }) => theme.palette.divider};
    }
  }

  &.Mui-expanded {
    border-bottom-left-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }

  ${({ isConcluded }) =>
    isConcluded &&
    css`
      border-width: 0.1rem !important;
      border-color: ${({ theme }) => theme.palette.success.main} !important;
    `}
`

export const AccordionSummary = styled(MUIAccordionSummary)``

export const AccordionDetails = styled(MUIAccordionDetails)`
  padding: 0 !important;
`

export const ItemContainer = styled(Box)`
  padding: 3.2rem 2.4rem;
`
