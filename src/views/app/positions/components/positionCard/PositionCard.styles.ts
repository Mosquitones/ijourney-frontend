import { Box, Paper as MUIPaper, Button as MuiButton } from '@mui/material'
import { from } from 'common/theme'
import styled from 'styled-components'

export const Button = styled(MuiButton)`
  padding: 0 !important;
  text-align: left;
`

export const Paper = styled(MUIPaper)``

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding: 2.4rem;
`

export const Header = styled(Box)`
  display: flex;
  gap: 1.6rem;
  justify-content: space-between;
  flex-direction: column;

  ${from.md} {
    flex-direction: row;
  }
`

export const HeaderInfoContent = styled(Box)`
  display: flex;
  gap: 0.8rem;

  ${from.xs} {
    flex-direction: column;
  }

  ${from.sm} {
    flex-direction: row;
    justify-content: space-between;
  }

  ${from.md} {
    flex-direction: column;
    justify-content: initial;
    align-items: flex-end;
  }
`

export const Body = styled.div``

export const Footer = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};

  ${from.md} {
    flex-direction: row;
  }
`
