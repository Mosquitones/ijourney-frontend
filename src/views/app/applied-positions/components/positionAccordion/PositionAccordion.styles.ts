import {
  Accordion as MUIAccordion,
  AccordionSummary as MUIAccordionSummary,
  AccordionDetails as MUIAccordionDetails,
} from '@mui/material'
import styled from 'styled-components'

export const Accordion = styled(MUIAccordion)`
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
`

export const AccordionSummary = styled(MUIAccordionSummary)``

export const AccordionDetails = styled(MUIAccordionDetails)`
  padding: 0 !important;
`

export const ItemContainer = styled.div`
  padding: 3.2rem 2.4rem;
`
