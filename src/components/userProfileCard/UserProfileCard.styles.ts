import { Box, Button as MuiButton, Paper as MUIPaper } from '@mui/material'
import styled from 'styled-components'

import { from } from 'utils'

export const Button = styled(MuiButton)`
  padding: 0 !important;
  text-align: left;

  transition: all 0.3s !important;

  :hover {
    transform: scale(1.01);
  }
`

export const Paper = styled(MUIPaper)`
  width: 100%;
`

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 1.6rem; */
  /* padding: 2.4rem; */
`

export const Header = styled(Box)`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  /* justify-content: space-between; */
  /* flex-direction: column; */
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

export const Body = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const Footer = styled(Box)`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};

  ${from.md} {
    flex-direction: row;
  }
`
